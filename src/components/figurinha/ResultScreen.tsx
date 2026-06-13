'use client'

import { StepIndicator } from './StepIndicator'
import { StickerCard } from './StickerCard'

interface Props {
  photo: string | null
  name: string
  onShare: () => void
  onDownload: () => void
  onReset: () => void
}

export function ResultScreen({ photo, name, onShare, onDownload, onReset }: Props) {
  return (
    <div
      className="animate-fu-fast"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '56px 22px 24px',
        overflowY: 'auto',
      }}
    >
      {/* <StepIndicator screen="result" /> */}

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: 22 }}>Sua figurinha está pronta!</div>
      </div>

      <div style={{ marginTop: 16 }}>
        <StickerCard photo={photo} name={name} animate />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 20 }}>
        <button
          onClick={onShare}
          style={{
            width: '100%',
            padding: 16,
            border: 'none',
            borderRadius: 15,
            background: '#028d42',
            color: '#fff',
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 10px 22px rgba(2,141,66,.4)',
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform .12s ease, filter .15s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.07)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = '')}
          onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(.97)')}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = '')}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          Compartilhar
        </button>

        <button
          onClick={onDownload}
          style={{
            width: '100%',
            padding: 15,
            border: '1.5px solid rgba(255,255,255,.4)',
            borderRadius: 15,
            background: 'rgba(255,255,255,.12)',
            color: '#fff',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform .12s ease',
          }}
          onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(.97)')}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = '')}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14" />
          </svg>
          Baixar figurinha
        </button>

        <button
          onClick={onReset}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,.85)',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: 6,
          }}
        >
          Refazer do começo
        </button>
      </div>
    </div>
  )
}
