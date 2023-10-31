import { OrganizationNotFoundError } from '@/useCases/errors/organizationNotFoundError'
import { makeOrganizationProfileUseCase } from '@/useCases/organization/factories/makeOrganizationProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
try {
  const getOrganizationProfileParamsSchema = z.object({
    orgId: z.string(),
  })

  const { orgId } = getOrganizationProfileParamsSchema.parse(request.params)

  const getOrganizationProfile = makeOrganizationProfileUseCase()

  const { organization } = await getOrganizationProfile.execute({
    organizationId: orgId,
  })

  return reply.status(200).send({
    organization: {
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
