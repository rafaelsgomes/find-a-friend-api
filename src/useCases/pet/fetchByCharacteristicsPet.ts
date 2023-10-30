import { IOrganizationsRepository } from '@/repositories/IOrganizationsRepository'
import { IPetsRepository } from '@/repositories/IPetsRepository'
import { Age, Level, Pet, Size } from '@prisma/client'
import { OrganizationNotFoundError } from '@/useCases/errors/organizationNotFoundError'
import { PetNotFoundError } from '../errors/petNotFoundError'

interface FetchByCharacteristicsPetRequest {
  city: string
  age?: Age
  energy_level?: Level
  level_of_independence?: Level
  size?: Size
}

interface FetchByCharacteristicsPetResponse {
  pets: Pet[]
}

export class FetchByCharacteristicsPetUseCase {
  constructor(
    private organizationsRepository: IOrganizationsRepository,
    private petsRepository: IPetsRepository,
  ) {}

  async execute({
    city,
    age,
    energy_level,
    level_of_independence,
    size,
  }: FetchByCharacteristicsPetRequest): Promise<FetchByCharacteristicsPetResponse> {
    const organizations =
      await this.organizationsRepository.findManyByCity(city)

    if (organizations.length < 1) {
      throw new OrganizationNotFoundError()
    }

    const ids = organizations.map((item) => item.id)

    const pets = await this.petsRepository.findBy({
      age,
      energy_level,
      level_of_independence,
      size,
      organizationIds: ids,
    })

    if (pets.length < 1) {
      throw new PetNotFoundError()
    }

    return {
      pets,
    }
  }
}
