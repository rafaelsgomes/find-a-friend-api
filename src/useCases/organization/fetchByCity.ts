import { IOrganizationsRepository } from '@/repositories/IOrganizationsRepository'
import { Organization } from '@prisma/client'
import { OrganizationNotFoundError } from '../errors/organizationNotFoundError'

interface FetchByCityOrganizationRequest {
  city: string
}

interface FetchByCityOrganizationResponse {
  organizations: Organization[]
}

export class FetchByCityOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}
  async execute({
    city,
  }: FetchByCityOrganizationRequest): Promise<FetchByCityOrganizationResponse> {
    const organizations =
      await this.organizationsRepository.findManyByCity(city)

    if (organizations.length < 1) {
      throw new OrganizationNotFoundError()
    }

    return {
      organizations,
    }
  }
}
