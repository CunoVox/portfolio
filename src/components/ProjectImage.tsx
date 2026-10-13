import { useState } from 'react'

export function ProjectImage({ src, alt, title, caption }: { src: string; alt: string; title: string; caption: string }) {
  const [failed, setFailed] = useState(false)
  return <figure className="timeline-media">
    {failed ? <div className="image-fallback">{title}</div> : <img src={src} alt={alt} loading="lazy" width="1600" height="1000" onError={() => setFailed(true)}/>}
    <figcaption>{caption}</figcaption>
  </figure>
}
