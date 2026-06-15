type Screen = 'welcome' | 'photo' | 'name' | 'result'

const STEPS = [
  { n: 1, label: 'Nome' },
  { n: 2, label: 'Selfie' },
  { n: 3, label: 'Figurinha' },
]

const SCREEN_INDEX: Record<Screen, number> = {
  welcome: 0,
  name: 1,
  photo: 2,
  result: 3,
}

interface Props {
  screen: Screen
}

export function StepIndicator({ screen }: Props) {
  const active = SCREEN_INDEX[screen]

  return (
    <div className="flex items-start justify-center gap-1.5">
      {STEPS.map(({ n, label }) => {
        const done = n <= active
        return (
          <div key={n} className="flex w-16 flex-col items-center gap-1.5">
            <div
              style={
                done
                  ? {
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#028d42',
                      color: '#fff',
                      boxShadow: '0 6px 14px rgba(2,141,66,.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 15,
                    }
                  : {
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,.14)',
                      color: 'rgba(255,255,255,.55)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 15,
                    }
              }
            >
              {n}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: done ? '#fff' : 'rgba(255,255,255,.5)',
              }}
            >
              {label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
