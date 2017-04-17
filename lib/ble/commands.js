import {
  UNIT_CELCIUS,
  UNIT_FAHRENHEIT,
  TEMPERATURE_FAHRENHEIT_MAX,
  TEMPERATURE_CELCIUS_MIN,
  CALIBRATION_MAX,
  CALIBRATION_MIN,
  TIMER_MAX,
  TIMER_MIN,
  SECRET_KEY_REGEX,
} from './constants';
import {
  checkIsFloat,
  checkIsInteger,
  checkIsInBetween,
  checkIsString,
  checkIsPassingRegEx,
  checkIsOneOf,
} from './inputChecks';

const oneDecimalPlacePrecision = number => Math.round(number * 10) / 10;

// Cooking Actions
export const START = () => 'start';
export const STOP = () => 'stop';

// Cooking Configuration
export const SET_UNIT = unit => {
  checkIsString(unit);
  checkIsOneOf([UNIT_CELCIUS, UNIT_FAHRENHEIT])(unit);
  return `set unit ${unit}`;
};
export const SET_TARGET_TEMPERATURE = targetTemperature => {
  checkIsFloat(targetTemperature);
  checkIsInBetween(TEMPERATURE_FAHRENHEIT_MAX, TEMPERATURE_CELCIUS_MIN)(targetTemperature);
  return `set temp ${oneDecimalPlacePrecision(targetTemperature)}`;
};
export const SET_CALIBRATION_FACTOR = calibrationFactor => {
  checkIsFloat(calibrationFactor);
  checkIsInBetween(CALIBRATION_MAX, CALIBRATION_MIN)(calibrationFactor);
  return `cal ${oneDecimalPlacePrecision(calibrationFactor)}`;
};

// Cooking Info
export const READ_STATUS = () => 'status';
export const READ_TEMPERATURE = () => 'read temp';
export const READ_DATA = () => 'read data';
export const READ_UNIT = () => 'read unit';
export const READ_TARGET_TEMPERATURE = () => 'read set temp';
export const READ_CALIBRATION_FACTOR = () => 'read cal';

// Timer/Alarm Actions
export const START_TIME = () => 'start timer';
export const STOP_TIME = () => 'stop time';
export const CLEAR_ALARM = () => 'clear alarm';

// Timer/Alarm Configuration
export const SET_TIMER = minutes => {
  checkIsInteger(minutes);
  checkIsInBetween(TIMER_MAX, TIMER_MIN)(minutes);
  return `set timer ${minutes}`;
};
export const SET_SPEAKER_OFF = () => 'set speaker off';

// Timer/Alarm Info
export const READ_TIMER = () => 'read timer';

// Utils
export const GET_ID_CARD = () => 'get id card';
export const SMARTLINK_START = () => 'smartlink start';
export const SET_NAME = name => {
  checkIsString(name);
  return `set name ${name}`;
};
export const SET_NUMBER = secretKey => {
  checkIsString(secretKey);
  checkIsPassingRegEx(SECRET_KEY_REGEX)(secretKey);
  return `set number ${secretKey}`;
};
export const SET_SERVER_PARAMETERS = (ip, port) => {
  checkIsString(ip);
  checkIsInteger(port);
  // TODO: Check that ip and port are valid
  return `server para ${ip} ${port}`;
};
export const SET_WIFI_PARAMETERS = (ssid, password) => {
  checkIsString(ssid);
  checkIsString(password);
  // TODO: Check that ssid and password are valid
  return `wifi para 2 ${ssid} ${password} WPA2PSK AES`;
};

// Other Info
export const VERSION = () => 'version';
export const READ_DATE = () => 'read date';

// Deprecated
// This probably won't work
export const SET_LED = (r, g, b) => `set led ${r} ${g} ${b}`;
