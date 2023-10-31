import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prismaOrganizationsRepository'
import { FetchByCityPetUseCase } from '../fetchByCity'

export function makeFetchByCityPetUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new FetchByCityPetUseCase(
    prismaOrganizationsRepository,
    prismaPetsRepository
  )

  return useCase
}
