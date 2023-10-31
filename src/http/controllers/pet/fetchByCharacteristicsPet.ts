import { OrganizationNotFoundError } from '@/useCases/errors/organizationNotFoundError'
import { PetNotFoundError } from '@/useCases/errors/petNotFoundError'
import { makeFetchByCharacteristicsPetUseCase } from '@/useCases/pet/factories/makeFetchByCharacteristicsPetUseCase'
import { Age, Level, Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchByCharacteristicsPetQuerySchema = z.object({
    city: z.string(),
    age: z.nativeEnum(Age).optional(),
    energy_level: z.nativeEnum(Level).optional(),
    level_of_independence: z.nativeEnum(Level).optional(),
    size: z.nativeEnum(Size).optional(),
  })

  const { 
    city, 
    age, 
    energy_level, 
    level_of_independence, 
    size
   } = fetchByCharacteristicsPetQuerySchema.parse(request.query)

  try {
    const fetchByCharacteristicsPetUseCase = makeFetchByCharacteristicsPetUseCase()

    const { pets } = await fetchByCharacteristicsPetUseCase.execute({
      city, 
      age, 
      energy_level, 
      level_of_independence, 
      size,
    })

    return reply
      .status(200)
      .send({
        pets
      })
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
