'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
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

function Logo() {
  return (
    <a href="#top" className="flex items-center" aria-label="Prime Support Solutions home">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prime%20Support%20Solutions-suea5N7QvnzSxf3ZLB0yJkrLYnhYAr.png" alt="Prime Support Solutions" className="h-14 w-auto object-contain" />
    </a>
  )
}

export function PssSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div id="top" className="min-h-screen bg-white text-[#263238]">
      <header className="sticky top-0 z-30 border-b border-[#e7ebef]/90 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#51606c] lg:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-[#102a43]" href="#about">About</a>
            <a className="transition-colors hover:text-[#102a43]" href="#services">Services</a>
            <a className="transition-colors hover:text-[#102a43]" href="#process">How it works</a>
            <a className="rounded-sm bg-[#102a43] px-5 py-3 text-white transition-colors hover:bg-[#1b4469]" href="#contact">Discuss your requirements <ArrowRight className="ml-2 inline h-3.5 w-3.5" /></a>
          </nav>
          <button className="rounded-sm p-2 text-[#102a43] lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="border-t border-[#e7ebef] px-6 py-4 lg:hidden" aria-label="Mobile navigation"><div className="flex flex-col gap-4 text-sm"><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#process" onClick={() => setMenuOpen(false)}>How it works</a><a href="#contact" onClick={() => setMenuOpen(false)} className="font-semibold text-[#1f5f94]">Discuss your requirements →</a></div></nav>}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#e7ebef] bg-[#f4f6f8]">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:py-28">
            <div className="relative z-10">
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-[#2563a6]">Managed business support for growing businesses</p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#102a43] sm:text-6xl lg:text-[76px]">Your business.<br /><span className="text-[#2563a6]">Our people.</span><br />Managed for growth.</h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#52616d]">Build your business with dedicated operational support. We help UK and international companies scale their teams, streamline everyday operations and access reliable business support without the complexity of building everything in-house.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href="#contact" className="rounded-sm bg-[#102a43] px-6 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1b4469]">Discuss your requirements <ArrowRight className="ml-2 inline h-4 w-4" /></a><a href="#services" className="rounded-sm border border-[#b8c5cf] bg-white px-6 py-4 text-center text-sm font-semibold text-[#102a43] transition-colors hover:border-[#2563a6]">Explore our services</a></div>
            </div>
            <div className="relative hidden min-h-[470px] lg:block">
              <div className="absolute right-4 top-8 h-[390px] w-[390px] rounded-full border border-[#c9d5df]" /><div className="absolute right-20 top-24 h-[265px] w-[265px] rounded-full border border-[#c9d5df]" /><div className="absolute right-0 top-[115px] h-[280px] w-[340px] border-l-2 border-t-2 border-[#2563a6]" style={{ borderRadius: '100% 0 0 0' }} />
              <div className="absolute bottom-8 left-8 rounded-sm border border-[#d8e0e6] bg-white p-7 shadow-[0_16px_50px_rgba(16,42,67,0.08)]"><div className="mb-5 flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#2563a6]" /><span className="text-xs font-bold uppercase tracking-[0.18em] text-[#69727b]">The PSS model</span></div><p className="max-w-[235px] text-xl font-medium leading-8 text-[#102a43]">A capable team, professionally managed, close to your business.</p></div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-28"><div><p className="section-kicker">Why PSS</p><h2 className="section-title mt-5">Support that feels like part of your business.</h2></div><div className="max-w-2xl"><p className="text-xl leading-9 text-[#3f4e59]">Prime Support Solutions provides dedicated people and managed operational support from our office, giving businesses access to the capability they need without having to build and manage a new operation themselves.</p><p className="mt-6 leading-8 text-[#69727b]">Our approach is practical and hands-on. We build teams around clearly defined responsibilities, provide local management and stay close to the work. The result is a dependable long-term partnership that can grow with your business.</p><div className="mt-10 grid gap-6 border-t border-[#e1e7eb] pt-7 sm:grid-cols-2"><div><ShieldCheck className="h-5 w-5 text-[#2563a6]" /><h3 className="mt-4 font-semibold text-[#102a43]">Managed, not simply supplied</h3><p className="mt-2 text-sm leading-6 text-[#69727b]">We take responsibility for building an effective operating arrangement.</p></div><div><Network className="h-5 w-5 text-[#2563a6]" /><h3 className="mt-4 font-semibold text-[#102a43]">Built around your needs</h3><p className="mt-2 text-sm leading-6 text-[#69727b]">Roles, processes and teams are shaped around your objectives.</p></div></div></div></section>

        <section id="services" className="bg-[#f4f6f8] px-6 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="section-kicker">Our services</p><h2 className="section-title mt-5">Operational capability, tailored to your business.</h2><p className="mt-6 leading-8 text-[#69727b]">Combine the support you need into a practical arrangement, delivered by dedicated people and overseen by PSS.</p></div><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map(({ icon: Icon, number, title, text }) => <article key={title} className="group border border-[#dce4e9] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#9eb8cc] hover:shadow-[0_12px_30px_rgba(16,42,67,0.07)]"><div className="flex items-start justify-between"><Icon className="h-6 w-6 text-[#2563a6]" strokeWidth={1.5} /><span className="text-xs font-bold tracking-[0.18em] text-[#9caab4]">{number}</span></div><h3 className="mt-12 text-lg font-semibold leading-7 text-[#102a43]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#69727b]">{text}</p><a href="#contact" className="mt-7 inline-block text-sm font-semibold text-[#2563a6]">Talk to us <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></a></article>)}</div></div></section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"><div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><div><p className="section-kicker">How it works</p><h2 className="section-title mt-5">A clear path from need to delivery.</h2></div><div className="grid gap-0 sm:grid-cols-2">{steps.map(([number, title, text]) => <div key={number} className="border-t border-[#dce4e9] py-7 sm:px-7 first:sm:pl-0"><span className="text-xs font-bold tracking-[0.2em] text-[#2563a6]">{number}</span><h3 className="mt-4 text-xl font-semibold text-[#102a43]">{title}</h3><p className="mt-3 max-w-xs text-sm leading-7 text-[#69727b]">{text}</p></div>)}</div></div></section>

        <section id="contact" className="bg-[#102a43] px-6 py-20 text-white lg:px-10 lg:py-28"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.82fr_1.18fr]"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#91b9da]">Start a conversation</p><h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">Tell us what your business needs.</h2><p className="mt-6 max-w-md leading-8 text-[#bdcbd6]">Share a little about your objectives and we will come back to you with a practical next step.</p><div className="mt-10 border-t border-white/15 pt-6 text-sm text-[#bdcbd6]"><p className="font-semibold text-white">Contact details</p><p className="mt-3">Email: [your email address]</p><p className="mt-1">Telephone: [your telephone number]</p></div></div><form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }} aria-label="Business enquiry form">{submitted ? <div className="flex min-h-[300px] flex-col items-start justify-center border border-white/15 bg-white/5 p-8"><Check className="h-8 w-8 text-[#91b9da]" /><h3 className="mt-5 text-2xl font-semibold">Thank you for your enquiry.</h3><p className="mt-3 max-w-md leading-7 text-[#bdcbd6]">Your details are ready to be reviewed. Connect a form submission service before launch to send enquiries to your team.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-[#91b9da]">Send another enquiry</button></div> : <><div className="grid gap-5 sm:grid-cols-2"><Field label="Name" required /><Field label="Company" required /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Work email" type="email" required /><Field label="Telephone" /></div><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Type of support required<select className="field-control" defaultValue=""><option value="" disabled>Select an option</option><option>Recruitment & resourcing</option><option>Finance & administration</option><option>Data & research</option><option>Customer & business support</option><option>Dedicated team</option></select></label><label className="field-label">Approximate team size<select className="field-control" defaultValue=""><option value="" disabled>Select an option</option><option>1–3 people</option><option>4–10 people</option><option>11–25 people</option><option>25+ people</option></select></label></div><label className="field-label">Message<textarea className="field-control min-h-32 resize-y" placeholder="Tell us about your business and what you need support with." required /></label><button className="w-fit rounded-sm bg-white px-6 py-4 text-sm font-semibold text-[#102a43] transition-colors hover:bg-[#dceaf3]" type="submit">Send enquiry <ArrowRight className="ml-2 inline h-4 w-4" /></button></>}</form></div></section>
      </main>
      <footer className="bg-[#0b2033] px-6 py-10 text-[#aebdca] lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold tracking-[0.18em] text-white">PSS</p><p className="mt-2 text-xs uppercase tracking-[0.16em]">Prime Support Solutions</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href="#about" className="hover:text-white">About</a><a href="#services" className="hover:text-white">Services</a><a href="#process" className="hover:text-white">How it works</a><a href="#contact" className="hover:text-white">Contact</a></div><p className="text-xs">© {new Date().getFullYear()} Prime Support Solutions</p></div></footer>
    </div>
  )
}

function Field({ label, type = 'text', required = false }: { label: string; type?: string; required?: boolean }) {
  return <label className="field-label">{label}{required && <span aria-hidden="true"> *</span>}<input className="field-control" type={type} required={required} /></label>
}
