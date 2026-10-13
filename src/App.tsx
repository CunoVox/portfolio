import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowUp, DownloadSimple, MapPin, List, X, Phone, Code, Database, GitBranch, Lifebuoy, Briefcase, EnvelopeSimple, GraduationCap, Sun, Moon, CalendarBlank } from '@phosphor-icons/react'
import { content, profile } from './data/portfolio'
import type { Language } from './data/portfolio'
import { ProjectImage } from './components/ProjectImage'
import { ContactForm } from './components/ContactForm'
import { motion, useScroll, useReducedMotion } from 'motion/react'
import { SocialLinks } from './components/SocialLinks'
import { Typewriter } from './components/Typewriter'
import { GitHubActivity } from './components/GitHubActivity'
import './App.css'

const year = new Date().getFullYear()
const sections = ['home', 'experience', 'skills', 'projects']
const skillIcons = [Code, Database, GitBranch, Lifebuoy]
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
function initialLanguage(): Language {
  try { return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'vi' } catch { return 'vi' }
}

function App() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const [projectFilter, setProjectFilter] = useState<'all' | 'team' | 'personal'>('all')
  const [activeSection, setActiveSection] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.find(entry => entry.isIntersecting)
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-75px 0px -55% 0px', threshold: 0 })
    sections.forEach(id => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])
  const reveal = { initial: { opacity: reducedMotion ? 1 : 0.65, y: reducedMotion ? 0 : 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: reducedMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const [menuOpen, setMenuOpen] = useState(false)
  const readingPosition = useRef<{ id: string; offset: number } | null>(null)
  const [dark, setDark] = useState(() => { try { return localStorage.getItem('portfolio-theme') === 'dark' } catch { return false } })
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light') } catch { /* Theme works without storage. */ }
  }, [dark])
  const vi = language === 'vi'
  const t = content[language]
  function changeLanguage(next: Language) {
    if (next === language) return
    const visible = [...document.querySelectorAll<HTMLElement>('main section[id]')].filter(section => section.getBoundingClientRect().top <= 130).at(-1)
    readingPosition.current = visible ? { id: visible.id, offset: visible.getBoundingClientRect().top } : null
    setLanguage(next)
  }
  useLayoutEffect(() => {
    const position = readingPosition.current
    if (position) {
      const section = document.getElementById(position.id)
      if (section) window.scrollBy({ top: section.getBoundingClientRect().top - position.offset, behavior: 'instant' })
      readingPosition.current = null
    }
  }, [language])
  useEffect(() => {
    document.documentElement.lang = language
    document.title = t.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description)
    try { localStorage.setItem('portfolio-language', language) } catch { /* Language remains usable without storage. */ }
  }, [language, t])
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  return <>
    <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true"/>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header"><div className="container header-inner">
      <a className="brand" href="#home">Portfolio<span>.</span></a>
      <nav id="navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label={t.menu}>
        {sections.map(id => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{({ home: vi ? 'Trang chủ' : 'Home', experience: vi ? 'Kinh nghiệm' : 'Experience', skills: t.skills, projects: vi ? 'Dự án' : 'Projects' })[id]}</a>)}
      </nav>
      <div className="header-controls"><SocialLinks compact/><div className="language-switch" role="group" aria-label="Tiếng Việt / English"><button lang="vi" aria-label="Tiếng Việt" aria-pressed={vi} onClick={() => changeLanguage('vi')}>VI</button><span>/</span><button lang="en" aria-label="English" aria-pressed={!vi} onClick={() => changeLanguage('en')}>EN</button></div>
        <button className="icon-button" aria-label={vi ? (dark ? 'Chế độ sáng' : 'Chế độ tối') : (dark ? 'Light mode' : 'Dark mode')} onClick={() => setDark(!dark)}>{dark ? <Sun size={19}/> : <Moon size={19}/>}</button>
        <button className="menu-button icon-button" aria-label={t.menu} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22}/> : <List size={22}/>}</button>
      </div>
    </div></header>
    <main id="main">
      <motion.section className="hero container" id="home" aria-labelledby="hero-title">
        <div className="hero-main"><div className="availability"><span aria-hidden="true"/>{vi ? 'Sẵn sàng cho cơ hội mới' : 'Open to new opportunities'}</div>
          <h1 id="hero-title">{vi ? 'Xin chào, mình là' : "Hi, I’m"}<br/><span>Võ Hoàn Hảo</span></h1>
          <p className="hero-role"><Typewriter/></p>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-meta"><span><MapPin size={15} aria-hidden/>{t.location}</span><span><Briefcase size={15} aria-hidden/>{vi ? 'Tìm kiếm cơ hội phù hợp' : 'Available for new opportunities'}</span></div>
          <div className="hero-actions"><a className="button primary" href={asset(profile.cv)} download><DownloadSimple size={17} aria-hidden/>{t.cv}</a><a className="button outline" href="#contact"><EnvelopeSimple size={17} aria-hidden/>{t.contact}</a></div>
          <p className="cv-note">{t.cvNote}</p><SocialLinks/>
        </div>
        <motion.div className="hero-visual" aria-label={profile.name} initial={{ opacity: 1, scale: reducedMotion ? 1 : 0.9 }} animate={{ scale: 1, y: reducedMotion ? 0 : [0, -8, 0] }} transition={{ scale: { duration: 0.8 }, y: { duration: 6, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" } }}><div className="monogram">VH</div><span className="floating-tag project-count">{vi ? '2 dự án' : '2 projects'}</span><span className="floating-tag java-tag">Java / Spring Boot</span><span className="available-indicator" aria-hidden="true"/></motion.div>
      </motion.section>
      <motion.section {...reveal} className="section container" id="experience" aria-labelledby="experience-title">
        <div className="section-heading"><h2 id="experience-title"><Briefcase size={23} aria-hidden/>{vi ? 'Kinh nghiệm' : 'Experience'}</h2></div>
        <article className="experience-card"><div className="job-header"><div className="job-name"><span className="tile-icon"><Briefcase size={22} aria-hidden/></span><div><h3>{t.job}</h3><p>{t.company}</p></div></div><p className="date"><CalendarBlank size={15} aria-hidden/>{t.period}</p></div>
          <div className="work-layout"><div><h4>{vi ? 'Trách nhiệm & đóng góp' : 'Responsibilities & contributions'}</h4><ul className="work-list">{t.work.map(([title, description]) => <li key={title}><strong>{title}.</strong> {description}</li>)}</ul></div><aside><h4>{vi ? 'Phạm vi công việc' : 'Work areas'}</h4>{t.work.map(([title]) => <p key={title}>{title}</p>)}</aside></div>
          <h4 className="technology-label">{vi ? 'Công nghệ sử dụng' : 'Technologies used'}</h4><div className="tech-list">{['Java', 'Spring Boot', 'JSF', 'PrimeFaces', 'REST API', 'GraphQL', 'MongoDB', 'Jenkins'].map(tech => <span key={tech}>{tech}</span>)}</div>
        </article>
      </motion.section>
      <motion.section {...reveal} className="section container" id="github" aria-labelledby="github-title"><div className="section-heading"><h2 id="github-title"><GitBranch size={23} aria-hidden/>{vi ? 'Hoạt động GitHub' : 'GitHub Activity'}</h2></div><GitHubActivity language={language}/></motion.section>
      <motion.section {...reveal} className="section container" id="skills" aria-labelledby="skills-title"><div className="section-heading"><h2 id="skills-title"><Code size={23} aria-hidden/>{t.skills}</h2></div>
        <div className="capabilities">{t.skillGroups.map(([title, technologies, evidence], i) => { const Icon = skillIcons[i]; return <article className="capability" key={title}><div className="capability-title"><span className="tile-icon"><Icon size={23} aria-hidden/></span><div><h3>{title}</h3><p>{evidence}</p></div></div><ul className="skill-tiles">{technologies.split(' · ').map(tech => <li key={tech}><Icon size={16} aria-hidden/>{tech}</li>)}</ul></article> })}</div>
        <div className="overview-strip"><div><strong>Java</strong><span>Spring Boot</span></div><div><strong>2</strong><span>{vi ? 'Dự án tiêu biểu' : 'Selected projects'}</span></div><div><strong>VPS</strong><span>Nginx / Deployment</span></div><div><strong>API</strong><span>RESTful / GraphQL</span></div></div>
      </motion.section>
      <motion.section {...reveal} className="section container" id="projects" aria-labelledby="projects-title"><div className="section-heading"><h2 id="projects-title"><Code size={23} aria-hidden/>{vi ? 'Dự án nổi bật' : 'Featured projects'}</h2></div>
        <div className="project-filter" role="group" aria-label={vi ? 'Lọc dự án' : 'Filter projects'}>{(['all', 'team', 'personal'] as const).map((filter, i) => <button type="button" key={filter} aria-pressed={projectFilter === filter} onClick={() => setProjectFilter(filter)}>{[vi ? 'Tất cả' : 'All', vi ? 'Dự án nhóm' : 'Team projects', vi ? 'Dự án cá nhân' : 'Personal projects'][i]}</button>)}</div>
        <div className="project-grid">
          <article className="project-card" hidden={projectFilter === 'personal'}><ProjectImage src={asset('/images/wisdom-cover-v2.png')} alt={t.wisdomAlt} title="Wisdom" caption={t.wisdomCaption}/><div className="project-content"><h3>Wisdom · E-Learning</h3><p className="project-description">{t.learningDescription}</p><div className="project-meta"><span>{t.learningDate}</span><span>{t.learningMeta}</span></div><div className="tech-list">{['Spring Boot','React','MongoDB','Redux','Tailwind CSS'].map(tech => <span key={tech}>{tech}</span>)}</div><h4>{t.contribution}</h4><p className="contribution-text">{t.learningDetails}</p><div className="project-actions"><a className="button outline" href={profile.api} target="_blank" rel="noopener noreferrer"><Code size={16} aria-hidden/>{t.sourceApi}</a><a className="button outline" href={profile.web} target="_blank" rel="noopener noreferrer">{t.sourceWeb}<ArrowUpRight size={16} aria-hidden/></a><a className="button primary" href={profile.wisdom} target="_blank" rel="noopener noreferrer">Demo<ArrowUpRight size={16} aria-hidden/></a></div></div></article>
          <article className="project-card" hidden={projectFilter === 'team'}><ProjectImage src={asset('/images/haobox.png')} alt={t.haoboxAlt} title="HaoBox" caption={t.haoboxCaption}/><div className="project-content"><h3>HaoBox</h3><p className="project-description">{t.haoboxDescription}</p><div className="project-meta"><span>{t.haoboxDate}</span><span>{t.personal}</span></div><div className="tech-list">{['React','Vite','Tailwind CSS','Spring Boot','MySQL','VPS','Nginx'].map(tech => <span key={tech}>{tech}</span>)}</div><h4>{vi ? 'Phát triển & triển khai' : 'Development & deployment'}</h4><ul className="project-points">{t.haoboxDetails.map(([title,description]) => <li key={title}>{description}</li>)}</ul><div className="project-actions"><a className="button primary" href={profile.haobox} target="_blank" rel="noopener noreferrer">{t.visit}<ArrowUpRight size={16} aria-hidden/></a></div></div></article>
        </div>
      </motion.section>
      <motion.section {...reveal} className="section container" id="about" aria-labelledby="about-title"><div className="section-heading"><h2 id="about-title"><GraduationCap size={24} aria-hidden/>{vi ? 'Học vấn & giới thiệu' : 'Education & about'}</h2></div><div className="education-grid"><article className="education-card"><div className="education-banner">HCMUTE<span>2020 — 2026</span></div><div className="education-body"><h3>{t.university}</h3><p>{t.degree}</p><div className="education-language"><h4>{t.language}</h4><p>{t.englishAbility}</p></div></div></article><article className="about-card"><h3>{t.about}</h3><p>{t.aboutText}</p><a className="text-link" href={asset(profile.javaCv)} download>{t.javaCv}<DownloadSimple size={17} aria-hidden/></a></article></div></motion.section>
      <motion.section {...reveal} className="section container" id="contact" aria-labelledby="contact-title"><div className="section-heading"><h2 id="contact-title"><EnvelopeSimple size={23} aria-hidden/>{t.contact}</h2><p>{t.contactText}</p></div><ContactForm language={language}/><div className="direct-contact"><a href={`mailto:${profile.email}`}><EnvelopeSimple size={16} aria-hidden/>{profile.email}</a><a href={`tel:+84${profile.phone.slice(1)}`}><Phone size={16} aria-hidden/>{profile.phone}</a></div></motion.section>
    </main>
    <a className="floating-top icon-button" href="#home" aria-label={t.backTop}><ArrowUp size={20}/></a><footer className="container"><div><p>© {year} Võ Hoàn Hảo</p><span>{t.footer}</span></div><SocialLinks compact/><a href="#home">{t.backTop}<ArrowUp size={16} aria-hidden/></a></footer>
  </>
}
export default App
