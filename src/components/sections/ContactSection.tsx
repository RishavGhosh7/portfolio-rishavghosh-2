import { type FormEvent, useState } from 'react'
import { profile } from '../../data/profile'
import { Reveal } from '../motion/Reveal'
import { LiquidButton } from '../ui/Button'

export function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Name is required.'
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email.'
    if (!message.trim()) next.message = 'Message is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section panel contact-panel">
      <Reveal>
        <h3>Contact</h3>
        <p className="mt-2 max-w-xl text-sm text-zinc-500">
          Open to software engineering roles and impactful AI product opportunities. Send a
          message or reach me directly.
        </p>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-invalid={errors.name ? true : undefined}
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={errors.email ? true : undefined}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about the role or project…"
              aria-invalid={errors.message ? true : undefined}
            />
            {errors.message && <p className="form-error">{errors.message}</p>}
          </div>
          <LiquidButton type="submit" size="lg" className="w-fit">
            Send message
          </LiquidButton>
        </form>

        <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Direct
        </p>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
        </div>
        <div className="contact-links mt-2">
          {profile.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
