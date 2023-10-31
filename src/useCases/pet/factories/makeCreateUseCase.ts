import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prismaOrganizationsRepository'
import { CreatePetUseCase } from '../create'

export function makeCreateUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new CreatePetUseCase(prismaOrganizationsRepository, prismaPetsRepository)

  return useCase
}
