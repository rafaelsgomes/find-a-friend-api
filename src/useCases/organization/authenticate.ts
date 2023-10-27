import { IOrganizationsRepository } from '@/repositories/IOrganizationsRepository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

interface AuthenticateOrganizationRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateOrganizationRequest): Promise<AuthenticateOrganizationResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const passwordDoesMatch = await compare(
      password,
      organization.password_hash,
    )

    if (!passwordDoesMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
