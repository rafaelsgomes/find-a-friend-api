import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IOrganizationsRepository } from '../IOrganizationsRepository'

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({ data })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findFirst({
      where: {
        email,
      },
    })

    return organization
  }

  async findManyByCity(city: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        city: {contains: city},
      },
    })

    return organizations
  }

  async findById(id: string) {
    const organization = await prisma.organization.findFirst({
      where: {
        id,
      },
    })

    return organization
  }
}
