import { OrganizationAlreadyExistsError } from '@/useCases/errors/organizationAlreadyExistsError'
import { makeCreateUseCase } from '@/useCases/organization/factories/makeCreateUseCase'
import { State } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.nativeEnum(State),
    phone: z.string(),
  })

  const { name, address, city, cep, email, password, phone, state } =
    createOrganizationBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateUseCase()
    await createUseCase.execute({
      name,
      address,
      city,
      cep,
      email,
      password,
      phone,
      state,
    })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
