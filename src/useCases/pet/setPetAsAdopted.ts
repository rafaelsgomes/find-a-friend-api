import { IPetsRepository } from '@/repositories/IPetsRepository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from '../errors/petNotFoundError'

interface SetPetAsAdoptedRequest {
  petId: string
}

interface SetPetAsAdoptedResponse {
  pet: Pet
}

export class SetPetAsAdoptedUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    petId,
  }: SetPetAsAdoptedRequest): Promise<SetPetAsAdoptedResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    const petUpdate = await this.petsRepository.update({
      petId,
      IsAdopted: true,
    })

    return {
      pet: petUpdate,
    }
  }
}
