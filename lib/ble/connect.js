import noble from 'noble';
import Crowd from 'crowd-control';
import {
  DEVICE_SERVICE_UUID,
  DEVICE_CHARACTERISTIC_UUID,
} from './constants';

const crowd = new Crowd();

const checkError = callback => (error, ...args) => {
  if (error) throw error;
  if (typeof callback === 'function') callback(...args);
};

const sendCommand = characteristic => (command, timeout) => (
  crowd.control(
    () => (
      new Promise(
        async resolve => {
          let allData = '';
          const getData = data => {
            const newData = data.toString('utf8');
            allData += newData;
            if (/\r/g.test(newData)) {
              resolve(allData);
              characteristic.removeListener('data', getData);
            }
          };
          characteristic.on('data', getData);

          characteristic.write(
            Buffer.from(`${command}\r`, 'utf8'),
            true,
            checkError(),
          );
        },
      )
    ),
  )(timeout)
);

export default addressFilter => (
  new Promise(
    resolve => {
      // Find the proper characteristic
      const characteristicsFound = characteristics => {
        const foundCharacteristics = characteristics.filter(
          characteristic => characteristic.uuid === DEVICE_CHARACTERISTIC_UUID,
        );
        if (foundCharacteristics.length < 1) return;
        const characteristic = foundCharacteristics[0];
        characteristic.subscribe(
          checkError(
            () => {
              resolve(sendCommand(characteristic));
            },
          ),
        );
      };

      // Get the proper service
      const servicesFound = services => {
        const foundServices = services.filter(
          service => service.uuid === DEVICE_SERVICE_UUID,
        );
        if (foundServices.length < 1) return;
        const service = foundServices[0];
        service.discoverCharacteristics([], checkError());
        service.once('characteristicsDiscover', characteristicsFound);
      };

      // Connect to the device
      const peripheralFound = peripheral => {
        peripheral.once('servicesDiscover', servicesFound);
        peripheral.once('connect', () => {
          peripheral.discoverServices([], checkError());
        });
        peripheral.connect(checkError());
      };

      // Look for a peripheral with a local name of "Anova"
      noble.on('discover', peripheral => {
        const { advertisement: { localName }, address } = peripheral;
        if (
          (addressFilter && address !== addressFilter) ||
          (!addressFilter && localName !== 'Anova')
        ) return;
        peripheralFound(peripheral);
      });

      // Wait for "poweredOn" event and start scanning
      noble.on('stateChange', state => {
        if (state !== 'poweredOn') return;
        noble.startScanning([DEVICE_SERVICE_UUID], false);
      });
    },
  )
);
