import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/createAndAuthenticateOrganization'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to register a new organization', async () => {
    const {organization, token} = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      age: 'PUPPY',
      ambient: 'MEDIUM',
      description: 'Some description',
      energy_level: 'AVERAGE',
      level_of_independence: 'AVERAGE',
      name: 'Some Name',
      orgId: organization.id,
      photos_url: ['SomePhoto.com'],
      requirements: ['Some requirement'],
      size: 'MEDIUM',
    })

    expect(response.statusCode).toEqual(201)
  })
})
