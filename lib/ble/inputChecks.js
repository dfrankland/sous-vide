export const checkIsFloatOrInteger = ({ float, integer }) => n => {
  const err = `Input must be a number and a ${float ? 'float' : 'integer'}`;
  if (typeof n !== 'number' || Number(n) !== n) {
    if (
      (float && n % 1 === 0) ||
      (integer && n % 1 !== 0)
    ) throw new Error(err);
  }
};

export const checkIsFloat = checkIsFloatOrInteger('float');
export const checkIsInteger = checkIsFloatOrInteger('integer');

export const checkIsInBetween = (max, min) => number => {
  if (number > max || number < min) {
    throw new Error(`Input must be a number and be between ${max} and ${min}`);
  }
};

export const checkIsString = string => {
  if (typeof string !== 'string') {
    throw new Error('Input must be a string');
  }
};

export const checkIsPassingRegEx = regex => string => {
  if (!regex.test(string)) {
    throw new Error(`Input must match regex ${regex}`);
  }
};

export const checkIsOneOf = set => value => {
  if (set.indexOf(value) < 0) {
    throw new Error(`Input must be one of: ${set.join(', ')}`);
  }
};
