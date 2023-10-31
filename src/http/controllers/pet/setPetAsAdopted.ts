import { PetNotFoundError } from '@/useCases/errors/petNotFoundError'
import { makeSetPetAsAdoptedUseCase } from '@/useCases/pet/factories/makeSetPetAsAdoptedUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function setPetAsAdopted(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } =createOrganizationParamsSchema.parse(request.params)

  try {
    const setPetAsAdoptedUseCase = makeSetPetAsAdoptedUseCase()
    await setPetAsAdoptedUseCase.execute({petId})
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(204).send()
}
