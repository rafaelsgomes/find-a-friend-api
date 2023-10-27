import { IOrganizationsRepository } from '@/repositories/IOrganizationsRepository'
import { Organization, State } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organizationAlreadyExistsError'

interface CreateOrganizationRequest {
  name: string
  email: string
  cep: string
  address: string
  city: string
  state: State
  phone: string
  password: string
}

interface CreateOrganizationResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}
  async execute({
    address,
    email,
    password,
    name,
    phone,
    cep,
    city,
    state,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const organizationAlreadyExists =
      await this.organizationsRepository.findByEmail(email)

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      address,
      email,
      password_hash,
      person_responsible: name,
      phone,
      zip_code: cep,
      city,
      state,
    })

    return {
      organization,
    }
  }
}
