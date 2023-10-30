import { PrismaOrganizationsRepository } from '@/repositories/prisma/prismaOrganizationsRepository'
import { CreateOrganizationUseCase } from '../create'

export function makeCreateUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new CreateOrganizationUseCase(prismaOrganizationsRepository)

  return useCase
}
