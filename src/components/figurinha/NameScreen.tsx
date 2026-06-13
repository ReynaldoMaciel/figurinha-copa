'use client'

import { StepIndicator } from './StepIndicator'

interface Props {
  photo: string | null
  name: string
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBack: () => void
  onContinue: () => void
}

export function NameScreen({ photo, name, onNameChange, onBack, onContinue }: Props) {
  const hasName = name.trim().length > 0

  return (
    <div
      className="animate-fu-fast"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '58px 22px 26px',
      }}
    >
      <StepIndicator screen="name" />

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: 25 }}>Seu nome</div>
        <div style={{ fontSize: 13.5, opacity: 0.82, marginTop: 4 }}>
          Vai aparecer na sua figurinha
        </div>
      </div>

      {/* Circular photo preview */}
      <div
        style={{
          margin: '28px auto 0',
          width: 108,
          height: 108,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid rgba(255,255,255,.55)',
          boxShadow: '0 12px 26px rgba(0,0,0,.28)',
          background: '#0c5f66',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0c5f66',
            backgroundImage: photo ? `url("${photo}")` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Name input */}
      <div style={{ marginTop: 32 }}>
        <input
          value={name}
          onChange={onNameChange}
          placeholder="Como te chamam?"
          maxLength={22}
          style={{
            width: '100%',
            padding: 18,
            border: 'none',
            borderRadius: 15,
            background: 'rgba(255,255,255,.97)',
            color: '#0c4f55',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: 18,
            textAlign: 'center',
            outline: 'none',
            boxShadow: '0 8px 20px rgba(0,0,0,.18)',
            transition: 'box-shadow .15s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow =
              '0 0 0 3px rgba(2,141,66,.55),0 8px 20px rgba(0,0,0,.2)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,.18)'
          }}
        />
        <div style={{ textAlign: 'center', fontSize: 12, opacity: 0.65, marginTop: 11, fontWeight: 600 }}>
          {name.length}/22
        </div>
      </div>

      {/* Navigation buttons */}
      <div style={{ marginTop: 'auto', display: 'flex', gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            padding: '16px 22px',
            border: '1.5px solid rgba(255,255,255,.35)',
            borderRadius: 15,
            background: 'rgba(255,255,255,.12)',
            color: '#fff',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'transform .12s ease',
          }}
          onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(.97)')}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = '')}
        >
          Voltar
        </button>
        <button
          onClick={onContinue}
          disabled={!hasName}
          style={{
            flex: 1,
            padding: 16,
            border: 'none',
            borderRadius: 15,
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: 0.3,
            transition: 'transform .12s ease',
            cursor: hasName ? 'pointer' : 'default',
            background: hasName ? '#028d42' : 'rgba(255,255,255,.14)',
            color: hasName ? '#fff' : 'rgba(255,255,255,.4)',
            boxShadow: hasName ? '0 10px 22px rgba(2,141,66,.4)' : 'none',
          }}
          onMouseDown={(e) => {
            if (hasName) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(.97)'
          }}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = '')}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
