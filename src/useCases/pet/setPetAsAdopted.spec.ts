import { describe, expect, it, beforeEach } from 'vitest'
import { SetPetAsAdoptedUseCase } from './setPetAsAdopted'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/inMemory/inMemoryPetRepository'
import { InMemoryOrganizationRepository } from '@/repositories/inMemory/inMemoryOrganizationRepository'
import { PetNotFoundError } from '../errors/petNotFoundError'

let repository: InMemoryPetRepository
let organizationsRepository: InMemoryOrganizationRepository
let sut: SetPetAsAdoptedUseCase

describe('Set Pet As Adopted Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository()
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new SetPetAsAdoptedUseCase(repository)
  })
  it('Should be able to set a pet as adopted', async () => {
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

    const petCreated = await repository.create({
      age: 'PUPPY',
      ambient: 'MEDIUM',
      description: 'Some description',
      energy_level: 'AVERAGE',
      level_of_independence: 'AVERAGE',
      name: 'Some Name',
      organization_id: organization.id,
      photos: ['SomePhoto.com'],
      requirements: ['Some requirement'],
      size: 'MEDIUM',
    })

    const { pet } = await sut.execute({ petId: petCreated.id })

    expect(pet.adopted_at).toEqual(expect.any(Date))
  })

  it('Should not be able to set as adopted a pet which is not registered ', async () => {
    expect(() => {
      return sut.execute({
        petId: 'wrong Id',
      })
    }).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
