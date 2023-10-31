import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/createAndAuthenticateOrganization'

describe('Fetch By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to authenticate', async () => {
    await createAndAuthenticateOrganization(app)

    const response = await request(app.server).get('/organizations/').query({
      city: 'Some'
    }).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.organizations).toHaveLength(1)
    expect(response.body.organizations).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        person_responsible: 'John Doe'
      })
    ])
  })
})
