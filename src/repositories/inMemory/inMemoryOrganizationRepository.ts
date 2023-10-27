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
  }: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      person_responsible,
      email,
      zip_code,
      address,
      phone,
      password_hash,
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
}
