import { prisma } from '@/libs/db'
import { NextResponse } from 'next/server'
import type { RequestEvent } from 'next/server'

export async function GET(event: RequestEvent) {
  const { id } = event.params
  const persona = await prisma.persona.findUnique({
    where: { id: Number(id) },
    include: { usuario: true, empleado: true }
  })

  if (!persona) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json(persona)
}

export async function PUT(event: RequestEvent) {
  const { id } = event.params
  const data = await event.request.json()

  try {
    const persona = await prisma.persona.update({
      where: { id: Number(id) },
      data
    })
    return NextResponse.json(persona)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(event: RequestEvent) {
  const { id } = event.params

  try {
    await prisma.persona.delete({ where: { id: Number(id) } })
    return NextResponse.json({ mensaje: 'Eliminado con éxito' })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
