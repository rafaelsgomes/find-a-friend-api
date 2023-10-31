import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository'
import { SetPetAsAdoptedUseCase } from '../setPetAsAdopted'

export function makeSetPetAsAdoptedUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new SetPetAsAdoptedUseCase(
    prismaPetsRepository
  )

  return useCase
}
