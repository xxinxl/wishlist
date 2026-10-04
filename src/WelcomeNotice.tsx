import { useEffect, useRef, useState } from "react"

const STORAGE_KEY = "wishlist-welcome-seen"

function WelcomeNotice() {
  const [state, setState] = useState<"hidden" | "open" | "closing">("hidden")
  const cardRef = useRef<HTMLDivElement>(null)
  const actionRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1"
    } catch {
      seen = false
    }
    if (seen) return
    const timer = window.setTimeout(() => setState("open"), 500)
    return () => window.clearTimeout(timer)
  }, [])

  const close = () => {
    if (state !== "open") return
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      /* sessionStorage недоступен — просто закрываем */
    }
    setState("closing")
  }

  useEffect(() => {
    if (state !== "open") return
    previousFocus.current = document.activeElement as HTMLElement | null
    document.body.classList.add("welcome-open")
    actionRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== "Tab" || !cardRef.current) return
      const focusable = cardRef.current.querySelectorAll<HTMLElement>("button")
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const finish = () => {
    if (state !== "closing") return
    document.body.classList.remove("welcome-open")
    setState("hidden")
    const target = previousFocus.current
    if (target && target !== document.body && document.contains(target)) target.focus()
    else document.querySelector<HTMLElement>("main, .hero")?.focus?.()
  }

  useEffect(() => () => document.body.classList.remove("welcome-open"), [])

  if (state === "hidden") return null

  return (
    <div
      className={`welcome-overlay ${state === "closing" ? "is-closing" : ""}`}
      onClick={(event) => event.target === event.currentTarget && close()}
      onAnimationEnd={(event) => event.target === event.currentTarget && finish()}
    >
      <div
        ref={cardRef}
        className="welcome-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        aria-describedby="welcome-text"
      >
        <span className="welcome-card__shine" aria-hidden="true" />
        <span className="welcome-card__star" aria-hidden="true">✦</span>
        <span className="welcome-card__heart" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path
              d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.9 1.2 5.3 3 1.4-1.8 3.2-3 5.3-3 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <button className="welcome-card__close" type="button" onClick={close} aria-label="Закрыть">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <span className="welcome-card__eyebrow">НЕБОЛЬШОЙ ДИСКЛЕЙМЕР</span>
        <h2 id="welcome-title">Мне немного неловко</h2>
        <p id="welcome-text">
          И одновременно очень приятно, что вы сюда зашли. Правда. Спасибо, что решили посмотреть мой вишлист 💗
        </p>
        <p className="welcome-card__ps">P.S. губозакаточную машинку, пожалуйста, не предлагать</p>
        <button ref={actionRef} className="welcome-card__action" type="button" onClick={close}>
          Ладно, смотрю
        </button>
      </div>
    </div>
  )
}

export default WelcomeNotice
