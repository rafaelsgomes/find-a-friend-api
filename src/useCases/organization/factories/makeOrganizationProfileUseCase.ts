import { PrismaOrganizationsRepository } from '@/repositories/prisma/prismaOrganizationsRepository'
import { OrganizationProfileUseCase } from '../profile'

export function makeOrganizationProfileUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new OrganizationProfileUseCase(prismaOrganizationsRepository)

  return useCase
}
