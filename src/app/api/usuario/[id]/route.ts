import { prisma } from '@/libs/db'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) },
    include: { persona: true, tipoUsuario: true }
  })

  if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(usuario)
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const data = await request.json()

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

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params

  try {
    await prisma.usuario.delete({ where: { id: Number(id) } })
    return NextResponse.json({ mensaje: 'Usuario eliminado' })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
