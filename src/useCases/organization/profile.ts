import { IOrganizationsRepository } from '@/repositories/IOrganizationsRepository'
import { Organization } from '@prisma/client'
import { OrganizationNotFoundError } from '../errors/organizationNotFoundError'

interface OrganizationProfileRequest {
  organizationId: string
}

interface OrganizationProfileResponse {
  organization: Organization
}

export class OrganizationProfileUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}
  async execute({
    organizationId,
  }: OrganizationProfileRequest): Promise<OrganizationProfileResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new OrganizationNotFoundError()
    }

    return {
      organization,
    }
  }
}
