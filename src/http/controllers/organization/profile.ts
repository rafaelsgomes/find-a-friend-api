import { OrganizationNotFoundError } from '@/useCases/errors/organizationNotFoundError'
import { makeOrganizationProfileUseCase } from '@/useCases/organization/factories/makeOrganizationProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
try {
  const createOrganizationParamsSchema = z.object({
    orgId: z.string(),
  })

  const { orgId } =createOrganizationParamsSchema.parse(request.params)

  const getOrganizationProfile = makeOrganizationProfileUseCase()

  const { organization } = await getOrganizationProfile.execute({
    organizationId: orgId,
  })

  return reply.status(200).send({
    user: {
      ...organization,
      password_hash: undefined,
    },
  })
} catch (error) {
  if (error instanceof OrganizationNotFoundError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  throw error
}
}
