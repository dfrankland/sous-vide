# node-anova

Node.js API to control Anova water circulators. So far, only tested on a 2nd
generation Anova Precision Cooker.

## Prerequisites

Make sure to meet all prerequisites set out by [`noble`][1]; this package is
just an API wrapper built with it.

## API

### `anova.ble`

Bluetooth Low Energy (BLE): currently, the only supported API.

#### `anova.ble.connect`

Function to connect to an Anova device. Returns a promise that resolves to
another function `sendCommand`. Currently there's no way of choosing between
multiple devices.

##### `sendCommand`

Function to queue a command to be sent to the Anova device. Returns a promise
with the response from the device.

#### `anova.ble.commands`

An object with command functions that return strings to be sent to the Anova
device with `sendCommand`. [Check out the docs][2] to understand more about the
available commands.

#### `anova.ble.constants`

An object with constants that are used as constraints when configuring the
Anova device with commands.

#### `anova.ble.responses`

Functions that check the response from a few commands. Can be useful for
checking whether timers are running, the device is cooking, or if there is an
error with the device.

#### `anova.ble.randomString`

Function to be used in conjuntion with `anova.ble.commands.SET_NUMBER`.
Generates valid random strings, given a length as an integer. The valid length
for `anova.ble.commands.SET_NUMBER` is `10`.

### `anova.wifi`

Wifi or HTTP requests: coming soon, maybe?

[1]: https://github.com/sandeepmistry/noble#prerequisites
[2]: https://github.com/dfrankland/node-anova/blob/master/docs/ble.md
