import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IPetFindParams, IPetUpdateParams, IPetsRepository } from '../IPetsRepository'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    })

    return pet
  }

  async findBy({organizationIds, age, energy_level, level_of_independence, size}: IPetFindParams){
    const pets =  await prisma.pet.findMany({
      where: {
        OR: [
          {
            age,
            energy_level,
            level_of_independence,
            size
          }
        ],
        AND: {
          organization_id: {
            in: organizationIds
          }
        }
      }
    })

    return pets
  }
  async findManyByOrganizationIds(ids: string[]) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: ids
        }
      }
    })

    return pets
  }
  async update(data: IPetUpdateParams) {
    const pet = await prisma.pet.update({
      where: {
        id: data.petId
      },
      data: {
        ...data
      }
    })

    return pet

  }
}
