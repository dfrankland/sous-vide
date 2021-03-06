import anova from './lib';

// Replace the `SECRET_KEY` with your devices secret key. Can be obtained by
// looking at the API calls made by the Anova app or by setting a new one with
// the `anova.ble.commands.SET_NUMBER` command in conjunction with
// `anova.ble.randomString`.
const SECRET_KEY = '0000000000';

const log = prefix => async promise => (
  console.log(`${prefix}:`, await promise) // eslint-disable-line no-console
);

const logBle = log('BLE');
const logRest = log('REST');

(async () => {
  const sendCommand = await anova.ble.connect();
  const id = await sendCommand(anova.ble.commands.GET_ID_CARD());
  anova.rest.connect({ id: id.replace(/\r/g, ''), secretKey: SECRET_KEY });
  const promises = [
    logBle(sendCommand(anova.ble.commands.GET_ID_CARD())),
    logBle(sendCommand(anova.ble.commands.VERSION())),
    logBle(sendCommand(anova.ble.commands.READ_STATUS())),
    logRest(anova.rest.commands.READ_STATUS()),
    logRest(anova.rest.commands.READ_JOBS()),
  ];
  await Promise.all(promises);
  process.exit();
})().catch(
  err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  },
);
