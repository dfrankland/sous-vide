# Anova Bluetooth API

These commands and notes have been extracted from the Anova Culinary app v2.1.0
APK. Anova devices use Bluetooth Low Energy (BLE), and can only work with other
devices that have this capability.

## How to Connect and Communicate

1.  Use the local name to recognize an Anova device.

2.  Use the device discovered and find the service on it that matches the listed
    service UUID.

3.  Use the service discovered and find the characteristics on it that matches
    the listed characteristic UUID.

4.  Use the characteristic discovered and listen for data, subscribe, and then
    write commands to it.

## How to Send Commands

*   Commands should be executed in a queue.

*   The queue should have an allotted timeout for each command.

*   Each command should be delimited by an "empty" command.

*   Each command must be written in sets of max 20 bytes with `\r` signaling the
    end of a single command.

## How to Receive Data

As data is received from the discovered characteristic, it must be concatenated
into a string until `\r` is received signaling the end.

## Bluetooth Constants

*   Local name: `Anova`

*   Device service UUID: `ffe0`

*   Device characteristic UUID: `ffe1`

## Commands

| APK Source File                  | Command String                  | Notes |
|----------------------------------|---------------------------------|-------|
| `commands/SetCalibrationFactor`  | `cal %.1f`                      | where `%.1f` is a float value with a precision of 1 decimal place (rounds up), defaults to `0.0`, max of 9.9, min of -9.9 |
| `commands/ClearAlarm`            | `clear alarm`                   |       |
| `commands/CheckWifiSupport`      | `get id card`                   | same as `GetIdCard` |
| `commands/GetIdCard`             | `get id card`                   | returns the `cooker_id` of the Anova device |
| `commands/CalibrationFactor`     | `read cal`                      |       |
| `commands/TemperatureHistory`    | `read data`                     |       |
| `commands/Date`                  | `read date`                     |       |
| `commands/ReadTargetTemperature` | `read set temp`                 | same as `TargetTemperature` |
| `commands/TargetTemperature`     | `read set temp`                 |       |
| `commands/CurrentTemperature`    | `read temp`                     |       |
| `commands/ReadTime`              | `read timer`                    | same as `TimerStatus` |
| `commands/TimerStatus`           | `read timer`                    | has a return status of `running` if running otherwise stopped |
| `commands/ReadUnitCommand`       | `read unit`                     |       |
| `commands/ServerPara`            | `server para %s %d`             | where `%s` is the server IP of `pc.anovaculinary.com` and `%d` is the port as an integer value defaulting to `8080` |
| `commands/SetLed`                | `set led %d %d %d`              | where `%d` is the value of red, green, and blue as an integer value (**only found in APK version 0.0.180 and does not work**) |
| `commands/SetDeviceName`         | `set name %s`                   | where `%s` is the device name |
| `commands/SetSecretKey`          | `set number %s`                 | where `%s` is the secret key, secret key should be 10 lowercase alphanumeric characters |
| `commands/SpeakerOff`            | `set speaker off`               |       |
| `commands/SetTargetTemperature`  | `set temp %f`                   | where `%f` is the temperature as a float value (should only work with a precision of 1 decimal place), max of 99.9C or 211.8F, min of 5.0C or 41.0F |
| `commands/SetTimer`              | `set timer %d`                  | where `%d` is the time in minutes as an integer value, max of 6000, min of 0 |
| `commands/SetTemperatureUnit`    | `set unit %s`                   | where `%s` is the short version of the temperature unit (`c` or `f`) |
| `commands/SmartLinkStart`        | `smartlink start`               | returns `smart link run` if successful |
| `commands/StartDevice`           | `start`                         |       |
| `commands/StartTimer`            | `start time`                    |       |
| `commands/DeviceStatus`          | `status`                        | should return one of the following: `running`, `stopped`, `low water`, `heater error`, `power loss`, `user change parameter` |
| `commands/StopDevice`            | `stop`                          |       |
| `commands/StopTimer`             | `stop time`                     |       |
| `commands/VersionCommand`        | `version`                       |       |
| `commands/wifi/WifiPara`         | `wifi para 2 %s %s WPA2PSK AES` | where the first `%s` is the wifi SSID and the second `%s` is the wifi password |
| `commands/EmptyCommand`          | (EMPTY STRING)                  | usually queued in between commands |
| `commands/Command`               |                                 | This is a class that unifies all the other commands |
| `commands/TemperatureUnit`       |                                 | This is a class that returns long and short values of `c` and `f` |
