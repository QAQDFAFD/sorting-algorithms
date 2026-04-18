export default function SortingVisualizer({ currentMeta, currentStep, maxValue, progress, safeIndex, totalSteps }) {
  return (
    <article className="panel visualizer">
      <div className="status">
        <div>
          <h2>{currentMeta.name}</h2>
          <p>{currentMeta.description}</p>
        </div>
        <span>{currentMeta.complexity}</span>
      </div>

      <div className="bars" role="img" aria-label="排序动画柱状图">
        {currentStep.array.map((value, index) => {
          const isActive = currentStep.active.includes(index)
          const isSorted = currentStep.sorted.includes(index)

          return (
            <div key={index} className="bar-wrap">
              <div
                className={`bar ${isActive ? 'active' : ''} ${isSorted ? 'sorted' : ''}`}
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
              <span>{value}</span>
            </div>
          )
        })}
      </div>

      <div className="progress">
        <div style={{ width: `${progress}%` }} />
      </div>
      <p className="step-message">
        步骤 {safeIndex + 1} / {totalSteps}：{currentStep.message}
      </p>
    </article>
  )
}
