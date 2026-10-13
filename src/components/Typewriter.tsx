import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const roles = ['Java Developer', 'Spring Boot Developer', 'Full Stack Developer']
export function Typewriter() {
  const reduced = useReducedMotion()
  const [text, setText] = useState(roles[0])
  useEffect(() => {
    if (reduced) return
    let index = 0
    let value = roles[0]
    let deleting = true
    let timer: ReturnType<typeof setTimeout>
    function step() {
      const target = roles[index]
      value = deleting ? value.slice(0, -1) : target.slice(0, value.length + 1)
      setText(value)
      let delay = deleting ? 45 : 85
      if (deleting && !value) { deleting = false; index = (index + 1) % roles.length; delay = 280 }
      else if (!deleting && value === target) { deleting = true; delay = 2100 }
      timer = setTimeout(step, delay)
    }
    timer = setTimeout(step, 2100)
    return () => clearTimeout(timer)
  }, [reduced])
  return <><span className="sr-only">{roles.join(', ')}</span><span aria-hidden="true">{reduced ? roles[0] : text}<span className="typing-cursor">|</span></span></>
}
