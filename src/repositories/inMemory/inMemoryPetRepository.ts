import { Pet, Prisma } from '@prisma/client'
import { IPetFindParams, IPetsRepository } from '../IPetsRepository'
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
    const pets = this.items.filter((item) => ids.includes(item.organization_id))

    return pets
  }

  async findBy({
    age,
    energy_level,
    level_of_independence,
    size,
  }: IPetFindParams) {
    const pets = this.items.filter((pet) => {
      return (
        pet.age === age ||
        pet.energy_level === energy_level ||
        pet.size === size ||
        pet.level_of_independence === level_of_independence
      )
    })

    return pets
  }
}
