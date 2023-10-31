import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prismaOrganizationsRepository'
import { FetchByCharacteristicsPetUseCase } from '../fetchByCharacteristicsPet'

export function makeFetchByCharacteristicsPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new FetchByCharacteristicsPetUseCase(
    prismaOrganizationsRepository,
    prismaPetsRepository
  )

  return useCase
}
