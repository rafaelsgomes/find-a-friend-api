import { PetNotFoundError } from '@/useCases/errors/petNotFoundError'
import { makePetProfileUseCase } from '@/useCases/pet/factories/makePetProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
try {
  const getPetProfileParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getPetProfileParamsSchema.parse(request.params)

  const petProfileUseCase = makePetProfileUseCase()

  const { pet } = await petProfileUseCase.execute({
    petId: petId,
  })

  return reply.status(200).send({
    pet,
  })
} catch (error) {
  if (error instanceof PetNotFoundError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  throw error
}
}
