import { Organization, Prisma } from '@prisma/client'
import { IOrganizationsRepository } from '../IOrganizationsRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationRepository
  implements IOrganizationsRepository
{
  public items: Organization[] = []
  async create({
    address,
    email,
    password_hash,
    person_responsible,
    phone,
    zip_code,
    city,
    state,
  }: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      person_responsible,
      email,
      zip_code,
      address,
      phone,
      password_hash,
      city,
      state,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findManyByCity(city: string) {
    const organizations = this.items.filter((item) => item.city === city)

    if (organizations.length < 1) {
      return null
    }

    return organizations
  }

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }
}
