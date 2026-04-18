export default function ControlPanel({ arrayInput, player }) {
  const {
    customArrayText,
    setCustomArrayText,
    randomLengthText,
    setRandomLengthText,
    inputError,
    sourceArray,
    handleApplyCustomArray,
    handleRandomByLength,
  } = arrayInput

  const {
    isPlaying,
    isFirstStep,
    isLastStep,
    speed,
    speedMin,
    speedMax,
    setSpeed,
    toggle,
    prev,
    next,
    reset,
  } = player

  return (
    <section className="panel controls">
      <p className="section-title">第二步：输入数组与播放控制</p>
      <div className="array-editor">
        <label htmlFor="custom-array-input">手动输入数组（逗号/空格分隔）</label>
        <textarea
          id="custom-array-input"
          rows="2"
          value={customArrayText}
          onChange={(e) => setCustomArrayText(e.target.value)}
          placeholder="例如：34, 8, 64, 51, 32, 21"
        />
        <div className="array-actions">
          <button type="button" onClick={handleApplyCustomArray}>
            应用输入数组
          </button>
          <label className="length-field">
            随机长度
            <input
              type="text"
              inputMode="numeric"
              value={randomLengthText}
              onChange={(e) =>
                setRandomLengthText(e.target.value.replace(/[^\d]/g, '').slice(0, 2))
              }
              placeholder="2-80"
            />
          </label>
          <button type="button" onClick={handleRandomByLength}>
            按长度随机
          </button>
        </div>
        {inputError ? (
          <p className="input-error">{inputError}</p>
        ) : (
          <p className="input-hint">当前数组长度：{sourceArray.length}</p>
        )}
      </div>

      <div className="tool-row">
        <button type="button" onClick={toggle}>
          {isPlaying ? '暂停' : '播放'}
        </button>
        <button type="button" disabled={isFirstStep} onClick={prev}>
          上一步
        </button>
        <button type="button" disabled={isLastStep} onClick={next}>
          下一步
        </button>
        <button type="button" onClick={reset}>
          重置
        </button>
        <button type="button" onClick={handleRandomByLength}>
          随机新数组
        </button>
      </div>

      <label className="speed">
        动画间隔：{speedMin + speedMax - speed}ms
        <input
          type="range"
          min={speedMin}
          max={speedMax}
          step="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </label>
    </section>
  )
}
