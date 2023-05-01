import dotenv from 'dotenv';
dotenv.config();

import {createServer} from './app';

const start = async () => {
  const server = await createServer({
    logger: true,
  });
  // register plugin below:
  try {
    // @ts-ignore
    const port = process.env.PORT as number || 8000;
    const host = process.env.ADDRESS || '0.0.0.0';
    await server.listen({
      port,
      host
    });
    console.log('Server started successfully');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
