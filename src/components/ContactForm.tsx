import { useState } from 'react'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import { profile } from '../data/portfolio'
import type { Language } from '../data/portfolio'

export function ContactForm({ language }: { language: Language }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const vi = language === 'vi'
  return <form className="contact-form" onSubmit={event => {
    event.preventDefault()
    const subject = `${vi ? 'Liên hệ portfolio' : 'Portfolio enquiry'} — ${name}`
    const body = `${name}\n${email}\n\n${message}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }}>
    <h3>{vi ? 'Gửi lời nhắn' : 'Get in touch'}</h3>
    <label htmlFor="contact-name">{vi ? 'Họ tên' : 'Name'}</label>
    <input id="contact-name" name="name" autoComplete="name" required maxLength={120} value={name} onChange={e => setName(e.target.value)}/>
    <label htmlFor="contact-email">Email</label>
    <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)}/>
    <label htmlFor="contact-message">{vi ? 'Nội dung' : 'Message'}</label>
    <textarea id="contact-message" name="message" required maxLength={2000} rows={5} value={message} onChange={e => setMessage(e.target.value)}/>
    <button className="button primary" type="submit"><PaperPlaneTilt size={17} aria-hidden/>{vi ? 'Mở email để gửi' : 'Open email to send'}</button>
    <p className="form-note">{vi ? 'Mở ứng dụng email của bạn với nội dung đã điền. Hoặc gửi trực tiếp tới' : 'Opens your email app with your message. Or email me directly at'} <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>
  </form>
}
