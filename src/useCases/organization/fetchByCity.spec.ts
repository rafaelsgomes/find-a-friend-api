import { describe, expect, it, beforeEach } from 'vitest'
import { FetchByCityOrganizationUseCase } from './fetchByCity'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationRepository } from '@/repositories/inMemory/inMemoryOrganizationRepository'
import { OrganizationNotFoundError } from '../errors/organizationNotFoundError'

let repository: InMemoryOrganizationRepository
let sut: FetchByCityOrganizationUseCase

describe('Fetch By City Organization Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryOrganizationRepository()
    sut = new FetchByCityOrganizationUseCase(repository)
  })
  it('Should be able to fetch organizations by city', async () => {
    await repository.create({
      person_responsible: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      address: 'Some address',
      phone: '1199999999',
      zip_code: '15789-458',
      city: 'Some city',
      state: 'SP',
    })
    const { organizations } = await sut.execute({ city: 'Some City' })

    expect(organizations[0].id).toEqual(expect.any(String))
    expect(organizations).toEqual([
      expect.objectContaining({ person_responsible: 'John Doe' }),
    ])
  })

  it('Should not be able to fetch organizations by city name when there are no registered organizations in the city', async () => {
    await expect(() =>
      sut.execute({
        city: 'wrong city',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
