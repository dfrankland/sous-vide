import {
  UNIT_CELCIUS,
  UNIT_FAHRENHEIT,
  TEMPERATURE_FAHRENHEIT_MAX,
  TEMPERATURE_CELCIUS_MIN,
  TIMER_MAX,
  TIMER_MIN,
} from '../constants';

import {
  checkIsInteger,
  checkIsFloat,
  checkIsInBetween,
  checkIsString,
  checkIsOneOf,
  checkIsBoolean,
  checkIsObject,
} from '../lib/inputChecks';

import {
  COOKER_ENDPOINT,
  JOBS_ENDPOINT,
} from './constants';

import sendCommand from './sendCommand';

export const SET_UNIT = unit => {
  checkIsString(unit);
  checkIsOneOf([UNIT_CELCIUS, UNIT_FAHRENHEIT])(unit);
  return sendCommand(COOKER_ENDPOINT, { temp_unit: unit });
};

export const SET_TEMP = targetTemperature => {
  checkIsFloat(targetTemperature);
  checkIsInBetween(TEMPERATURE_FAHRENHEIT_MAX, TEMPERATURE_CELCIUS_MIN)(targetTemperature);
  return sendCommand(COOKER_ENDPOINT, { target_temp: targetTemperature });
};

export const READ_STATUS = () => sendCommand(COOKER_ENDPOINT);

export const SET_RUNNING = running => {
  checkIsBoolean(running);
  return sendCommand(COOKER_ENDPOINT, { is_running: running });
};

export const SET_SPEAKER_MODE = mode => {
  checkIsBoolean(mode);
  return sendCommand(COOKER_ENDPOINT, { speaker_mode: mode });
};

export const READ_JOBS = () => sendCommand(JOBS_ENDPOINT);

const addProp = prop => (prop ? { prop } : {});
export const SET_JOB = ({
  job_info,
  temp_unit,
  target_temp,
  timer_length,
  threshold_temp, // TODO: figure out what this does
  max_circulation_interval, // TODO: figure out what this does
}) => {
  checkIsObject(job_info);
  checkIsString(temp_unit);
  checkIsOneOf([UNIT_CELCIUS, UNIT_FAHRENHEIT])(temp_unit);
  checkIsFloat(target_temp);
  checkIsInBetween(TEMPERATURE_FAHRENHEIT_MAX, TEMPERATURE_CELCIUS_MIN)(target_temp);
  checkIsInteger(timer_length);
  checkIsInBetween(TIMER_MAX * 60, TIMER_MIN)(timer_length);
  checkIsInteger(threshold_temp);
  checkIsInteger(max_circulation_interval);
  return sendCommand(
    JOBS_ENDPOINT,
    {
      job_type: 'manual_cook',
      ...addProp(job_info),
      ...addProp(temp_unit),
      ...addProp(target_temp),
      timer_length,
      ...addProp(threshold_temp),
      ...addProp(max_circulation_interval),
    },
  );
};
