import { IOrganizationsRepository } from '@/repositories/IOrganizationsRepository'
import { IPetsRepository } from '@/repositories/IPetsRepository'
import { Pet } from '@prisma/client'
import { OrganizationNotFoundError } from './errors/organizationNotFoundError'

interface FetchByCityPetRequest {
  city: string
}

interface FetchByCityPetResponse {
  pets: Pet[]
}

export class FetchByCityPetUseCase {
  constructor(
    private organizationsRepository: IOrganizationsRepository,
    private petsRepository: IPetsRepository,
  ) {}

  async execute({
    city,
  }: FetchByCityPetRequest): Promise<FetchByCityPetResponse> {
    const organizations =
      await this.organizationsRepository.findManyByCity(city)

    if (organizations.length < 1) {
      throw new OrganizationNotFoundError()
    }

    const ids = organizations.map((item) => item.id)

    const pets = await this.petsRepository.findManyByOrganizationIds(ids)

    return {
      pets,
    }
  }
}
