import { IPetsRepository } from '@/repositories/IPetsRepository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from '../errors/petNotFoundError'

interface PetProfileRequest {
  petId: string
}

interface PetProfileResponse {
  pet: Pet
}

export class PetProfileUseCase {
  constructor(private petsRepository: IPetsRepository) {}
  async execute({ petId }: PetProfileRequest): Promise<PetProfileResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return {
      pet,
    }
  }
}
