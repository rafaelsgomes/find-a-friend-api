import { Prisma, Photos } from '@prisma/client'

export interface IPhotosRepository {
  create(data: Prisma.PhotosUncheckedCreateInput): Promise<Photos>
  findByPetId(city: string): Promise<Photos | null>
}
