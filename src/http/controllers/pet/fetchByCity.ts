import { OrganizationNotFoundError } from '@/useCases/errors/organizationNotFoundError'
import { PetNotFoundError } from '@/useCases/errors/petNotFoundError'
import { makeFetchByCityPetUseCase } from '@/useCases/pet/factories/makeFetchByCityPetUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchByCityPetQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = fetchByCityPetQuerySchema.parse(request.query)

  try {
    const fetchByCityUseCase = makeFetchByCityPetUseCase()

    const { pets } = await fetchByCityUseCase.execute({
      city
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
