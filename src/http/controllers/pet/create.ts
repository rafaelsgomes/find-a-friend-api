import { OrganizationNotFoundError } from '@/useCases/errors/organizationNotFoundError'
import { makeCreateUseCase } from '@/useCases/pet/factories/makeCreateUseCase'
import { Age, Level, Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    orgId: z.string(),
    age: z.nativeEnum(Age),
    ambient: z.nativeEnum(Size),
    description: z.string(),
    energy_level: z.nativeEnum(Level),
    level_of_independence: z.nativeEnum(Level),
    name: z.string(),
    size: z.nativeEnum(Size),
    photos_url: z.string().array().optional(),
    requirements: z.string().array().optional(),
  })

  const { 
    orgId, 
    age, 
    ambient, 
    description, 
    energy_level, 
    level_of_independence, 
    name, 
    size, 
    photos_url, 
    requirements
   } =
    createOrganizationBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateUseCase()
    await createUseCase.execute({
      orgId, 
      age, 
      ambient, 
      description, 
      energy_level, 
      level_of_independence, 
      name, 
      size, 
      photos_url, 
      requirements
    })
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
