import { IOrganizationsRepository } from '@/repositories/IOrganizationsRepository'
import { IPetsRepository } from '@/repositories/IPetsRepository'
import { Pet, Age, Size, Level } from '@prisma/client'
import { OrganizationNotFoundError } from '@/useCases/errors/organizationNotFoundError'

interface CreatePetRequest {
  org_email: string
  age: Age
  ambient: Size
  description: string
  energy_level: Level
  level_of_independence: Level
  name: string
  size: Size
  photos_url: string[]
  requirements: string[]
}

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private organizationsRepository: IOrganizationsRepository,
    private petsRepository: IPetsRepository,
  ) {}

  async execute({
    org_email,
    age,
    ambient,
    description,
    energy_level,
    level_of_independence,
    name,
    size,
    photos_url,
    requirements,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const organization =
      await this.organizationsRepository.findByEmail(org_email)

    if (!organization) {
      throw new OrganizationNotFoundError()
    }

    const pet = await this.petsRepository.create({
      age,
      ambient,
      description,
      energy_level,
      level_of_independence,
      name,
      organization_id: organization.id,
      size,
      requirements,
      photos: photos_url,
    })
    return {
      pet,
    }
  }
}
