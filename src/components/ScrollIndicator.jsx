export function ScrollIndicator({
  label = 'Scroll',
  targetId = 'about',
  variant = 'slide'
}) {
  const handleClick = () => {
    const target = document.getElementById(targetId)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`scroll-indicator scroll-indicator--${variant}`}
      onClick={handleClick}
      aria-label={`Scroll to ${targetId} section`}
    >
      <span className="scroll-indicator__label">{label}</span>
      <span className="scroll-indicator__track" aria-hidden="true">
        <svg
          className="scroll-indicator__arrow"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 5.5V16.5" />
          <path d="M7.5 12.5L12 17L16.5 12.5" />
        </svg>
      </span>
    </button>
  )
}