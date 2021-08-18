import { createServer } from 'net';
import Crowd from 'crowd-control';
import { DEFAULT_PORT } from './constants';
import encoder from './encoder';
import decoder from './decoder';

const crowd = new Crowd();

const sendCommand = socket => (command, timeout) => (
  crowd.control(
    () => (
      new Promise(
        async resolve => {
          const getData = () => data => {
            resolve(decoder(data));
            socket.removeListener('data', getData);
          };
          socket.on('data', getData());
          socket.write(encoder(`${command}\r`));
        },
      )
    ),
  )(timeout)
);

export default (options = {}) => (
  new Promise(
    resolve => {
      const server = createServer();

      server.on('connection', socket => {
        resolve(sendCommand(socket));
      });

      server.listen({
        port: DEFAULT_PORT,
        ...options,
      });
    },
  )
);
