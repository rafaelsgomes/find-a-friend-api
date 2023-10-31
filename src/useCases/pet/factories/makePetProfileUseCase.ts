import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository'
import { PetProfileUseCase } from '../profile'

export function makePetProfileUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new PetProfileUseCase(
    prismaPetsRepository
  )

  return useCase
}
