import { PrismaOrganizationsRepository } from '@/repositories/prisma/prismaOrganizationsRepository'
import { AuthenticateOrganizationUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new AuthenticateOrganizationUseCase(
    prismaOrganizationsRepository,
  )

  return useCase
}
