import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

describe('Authenticate (e2e)', () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
