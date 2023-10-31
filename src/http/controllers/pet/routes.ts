import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { setPetAsAdopted } from './setPetAsAdopted'
import { fetchByCity } from './fetchByCity'
import { profile } from './profile'
import { fetchByCharacteristics } from './fetchByCharacteristicsPet'

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
  app.get('/pets/characteristics', fetchByCharacteristics)
  app.get('/pets/:petId/profile',profile)
}
