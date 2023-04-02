import { H3Event } from 'h3'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async(event: H3Event) => {
  const { req } = event.node
  
  const { method } = req

  if (method === 'GET') {
    const result = await prisma.project.findMany()
  
    return result
  } else if (method === 'POST') {
    const { name } = await readBody(event)

    await prisma.project.create({
      data: {
        name,
      },
    })
    
    return { message: 'New project created' }
  } else if (method === 'PUT') {
    const { id, name } = await readBody(event)

    await prisma.project.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return { message: 'Project updated' }
  } else if (method === 'DELETE') {
    const { id } = await readBody(event)

    await prisma.project.delete({
      where: {
        id,
      },
    })

    return { message: 'Project deleted' }
  }
})