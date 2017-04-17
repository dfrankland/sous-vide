// Generate an array of [0-9][a-z] for creating a random string
let characters = [];

const min = characters.length;

for (let number = min; number < 10; number += 1) {
  characters = characters.concat(number.toString(10));
}

for (let char = 'a'.charCodeAt(0); char < 'z'.charCodeAt(0) + 1; char += 1) {
  characters = characters.concat(String.fromCodePoint(char));
}

const max = characters.length;

// Used for creating a random string identifier for the "SET_NUMBER" command
export default length => {
  if (length < 1) {
    throw new Error(`length < 1: ${length}`);
  }

  return () => {
    let randomString = '';

    for (let i = 0; i < length; i += 1) {
      const random = Math.floor((Math.random() * (max - min)) + min);
      randomString += characters[random];
    }

    return randomString;
  };
};
