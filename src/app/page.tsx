import { FigurinhaApp } from '@/components/FigurinhaApp'

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0c5b62',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 430,
          height: '100dvh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <FigurinhaApp />
      </div>
    </main>
  )
}
