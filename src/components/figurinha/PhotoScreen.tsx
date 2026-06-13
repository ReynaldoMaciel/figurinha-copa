'use client'

import { CameraIcon } from 'lucide-react'
import { StepIndicator } from './StepIndicator'

interface Props {
  photo: string | null
  examples: string[]
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUseExample: (src: string) => void
  onContinue: () => void
}

export function PhotoScreen({ photo, examples, onFile, onUseExample, onContinue }: Props) {
  const hasPhoto = !!photo

  return (
    <div
      className="animate-fu-fast"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '58px 22px 26px',
        overflowY: 'auto',
      }}
    >
      <StepIndicator screen="photo" />

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: 25 }}>Sua foto</div>
        <div style={{ fontSize: 13.5, opacity: 0.82, marginTop: 4 }}>
          Tire uma selfie ou escolha da galeria
        </div>
      </div>

      {/* Photo preview */}
      <div
        style={{
          margin: '18px auto 0',
          width: 210,
          aspectRatio: '3/4',
          borderRadius: 22,
          overflow: 'hidden',
          position: 'relative',
          background: 'rgba(0,0,0,.2)',
          border: '2px dashed rgba(255,255,255,.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {hasPhoto ? (
          <>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url("${photo}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#028d42',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,.35)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4 10-10" />
              </svg>
            </div>
          </>
        ) : (
          <div style={{ 
            textAlign: 'center',
            opacity: 0.75,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <CameraIcon size={50} />
            <div style={{ fontSize: 12, marginTop: 10, fontWeight: 600 }}>Prévia da foto</div>
          </div>
        )}
      </div>

      {/* Upload buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 20 }}>
        <label
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
            transition: 'transform .12s ease',
          }}
          onMouseDown={(e) => ((e.currentTarget as HTMLLabelElement).style.transform = 'scale(.97)')}
          onMouseUp={(e) => ((e.currentTarget as HTMLLabelElement).style.transform = '')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9a2 2 0 0 1 2-2h2l1.4-2h7.2L19 7h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <circle cx="12" cy="13" r="3.6" />
          </svg>
          Tirar foto
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={onFile}
            style={{ display: 'none' }}
          />
        </label>

        <label
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
          onMouseDown={(e) => ((e.currentTarget as HTMLLabelElement).style.transform = 'scale(.97)')}
          onMouseUp={(e) => ((e.currentTarget as HTMLLabelElement).style.transform = '')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="2.4" />
            <circle cx="8.5" cy="10" r="1.7" />
            <path d="M21 16l-5-5L6 19" />
          </svg>
          Escolher da galeria
          <input type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Continue */}
      <div style={{ marginTop: 'auto', paddingTop: 20 }}>
        <button
          onClick={onContinue}
          disabled={!hasPhoto}
          style={{
            width: '100%',
            padding: 16,
            border: 'none',
            borderRadius: 15,
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: 0.3,
            transition: 'transform .12s ease',
            cursor: hasPhoto ? 'pointer' : 'default',
            background: hasPhoto ? '#028d42' : 'rgba(255,255,255,.14)',
            color: hasPhoto ? '#fff' : 'rgba(255,255,255,.4)',
            boxShadow: hasPhoto ? '0 10px 22px rgba(2,141,66,.4)' : 'none',
          }}
          onMouseDown={(e) => {
            if (hasPhoto) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(.97)'
          }}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = '')}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
