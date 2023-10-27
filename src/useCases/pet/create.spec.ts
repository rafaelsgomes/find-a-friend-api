import { describe, expect, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/inMemory/inMemoryPetRepository'
import { InMemoryOrganizationRepository } from '@/repositories/inMemory/inMemoryOrganizationRepository'
import { OrganizationNotFoundError } from './errors/organizationNotFoundError'

let repository: InMemoryPetRepository
let organizationsRepository: InMemoryOrganizationRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository()
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new CreatePetUseCase(organizationsRepository, repository)
  })
  it('Should be able to create a new organization', async () => {
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

    const { pet } = await sut.execute({
      age: 'PUPPY',
      ambient: 'MEDIUM',
      description: 'Some description',
      energy_level: 'AVERAGE',
      level_of_independence: 'AVERAGE',
      name: 'Some Name',
      org_email: organization.email,
      photos_url: ['SomePhoto.com'],
      requirements: ['Some requirement'],
      size: 'MEDIUM',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.created_at).toEqual(expect.any(Date))
  })

  it('Should not be possible to create a pet without a registered organization', async () => {
    expect(() => {
      return sut.execute({
        age: 'PUPPY',
        ambient: 'MEDIUM',
        description: 'Some description',
        energy_level: 'AVERAGE',
        level_of_independence: 'AVERAGE',
        name: 'Some Name',
        org_email: 'Some organization',
        photos_url: ['SomePhoto.com'],
        requirements: ['Some requirement'],
        size: 'MEDIUM',
      })
    }).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
