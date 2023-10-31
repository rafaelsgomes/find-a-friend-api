import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { fetchByCity } from './fetchByCity'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verifyJWT'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
  app.post('/sessions', authenticate)

  app.get('/organizations/', fetchByCity)
  app.get('/organizations/:orgId/profile',profile)
}
