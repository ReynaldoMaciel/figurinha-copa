'use client'

import { useEffect, useRef, useState } from 'react'
import { exportCanvas, generateExamples } from '@/lib/canvasExport'
import { WelcomeScreen } from './figurinha/WelcomeScreen'
import { PhotoScreen } from './figurinha/PhotoScreen'
import { NameScreen } from './figurinha/NameScreen'
import { ResultScreen } from './figurinha/ResultScreen'

type Screen = 'welcome' | 'photo' | 'name' | 'result'

interface AppState {
  screen: Screen
  photo: string | null
  name: string
}

const STORAGE_KEY = 'figurinha_copa'

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { screen: 'welcome', photo: null, name: '' }
    const s = JSON.parse(raw)
    if (typeof s !== 'object' || s === null) return { screen: 'welcome', photo: null, name: '' }
    return {
      screen: (s.screen as Screen) || 'welcome',
      photo: s.photo || null,
      name: s.name || '',
    }
  } catch {
    return { screen: 'welcome', photo: null, name: '' }
  }
}

function saveState(s: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // ignore storage errors
  }
}

export function FigurinhaApp() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [photo, setPhoto] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [toast, setToast] = useState('')
  const [examples, setExamples] = useState<string[]>([])
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const s = loadState()
    setScreen(s.screen)
    setPhoto(s.photo)
    setName(s.name)
    setExamples(generateExamples())
  }, [])

  function persist(patch: Partial<AppState>) {
    const next: AppState = {
      screen,
      photo,
      name,
      ...patch,
    }
    if (patch.screen !== undefined) setScreen(patch.screen)
    if (patch.photo !== undefined) setPhoto(patch.photo)
    if (patch.name !== undefined) setName(patch.name)
    saveState(next)
  }

  function flash(msg: string) {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2300)
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = () => persist({ photo: r.result as string })
    r.readAsDataURL(f)
    e.target.value = ''
  }

  async function handleDownload() {
    const cv = await exportCanvas(photo, name)
    const a = document.createElement('a')
    a.download = 'figurinha-solare.png'
    a.href = cv.toDataURL('image/png')
    document.body.appendChild(a)
    a.click()
    a.remove()
    flash('Figurinha baixada!')
  }

  async function handleShare() {
    try {
      const cv = await exportCanvas(photo, name)
      const blob = await new Promise<Blob>((res) => cv.toBlob((b) => res(b!), 'image/png'))
      const file = new File([blob], 'figurinha-solare.png', { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Minha figurinha Solare', text: 'Sou um Atleta Solare!' })
        return
      }
    } catch {
      // fallthrough to flash
    }
    flash('Tudo pronto para compartilhar!')
  }

  function handleReset() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setScreen('photo')
    setPhoto(null)
    setName('')
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
        color: '#fff',
        background: 'linear-gradient(165deg,#0a7a82 0%,#08747d 46%,#0c5b62 100%)',
        WebkitFontSmoothing: 'antialiased',
        overflow: 'hidden',
      }}
    >
      {screen === 'welcome' && <WelcomeScreen onStart={() => persist({ screen: 'photo' })} />}

      {screen === 'photo' && (
        <PhotoScreen
          photo={photo}
          examples={examples}
          onFile={handleFile}
          onUseExample={(src) => persist({ photo: src })}
          onContinue={() => { if (photo) persist({ screen: 'name' }) }}
        />
      )}

      {screen === 'name' && (
        <NameScreen
          photo={photo}
          name={name}
          onNameChange={(e) => persist({ name: e.target.value.slice(0, 22) })}
          onBack={() => persist({ screen: 'photo' })}
          onContinue={() => { if (name.trim()) persist({ screen: 'result' }) }}
        />
      )}

      {screen === 'result' && (
        <ResultScreen
          photo={photo}
          name={name}
          onShare={handleShare}
          onDownload={handleDownload}
          onReset={handleReset}
        />
      )}

      {toast && (
        <div
          className="animate-toastin"
          style={{
            position: 'absolute',
            bottom: 46,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 80,
            background: 'rgba(12,68,74,.96)',
            color: '#fff',
            padding: '13px 22px',
            borderRadius: 14,
            fontWeight: 700,
            fontSize: 14,
            boxShadow: '0 12px 30px rgba(0,0,0,.4)',
            border: '1px solid rgba(255,255,255,.14)',
            whiteSpace: 'nowrap',
          }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}
