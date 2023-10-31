import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createPet(
  organizationId: string
) {
  const pet = await prisma.pet.create({
    data: {
      age: 'PUPPY',
      ambient: 'MEDIUM',
      description: 'Some description',
      energy_level: 'AVERAGE',
      level_of_independence: 'AVERAGE',
      name: 'Some Name',
      organization_id: organizationId,
      photos: ['SomePhoto.com'],
      requirements: ['Some requirement'],
      size: 'MEDIUM',
    },
  })

  return {
    pet,
  }
}
