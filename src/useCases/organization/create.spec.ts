import { describe, expect, it, beforeEach } from 'vitest'
import { CreateOrganizationUseCase } from './create'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationRepository } from '@/repositories/inMemory/inMemoryOrganizationRepository'
import { OrganizationAlreadyExistsError } from '@/useCases/errors/organizationAlreadyExistsError'

let repository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(repository)
  })
  it('Should be able to create a new organization', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Some address',
      phone: '1199999999',
      cep: '15789-458',
      city: 'Some city',
      state: 'SP',
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.person_responsible).toEqual('John Doe')
  })

  it('Should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Some address',
      phone: '1199999999',
      cep: '15789-458',
      city: 'Some city',
      state: 'SP',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Some address',
      phone: '1199999999',
      cep: '15789-458',
      city: 'Some city',
      state: 'SP',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        address: 'Some address',
        phone: '1199999999',
        cep: '15789-458',
        city: 'Some city',
        state: 'SP',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
