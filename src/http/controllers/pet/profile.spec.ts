import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/createAndAuthenticateOrganization'
import { createPet } from '@/utils/tests/createPet'
describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to get pet profile', async () => {
    const { organization } = await createAndAuthenticateOrganization(app)

    const { pet } = await createPet(organization.id)

    const profileResponse = await request(app.server)
      .get(`/pets/${pet.id}/profile`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Some Name',
      }),
    )
  })
})
