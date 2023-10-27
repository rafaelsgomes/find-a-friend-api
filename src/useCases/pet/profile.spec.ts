import { describe, expect, it, beforeEach } from 'vitest'
import { PetProfileUseCase } from './profile'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/inMemory/inMemoryPetRepository'
import { InMemoryOrganizationRepository } from '@/repositories/inMemory/inMemoryOrganizationRepository'
import { PetNotFoundError } from '@/useCases/errors/petNotFoundError'

let repository: InMemoryPetRepository
let organizationsRepository: InMemoryOrganizationRepository
let sut: PetProfileUseCase

describe('Profile Pet Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository()
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new PetProfileUseCase(repository)
  })
  it('Should be able to get pet profile', async () => {
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

    const { id } = await repository.create({
      age: 'PUPPY',
      ambient: 'MEDIUM',
      description: 'Some description',
      energy_level: 'AVERAGE',
      level_of_independence: 'AVERAGE',
      name: `Some Name`,
      organization_id: organization.id,
      photos: ['SomePhoto.com'],
      requirements: ['Some requirement'],
      size: 'MEDIUM',
    })

    const { pet } = await sut.execute({ petId: id })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.created_at).toEqual(expect.any(Date))
  })

  it('Should not be able to get a profile for a non-existing pet', async () => {
    expect(async () => {
      await sut.execute({ petId: 'Wrong id' })
    }).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
