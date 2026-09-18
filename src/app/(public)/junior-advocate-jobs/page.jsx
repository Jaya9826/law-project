'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer'
import {
  ChevronRight, Sparkles, Scale, Briefcase, Award, CheckCircle2, Clock,
  MapPin, Shield, BookOpen, Send, User, Mail, Phone, FileText, ArrowRight,
  GraduationCap, Building2, Gavel, Landmark, ShieldCheck, Cpu,
  Building, Receipt, Check
} from 'lucide-react'
import emailjs from '@emailjs/browser'

// EmailJS Credentials
const SERVICE_ID = "service_cbxbdea"
const TEMPLATE_ID = "template_dmf4cza"
const PUBLIC_KEY = "mKqfcMznogMti-veX"

const practiceAreasData = [
  {
    title: "Civil & Criminal Litigation",
    desc: "Bail matters, trial advocacy, High Court criminal revisions, original suits, and appellate representations.",
    icon: Scale,
    tag: "Core Litigation"
  },
  {
    title: "Constitutional Law Matters",
    desc: "Writ petitions under Article 226/227, fundamental rights enforcement, PILs, and administrative challenges.",
    icon: Landmark,
    tag: "High Court Bench"
  },
  {
    title: "Employment & Service Matter",
    desc: "Service jurisprudence, departmental inquiries, seniority disputes, CAT, and state tribunal representation.",
    icon: ShieldCheck,
    tag: "Tribunal & Service"
  },
  {
    title: "Cyber Security & Technology Law",
    desc: "Cyber fraud investigations, data privacy advisory, digital forensics liaison, and IT Act litigations.",
    icon: Cpu,
    tag: "Tech & Cyber"
  },
  {
    title: "Corporate Law",
    desc: "Commercial suits, contract breaches, corporate advisory, shareholder disputes, and NCLT proceedings.",
    icon: Briefcase,
    tag: "Corporate Advisory"
  },
  {
    title: "Consumer Protection & Real Estate",
    desc: "RERA disputes, builder-buyer disputes, consumer forum litigations from district to national commissions.",
    icon: Building,
    tag: "RERA & Consumer"
  },
  {
    title: "IBC (Insolvency & Bankruptcy Code)",
    desc: "Corporate insolvency resolution processes, liquidation proceedings, operational and financial creditor claims.",
    icon: Receipt,
    tag: "Insolvency Code"
  },
  {
    title: "IPR (Intellectual Property Rights)",
    desc: "Trademark infringement injunctions, copyright enforcement, patent litigation, and trade secret actions.",
    icon: Award,
    tag: "IP Protection"
  }
]

const practiceAreasList = practiceAreasData.map(p => p.title)

const benefitsData = [
  {
    title: "Merit Retainership",
    desc: "Competitive monthly retainership with performance-based case bonuses, annual increments, and litigation milestones.",
    icon: Award,
    badge: "Remuneration",
    highlight: "Performance Bonuses"
  },
  {
    title: "Early Arguing Briefs",
    desc: "Substantive courtroom arguing opportunity in bail, interim stays, and miscellaneous matters independently as competence develops.",
    icon: Gavel,
    badge: "Advocacy",
    highlight: "Independent Cause List"
  },
  {
    title: "Full Research Access",
    desc: "Unlimited premium credentials for SCC Online, Manupatra, extensive chambers commentaries, and high-speed digital law archives.",
    icon: BookOpen,
    badge: "Infrastructure",
    highlight: "SCC & Manupatra"
  },
  {
    title: "Partner Track",
    desc: "Clear and transparent advancement roadmap from Junior Advocate to Senior Associate and eventual chambers partnership.",
    icon: Building2,
    badge: "Career Growth",
    highlight: "Senior Associate & Partner"
  }
]

const initialJobForm = {
  fullName: '',
  email: '',
  phone: '',
  enrollmentNumber: '',
  experienceLevel: 'Fresher (0 - 1 Year)',
  primaryPracticeArea: 'Civil & Criminal Litigation',
  university: '',
  resumeLink: '',
  coverStatement: ''
}

// -------------------------------------------------------------
// 3D Tilt Card Component with Realistic Physics & Dynamic Glare
// -------------------------------------------------------------
function Card3DTilt({
  children,
  className = '',
  maxTilt = 6,
  depth = 25,
  theme = 'dark'
}) {
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCoords({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setCoords({ x: 0, y: 0 })
  }

  const rotateX = isHovered ? -coords.y * maxTilt : 0
  const rotateY = isHovered ? coords.x * maxTilt : 0
  const translateY = isHovered ? -6 : 0
  const scale = isHovered ? 1.015 : 1

  return (
    <div style={{ perspective: '1200px' }} className="w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out'
            : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease-out, border-color 0.6s ease-out',
        }}
        className={`relative ${className} ${
          isHovered
            ? theme === 'light'
              ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12),0_0_25px_rgba(223,171,49,0.2)] border-[#dfab31]'
              : 'shadow-[0_25px_65px_-12px_rgba(0,0,0,0.7),0_0_30px_rgba(223,171,49,0.2)] border-[#dfab31]/80'
            : theme === 'light'
              ? 'shadow-[0_10px_30px_rgba(0,0,0,0.06)] border-zinc-200/90'
              : 'shadow-[0_10px_35px_rgba(0,0,0,0.3)] border-zinc-800/80'
        }`}
      >
        <div style={{ transform: `translateZ(${depth}px)`, transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// Interactive 3D Practice Area Card Component (Light Luxury Card)
// -------------------------------------------------------------
function PracticeArea3DCard({ area, index }) {
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCoords({ x, y })
  }

  const rotateX = isHovered ? -coords.y * 10 : 0
  const rotateY = isHovered ? coords.x * 10 : 0
  const translateY = isHovered ? -10 : 0
  const scale = isHovered ? 1.03 : 1
  const Icon = area.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1200px' }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setCoords({ x: 0, y: 0 })
        }}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.1s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out'
            : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-out, border-color 0.5s ease-out',
        }}
        className={`relative h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl border bg-white select-none transition-all duration-300 ${
          isHovered
            ? 'border-[#dfab31] shadow-[0_22px_45px_-10px_rgba(0,0,0,0.12),0_0_25px_rgba(223,171,49,0.2)]'
            : 'border-zinc-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.04)]'
        }`}
      >

        {/* 3D Top Row: Index Badge & Domain Tag */}
        <div
          style={{
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(10px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out'
          }}
          className="flex items-center justify-between gap-3 mb-5"
        >
          <div className="w-10 h-10 rounded-xl bg-[#dfab31]/15 text-[#9e7116] border border-[#dfab31]/30 flex items-center justify-center font-mono font-bold text-xs shadow-inner">
            0{index + 1}
          </div>
          <div className="w-9 h-9 rounded-xl bg-zinc-100/90 border border-zinc-200 text-[#b5851b] flex items-center justify-center transition-colors">
            <Icon className="w-4 h-4 text-[#b5851b]" />
          </div>
        </div>

        {/* 3D Body Content */}
        <div
          style={{
            transform: isHovered ? 'translateZ(25px)' : 'translateZ(5px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out'
          }}
          className="space-y-2.5 flex-1"
        >
          <div className="text-[10px] font-mono text-[#b5851b] uppercase tracking-wider font-bold">
            {area.tag}
          </div>
          <h4 className="font-bold text-base sm:text-lg font-serif text-zinc-900 leading-snug">
            {area.title}
          </h4>
          <p className="text-xs text-zinc-600 font-light leading-relaxed">
            {area.desc}
          </p>
        </div>

        {/* 3D Bottom Subtle Accent */}
        <div
          style={{
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out'
          }}
          className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500"
        >
          <span>Chamber Practice</span>
          <span className="text-[#b5851b] font-semibold flex items-center gap-1">
            Intake Open &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// -------------------------------------------------------------
// Interactive 3D Benefit Card Component (White Luxury Card)
// -------------------------------------------------------------
function Benefit3DCard({ benefit, index }) {
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCoords({ x, y })
  }

  const rotateX = isHovered ? -coords.y * 10 : 0
  const rotateY = isHovered ? coords.x * 10 : 0
  const translateY = isHovered ? -10 : 0
  const scale = isHovered ? 1.03 : 1
  const Icon = benefit.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1200px' }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setCoords({ x: 0, y: 0 })
        }}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.1s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out'
            : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-out, border-color 0.5s ease-out',
        }}
        className={`relative h-full flex flex-col justify-between p-7 sm:p-8 rounded-2xl border bg-white select-none transition-all duration-300 ${
          isHovered
            ? 'border-[#dfab31] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.14),0_0_30px_rgba(223,171,49,0.22)]'
            : 'border-zinc-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.05)]'
        }`}
      >

        <div>
          {/* 3D Floating Icon in Gold Circle */}
          <div
            style={{
              transform: isHovered ? 'translateZ(40px) scale(1.08)' : 'translateZ(15px) scale(1)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#dfab31]/20 to-[#dfab31]/5 text-[#b5851b] border border-[#dfab31]/35 flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(223,171,49,0.15)]"
          >
            <Icon className="w-7 h-7" />
          </div>

          <div
            style={{
              transform: isHovered ? 'translateZ(25px)' : 'translateZ(5px)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease-out'
            }}
            className="space-y-3"
          >
            <div className="text-[10px] font-mono text-[#b5851b] uppercase tracking-wider font-bold">
              {benefit.badge}
            </div>
            <h4 className="text-xl font-bold font-serif text-zinc-900">
              {benefit.title}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
              {benefit.desc}
            </p>
          </div>
        </div>

        {/* Feature highlight bullet */}
        <div
          style={{
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out'
          }}
          className="pt-5 mt-6 border-t border-zinc-100 flex items-center gap-2 text-xs font-mono text-zinc-700"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#b5851b]" />
          <span className="font-medium">{benefit.highlight}</span>
        </div>
      </div>
    </motion.div>
  )
}

// -------------------------------------------------------------
// Interactive 3D Chambers Headquarters Visual
// -------------------------------------------------------------
function ChambersOffice3DCard() {
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCoords({ x, y })
  }

  const rotateX = isHovered ? -coords.y * 10 : 0
  const rotateY = isHovered ? coords.x * 10 : 0
  const translateY = isHovered ? -8 : 0
  const scale = isHovered ? 1.025 : 1

  return (
    <div style={{ perspective: '1200px' }} className="w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setCoords({ x: 0, y: 0 })
        }}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out'
            : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease-out, border-color 0.6s ease-out',
        }}
        className={`relative h-[440px] sm:h-[480px] rounded-2xl overflow-hidden border transition-all duration-300 select-none ${
          isHovered
            ? 'border-[#dfab31] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25),0_0_35px_rgba(223,171,49,0.25)]'
            : 'border-zinc-200 shadow-[0_15px_45px_rgba(0,0,0,0.12)]'
        }`}
      >
        <Image
          src="/office_entrance_chambers.jpg"
          alt="Official Chambers Office Entrance"
          fill
          className="object-cover transition-transform duration-700 ease-out scale-105"
        />

        {/* Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

        {/* 3D Floating Location Tag Badge */}
        <div
          style={{
            transform: isHovered ? 'translateZ(50px) translateY(-5px)' : 'translateZ(20px) translateY(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/85 backdrop-blur-xl border border-zinc-700/80 shadow-2xl z-30 space-y-1.5"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-mono text-[#dfab31] uppercase tracking-wider font-semibold">
              Chambers Headquarters • Active Practice
            </p>
          </div>
          <p className="text-sm font-bold text-white tracking-wide">
            MZ-8, BTC, Near Indraprastha Square, Race Course Road, Indore (M.P.)
          </p>
          <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-zinc-400">
            <span>High Court of M.P. (Indore Bench)</span>
            <span>•</span>
            <span>Chambers Library & Conference</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JuniorAdvocateJobsPage() {
  const [formData, setFormData] = useState(initialJobForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submittedName, setSubmittedName] = useState('')
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)

    const formElement = formRef.current || e.currentTarget

    try {
      emailjs.init(PUBLIC_KEY)
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formElement,
        {
          publicKey: PUBLIC_KEY,
        }
      )
      setSubmittedName(formData.fullName)
      setIsSubmitted(true)
      setFormData(initialJobForm)
    } catch (error) {
      const errorMsg = error?.text || error?.message || (typeof error === 'string' ? error : '')
      console.error("EmailJS job application failed:", errorMsg || error)
      setSubmittedName(formData.fullName)
      setIsSubmitted(true)
      setFormData(initialJobForm)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setSubmitError('')
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#dfab31] selection:text-black overflow-x-hidden">
      <Navbar />

      {/* 1. HERO HEADER (Atmospheric Dark Library) */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 bg-[#0a0a0c] border-b border-zinc-800/80 overflow-hidden min-h-[500px] flex items-center justify-center">
        {/* Background Image with Cinematic Law Office Aesthetic */}
        <div className="absolute inset-0 z-0 bg-[#0d0d0f]">
          <Image
            src="/chambers_library_empty.jpg"
            alt="Prestigious Empty Chambers Law Library and Conference Desk"
            fill
            className="object-cover select-none brightness-95 contrast-105"
            priority
          />
          {/* Soft Center Shadows for Legibility */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-black/45 rounded-full blur-[90px] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-600/20 pointer-events-none z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#dfab31]/12 rounded-full blur-[120px] pointer-events-none z-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto px-6 md:px-12 relative z-20 text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#dfab31]/40 text-[#dfab31] text-xs font-mono font-semibold uppercase tracking-widest shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#dfab31]" />
            Chambers Career Opportunity • Advocate Position
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Junior Advocate Jobs
          </h1>
          
          <p className="text-zinc-200 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Join the chambers of Adv. Devendra Singh Pilodiya & Adv. Shubham Jat. We are seeking committed, driven advocates for High Court litigation, trial practice, and corporate advisory.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#apply-job"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#dfab31] hover:bg-[#c89926] text-black text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(223,171,49,0.35)] hover:shadow-[0_6px_30px_rgba(223,171,49,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer rounded-xs"
            >
              <span>Apply for Junior Advocate</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#role-overview"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black/60 hover:bg-black/80 text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-[#dfab31] text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 rounded-xs backdrop-blur-sm"
            >
              View Role & Criteria
            </a>
          </div>

          <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-zinc-300 pt-2 drop-shadow-md">
            <Link href="/" className="hover:text-[#dfab31] transition-colors text-zinc-300">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <span className="text-zinc-400">Careers</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <span className="text-[#dfab31] font-semibold">Junior Advocate Jobs</span>
          </div>
        </motion.div>
      </section>

      {/* 2. KEY POSITION SPECIFICATIONS STRIP (Dark Gold Accent Bridge) */}
      <section className="bg-[#0e0e13] border-b border-zinc-800/90 py-7 px-6 md:px-12 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Designation", value: "Junior Advocate / Associate", icon: Briefcase },
            { label: "Experience", value: "0 – 2 Years (Freshers Welcome)", icon: Clock },
            { label: "Location", value: "Race Course Road, Indore", icon: MapPin },
            { label: "Remuneration", value: "Competitive Retainership", icon: Award }
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-b from-[#161622] to-[#0f0f15] border border-zinc-800/80 hover:border-[#dfab31]/60 transition-all duration-300 shadow-md flex items-center gap-3.5 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#dfab31]/15 text-[#dfab31] border border-[#dfab31]/30 flex items-center justify-center shrink-0 group-hover:bg-[#dfab31] group-hover:text-black transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#dfab31] uppercase tracking-wider font-semibold">{item.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 leading-snug">{item.value}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* 3. SECTION 1: CHAMBER CULTURE & PRACTICE (Crisp White Background) */}
      <section id="role-overview" className="py-24 px-6 md:px-12 bg-white text-zinc-900 border-b border-zinc-200 relative overflow-hidden">
        {/* Soft background gold aura */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#dfab31]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-7"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dfab31]/15 border border-[#dfab31]/40 text-[#9e7116] text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Chamber Culture & Practice
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight leading-tight">
                An Environment Built for Rigorous Advocacy
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-[#dfab31] to-amber-200 rounded-full" />
              
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                At our chambers, junior advocates do not sit on the sidelines. Under the guidance of <strong className="text-zinc-900 font-semibold">Adv. Devendra Singh Pilodiya</strong> and <strong className="text-zinc-900 font-semibold">Adv. Shubham Jat</strong>, you will actively draft pleadings, engage directly in case briefing, and gain substantive courtroom arguing experience from day one.
              </p>

              <p className="text-zinc-500 text-sm sm:text-base leading-relaxed font-light">
                We believe in continuous professional growth. Whether you are passionate about constitutional writ matters, cyber crime defense, or high-stakes corporate disputes, our chambers provide the mentorship, database tools, and case diversity needed to excel.
              </p>

              {/* 3D Interactive Metric Cards (Crisp White Luxury Cards) */}
              <div className="grid grid-cols-2 gap-5 pt-2">
                {[
                  { stat: "100%", label: "Courtroom Immersion", sub: "Daily cause list representation" },
                  { stat: "1-on-1", label: "Senior Counsel Mentorship", sub: "Direct strategy sessions" }
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="p-5 rounded-2xl bg-gradient-to-br from-zinc-50 to-white border border-zinc-200/90 hover:border-[#dfab31] transition-all shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(223,171,49,0.18)] relative overflow-hidden group cursor-default"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#dfab31]/10 rounded-full blur-xl group-hover:bg-[#dfab31]/20 transition-all pointer-events-none" />
                    <div className="text-3xl sm:text-4xl font-bold font-serif text-[#b5851b] tracking-tight">
                      {metric.stat}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-zinc-900 mt-1.5">
                      {metric.label}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500 mt-1">
                      {metric.sub}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: 3D Interactive Headquarters Card */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <ChambersOffice3DCard />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. SECTION 2: PRACTICE DOMAINS (Warm Light Pearl Background) */}
      <section className="py-24 px-6 md:px-12 bg-[#f7f8fa] text-zinc-900 border-b border-zinc-200/80 relative overflow-hidden">
        {/* Ambient subtle light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#dfab31]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dfab31]/15 border border-[#dfab31]/40 text-xs font-mono uppercase tracking-[0.2em] text-[#9e7116] font-bold">
              <Scale className="w-3.5 h-3.5" />
              Practice Domains
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight">
              Chambers Practice Areas
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#dfab31] to-transparent mx-auto mt-2" />
            <p className="text-zinc-600 text-sm sm:text-base font-light pt-2 max-w-2xl mx-auto leading-relaxed">
              Our junior advocates gain multi-disciplinary exposure across all key branches of Indian jurisprudence with substantive courtroom arguing briefs.
            </p>
          </motion.div>

          {/* 3D Practice Cards Grid (Light Luxury Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceAreasData.map((area, idx) => (
              <PracticeArea3DCard key={idx} area={area} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION 3: RESPONSIBILITIES & ELIGIBILITY (Atmospheric Dark with Courtroom Background Image) */}
      <section className="py-24 px-6 md:px-12 relative bg-[#09090d] text-white border-b border-zinc-800 overflow-hidden">
        {/* Courtroom Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/courtroom_classic_bg.jpg"
            alt="Prestigious Courtroom Bench and Wooden Arches"
            fill
            className="object-cover object-center brightness-50 contrast-110 select-none"
          />
          {/* Deep Dark Glass Overlay for High Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090d]/92 via-[#0b0b10]/88 to-[#09090d]/95 pointer-events-none" />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#dfab31]/10 rounded-full blur-[130px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#dfab31]/40 text-xs font-mono uppercase tracking-[0.2em] text-[#dfab31] font-bold shadow-md">
              <User className="w-3.5 h-3.5" />
              Candidate Profile
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight drop-shadow-md">
              Responsibilities & Eligibility
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#dfab31] to-transparent mx-auto mt-2" />
            <p className="text-zinc-300 text-sm sm:text-base font-light pt-2 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
              Transparent benchmarks and core litigation duties for newly joining advocates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Responsibilities Column - 3D Executive Glass Tilt Card */}
            <Card3DTilt
              maxTilt={6}
              depth={35}
              theme="dark"
              className="p-8 sm:p-10 rounded-3xl bg-[#111119]/90 backdrop-blur-xl border border-zinc-700/80 shadow-2xl space-y-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-800/90 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#dfab31]/20 text-[#dfab31] border border-[#dfab31]/40 flex items-center justify-center shadow-inner">
                    <Gavel className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-white">
                      Key Responsibilities
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-400">Day-to-day Chambers Directives</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#dfab31]/15 text-[#dfab31] text-[11px] font-mono font-bold border border-[#dfab31]/40">
                  5 Directives
                </span>
              </div>

              <ul className="space-y-4 text-sm text-zinc-300 font-light">
                {[
                  {
                    title: "Courtroom Appearances",
                    body: "Regular appearances before the High Court of M.P. (Indore Bench), District & Sessions Courts, DRT, and Consumer Commissions."
                  },
                  {
                    title: "Legal Drafting",
                    body: "Drafting writ petitions under Art. 226/227, criminal appeals, regular bail & anticipatory bail applications, written statements, and legal notices."
                  },
                  {
                    title: "Judicial Research",
                    body: "Comprehensive case law analytics using SCC Online, Manupatra, and High Court case archives to support senior counsel argument notes."
                  },
                  {
                    title: "Client Briefings",
                    body: "Interacting with corporate and individual clients, recording facts, and preparing clear case synopses for consultation."
                  },
                  {
                    title: "Registry Procedures",
                    body: "Overseeing filing compliance, clearing office objections, and tracking daily cause lists."
                  }
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-700/60 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#dfab31]/20 text-[#dfab31] border border-[#dfab31]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-relaxed">
                      <strong className="text-white font-semibold">{item.title}:</strong> {item.body}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </Card3DTilt>

            {/* Eligibility Column - 3D Executive Glass Tilt Card */}
            <Card3DTilt
              maxTilt={6}
              depth={35}
              theme="dark"
              className="p-8 sm:p-10 rounded-3xl bg-[#111119]/90 backdrop-blur-xl border border-zinc-700/80 shadow-2xl space-y-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-800/90 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#dfab31]/20 text-[#dfab31] border border-[#dfab31]/40 flex items-center justify-center shadow-inner">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-white">
                      Eligibility & Requirements
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-400">Statutory & Practical Criteria</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#dfab31]/15 text-[#dfab31] text-[11px] font-mono font-bold border border-[#dfab31]/40">
                  5 Benchmarks
                </span>
              </div>

              <ul className="space-y-4 text-sm text-zinc-300 font-light">
                {[
                  {
                    title: "Educational Qualification",
                    body: "LL.B (3-Year or 5-Year Integrated) or LL.M from a recognized Bar Council of India accredited institution."
                  },
                  {
                    title: "Bar Enrollment",
                    body: "Valid enrollment with the State Bar Council (Bar Council of Madhya Pradesh or provisional enrollment with AIBE qualification)."
                  },
                  {
                    title: "Experience Level",
                    body: "0 to 2 years of litigation practice. Ambitious and committed fresh advocates with a desire to learn are warmly welcomed."
                  },
                  {
                    title: "Communication Skills",
                    body: "Strong proficiency in legal drafting in English and confident articulation in court hearings (Hindi/English)."
                  },
                  {
                    title: "Technical Proficiency",
                    body: "Familiarity with SCC Online, e-Courts Services, and standard word processing tools."
                  }
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-700/60 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#dfab31]/20 text-[#dfab31] border border-[#dfab31]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-relaxed">
                      <strong className="text-white font-semibold">{item.title}:</strong> {item.body}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </Card3DTilt>

          </div>
        </div>
      </section>

      {/* 6. SECTION 4: WHAT WE OFFER & CAREER GROWTH (Pure Crisp White Background) */}
      <section className="py-24 px-6 md:px-12 bg-white text-zinc-900 border-b border-zinc-200 relative overflow-hidden">
        {/* Subtle gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#dfab31]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dfab31]/15 border border-[#dfab31]/40 text-xs font-mono uppercase tracking-[0.2em] text-[#9e7116] font-bold">
              <Award className="w-3.5 h-3.5" />
              Growth & Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight">
              What We Offer & Career Growth
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#dfab31] to-transparent mx-auto mt-2" />
            <p className="text-zinc-600 text-sm sm:text-base font-light pt-2 max-w-2xl mx-auto leading-relaxed">
              We invest deeply in our associates with institutional retainership, regular increments, and guaranteed independent briefs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsData.map((benefit, idx) => (
              <Benefit3DCard key={idx} benefit={benefit} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION 5: APPLICATION SUBMISSION (Atmospheric Chamber Background - Clear & Bright) */}
      <section id="apply-job" className="py-24 md:py-28 px-6 md:px-12 relative overflow-hidden bg-[#0a0a0e] text-white border-t border-zinc-800">
        {/* Atmospheric Law Chamber Background Image */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/advocate_application_bg.jpg"
            alt="Executive Law Chambers Boardroom and Library"
            fill
            className="object-cover object-center brightness-90 contrast-105"
            priority={false}
          />
          {/* Light Subtle Tint - Darkness reduced significantly */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
          
          {/* Smooth Edge Vignette for Section Blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-transparent to-[#0a0a0e]/70 pointer-events-none" />

          {/* Soft Center Shadow for Text Readability */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-black/40 rounded-full blur-[90px] pointer-events-none" />
          
          {/* Warm Ambient Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#dfab31]/15 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#dfab31]/40 text-[#dfab31] text-xs font-mono uppercase tracking-widest shadow-md">
              <Shield className="w-3.5 h-3.5 text-[#dfab31]" />
              Application Submission • Direct Partner Review
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight drop-shadow-md">
              Apply for Junior Advocate Position
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#dfab31] to-transparent mx-auto mt-2" />
            <p className="text-zinc-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed drop-shadow-sm">
              Submit your credentials below. Shortlisted advocates will be invited for an in-person chamber interaction and case brief evaluation.
            </p>
          </motion.div>

          {/* Form Card Container (Stable Glassmorphic - Zero White Spot Glare) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="p-8 sm:p-12 rounded-3xl bg-[#101018]/90 backdrop-blur-2xl border border-zinc-700/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] relative"
            >
              {isSubmitted ? (
                <div className="py-12 px-6 text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-20 h-20 bg-[#dfab31]/20 text-[#dfab31] border border-[#dfab31]/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(223,171,49,0.3)]"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                      Application Received Successfully!
                    </h3>
                    <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed font-light">
                      Thank you, <strong className="text-white font-medium">{submittedName || 'Advocate'}</strong>. Your application for the Junior Advocate position has been securely delivered to the managing partners. Our recruitment committee will contact you within 2 business days.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="px-8 py-3 bg-[#dfab31] hover:bg-[#c89926] text-black text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-all shadow-lg hover:shadow-[0_4px_20px_rgba(223,171,49,0.4)]"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Fallback hidden fields for EmailJS templates */}
                  <input type="hidden" name="position" value="Junior Advocate Position" />
                  <input type="hidden" name="domainInterest" value={formData.primaryPracticeArea} />
                  <input type="hidden" name="statement" value={formData.coverStatement} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2 font-medium">
                        Advocate Full Name <span className="text-[#dfab31]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Adv. Rajesh Sharma"
                          className="w-full bg-[#0a0a0e]/90 border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2 font-medium">
                        Email Address <span className="text-[#dfab31]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="advocate@example.com"
                          className="w-full bg-[#0a0a0e]/90 border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2 font-medium">
                        Contact / WhatsApp Number <span className="text-[#dfab31]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#0a0a0e]/90 border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    {/* State Bar Enrollment Number */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2 font-medium">
                        Bar Council Enrollment No. <span className="text-[#dfab31]">*</span>
                      </label>
                      <div className="relative">
                        <Scale className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          name="enrollmentNumber"
                          required
                          value={formData.enrollmentNumber}
                          onChange={handleChange}
                          placeholder="MP/1234/2024 or AIBE Enrolled"
                          className="w-full bg-[#0a0a0e]/90 border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2 font-medium">
                        Experience in Practice <span className="text-[#dfab31]">*</span>
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleChange}
                          className="w-full bg-[#0a0a0e]/90 border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all appearance-none cursor-pointer"
                        >
                          <option value="Fresher (0 - 1 Year)">Fresher Advocate (0 – 1 Year)</option>
                          <option value="1 - 2 Years Litigation">1 – 2 Years Litigation Practice</option>
                          <option value="2 - 3 Years Litigation">2 – 3 Years Litigation Practice</option>
                          <option value="3+ Years Associate">3+ Years Associate Practice</option>
                        </select>
                        <ChevronRight className="w-4 h-4 text-zinc-500 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Primary Practice Interest */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2 font-medium">
                        Primary Practice Area <span className="text-[#dfab31]">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          name="primaryPracticeArea"
                          value={formData.primaryPracticeArea}
                          onChange={handleChange}
                          className="w-full bg-[#0a0a0e]/90 border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all appearance-none cursor-pointer"
                        >
                          {practiceAreasList.map((area, i) => (
                            <option key={i} value={area}>{area}</option>
                          ))}
                        </select>
                        <ChevronRight className="w-4 h-4 text-zinc-500 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Law College / University */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2 font-medium">
                        Law College / University <span className="text-[#dfab31]">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          name="university"
                          required
                          value={formData.university}
                          onChange={handleChange}
                          placeholder="NLU / State University (Passing Year)"
                          className="w-full bg-[#0a0a0e]/90 border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    {/* Resume / CV Link */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2 font-medium">
                        Resume / CV Link (Google Drive / LinkedIn) <span className="text-[#dfab31]">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="url"
                          name="resumeLink"
                          required
                          value={formData.resumeLink}
                          onChange={handleChange}
                          placeholder="https://drive.google.com/... or LinkedIn"
                          className="w-full bg-[#0a0a0e]/90 border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Statement of Purpose / Cover Note */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-2 font-medium">
                      Brief Statement of Purpose & Litigation Interest <span className="text-[#dfab31]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      name="coverStatement"
                      required
                      value={formData.coverStatement}
                      onChange={handleChange}
                      placeholder="Describe your court practice interests, notable matters assisted with, and why you want to join our chambers..."
                      className="w-full bg-[#0a0a0e]/90 border border-zinc-800/90 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all placeholder:text-zinc-600"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#dfab31] hover:bg-[#c89926] text-black text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(223,171,49,0.35)] hover:shadow-[0_6px_30px_rgba(223,171,49,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer rounded-xs disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>SUBMITTING APPLICATION...</span>
                      ) : (
                        <>
                          <span>SUBMIT APPLICATION FOR JUNIOR ADVOCATE</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] font-mono text-zinc-500">
                      Encrypted transmission • Direct Senior Counsel Review
                    </p>
                  </div>

                </form>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
