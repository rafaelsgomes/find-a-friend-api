import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'
import { organizationsRoutes } from './http/controllers/organization/routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { petsRoutes } from './http/controllers/pet/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(organizationsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Internal Sever Error',
  })
})
