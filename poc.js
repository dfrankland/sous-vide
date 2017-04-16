import noble from 'noble';

const DEVICE_SERVICE_UUID = 'ffe0';
const DEVICE_CHARACTERISTIC_UUID = 'ffe1';

const checkError = callback => (error, ...args) => {
  if (error) throw error;
  if (typeof callback === 'function') callback(...args);
};

const sendCommand = characteristic => {
  let allData = '';
  characteristic.on('data', data => {
    const newData = data.toString('utf8');
    allData += newData;
    if (/\r/g.test(newData)) {
      console.log(`DATA: ${allData}`); // eslint-disable-line no-console
      allData = '';
      process.exit();
    }
  });
  characteristic.subscribe(
    checkError(
      () => {
        characteristic.write(Buffer.from('get id card\r', 'utf8'), true, checkError());
      },
    ),
  );
};

// Find the proper characteristic
const characteristicsFound = characteristics => {
  const foundCharacteristics = characteristics.filter(
    characteristic => characteristic.uuid === DEVICE_CHARACTERISTIC_UUID,
  );
  if (foundCharacteristics.length < 1) return;
  sendCommand(foundCharacteristics[0]);
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
  peripheral.once('connect', () => {
    peripheral.once('servicesDiscover', servicesFound);
    peripheral.discoverServices([], checkError());
  });
  peripheral.connect(checkError());
};

// Wait for "poweredOn" event and start scanning
noble.on('stateChange', state => {
  if (state !== 'poweredOn') return;
  noble.on('discover', peripheral => {
    const { advertisement: { localName } } = peripheral;
    if (localName !== 'Anova') return;
    peripheralFound(peripheral);
  });
  noble.startScanning([], false);
});
