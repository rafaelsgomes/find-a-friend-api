import { PrismaOrganizationsRepository } from '@/repositories/prisma/prismaOrganizationsRepository'
import { FetchByCityOrganizationUseCase } from '../fetchByCity'

export function makeFetchByCityOrganizationUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new FetchByCityOrganizationUseCase(
    prismaOrganizationsRepository,
  )

  return useCase
}
