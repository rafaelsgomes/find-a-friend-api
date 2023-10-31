import { makeOrganizationProfileUseCase } from '@/useCases/organization/factories/makeOrganizationProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrganizationProfile = makeOrganizationProfileUseCase()

  const { organization } = await getOrganizationProfile.execute({
    organizationId: request.user.sub,
  })
  return reply.status(200).send({
    user: {
      ...organization,
      password_hash: undefined,
    },
  })
}
