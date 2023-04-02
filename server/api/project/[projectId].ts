import { H3Event } from 'h3'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async(event: H3Event) => {
  const { method } = event.node.req
  const { projectId } = event.context.params as any

  if (method === 'GET') {
    const result = await prisma.project.findUnique({
      where: {
        id: Number(projectId),
      },
      include: {
        notes: true,
      },
    })
  
    return result
  }
})