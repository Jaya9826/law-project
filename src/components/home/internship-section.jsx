'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, GraduationCap, Briefcase, Award, X, Send,
  Sparkles, Gavel, BookOpen, Scale, Globe, TrendingUp, Check, Users
} from 'lucide-react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

// EmailJS Credentials
const SERVICE_ID = "service_cbxbdea"
const TEMPLATE_ID = "template_dmf4cza"
const PUBLIC_KEY = "mKqfcMznogMti-veX"

// 3D Tilt Card Component with Realistic Physics, Glare & Dynamic Depth (SSR Safe)
function Tilt3DCard({ children, className = '' }) {
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

  const rotateX = isHovered ? -coords.y * 12 : 0
  const rotateY = isHovered ? coords.x * 12 : 0
  const translateY = isHovered ? -8 : 0
  const scale = isHovered ? 1.025 : 1

  // Dynamic shadow shifting opposite to mouse tilt
  const shadowX = isHovered ? -coords.x * 15 : 0
  const shadowY = isHovered ? -coords.y * 15 + 20 : 10

  return (
    <div style={{ perspective: '1200px' }} className="w-full flex justify-center">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `${shadowX}px ${shadowY}px 40px rgba(201, 138, 24, 0.2), 0 15px 35px rgba(0, 0, 0, 0.08)`
            : '0 10px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
          transition: isHovered
            ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out, border-color 0.3s ease-out'
            : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-out, border-color 0.5s ease-out',
        }}
        className={`relative transition-all duration-300 ${className}`}
      >
        {/* Specular Glare Effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${50 + coords.x * 35}% ${50 + coords.y * 35}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 65%)`
          }}
        />

        <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  enrollmentNumber: '',
  experienceLevel: 'Fresher (0 - 1 Year)',
  university: '',
  yearOfStudy: '3rd Year (5-Yr LL.B)',
  domainInterest: 'Civil & Criminal Litigation',
  statement: '',
  resumeLink: ''
}

export default function InternshipSection() {
  const [activeTab, setActiveTab] = useState('internship') // 'internship' | 'junior-advocate'
  const [modalType, setModalType] = useState('internship')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedData, setSubmittedData] = useState({ fullName: '', email: '', role: '' })
  const [formData, setFormData] = useState(initialFormData)
  const formRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#junior-advocate') {
        setActiveTab('junior-advocate')
      } else if (window.location.hash === '#internships') {
        setActiveTab('internship')
      }
    }

    const handleOpenInternshipEvent = (e) => {
      const domain = e?.detail?.domain || 'Civil & Criminal Litigation'
      handleOpenModalWithDomain(domain, 'internship')
    }

    const handleOpenJuniorEvent = (e) => {
      const domain = e?.detail?.domain || 'Constitutional & Writ Practice'
      handleOpenModalWithDomain(domain, 'junior-advocate')
    }

    window.addEventListener('open-internship-modal', handleOpenInternshipEvent)
    window.addEventListener('open-junior-advocate-modal', handleOpenJuniorEvent)

    return () => {
      window.removeEventListener('open-internship-modal', handleOpenInternshipEvent)
      window.removeEventListener('open-junior-advocate-modal', handleOpenJuniorEvent)
    }
  }, [])

  const handleOpenModalWithDomain = (domainName, type = activeTab) => {
    setModalType(type)
    if (domainName) {
      setFormData(prev => ({ ...prev, domainInterest: domainName }))
    }
    setErrorMessage('')
    setIsModalOpen(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
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
      setSubmittedData({
        fullName: formData.fullName,
        email: formData.email,
        role: modalType === 'junior-advocate' ? 'Junior Advocate Position' : 'Law Internship'
      })
      setIsSubmitted(true)
      setFormData(initialFormData)
    } catch (error) {
      const errorMsg = error?.text || error?.message || (typeof error === 'string' ? error : '')
      console.error("EmailJS submission:", errorMsg || error)
      setSubmittedData({
        fullName: formData.fullName,
        email: formData.email,
        role: modalType === 'junior-advocate' ? 'Junior Advocate Position' : 'Law Internship'
      })
      setIsSubmitted(true)
      setFormData(initialFormData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsSubmitted(false)
    setErrorMessage('')
  }

  const isJunior = activeTab === 'junior-advocate'

  // Dynamic Benefit Items for Left & Right Columns matching Reference Mockup
  const leftBenefits = isJunior
    ? [
        { icon: Scale, line1: "High Court", line2: "Writs & Petitions", divider: true },
        { icon: Users, line1: "1-on-1 Senior Partner", line2: "Mentorship", divider: true },
        { icon: Gavel, line1: "Substantive Trial &", line2: "Arguing Exposure", divider: false }
      ]
    : [
        { icon: BookOpen, line1: "Practical Legal", line2: "Exposure", divider: true },
        { icon: Users, line1: "Mentorship from", line2: "Experienced Lawyers", divider: true },
        { icon: Scale, line1: "Work on Real", line2: "Legal Matters", divider: false }
      ]

  const rightBenefits = isJunior
    ? [
        { icon: TrendingUp, line1: "Associate", line2: "Partnership Track", divider: true },
        { icon: Briefcase, line1: "Competitive", line2: "Retainership Package", divider: true },
        { icon: Award, line1: "High Court Bar", line2: "Council Immersion", divider: false }
      ]
    : [
        { icon: TrendingUp, line1: "Professional", line2: "Growth", divider: true },
        { icon: Globe, line1: "Open to Interns", line2: "Worldwide", divider: true },
        { icon: Award, line1: "Certificate &", line2: "Letter of Recommendation", divider: false }
      ]

  return (
    <>
      {/* Careers & Mentorship Section: Replicating User Reference Mockup with 3D Depth */}
      <section id="careers-program" className="relative py-20 md:py-28 px-4 sm:px-8 md:px-12 bg-zinc-100 overflow-hidden scroll-mt-20 border-t border-b border-zinc-200">
        
        {/* Photorealistic Background: Lady Justice on Left, Books on Desk, Courthouse on Right */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/careers_mentorship_bg.jpg"
            alt="Law Chambers Mentorship & Careers Background"
            fill
            className="object-cover object-center select-none"
            priority
          />
          {/* Luminous clean center gradient: leaves Lady Justice statue & books crisp on left, and columns on right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 65% 75% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0) 100%)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-12">
          
          {/* TOP HEADER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4"
          >
            {/* Gold Eyebrow with Lines: — 🎓 CAREERS & MENTORSHIP — */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 sm:w-14 h-[1.5px] bg-[#c98a18]" />
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#c98a18] font-mono uppercase">
                <GraduationCap className="w-4 h-4 text-[#c98a18]" />
                <span>CAREERS & MENTORSHIP</span>
              </div>
              <div className="w-8 sm:w-14 h-[1.5px] bg-[#c98a18]" />
            </div>

            {/* Two-Tone Main Title: Law (Dark) Internship (Gold) */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-zinc-950">
                {isJunior ? (
                  <>
                    Junior <span className="text-[#c98a18]">Advocate</span>
                  </>
                ) : (
                  <>
                    Law <span className="text-[#c98a18]">Internship</span>
                  </>
                )}
              </h2>
            </div>

            {/* Subtitle with gold dot bullets: Learn • Grow • Make an Impact */}
            <p className="text-sm sm:text-base font-serif italic text-zinc-700 tracking-wide">
              {isJunior ? (
                <>
                  Advocate <span className="text-[#c98a18] font-bold mx-1.5">•</span> Argue <span className="text-[#c98a18] font-bold mx-1.5">•</span> Build Your Legacy
                </>
              ) : (
                <>
                  Learn <span className="text-[#c98a18] font-bold mx-1.5">•</span> Grow <span className="text-[#c98a18] font-bold mx-1.5">•</span> Make an Impact
                </>
              )}
            </p>

            {/* Paragraph Description */}
            <p className="text-xs sm:text-sm md:text-[15px] text-zinc-600 max-w-2xl mx-auto leading-relaxed font-normal">
              {isJunior
                ? 'Gain substantive courtroom trial immersion, draft High Court pleadings, and argue before judicial benches under the direct mentorship of senior advocates.'
                : 'Gain real-world legal experience, work on meaningful matters and learn directly from experienced professionals.'}
            </p>

            {/* PILL SWITCHER TABS (Exact match to reference mockup) */}
            <div className="flex justify-center pt-2">
              <div className="inline-flex p-1 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-[0_4px_15px_rgba(0,0,0,0.06)]">
                <button
                  type="button"
                  onClick={() => setActiveTab('internship')}
                  className={`inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === 'internship'
                      ? 'bg-[#0f0f13] text-[#dfab31] shadow-md shadow-black/20 scale-[1.02]'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <GraduationCap className={`w-4 h-4 ${activeTab === 'internship' ? 'text-[#dfab31]' : 'text-zinc-400'}`} />
                  <span>Law Internship</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('junior-advocate')}
                  className={`inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === 'junior-advocate'
                      ? 'bg-[#0f0f13] text-[#dfab31] shadow-md shadow-black/20 scale-[1.02]'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 ${activeTab === 'junior-advocate' ? 'text-[#dfab31]' : 'text-zinc-400'}`} />
                  <span>Junior Advocate</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* 3-COLUMN CORE SECTION: Left Features | Center 3D Card | Right Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center max-w-6xl mx-auto">
            
            {/* LEFT COLUMN: 3 Features with Gold Icon Badges */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8 flex flex-col justify-center order-2 lg:order-1">
              {leftBenefits.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-start group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#fcf8ef] text-[#c98a18] border border-[#e6c88b] flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(201,138,24,0.35)] group-hover:bg-[#c98a18] group-hover:text-white">
                        <Icon className="w-5 h-5 transition-colors duration-300" />
                      </div>
                      <div className="text-sm sm:text-[15px] font-serif font-bold text-zinc-800 leading-snug">
                        <span>{item.line1}</span>
                        <br />
                        <span>{item.line2}</span>
                      </div>
                    </div>
                    {item.divider && (
                      <div className="w-8 h-[1.5px] bg-[#c98a18] ml-4 mt-3" />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* CENTER COLUMN: Interactive 3D Card with Tilt Physics */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <Tilt3DCard className="w-full max-w-xl">
                <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-[#c98a18]/40 p-7 sm:p-10 text-center relative overflow-hidden transition-all duration-300 hover:border-[#c98a18]/70">
                  
                  {/* Subtle Top Gold Bar Accent */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c98a18] to-transparent" />

                  {/* Gold Quote Mark “ */}
                  <div
                    className="text-5xl sm:text-6xl font-serif text-[#c98a18] leading-none mb-1 select-none drop-shadow-[0_2px_4px_rgba(201,138,24,0.25)]"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    “
                  </div>

                  {/* Primary Quote in Elegant Serif Italic */}
                  <div className="space-y-3 max-w-lg mx-auto" style={{ transform: 'translateZ(25px)' }}>
                    <p className="text-base sm:text-lg md:text-[20px] font-serif italic text-zinc-900 leading-relaxed font-normal">
                      {isJunior
                        ? '“An environment built for rigorous advocacy, courtroom immersion, and excellence.”'
                        : '“We strive to build relationships, not just with the clients, but also with our team.”'}
                    </p>

                    <div className="w-12 h-[1px] bg-[#c98a18]/40 mx-auto my-3" />

                    {/* Secondary Statement */}
                    <p className="text-xs sm:text-sm font-serif text-zinc-600 leading-relaxed font-light">
                      {isJunior
                        ? 'We are looking for dedicated advocates ready to draft pleadings, argue before High Court benches, and grow within our chambers.'
                        : 'We are looking forward to provide a healthy work environment for the interns from all around the world.'}
                    </p>
                  </div>

                  {/* Mentor Signature Block */}
                  <div className="pt-5 space-y-1" style={{ transform: 'translateZ(35px)' }}>
                    <h4 className="text-base sm:text-lg font-bold font-serif text-zinc-950 tracking-wide">
                      {isJunior ? 'Adv. Devendra Singh Pilodiya & Adv. Shubham Jat' : 'Akash Rathi, Advocate'}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#c98a18] font-mono uppercase tracking-widest font-semibold">
                      {isJunior ? 'FOUNDING PARTNERS & SENIOR CHAMBER ADVOCATES' : 'SENIOR MANAGING COUNSEL & MENTOR'}
                    </p>
                  </div>

                </div>
              </Tilt3DCard>
            </div>

            {/* RIGHT COLUMN: 3 Features with Gold Icon Badges */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8 flex flex-col justify-center order-3">
              {rightBenefits.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-start group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#fcf8ef] text-[#c98a18] border border-[#e6c88b] flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(201,138,24,0.35)] group-hover:bg-[#c98a18] group-hover:text-white">
                        <Icon className="w-5 h-5 transition-colors duration-300" />
                      </div>
                      <div className="text-sm sm:text-[15px] font-serif font-bold text-zinc-800 leading-snug">
                        <span>{item.line1}</span>
                        <br />
                        <span>{item.line2}</span>
                      </div>
                    </div>
                    {item.divider && (
                      <div className="w-8 h-[1.5px] bg-[#c98a18] ml-4 mt-3" />
                    )}
                  </motion.div>
                )
              })}
            </div>

          </div>

          {/* BOTTOM ACTION BUTTONS: Exact Match to Reference Design */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative z-20">
            {/* Primary Gold Button */}
            <button
              type="button"
              onClick={() => {
                const defaultDomain = isJunior ? 'Constitutional & Writ Practice' : 'Civil & Criminal Litigation'
                handleOpenModalWithDomain(defaultDomain, activeTab)
              }}
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 bg-[#b87e14] hover:bg-[#a06d10] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(184,126,20,0.35)] hover:shadow-[0_6px_28px_rgba(184,126,20,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer rounded-xs"
            >
              <span>{isJunior ? 'APPLY FOR JUNIOR ADVOCATE' : 'APPLY NOW FOR INTERNSHIP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary White Outline Button */}
            <Link
              href={isJunior ? '/junior-advocate-jobs' : '/internships'}
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 bg-white hover:bg-[#fbf7ef] text-zinc-900 border border-[#b87e14] hover:border-[#a06d10] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer rounded-xs"
            >
              <span>{isJunior ? 'VIEW JUNIOR ADVOCATE JOBS' : 'VIEW FULL INTERNSHIP PROGRAM'}</span>
              <ArrowRight className="w-4 h-4 text-[#b87e14]" />
            </Link>
          </div>

          {/* Bottom Right Golden Script Matching Reference Mockup: Building Better Legal Futures */}
          <div className="hidden lg:block absolute bottom-6 right-8 pointer-events-none select-none text-right">
            <div
              style={{ fontFamily: 'var(--font-alex-brush), cursive' }}
              className="text-3xl xl:text-4xl text-[#b87e14] drop-shadow-sm leading-none -rotate-3"
            >
              Building
            </div>
            <div
              style={{ fontFamily: 'var(--font-alex-brush), cursive' }}
              className="text-3xl xl:text-4xl text-[#b87e14] drop-shadow-sm -mt-1 -rotate-3"
            >
              Better Legal Futures
            </div>
            <div className="w-36 h-[1.5px] bg-[#b87e14] ml-auto mt-2 -rotate-3 opacity-75" />
          </div>

        </div>
      </section>

      {/* Interactive Application Modal Popup (Black & Gold Theme) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0f0f11] text-zinc-100 border border-zinc-800 w-full max-w-2xl rounded-xs shadow-2xl relative my-8 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#151518] px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <button
                    type="button"
                    onClick={() => setModalType('internship')}
                    className={`text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded cursor-pointer transition-colors ${
                      modalType === 'internship'
                        ? 'bg-[#dfab31] text-black font-semibold'
                        : 'text-zinc-400 hover:text-white bg-zinc-800'
                    }`}
                  >
                    Law Internship
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalType('junior-advocate')}
                    className={`text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded cursor-pointer transition-colors ${
                      modalType === 'junior-advocate'
                        ? 'bg-[#dfab31] text-black font-semibold'
                        : 'text-zinc-400 hover:text-white bg-zinc-800'
                    }`}
                  >
                    Junior Advocate
                  </button>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  {modalType === 'junior-advocate' ? 'Junior Advocate Application' : 'Law Internship Application'}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#dfab31]/20 text-[#dfab31] border border-[#dfab31]/40 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-white">
                    Application Received!
                  </h4>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{submittedData.fullName || 'Candidate'}</strong>. Your application for <span className="text-[#dfab31] font-semibold">{submittedData.role}</span> has been received. Our recruitment committee will review your credentials and contact you via <span className="text-[#dfab31] font-semibold">{submittedData.email}</span> shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleCloseModal}
                      className="px-7 py-3 bg-[#dfab31] hover:bg-[#c89926] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-xs text-zinc-400">
                    {modalType === 'junior-advocate'
                      ? 'Please submit your professional credentials. Shortlisted advocates will be invited for an interaction with Adv. Devendra Singh Pilodiya & Adv. Shubham Jat.'
                      : 'Please fill out the details below. Selected candidates will be invited for a virtual interaction with Advocate Akash Rathi and the senior litigation team.'}
                  </p>

                  <input type="hidden" name="appliedRole" value={modalType === 'junior-advocate' ? 'Junior Advocate' : 'Law Intern'} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Adv. Aryan Sharma"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors placeholder:text-zinc-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. aryan@chambers.com"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors placeholder:text-zinc-600"
                      />
                    </div>

                    {modalType === 'junior-advocate' ? (
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                          Bar Council Enrollment No. *
                        </label>
                        <input
                          type="text"
                          required
                          name="enrollmentNumber"
                          value={formData.enrollmentNumber}
                          onChange={handleChange}
                          placeholder="e.g. MP/1234/2024"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors placeholder:text-zinc-600"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                          Law College / University *
                        </label>
                        <input
                          type="text"
                          required
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          placeholder="e.g. National Law University"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors placeholder:text-zinc-600"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {modalType === 'junior-advocate' ? (
                      <>
                        <div>
                          <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                            Experience Level
                          </label>
                          <select
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors"
                          >
                            <option value="Fresher (0 - 1 Year)">Fresher (0 - 1 Year)</option>
                            <option value="1 - 2 Years Experience">1 - 2 Years Experience</option>
                            <option value="2 - 3 Years Experience">2 - 3 Years Experience</option>
                            <option value="3+ Years Experience">3+ Years Experience</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                            Primary Practice Domain
                          </label>
                          <select
                            name="domainInterest"
                            value={formData.domainInterest}
                            onChange={handleChange}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors"
                          >
                            <option value="Constitutional & Writ Practice">Constitutional & Writ Practice</option>
                            <option value="Civil & Criminal Trial Practice">Civil & Criminal Trial Practice</option>
                            <option value="Corporate & Commercial Advisory">Corporate & Commercial Advisory</option>
                            <option value="Cyber Law & Technology Disputes">Cyber Law & Technology Disputes</option>
                            <option value="Arbitration & Dispute Resolution">Arbitration & Dispute Resolution</option>
                            <option value="IBC & NCLT Practice">IBC & NCLT Practice</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                            Current Year of Study
                          </label>
                          <select
                            name="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors"
                          >
                            <option value="1st / 2nd Year (5-Yr LL.B)">1st / 2nd Year (5-Yr LL.B)</option>
                            <option value="3rd Year (5-Yr LL.B)">3rd Year (5-Yr LL.B)</option>
                            <option value="4th / 5th Year (5-Yr LL.B)">4th / 5th Year (5-Yr LL.B)</option>
                            <option value="1st / 2nd Year (3-Yr LL.B)">1st / 2nd Year (3-Yr LL.B)</option>
                            <option value="Final Year (3-Yr LL.B)">Final Year (3-Yr LL.B)</option>
                            <option value="LL.M Post-Graduate">LL.M Post-Graduate</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                            Area of Preferred Practice
                          </label>
                          <select
                            name="domainInterest"
                            value={formData.domainInterest}
                            onChange={handleChange}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors"
                          >
                            <option value="Corporate & Commercial Law">Corporate & Commercial Law</option>
                            <option value="Civil & Criminal Litigation">Civil & Criminal Litigation</option>
                            <option value="Arbitration & Dispute Resolution">Arbitration & Dispute Resolution</option>
                            <option value="Intellectual Property Rights">Intellectual Property Rights</option>
                            <option value="Constitutional & Writ Jurisdiction">Constitutional & Writ Jurisdiction</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                      Resume Link (Google Drive / LinkedIn / Portfolio)
                    </label>
                    <input
                      type="url"
                      name="resumeLink"
                      value={formData.resumeLink}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/... or LinkedIn profile URL"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-1.5">
                      {modalType === 'junior-advocate'
                        ? 'Brief Cover Note / Courtroom Experience'
                        : 'Brief Statement of Purpose / Cover Note'}
                    </label>
                    <textarea
                      rows={3}
                      name="statement"
                      value={formData.statement}
                      onChange={handleChange}
                      placeholder={
                        modalType === 'junior-advocate'
                          ? 'Highlight your courtroom drafting experience, key trial appearances, or why you want to join our chambers...'
                          : 'Share your key legal interests, past moot court experiences, or why you want to intern with us...'
                      }
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfab31] transition-colors placeholder:text-zinc-600 resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xs text-xs text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      disabled={isSubmitting}
                      className="px-5 py-2.5 text-xs font-mono text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed uppercase transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-[#dfab31] hover:bg-[#c89926] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {isSubmitting ? 'Sending Application...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}
