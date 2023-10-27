import { describe, expect, it, beforeEach } from 'vitest'
import { FetchByCityPetUseCase } from './fetchByCity'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/inMemory/inMemoryPetRepository'
import { InMemoryOrganizationRepository } from '@/repositories/inMemory/inMemoryOrganizationRepository'
import { OrganizationNotFoundError } from './errors/organizationNotFoundError'

let repository: InMemoryPetRepository
let organizationsRepository: InMemoryOrganizationRepository
let sut: FetchByCityPetUseCase

describe('Fetch By City Pet Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository()
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new FetchByCityPetUseCase(organizationsRepository, repository)
  })
  it('Should be able to fetch pets by city name', async () => {
    const organization = await organizationsRepository.create({
      person_responsible: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      address: 'Some address',
      phone: '1199999999',
      zip_code: '15789-458',
      city: 'Some City',
      state: 'SP',
    })

    for (let i = 1; i <= 3; i++) {
      await repository.create({
        age: 'PUPPY',
        ambient: 'MEDIUM',
        description: 'Some description',
        energy_level: 'AVERAGE',
        level_of_independence: 'AVERAGE',
        name: `Some Name ${i}`,
        organization_id: organization.id,
        photos: ['SomePhoto.com'],
        requirements: ['Some requirement'],
        size: 'MEDIUM',
      })
    }

    const { pets } = await sut.execute({ city: 'City' })

    expect(pets).toHaveLength(3)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Some Name 1' }))
  })

  it('Should not be able to search for pets by city name when there are no registered organizations in the city', async () => {
    expect(async () => {
      await sut.execute({ city: 'Wrong city' })
    }).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
