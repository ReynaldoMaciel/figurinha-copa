'use client'

interface Props {
  photo: string | null
  name: string
  animate?: boolean
}

export function StickerCard({ photo, name, animate = false }: Props) {
  const nameDisplay = name.trim() || 'Seu nome'

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 294,
        margin: '0 auto',
        ...(animate ? { animation: 'pop .7s cubic-bezier(.2,.9,.3,1.25) both' } : {}),
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1559/2068',
          borderRadius: 7,
          boxShadow: '0 22px 46px rgba(0,0,0,.42)',
          overflow: 'hidden',
        }}
      >
        {/* Background: actual moldura image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/moldura_figurinha.png"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            display: 'block',
          }}
        />

        {/* User photo over the moldura, in portrait area */}
        {photo && (
          <div
            style={{
              position: 'absolute',
              left: '11.5%',
              top: '16.5%',
              // right: '3.5%',
              bottom: '24%',
              borderRadius: 10,
              backgroundImage: `url("${photo}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1,
              width: '200px'
            }}
          />
        )}

        {/* Shine sweep over the photo (runs once after pop) */}
        {photo && (
          <div
            style={{
              position: 'absolute',
              left: '3.5%',
              top: '3.5%',
              right: '3.5%',
              bottom: '24%',
              borderRadius: 10,
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-30%',
                left: 0,
                width: '48%',
                height: '160%',
                background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)',
                transform: 'rotate(8deg)',
                animation: 'shine 2.6s ease-in-out .45s 1 both',
              }}
            />
          </div>
        )}

        {/* User name overlaid on the moldura's name band */}
        <div
          style={{
            position: 'absolute',
            left: '5%',
            right: '19%',
            bottom: '9%',
            height: '9.2%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 8px',
            zIndex: 3,
          }}
        >
          <span
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: 0.3,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {nameDisplay}
          </span>
        </div>
      </div>
    </div>
  )
}
