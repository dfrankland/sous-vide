import assert from 'assert';
import { encoder, decoder } from './index';

const command = 'get id card\r';

const encoded = encoder(command);
const decoded = decoder(encoded);

assert.equal(command, decoded);
