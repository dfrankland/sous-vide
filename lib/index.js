// Polyfill `fetch` API
import 'isomorphic-fetch';

import * as constants from './constants';
import * as ble from './ble';
import * as rest from './rest';
import * as recipes from './recipes';
import * as wifi from './wifi';

export default {
  constants,
  ble,
  rest,
  recipes,
  wifi,
};

export const anovaConstants = constants;
export const anovaBle = ble;
export const anovaRest = rest;
export const anovaRecipes = recipes;
export const anovaWifi = wifi;
