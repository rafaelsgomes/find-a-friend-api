import { describe, expect, it, beforeEach } from 'vitest'
import { AuthenticateOrganizationUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationRepository } from '@/repositories/inMemory/inMemoryOrganizationRepository'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

let repository: InMemoryOrganizationRepository
let sut: AuthenticateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryOrganizationRepository()
    sut = new AuthenticateOrganizationUseCase(repository)
  })
  it('Should be able to create a new organization', async () => {
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

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.person_responsible).toEqual('John Doe')
  })

  it('Should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndooe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
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

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
