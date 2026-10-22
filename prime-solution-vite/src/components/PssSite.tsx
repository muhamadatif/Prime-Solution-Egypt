import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  ClipboardList,
  Database,
  Headphones,
  Menu,
  Network,
  Search,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react'
import { sendEnquiry } from '@/lib/brevo'

const services = [
  { icon: Search, number: '01', title: 'Recruitment & Resourcing Support', text: 'Candidate sourcing, application screening, database management, interview coordination and recruitment administration.' },
  { icon: ClipboardList, number: '02', title: 'Finance & Administrative Support', text: 'Invoice processing, timesheet administration, payment follow-ups, record keeping and dependable back-office support.' },
  { icon: Database, number: '03', title: 'Data, Research & AI Operations', text: 'Data collection, web research, lead generation, database enrichment and support for AI-driven workflows.' },
  { icon: Headphones, number: '04', title: 'Customer & Business Support', text: 'Email and telephone support, client communications, business coordination and everyday operational assistance.' },
  { icon: Users, number: '05', title: 'Dedicated Teams & Managed Operations', text: 'Dedicated people or teams working to agreed requirements, with local management from PSS.' },
]

const steps = [
  ['01', 'Understand', 'We learn about your business, workload and objectives.'],
  ['02', 'Design', 'We define the roles, responsibilities, processes and team structure.'],
  ['03', 'Build', 'We recruit and prepare the right team around your requirements.'],
  ['04', 'Manage & improve', 'We oversee delivery and work with you to improve performance.'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

function Logo() {
  return (
    <a href="#top" className="flex items-center" aria-label="Prime Support Solutions home">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prime%20Support%20Solutions-suea5N7QvnzSxf3ZLB0yJkrLYnhYAr.png" alt="Prime Support Solutions" className="h-14 w-auto object-contain" />
    </a>
  )
}

type FormState = {
  name: string
  company: string
  email: string
  telephone: string
  supportType: string
  teamSize: string
  message: string
}

const initialForm: FormState = {
  name: '',
  company: '',
  email: '',
  telephone: '',
  supportType: '',
  teamSize: '',
  message: '',
}

export default function PssSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const reduceMotion = useReducedMotion()

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Please enter your name'
    if (!form.company.trim()) next.company = 'Please enter your company'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email'
    if (!form.message.trim()) next.message = 'Please tell us about your needs'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setErrorMessage('')
    try {
      await sendEnquiry({
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        telephone: form.telephone.trim() || undefined,
        supportType: form.supportType || undefined,
        teamSize: form.teamSize || undefined,
        message: form.message.trim(),
      })
      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const motionProps = reduceMotion
    ? {}
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' } }

  return (
    <div id="top" className="min-h-screen bg-white text-[#263238]">
      <header className="sticky top-0 z-30 border-b border-[#e7ebef]/90 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#51606c] lg:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-[#102a43]" href="#about">About</a>
            <a className="transition-colors hover:text-[#102a43]" href="#services">Services</a>
            <a className="transition-colors hover:text-[#102a43]" href="#process">How it works</a>
            <motion.a whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="rounded-sm bg-[#102a43] px-5 py-3 text-white transition-colors hover:bg-[#1b4469]" href="#contact">
              Discuss your requirements <ArrowRight className="ml-2 inline h-3.5 w-3.5" />
            </motion.a>
          </nav>
          <button className="rounded-sm p-2 text-[#102a43] lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-nav">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-[#e7ebef] px-6 py-4 lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-4 text-sm">
                <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
                <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="font-semibold text-[#1f5f94]">Discuss your requirements →</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        <section className="relative overflow-hidden border-b border-[#e7ebef] bg-[#f4f6f8]">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:py-28">
            <motion.div className="relative z-10" variants={fadeUp} {...motionProps} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-[#2563a6]">Managed business support for growing businesses</p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#102a43] sm:text-6xl lg:text-[76px]">
                Your business.<br />
                <span className="text-[#2563a6]">Our people.</span><br />
                Managed for growth.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#52616d]">
                Build your business with dedicated operational support. We help UK and international companies scale their teams, streamline everyday operations and access reliable business support without the complexity of building everything in-house.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} href="#contact" className="rounded-sm bg-[#102a43] px-6 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1b4469]">
                  Discuss your requirements <ArrowRight className="ml-2 inline h-4 w-4" />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} href="#services" className="rounded-sm border border-[#b8c5cf] bg-white px-6 py-4 text-center text-sm font-semibold text-[#102a43] transition-colors hover:border-[#2563a6]">
                  Explore our services
                </motion.a>
              </div>
            </motion.div>

            <div className="relative hidden min-h-[470px] lg:block" aria-hidden="true">
              <motion.div initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }} animate={reduceMotion ? {} : { opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute right-4 top-8 h-[390px] w-[390px] rounded-full border border-[#c9d5df]" />
              <motion.div initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }} animate={reduceMotion ? {} : { opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.35 }} className="absolute right-20 top-24 h-[265px] w-[265px] rounded-full border border-[#c9d5df]" />
              <motion.div initial={reduceMotion ? {} : { opacity: 0 }} animate={reduceMotion ? {} : { opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="absolute right-0 top-[115px] h-[280px] w-[340px] border-l-2 border-t-2 border-[#2563a6]" style={{ borderRadius: '100% 0 0 0' }} />
              <motion.div initial={reduceMotion ? {} : { opacity: 0, y: 16 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="absolute bottom-8 left-8 rounded-sm border border-[#d8e0e6] bg-white p-7 shadow-[0_16px_50px_rgba(16,42,67,0.08)]">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#2563a6]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#69727b]">The PSS model</span>
                </div>
                <p className="max-w-[235px] text-xl font-medium leading-8 text-[#102a43]">
                  A capable team, professionally managed, close to your business.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-28">
          <motion.div variants={fadeUp} {...motionProps} transition={{ duration: 0.5 }}>
            <p className="section-kicker">Why PSS</p>
            <h2 className="section-title mt-5">Support that feels like part of your business.</h2>
          </motion.div>
          <motion.div variants={fadeUp} {...motionProps} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-2xl">
            <p className="text-xl leading-9 text-[#3f4e59]">Prime Support Solutions provides dedicated people and managed operational support from our office, giving businesses access to the capability they need without having to build and manage a new operation themselves.</p>
            <p className="mt-6 leading-8 text-[#69727b]">Our approach is practical and hands-on. We build teams around clearly defined responsibilities, provide local management and stay close to the work. The result is a dependable long-term partnership that can grow with your business.</p>
            <div className="mt-10 grid gap-6 border-t border-[#e1e7eb] pt-7 sm:grid-cols-2">
              <div>
                <ShieldCheck className="h-5 w-5 text-[#2563a6]" />
                <h3 className="mt-4 font-semibold text-[#102a43]">Managed, not simply supplied</h3>
                <p className="mt-2 text-sm leading-6 text-[#69727b]">We take responsibility for building an effective operating arrangement.</p>
              </div>
              <div>
                <Network className="h-5 w-5 text-[#2563a6]" />
                <h3 className="mt-4 font-semibold text-[#102a43]">Built around your needs</h3>
                <p className="mt-2 text-sm leading-6 text-[#69727b]">Roles, processes and teams are shaped around your objectives.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="services" className="bg-[#f4f6f8] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={fadeUp} {...motionProps} transition={{ duration: 0.5 }} className="max-w-2xl">
              <p className="section-kicker">Our services</p>
              <h2 className="section-title mt-5">Operational capability, tailored to your business.</h2>
              <p className="mt-6 leading-8 text-[#69727b]">Combine the support you need into a practical arrangement, delivered by dedicated people and overseen by PSS.</p>
            </motion.div>
            <motion.div variants={stagger} {...motionProps} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, number, title, text }) => (
                <motion.article
                  key={title}
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  className="group border border-[#dce4e9] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#9eb8cc] hover:shadow-[0_12px_30px_rgba(16,42,67,0.07)]"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="h-6 w-6 text-[#2563a6]" strokeWidth={1.5} />
                    <span className="text-xs font-bold tracking-[0.18em] text-[#9caab4]">{number}</span>
                  </div>
                  <h3 className="mt-12 text-lg font-semibold leading-7 text-[#102a43]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#69727b]">{text}</p>
                  <a href="#contact" className="mt-7 inline-block text-sm font-semibold text-[#2563a6]">
                    Talk to us <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
            <motion.div variants={fadeUp} {...motionProps} transition={{ duration: 0.5 }}>
              <p className="section-kicker">How it works</p>
              <h2 className="section-title mt-5">A clear path from need to delivery.</h2>
            </motion.div>
            <motion.div variants={stagger} {...motionProps} className="grid gap-0 sm:grid-cols-2">
              {steps.map(([number, title, text]) => (
                <motion.div key={number} variants={fadeUp} transition={{ duration: 0.4 }} className="border-t border-[#dce4e9] py-7 sm:px-7 first:sm:pl-0">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#2563a6]">{number}</span>
                  <h3 className="mt-4 text-xl font-semibold text-[#102a43]">{title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-[#69727b]">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contact" className="bg-[#102a43] px-6 py-20 text-white lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.82fr_1.18fr]">
            <motion.div variants={fadeUp} {...motionProps} transition={{ duration: 0.5 }}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#91b9da]">Start a conversation</p>
              <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">Tell us what your business needs.</h2>
              <p className="mt-6 max-w-md leading-8 text-[#bdcbd6]">Share a little about your objectives and we will come back to you with a practical next step.</p>
              <div className="mt-10 border-t border-white/15 pt-6 text-sm text-[#bdcbd6]">
                <p className="font-semibold text-white">Contact details</p>
                <p className="mt-3">Email: [your email address]</p>
                <p className="mt-1">Telephone: [your telephone number]</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} {...motionProps} transition={{ duration: 0.5, delay: 0.1 }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex min-h-[300px] flex-col items-start justify-center border border-white/15 bg-white/5 p-8">
                    <Check className="h-8 w-8 text-[#91b9da]" />
                    <h3 className="mt-5 text-2xl font-semibold">Thank you for your enquiry.</h3>
                    <p className="mt-3 max-w-md leading-7 text-[#bdcbd6]">
                      Your details have been sent to our team. We will come back to you with a practical next step.
                    </p>
                    <button type="button" onClick={() => { setSubmitted(false); setStatus('idle') }} className="mt-6 text-sm font-semibold text-[#91b9da] hover:underline">
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="grid gap-5" aria-label="Business enquiry form" noValidate>
                    {status === 'error' && (
                      <div role="alert" className="border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
                        {errorMessage}
                      </div>
                    )}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" name="name" required value={form.name} onChange={update('name')} error={errors.name} />
                      <Field label="Company" name="company" required value={form.company} onChange={update('company')} error={errors.company} />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Work email" name="email" type="email" required value={form.email} onChange={update('email')} error={errors.email} />
                      <Field label="Telephone" name="telephone" value={form.telephone} onChange={update('telephone')} />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="field-label">Type of support required
                        <select className="field-control" name="supportType" value={form.supportType} onChange={update('supportType')}>
                          <option value="">Select an option</option>
                          <option>Recruitment & resourcing</option>
                          <option>Finance & administration</option>
                          <option>Data & research</option>
                          <option>Customer & business support</option>
                          <option>Dedicated team</option>
                        </select>
                      </label>
                      <label className="field-label">Approximate team size
                        <select className="field-control" name="teamSize" value={form.teamSize} onChange={update('teamSize')}>
                          <option value="">Select an option</option>
                          <option>1–3 people</option>
                          <option>4–10 people</option>
                          <option>11–25 people</option>
                          <option>25+ people</option>
                        </select>
                      </label>
                    </div>
                    <label className="field-label">Message
                      <textarea className="field-control min-h-32 resize-y" name="message" placeholder="Tell us about your business and what you need support with." required value={form.message} onChange={update('message')} aria-invalid={!!errors.message} />
                      {errors.message && <span className="mt-1 block text-xs text-red-300">{errors.message}</span>}
                    </label>
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-fit rounded-sm bg-white px-6 py-4 text-sm font-semibold text-[#102a43] transition-colors hover:bg-[#dceaf3] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting' ? 'Sending…' : (<>Send enquiry <ArrowRight className="ml-2 inline h-4 w-4" /></>)}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b2033] px-6 py-10 text-[#aebdca] lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold tracking-[0.18em] text-white">PSS</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em]">Prime Support Solutions</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href="#about" className="transition-colors hover:text-white">About</a>
            <a href="#services" className="transition-colors hover:text-white">Services</a>
            <a href="#process" className="transition-colors hover:text-white">How it works</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Prime Support Solutions</p>
        </div>
      </footer>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  error,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}) {
  return (
    <label className="field-label">
      {label}{required && <span aria-hidden="true"> *</span>}
      <input
        className="field-control"
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <span id={`${name}-error`} className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  )
}