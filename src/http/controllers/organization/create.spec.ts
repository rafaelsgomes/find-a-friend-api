import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to register a new organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        address: 'Some address',
        phone: '1199999999',
        cep: '15789-458',
        city: 'Some city',
        state: 'SP',
    })

    expect(response.statusCode).toEqual(201)
  })
})
