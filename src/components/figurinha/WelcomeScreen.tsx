'use client'

import { useEffect } from 'react'

interface Props {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: Props) {
  useEffect(() => {
    const id = setTimeout(() => {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      canvas.toBlob((b) => {
        if (!b) return
        const fd = new FormData()
        fd.append('image', b, 'warm.png')
        fetch('/api/remove-bg', { method: 'POST', body: fd }).catch(() => {})
      }, 'image/png')
    }, 800)
    return () => clearTimeout(id)
  }, [])

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '70px 28px 36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating decorative elements */}

      {/* Large green circle — top right */}
      <div
        style={{
          position: 'absolute', top: 90, right: -44,
          width: 160, height: 160, borderRadius: '50%',
          background: 'rgba(2,141,66,.55)', filter: 'blur(1px)',
          ['--r' as string]: '0deg',
          animation: 'drift 3.4s ease-in-out infinite',
        }}
      />

      {/* Yellow spinning square — top left */}
      <div
        style={{
          position: 'absolute', top: 240, left: -28,
          width: 82, height: 82, borderRadius: 18, opacity: 0.9,
          background: '#ffcb00',
          ['--r' as string]: '18deg',
          animation: 'spin-drift 2.8s linear infinite',
          animationDelay: '0.4s',
        }}
      />

      {/* Medium teal circle — upper left */}
      <div
        style={{
          position: 'absolute', top: 160, left: 20,
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(255,255,255,.1)',
          ['--r' as string]: '0deg',
          animation: 'drift 3.8s ease-in-out infinite',
          animationDelay: '0.9s',
        }}
      />

      {/* Tiny yellow dot — top center-right */}
      <div
        style={{
          position: 'absolute', top: 200, right: 60,
          width: 22, height: 22, borderRadius: '50%',
          background: '#ffcb00', opacity: 0.8,
          ['--r' as string]: '0deg',
          animation: 'floaty 2s ease-in-out infinite',
          animationDelay: '0.6s',
        }}
      />

      {/* Small white spinning square — middle right */}
      <div
        style={{
          position: 'absolute', top: 380, right: 28,
          width: 36, height: 36, borderRadius: 8, opacity: 0.65,
          background: 'rgba(255,255,255,.9)',
          ['--r' as string]: '0deg',
          animation: 'spin-drift 3.2s linear infinite',
          animationDelay: '0.2s',
        }}
      />

      {/* Medium green square — bottom left */}
      <div
        style={{
          position: 'absolute', bottom: 220, left: 18,
          width: 58, height: 58, borderRadius: 14, opacity: 0.75,
          background: '#028d42',
          ['--r' as string]: '-12deg',
          animation: 'spin-drift 3.6s linear infinite',
          animationDelay: '1.1s',
        }}
      />

      {/* Small white circle — bottom right */}
      <div
        style={{
          position: 'absolute', bottom: 160, right: 30,
          width: 48, height: 48, borderRadius: '50%',
          background: 'rgba(255,255,255,.18)',
          ['--r' as string]: '0deg',
          animation: 'floaty 2.5s ease-in-out infinite',
          animationDelay: '0.7s',
        }}
      />

      {/* Tiny teal circle — bottom center */}
      <div
        style={{
          position: 'absolute', bottom: 300, right: 90,
          width: 18, height: 18, borderRadius: '50%',
          background: 'rgba(255,255,255,.35)',
          ['--r' as string]: '0deg',
          animation: 'drift 2.2s ease-in-out infinite',
          animationDelay: '1.5s',
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#fff',
          position: 'relative',
          zIndex: 2,
          animation: 'fu 0.55s ease both',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/LogoSolareWhite.svg"
          alt="Solare Arena"
          style={{ width: 160, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.2))' }}
        />
      </div>

      {/* Headline */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 16,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: 47,
            lineHeight: 0.94,
            letterSpacing: -1.5,
            textTransform: 'uppercase',
            animation: 'fu 0.6s ease both',
            animationDelay: '0.15s',
          }}
        >
          Figurinha
          <br />
          da Copa
        </div>
        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            animation: 'fu 0.5s ease both',
            animationDelay: '0.3s',
          }}
        >
          <div style={{ width: 46, height: 7, borderRadius: 4, background: '#028d42' }} />
          <div style={{ width: 22, height: 7, borderRadius: 4, background: '#ffcb00' }} />
          <div style={{ width: 12, height: 7, borderRadius: 4, background: '#fff' }} />
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.45,
            opacity: 0.92,
            maxWidth: 286,
            animation: 'fu 0.5s ease both',
            animationDelay: '0.4s',
          }}
        >
          Se torne um atleta. Monte sua figurinha em apenas 3 passos.
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <button
          onClick={onStart}
          style={{
            width: '100%',
            padding: 18,
            border: 'none',
            borderRadius: 16,
            background: '#028d42',
            color: '#fff',
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: 0.3,
            cursor: 'pointer',
            boxShadow: '0 12px 26px rgba(2,141,66,.45)',
            transition: 'transform .12s ease, filter .15s ease',
            animation: 'pop 0.65s cubic-bezier(.2,.9,.3,1.25) both',
            animationDelay: '0.55s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.07)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = '')}
          onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(.97)')}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = '')}
        >
          Começar
        </button>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 7,
            marginTop: 18,
            fontSize: 12,
            fontWeight: 600,
            opacity: 0.78,
            animation: 'fu 0.45s ease both',
            animationDelay: '0.75s',
          }}
        >
          <span>1 Nome</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>2 Selfie</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>3 Figurinha</span>
        </div>
      </div>
    </div>
  )
}
