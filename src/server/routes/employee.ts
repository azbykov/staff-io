import { FastifyPluginCallback } from 'fastify';

const employeeRoutes: FastifyPluginCallback = (fastify, _, next) => {
    fastify.get('/employees', async (_, reply) => {
        reply.send({ message: 'List of employees' });
    });

    fastify.get('/employees/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        reply.send({ message: `Employee with ID ${id}` });
    });

    next();
};

export default employeeRoutes;
