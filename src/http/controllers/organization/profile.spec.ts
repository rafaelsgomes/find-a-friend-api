import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/createAndAuthenticateOrganization'
describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to get user profile', async () => {
    const { organization } = await createAndAuthenticateOrganization(app)

    const profileResponse = await request(app.server)
      .get(`/organizations/${organization.id}/profile`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.organization).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
