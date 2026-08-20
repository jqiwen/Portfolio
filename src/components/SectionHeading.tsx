interface SectionHeadingProps {
  eyebrow: string
  title?: string
  description?: string
  id?: string
}

export function SectionHeading({ eyebrow, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="sr-only" id={id}>{eyebrow}</h2>
    </div>
  )
}
