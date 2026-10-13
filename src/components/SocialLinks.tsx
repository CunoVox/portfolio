import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react'
import { profile } from '../data/portfolio'

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? 'social-links compact' : 'social-links'}>
    <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub — cunovox"><GithubLogo size={19}/>{!compact && <span>GitHub</span>}</a>
    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn — cunovox"><LinkedinLogo size={19}/>{!compact && <span>LinkedIn</span>}</a>
    <a href={`mailto:${profile.email}`} aria-label={`Email — ${profile.email}`}><EnvelopeSimple size={19}/>{!compact && <span>Email</span>}</a>
  </div>
}
