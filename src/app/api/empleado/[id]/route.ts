import { prisma } from '@/libs/db'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const empleado = await prisma.empleado.findUnique({
    where: { id: Number(id) },
    include: { persona: true }
  })

  if (!empleado) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(empleado)
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const data = await request.json()

  try {
    const empleado = await prisma.empleado.update({
      where: { id: Number(id) },
      data
    })
    return NextResponse.json(empleado)
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
    await prisma.empleado.delete({ where: { id: Number(id) } })
    return NextResponse.json({ mensaje: 'Empleado eliminado' })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
