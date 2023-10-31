// fastify-jwt.d.ts
import '@fastify/jwt'
import { State } from '@prisma/client'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
    }
  }
}
