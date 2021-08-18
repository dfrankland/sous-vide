import { rolInt8 } from 'bitwise-rotation';
import { PACKET_HEADER, PACKET_FOOTER, BIT_MASK } from './constants';

export default commandString => {
  const commandBytes = commandString.split('').reduce(
    ({ checksum, bytes }, character, index) => {
      const characterCode = character.charCodeAt(0);
      const n = (index + 1) % 7;
      const newByte = rolInt8(characterCode, n);
      return {
        checksum: checksum + newByte,
        bytes: bytes.concat(newByte),
      };
    },
    { checksum: 0, bytes: [] },
  );

  return Buffer.from([
    PACKET_HEADER,
    commandString.length,
    ...commandBytes.bytes,
    commandBytes.checksum & BIT_MASK, // eslint-disable-line no-bitwise
    PACKET_FOOTER,
  ]);
};
