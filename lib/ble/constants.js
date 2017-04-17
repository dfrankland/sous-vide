import dns from 'dns';

export const DEVICE_SERVICE_UUID = 'ffe0';
export const DEVICE_CHARACTERISTIC_UUID = 'ffe1';

export const DEFAULT_PORT = 8080;
export const FORWARDED_URL = 'pc.anovaculinary.com';
export const FORWARDED_IP = new Promise(
  (resolve, reject) => {
    dns.resolve4(FORWARDED_URL, (error, addresses) => {
      if (error) reject(error);
      resolve(addresses[0]);
    });
  },
);

export const UNIT_CELCIUS = 'c';
export const UNIT_FAHRENHEIT = 'f';

export const SECRET_KEY_REGEX = /^[0-9a-z]{10}$/;

export const CALIBRATION_MAX = 9.9;
export const CALIBRATION_MIN = -9.9;

export const TEMPERATURE_CELCIUS_MAX = 99.9;
export const TEMPERATURE_CELCIUS_MIN = 5.0;

export const TEMPERATURE_FAHRENHEIT_MAX = 211.8;
export const TEMPERATURE_FAHRENHEIT_MIN = 41.0;

export const TIMER_MAX = 6000;
export const TIMER_MIN = 0;
