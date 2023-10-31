import { OrganizationNotFoundError } from '@/useCases/errors/organizationNotFoundError'
import { makeFetchByCityOrganizationUseCase } from '@/useCases/organization/factories/makeFetchByCityOrganizationUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchByCityOrganizationQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = fetchByCityOrganizationQuerySchema.parse(request.query)

  try {
    const fetchByCityUseCase = makeFetchByCityOrganizationUseCase()

    const { organizations } = await fetchByCityUseCase.execute({
      city
    })

    const response = organizations.map(org => {
      
      return {
        ...org,
        password_hash: undefined
      }
    })

    return reply
      .status(200)
      .send({
        organizations: response
      })
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
