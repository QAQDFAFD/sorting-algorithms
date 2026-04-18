import { algorithmMeta } from '../data/algorithmMeta'

export default function AlgorithmSelector({ algorithm, setAlgorithm }) {
  return (
    <section className="panel algo-panel">
      <p className="section-title">第一步：选择排序算法</p>
      <div className="algo-group">
        {Object.entries(algorithmMeta).map(([key, item]) => (
          <button
            key={key}
            type="button"
            className={`algo-btn ${algorithm === key ? 'active' : ''}`}
            onClick={() => setAlgorithm(key)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </section>
  )
}
