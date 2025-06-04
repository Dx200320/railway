import { prisma } from '@/libs/db'
import { NextRequest, NextResponse } from 'next/server'

function extractIdFromPath(pathname: string) {
  return pathname.split('/').pop()
}

export async function GET(request: NextRequest) {
  const id = extractIdFromPath(request.nextUrl.pathname)
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) },
    include: { persona: true, tipoUsuario: true }
  })

  if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(usuario)
}

export async function PUT(request: NextRequest) {
  const id = extractIdFromPath(request.nextUrl.pathname)
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

export async function DELETE(request: NextRequest) {
  const id = extractIdFromPath(request.nextUrl.pathname)

  try {
    await prisma.usuario.delete({ where: { id: Number(id) } })
    return NextResponse.json({ mensaje: 'Usuario eliminado' })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
