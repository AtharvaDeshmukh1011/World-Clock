export default function ControlsBar({
  theme,
  onThemeChange,
  hourCycle,
  onHourCycleChange,
  animationMode,
  onAnimationModeChange,
}) {
  return (
    <div className="controls-bar" role="group" aria-label="Display settings">
      <button
        type="button"
        className="controls-bar__button"
        onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>

      <div className="controls-bar__segmented" role="radiogroup" aria-label="Time format">
        {['12', '24'].map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={hourCycle === value}
            className={hourCycle === value ? 'is-active' : ''}
            onClick={() => onHourCycleChange(value)}
          >
            {value}h
          </button>
        ))}
      </div>

      <div className="controls-bar__segmented" role="radiogroup" aria-label="Second hand animation">
        {[
          { value: 'tick', label: 'Tick' },
          { value: 'smooth', label: 'Smooth' },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={animationMode === opt.value}
            className={animationMode === opt.value ? 'is-active' : ''}
            onClick={() => onAnimationModeChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
