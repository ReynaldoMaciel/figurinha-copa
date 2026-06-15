function loadImg(src: string): Promise<HTMLImageElement | null> {
  return new Promise((res) => {
    const i = new Image()
    i.crossOrigin = 'anonymous'
    i.onload = () => res(i)
    i.onerror = () => res(null)
    i.src = src
  })
}

// Mirror of StickerCard.tsx layout (card base width = 294px at max-width)
// Canvas uses bw=330, bh≈438 at 1× (rendered at 3× for quality)
const S = 3
const BW = 330
const BH = Math.round((BW * 2068) / 1559) // ≈ 438

// Photo area — matches StickerCard: left 9%, top 15%, right 3%, bottom 22%
const PHOTO_X = BW * 0.09
const PHOTO_Y = BH * 0.15
const PHOTO_W = BW * (1 - 0.09 - 0.03)
const PHOTO_H = BH * (1 - 0.22) - PHOTO_Y
const PHOTO_R = 10

// Name band — matches StickerCard: left 5%, right 19%, bottom 9%, height 9.2%
const NAME_X = BW * 0.05
const NAME_W = BW * 0.76 // 1 - 0.05 - 0.19
const NAME_H = BH * 0.092
const NAME_Y = BH * (1 - 0.09 - 0.092)

function drawContainFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.clip()

  const ir = img.width / img.height
  const tr = w / h
  let dw, dh, dx, dy
  if (ir > tr) {
    // wider than area — constrain by width, bottom-align
    dw = w; dh = w / ir
    dx = x; dy = y + h - dh
  } else {
    // taller than area — constrain by height, center horizontally
    dh = h; dw = h * ir
    dx = x + (w - dw) / 2; dy = y
  }
  ctx.drawImage(img, dx, dy, dw, dh)
  ctx.restore()
}

function buildCanvas(
  moldura: HTMLImageElement | null,
  userPhoto: HTMLImageElement | null,
  name: string
): HTMLCanvasElement {
  const cv = document.createElement('canvas')
  cv.width = BW * S
  cv.height = BH * S
  const ctx = cv.getContext('2d')!
  ctx.scale(S, S)

  // 1. Moldura as full background
  if (moldura) {
    ctx.drawImage(moldura, 0, 0, BW, BH)
  } else {
    ctx.fillStyle = '#7ec1cd'
    ctx.fillRect(0, 0, BW, BH)
  }

  // 2. User photo on top, clipped to portrait area
  if (userPhoto) {
    drawContainFit(ctx, userPhoto, PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H, PHOTO_R)
  }

  // 3. Name text over the moldura's name band
  const nm = name.trim() || 'Seu nome'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'
  let fs = 18
  ctx.font = `700 ${fs}px Montserrat, sans-serif`
  while (ctx.measureText(nm).width > NAME_W - 16 && fs > 11) {
    fs -= 1
    ctx.font = `700 ${fs}px Montserrat, sans-serif`
  }
  ctx.fillText(nm, NAME_X + NAME_W / 2, NAME_Y + NAME_H / 2 + 1)

  return cv
}

export async function exportCanvas(
  photo: string | null,
  name: string
): Promise<HTMLCanvasElement> {
  try {
    await document.fonts.ready
    await document.fonts.load('700 18px Montserrat')
  } catch {
    // continue without pre-loaded font
  }

  const [moldura, userPhoto] = await Promise.all([
    loadImg('/images/moldura_figurinha.png'),
    photo ? loadImg(photo) : Promise.resolve(null),
  ])

  return buildCanvas(moldura, userPhoto, name)
}

export function generateExamples(): string[] {
  const combos: [string, string, string][] = [
    ['#0e8a4e', '#0b6b3d', '#f3c9a6'],
    ['#1b747b', '#0d4f55', '#e7b690'],
    ['#d98b00', '#b06a00', '#efc79e'],
  ]
  return combos.map(([j1, j2, skin]) => {
    const cv = document.createElement('canvas')
    cv.width = 300
    cv.height = 380
    const x = cv.getContext('2d')!
    const g = x.createLinearGradient(0, 0, 0, 380)
    g.addColorStop(0, j1)
    g.addColorStop(1, j2)
    x.fillStyle = g
    x.fillRect(0, 0, 300, 380)
    x.fillStyle = j2
    x.beginPath()
    x.ellipse(150, 400, 132, 150, 0, 0, Math.PI * 2)
    x.fill()
    x.fillStyle = skin
    x.fillRect(132, 150, 36, 64)
    x.beginPath()
    x.arc(150, 124, 54, 0, Math.PI * 2)
    x.fill()
    x.fillStyle = 'rgba(0,0,0,.22)'
    x.beginPath()
    x.arc(150, 112, 54, Math.PI, Math.PI * 2)
    x.fill()
    return cv.toDataURL('image/png')
  })
}
