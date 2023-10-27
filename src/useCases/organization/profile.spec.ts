import { describe, expect, it, beforeEach } from 'vitest'
import { OrganizationProfileUseCase } from './profile'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationRepository } from '@/repositories/inMemory/inMemoryOrganizationRepository'
import { OrganizationNotFoundError } from '../errors/organizationNotFoundError'

let repository: InMemoryOrganizationRepository
let sut: OrganizationProfileUseCase

describe('Profile Organization Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryOrganizationRepository()
    sut = new OrganizationProfileUseCase(repository)
  })
  it('Should be able to get the profile organization', async () => {
    const { id } = await repository.create({
      person_responsible: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      address: 'Some address',
      phone: '1199999999',
      zip_code: '15789-458',
      city: 'Some city',
      state: 'SP',
    })
    const { organization } = await sut.execute({ organizationId: id })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.person_responsible).toEqual('John Doe')
  })

  it('Should not be able to get organization profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        organizationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
