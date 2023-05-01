import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import fastifyNext from '@fastify/nextjs';

import employeeRoutes from './routes/employee';
import {database} from './plugins/database';
import authPlugin from './plugins/auth';

type ServerProps = {
  logger: boolean;
}

export function createServer(options: ServerProps): FastifyInstance {
  const server = Fastify(options);
// Регистрация плагинов
  server.register(cors);
  server.register(helmet);
  server.register(compress);
  server.register(database, {
    uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/staff-io'
  });

  server.register(authPlugin);

  // Регистрация и настройка плагина fastify-nextjs
  // server.register(fastifyNext, { dev: process.env.NODE_ENV !== 'production' });

  // Обработка маршрута Next.js для главной страницы
  server.get('/', (req, reply) => {
    // reply.nextRender('/index');
  });

  return server;
}
