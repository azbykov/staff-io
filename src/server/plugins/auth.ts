import fs from 'fs';
import path from 'path';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import FastifyPassport from '@fastify/passport';
import YandexAuth from '../auth/yandex';
import authRoutes from '../routes/auth';
import fastifySecureSession from '@fastify/secure-session';

// Здесь ваш код для конфигурации FastifyPassport и LocalStrategy

FastifyPassport.use(YandexAuth.getYandexStrategy());

const authPlugin = async (fastify: FastifyInstance) => {
  // Инициализация fastify-secure-session
  fastify.register(fastifySecureSession, {
    sessionName: 'session',
    // the name of the session cookie, defaults to value of sessionName
    cookieName: 'staff-session',
    // adapt this to point to the directory where secret-key is located
    key: fs.readFileSync(path.join(__dirname, '../../../', 'config/secret-key')),
    cookie: {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: 'lax' // 'strict', 'lax', 'none', or undefined
      // options for setCookie, see https://github.com/fastify/fastify-cookie
    }
  });

  fastify.register(FastifyPassport.initialize());
  fastify.register(FastifyPassport.secureSession());
  fastify.register(authRoutes);


  FastifyPassport.registerUserDeserializer(async(user,req) => {
    return user;
  })

  FastifyPassport.registerUserSerializer(async(user,req) => {
    return user;
  })
};

export default fp(authPlugin);
