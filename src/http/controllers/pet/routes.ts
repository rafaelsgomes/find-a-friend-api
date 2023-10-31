import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { setPetAsAdopted } from './setPetAsAdopted'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', create)
  app.patch('/pets/:petId/adopted', setPetAsAdopted)
}
