import anova from './lib';

const log = async promise => (
  console.log('DATA:', await promise) // eslint-disable-line no-console
);

(async () => {
  const sendCommand = await anova.ble.connect();
  const promises = [
    log(sendCommand(anova.ble.commands.GET_ID_CARD())),
    log(sendCommand(anova.ble.commands.VERSION())),
    log(sendCommand(anova.ble.commands.READ_STATUS())),
  ];
  await Promise.all(promises);
  process.exit();
})();
