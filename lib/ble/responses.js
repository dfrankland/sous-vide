import { checkIsString } from '../lib/inputChecks';

export const READ_STATUS_RUNNING = response => {
  checkIsString(response);
  return response === 'running';
};

export const READ_STATUS_USER_CHANGE = response => {
  checkIsString(response);
  return response === 'user change parameter';
};

export const READ_STATUS_ERROR = response => {
  checkIsString(response);
  return (
    ['low water', 'heater error', 'power loss'].indexOf(response) > -1
  );
};

export const READ_TIMER_RUNNING = response => {
  checkIsString(response);
  return response === 'running';
};

export const SMARTLINK_START_SUCCESSFUL = response => {
  checkIsString(response);
  return response === 'smart link run';
};
