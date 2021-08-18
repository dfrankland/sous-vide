# sous-vide

Node.js API to control Anova water circulators.

**tl;dr** [go check out the `example.js`.][1]

> Note: only tested on a 2nd generation Anova Precision Cooker.

## Prerequisites

Make sure to meet all prerequisites set out by [`noble`][2] to use the Bluetooth Low Energy (BLE) API.

## APIs

### Bluetooth Low Energy (BLE)

#### `anova.ble.connect([macAddress])`

Function to connect to an Anova device. Returns a promise that resolves to
another function `sendCommand`. Providing a `macAddress` string, you may filter
to connect to specific devices.

##### `sendCommand(commandString)`

Function to queue a command to be sent to the Anova device. Returns a promise
with the response from the device.

#### `anova.ble.commands`

An object with command functions that return strings to be sent to the Anova
device with `sendCommand`. [Check out the docs][3] to understand more about the
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

### REST

##### `anova.rest.connect([credentials])`

Function to set the credentials to be used for REST API calls.

*   `credentials`: An optional object with the following required properties.

    *   `id`: Anova device ID. Can be obtained with the BLE command
        `anova.ble.commands.GET_ID_CARD` (see example).

    *   `secretKey`: Anova device secret key. Can be obtained by
        looking at the API calls made by the Anova app or by setting a new one
        with the `anova.ble.commands.SET_NUMBER` command in conjunction with
        `anova.ble.randomString`.

Returns `undefined` if passing `credentials` object, otherwise returns an array
of `[id, secretKey]`.

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
[Check out the docs][4] to understand more about the available commands.

#### `anova.rest.constants`

An object with constants that are used as constraints when calling the Anova
REST API.

#### `anova.rest.responses`

Functions that check the response from a few commands. Can be useful for
checking whether timers are running, the device is cooking, or if there is an
error with the device.

### Wifi

##### `anova.wifi.connect([options])`

Function to start a TCP server that an Anova device can connect to. Returns a
promise that resolves to another function `sendCommand`.

*   `options`: An object with [options to pass to `server.listen`][5].
    Defaults to the following:

    ```js
    {
      port: 8080,
    }
    ```

##### `sendCommand(commandString)`

Function to queue a command to be sent to the Anova device. Returns a promise
with the response from the device. `commandString` will be encoded, sent, and
when the response is received it will be decoded automatically.

#### `anova.wifi.commands`

An object with command functions that return strings to be sent to the Anova
device with `sendCommand`.

#### `anova.wifi.constants`

An object with constants that are used as constraints when configuring the
Anova device with commands.

#### `anova.wifi.responses`

Functions that check the response from a few commands. Can be useful for
checking whether timers are running, the device is cooking, or if there is an
error with the device.

#### `anova.wifi.encoder`

Function to encode a string to be sent to an Anova device via TCP socket.
Returns an encoded buffer.

#### `anova.wifi.decoder`

Function to decode an encoded buffer sent from an Anova device via TCP socket.
Returns a string.

### Recipes

Recipes API coming soon...

[1]: https://github.com/dfrankland/sous-vide/blob/master/example.js
[2]: https://github.com/sandeepmistry/noble#prerequisites
[3]: https://github.com/dfrankland/sous-vide/blob/master/docs/ble.md
[4]: https://github.com/dfrankland/sous-vide/blob/master/docs/rest.md
[5]: https://nodejs.org/api/net.html#net_server_listen_options_callback
