import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/createAndAuthenticateOrganization'
import { createPet } from '@/utils/tests/createPet'

describe('Fetch By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to fetch pets by city', async () => {
    const {organization} = await createAndAuthenticateOrganization(app)

    await createPet(organization.id)

    const response = await request(app.server).get('/pets/').query({
      city: 'Some'
    }).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Some Name',
      })
    ])
  })
})
