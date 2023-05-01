import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions
} from 'fastify';
import fp from 'fastify-plugin';
import mongoose from 'mongoose';

export type Options = {
  uri: string;
};

const ConnectDB: FastifyPluginAsync<Options> = async (
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) => {
  mongoose.connection.on('connected', () => {
    fastify.log.info({ actor: 'MongoDB' }, 'connected');
  });
  mongoose.connection.on('disconnected', () => {
    fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
  });

  // Изменение здесь: возвращаем Promise вместо использования try-catch
  return mongoose.connect(options.uri);
};
export const database = fp(ConnectDB);
