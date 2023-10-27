import { Age, Level, Pet, Prisma, Size } from '@prisma/client'

export interface IPetFindParams {
  age?: Age
  energy_level?: Level
  size?: Size
  level_of_independence?: Level
  organizationIds: string[]
}

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findBy(data: IPetFindParams): Promise<Pet[]>
  findManyByOrganizationIds(ids: string[]): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
