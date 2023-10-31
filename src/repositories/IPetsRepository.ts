import { Age, Level, Pet, Prisma, Size } from '@prisma/client'

export interface IPetFindParams {
  age?: Age
  energy_level?: Level
  size?: Size
  level_of_independence?: Level
  organizationIds: string[]
}

export interface IPetUpdateParams {
  id: string
  age?: Age
  energy_level?: Level
  size?: Size
  level_of_independence?: Level
  ambient?: Size
  description?: string
  name?: string
  requirements?: string[]
  photos?: string[]
  IsAdopted?: boolean
}

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findBy(data: IPetFindParams): Promise<Pet[]>
  findManyByOrganizationIds(ids: string[]): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  update(data: IPetUpdateParams): Promise<Pet>
}
