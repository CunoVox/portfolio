import type { ReactNode } from 'react'

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="section" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>{title}</h2><div>{children}</div>
  </section>
}
