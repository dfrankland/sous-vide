# sous-vide

Node.js API to control Anova water circulators. So far, only tested on a 2nd
generation Anova Precision Cooker.

## Prerequisites

Make sure to meet all prerequisites set out by [`noble`][1]; this package is
just an API wrapper built with it.

## API

### `anova.ble`

Bluetooth Low Energy (BLE): currently, the only supported API.

#### `anova.ble.connect([macAddress])`

Function to connect to an Anova device. Returns a promise that resolves to
another function `sendCommand`. Providing a `macAddress` string, you may filter
to connect to specific devices.

##### `sendCommand(commandString)`

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

### `anova.rest`

##### `anova.rest.sendCommand(url, [postBody])`

Wrapper function for `fetch` to call Anova REST API.

*   `url`: A URL to send the call to. Call will be a `GET`, unless a `postBody`
    is given in which case it will be a `POST`.

*   `postBody`: An optional object that will be stringified and sent as the
    `POST` body.

Returns a promise that resolves to the JSON response of the API call.

#### `anova.rest.commands`

An object with properties of different API commands to be sent to Anova's REST
API. Each command calls `anova.rest.sendCommand` with the proper URL, HTTP
method, and `POST` body if required and returns a promise.

#### `anova.rest.constants`

An object with constants that are used as constraints when calling the Anova
REST API.

#### `anova.rest.responses`

Functions that check the response from a few commands. Can be useful for
checking whether timers are running, the device is cooking, or if there is an
error with the device.

### `anova.recipes`

Recipes API: coming soon...

[1]: https://github.com/sandeepmistry/noble#prerequisites
[2]: https://github.com/dfrankland/sous-vide/blob/master/docs/ble.md
