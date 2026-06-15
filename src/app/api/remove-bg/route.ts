import { removeBackground } from '@imgly/background-removal-node'

export const maxDuration = 30

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('image')

  if (!file || !(file instanceof Blob)) {
    return Response.json({ error: 'No image provided' }, { status: 400 })
  }

  const blob = await removeBackground(file)
  const buffer = Buffer.from(await blob.arrayBuffer())

  return new Response(buffer, {
    headers: { 'Content-Type': 'image/png' },
  })
}
