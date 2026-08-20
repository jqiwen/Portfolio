import { engineeringSummary } from '../data/profile'

export function EngineeringSummary() {
  return (
    <aside className="engineering-summary" aria-label="Engineering focus summary">
      <div className="container engineering-summary__grid">
        {engineeringSummary.map((item) => (
          <div key={item.label} className="summary-item">
            <p>{item.label}</p>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
