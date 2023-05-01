import { FastifyInstance } from 'fastify';
import FastifyPassport from '@fastify/passport';

export default async function authRoutes(fastify: FastifyInstance) {
  // Регистрация и вход через Yandex
  fastify.get(
    '/auth/yandex',
    { preValidation: FastifyPassport.authenticate('yandex') },
    (request, reply) => {
      reply.send('Redirecting to Yandex for authentication');
    }
  );

  fastify.get(
    '/auth/yandex/callback',
    { preValidation: FastifyPassport.authenticate('yandex', { failureRedirect: '/login' }) },
    (request, reply) => {
      reply.redirect('/'); // Перенаправление после успешной аутентификации
    }
  );

  // Вход
  fastify.get('/login', async (request, reply) => {
    // Вход будет обрабатываться через Yandex, поэтому перенаправляем на маршрут аутентификации Yandex
    reply.redirect('/auth/yandex');
  });

  // Выход
  fastify.get('/logout', async (request, reply) => {
    // Удаление информации о пользователе из сессии и перенаправление на главную страницу
    request.logout();
    reply.redirect('/');
  });

  // Здесь ваш код для других маршрутов аутентификации
}
