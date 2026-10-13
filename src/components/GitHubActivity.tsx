import { useEffect, useState } from 'react'
import { GithubLogo, ArrowUpRight } from '@phosphor-icons/react'
import { profile } from '../data/portfolio'
import type { Language } from '../data/portfolio'

type Day = { date: string; count: number; level: number }
function parseDays(data: unknown): Day[] {
  if (!data || typeof data !== 'object' || !('contributions' in data) || !Array.isArray(data.contributions)) throw new Error('Invalid activity')
  const days = data.contributions.filter((day): day is Day => typeof day?.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isInteger(day.count) && day.count >= 0 && Number.isInteger(day.level) && day.level >= 0 && day.level <= 4)
  if (!days.length || days.length !== data.contributions.length) throw new Error('Invalid activity')
  return days.sort((a, b) => a.date.localeCompare(b.date))
}
export function GitHubActivity({ language }: { language: Language }) {
  const [days, setDays] = useState<Day[]>([])
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  const vi = language === 'vi'
  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12000)
    fetch('https://github-contributions-api.jogruber.de/v4/cunovox?y=last', { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Activity unavailable'); return response.json() })
      .then(data => { const next = parseDays(data); if (!controller.signal.aborted) { setDays(next); setState('ready') } })
      .catch(() => { if (active) setState('error') })
      .finally(() => clearTimeout(timeout))
    let active = true
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [attempt])
  const total = days.reduce((sum, day) => sum + day.count, 0)
  const offset = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0
  const weeks = Math.ceil((offset + days.length) / 7)
  return <>
    <div className="github-panel" aria-busy={state === 'loading'}>
      <div className="github-header"><span className="tile-icon"><GithubLogo size={23} aria-hidden/></span><div><h3>GitHub Contributions</h3><p>{vi ? 'Hoạt động công khai của' : 'Public activity for'} <a href={profile.github} target="_blank" rel="noopener noreferrer">@cunovox</a></p></div></div>
      {state === 'loading' && <div className="activity-loading" role="status">{vi ? 'Đang tải hoạt động GitHub…' : 'Loading GitHub activity…'}</div>}
      {state === 'error' && <div className="activity-error" role="status"><p>{vi ? 'Chưa tải được dữ liệu GitHub. Bạn có thể thử lại hoặc xem trực tiếp trên GitHub.' : 'GitHub activity could not be loaded. Retry or visit GitHub directly.'}</p><button className="button outline" onClick={() => { setState('loading'); setAttempt(value => value + 1) }}>{vi ? 'Thử lại' : 'Retry'}</button></div>}
      {state === 'ready' && <>
        <div className="calendar-scroll"><div className="calendar-inner">
          <div className="calendar-months" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>{days.map((day, i) => { const date = new Date(`${day.date}T00:00:00Z`); return date.getUTCDate() === 1 ? <span key={day.date} style={{ gridColumn: Math.floor((i + offset) / 7) + 1 }}>{new Intl.DateTimeFormat(vi ? 'vi-VN' : 'en-US', { month: 'short', timeZone: 'UTC' }).format(date)}</span> : null })}</div>
          <div className="contribution-grid" role="img" aria-label={vi ? `${total} đóng góp từ ${days[0].date} đến ${days.at(-1)?.date}` : `${total} contributions from ${days[0].date} to ${days.at(-1)?.date}`}>
            {Array.from({ length: offset }, (_, i) => <span className="contribution-spacer" key={`spacer-${i}`}/>)}
            {days.map(day => <span key={day.date} className={`contribution-cell level-${day.level}`} title={`${day.date}: ${day.count} ${vi ? 'đóng góp' : 'contributions'}`}/>)}
          </div>
        </div></div>
        <div className="calendar-footer"><span>{total} {vi ? 'đóng góp trong khoảng thời gian hiển thị' : 'contributions in the displayed period'}</span><div className="calendar-legend">{vi ? 'Ít' : 'Less'}{[0,1,2,3,4].map(level => <span className={`contribution-cell level-${level}`} key={level}/>)}{vi ? 'Nhiều' : 'More'}</div></div>
      </>}
      <p className="activity-source">{vi ? 'Dữ liệu GitHub qua dịch vụ GitHub Contributions API.' : 'GitHub data via the GitHub Contributions API service.'}</p>
    </div>
    <div className="github-action"><a className="button primary" href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer"><GithubLogo size={17} aria-hidden/>{vi ? 'Xem các repository' : 'View repositories'}<ArrowUpRight size={15} aria-hidden/></a></div>
  </>
}
