import noble from 'noble';

const DEVICE_SERVICE_UUID = 'ffe0';
const DEVICE_CHARACTERISTIC_UUID = 'ffe1';

const checkError = callback => (error, ...args) => {
  if (error) throw error;
  if (typeof callback === 'function') callback(...args);
};

const connect = () => (
  new Promise(
    resolve => {
      const queue = [];

      const sendCommand = characteristic => command => {
        const previousPromise = Promise.resolve(queue.pop());
        const promise = new Promise(
          async sendCommandResolve => {
            await previousPromise;

            let allData = '';
            const getData = data => {
              const newData = data.toString('utf8');
              allData += newData;
              if (/\r/g.test(newData)) {
                sendCommandResolve(allData);
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
        );

        queue.push(promise);
        return promise;
      };

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
        const { advertisement: { localName } } = peripheral;
        if (localName !== 'Anova') return;
        peripheralFound(peripheral);
      });

      // Wait for "poweredOn" event and start scanning
      noble.on('stateChange', state => {
        if (state !== 'poweredOn') return;
        noble.startScanning([], false);
      });
    },
  )
);

const logPromiseResult = async promise => (
  console.log('DATA:', await promise) // eslint-disable-line no-console
);
(async () => {
  const sendCommand = await connect();
  const promises = [
    logPromiseResult(sendCommand('get id card')),
    logPromiseResult(sendCommand('version')),
    logPromiseResult(sendCommand('status')),
  ];
  await Promise.all(promises);
  process.exit();
})();
