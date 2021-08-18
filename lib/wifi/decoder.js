import { rorInt8 } from 'bitwise-rotation';
import { PACKET_HEADER, PACKET_FOOTER, BIT_MASK } from './constants';

const removeHeaderAndFooterBytes = bytes => {
  let newBytes = bytes;

  if (bytes[0] === PACKET_HEADER) {
    // bytes[1] is the length of the string
    newBytes = newBytes.slice(2, newBytes.length);
  } else {
    throw new Error(`Header bytes do not match ${PACKET_HEADER[0]} and ${PACKET_HEADER[1]}.`);
  }

  if (newBytes[newBytes.length - 1] === PACKET_FOOTER) {
    newBytes = newBytes.slice(0, newBytes.length - 1);
  } else {
    throw new Error(`Footer byte does not match ${PACKET_FOOTER}.`);
  }

  return newBytes;
};

export default packetBuf => {
  const bytes = removeHeaderAndFooterBytes([...packetBuf]);
  const { string: command } = bytes.reduce(
    ({ checksum, string }, byte, index) => {
      if (index === bytes.length - 1) {
        if (byte !== (checksum & BIT_MASK)) { // eslint-disable-line no-bitwise
          throw new Error(`Checksum failed: calculated ${checksum}, but received ${byte}.`);
        }

        return { checksum, string };
      }

      const n = (index + 1) % 7;
      const newString = String.fromCharCode(rorInt8(byte, n));
      return { checksum: checksum + byte, string: string + newString };
    },
    { checksum: 0, string: '' },
  );

  return command;
};
