import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/createAndAuthenticateOrganization'
import { createPet } from '@/utils/tests/createPet'

describe('Set Pet as Adopted (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to set a pet as adopted', async () => {
    const {organization, token} = await createAndAuthenticateOrganization(app)
    const {pet} = await createPet(organization.id)

    const response = await request(app.server)
    .patch(`/pets/${pet.id}/adopted`)
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(response.statusCode).toEqual(204)
  })
})
