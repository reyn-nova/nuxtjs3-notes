import { H3Event } from 'h3'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async(event: H3Event) => {
  const { req } = event.node
  
  const { method } = req

  if (method === 'POST') {
    const { projectId, value } = await readBody(event)

    await prisma.note.create({
      data: {
        value,
        project: {
          connect: {
            id: Number(projectId),
          },
        },
      },
    })

    return { message: 'New note created' }
  } else if (method === 'PUT') {
    const { id, value } = await readBody(event)

    await prisma.note.update({
      where: {
        id,
      },
      data: {
        value,
      },
    })

    return { message: 'Note updated' }
  } else if (method === 'DELETE') {
    const { id } = await readBody(event)

    await prisma.note.delete({
      where: {
        id,
      },
    })

    return { message: 'Note deleted' }
  }
})