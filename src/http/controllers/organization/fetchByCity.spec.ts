import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to authenticate', async () => {
    await request(app.server).post('/organizations').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Some address',
      phone: '1199999999',
      cep: '15789-458',
      city: 'Some city',
      state: 'SP',
    })

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
