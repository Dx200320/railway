import { prisma } from '@/libs/db'
import { NextRequest, NextResponse } from 'next/server'

function extractIdFromPath(pathname: string) {
  return pathname.split('/').pop()
}

export async function GET(request: NextRequest) {
  const id = extractIdFromPath(request.nextUrl.pathname)
  const persona = await prisma.persona.findUnique({
    where: { id: Number(id) },
    include: { usuario: true, empleado: true }
  })

  if (!persona) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json(persona)
}

export async function PUT(request: NextRequest) {
  const id = extractIdFromPath(request.nextUrl.pathname)
  const data = await request.json()

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

export async function DELETE(request: NextRequest) {
  const id = extractIdFromPath(request.nextUrl.pathname)

  try {
    await prisma.persona.delete({ where: { id: Number(id) } })
    return NextResponse.json({ mensaje: 'Eliminado con éxito' })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
