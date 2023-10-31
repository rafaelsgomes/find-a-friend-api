import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { setPetAsAdopted } from './setPetAsAdopted'
import { fetchByCity } from './fetchByCity'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets',
  {
    onRequest: [verifyJWT],
  },
  create)

  app.patch('/pets/:petId/adopted', 
  {
    onRequest: [verifyJWT],
  },
  setPetAsAdopted)

  app.get('/pets/', fetchByCity)
}
