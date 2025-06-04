import { prisma } from '@/libs/db'
import { NextResponse } from 'next/server'
import type { RequestEvent } from 'next/server'

export async function GET(event: RequestEvent) {
  const { id } = event.params
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) },
    include: { persona: true, tipoUsuario: true }
  })

  if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(usuario)
}

export async function PUT(event: RequestEvent) {
  const { id } = event.params
  const data = await event.request.json()

  try {
    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data
    })
    return NextResponse.json(usuario)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(event: RequestEvent) {
  const { id } = event.params

  try {
    await prisma.usuario.delete({ where: { id: Number(id) } })
    return NextResponse.json({ mensaje: 'Usuario eliminado' })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
