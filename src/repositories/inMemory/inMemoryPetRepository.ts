import { Pet, Prisma } from '@prisma/client'
import {
  IPetFindParams,
  IPetUpdateParams,
  IPetsRepository,
} from '../IPetsRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements IPetsRepository {
  public items: Pet[] = []
  async create({
    organization_id,
    age,
    ambient,
    description,
    energy_level,
    level_of_independence,
    name,
    size,
    requirements,
    photos,
    adopted_at,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      organization_id,
      age,
      ambient,
      description,
      energy_level,
      level_of_independence,
      name,
      size,
      requirements: requirements as string[],
      photos: photos as string[],
      created_at: new Date(),
      updated_at: new Date(),
      adopted_at: adopted_at ? new Date() : null,
    }

    this.items.push(pet)

    return pet
  }

  async findManyByOrganizationIds(ids: string[]) {
    const pets = this.items.filter(
      (item) => ids.includes(item.organization_id) && !item.adopted_at,
    )

    return pets
  }

  async findBy({
    age,
    energy_level,
    level_of_independence,
    size,
    organizationIds,
  }: IPetFindParams) {
    const petsFiltered = this.items.filter((item) => {
      return organizationIds.includes(item.organization_id)
    })
    const pets = petsFiltered.filter((item) => {
      return (
        (item.age === age ||
          item.energy_level === energy_level ||
          item.size === size ||
          item.level_of_independence === level_of_independence) &&
        !item.adopted_at
      )
    })

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async update(data: IPetUpdateParams) {
    const petIndex = this.items.findIndex((item) => item.id === data.id)

    const pet = {
      ...this.items[petIndex],
      ...data,
      updated_at: new Date(),
      adopted_at: data.IsAdopted ? new Date() : null,
    }

    this.items[petIndex] = pet

    return pet
  }
}
