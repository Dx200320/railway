import { prisma } from '@/libs/db'
import { NextResponse } from 'next/server'
import type { RequestEvent } from 'next/server'

export async function GET(event: RequestEvent) {
  const { id } = event.params
  const empleado = await prisma.empleado.findUnique({
    where: { id: Number(id) },
    include: { persona: true },
  })

  if (!empleado) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(empleado)
}

export async function PUT(event: RequestEvent) {
  const { id } = event.params
  const data = await event.request.json()

  try {
    const empleado = await prisma.empleado.update({
      where: { id: Number(id) },
      data,
    })
    return NextResponse.json(empleado)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(event: RequestEvent) {
  const { id } = event.params

  try {
    await prisma.empleado.delete({ where: { id: Number(id) } })
    return NextResponse.json({ mensaje: 'Empleado eliminado' })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
