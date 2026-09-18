'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Shield, Users, Phone, Clock, Mail, CheckCircle2, ChevronRight, Scale,
  Lock, ArrowRight, Sparkles, FileText, User, Calendar, Award, Check
} from 'lucide-react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Navbar from "../../../components/layout/navbar/navbar"
import Footer from "../../../components/layout/footer/footer"

// EmailJS Credentials
const SERVICE_ID = "service_cbxbdea"
const TEMPLATE_ID = "template_al6o3fo"
const PUBLIC_KEY = "mKqfcMznogMti-veX"

// 3D Interactive Process Step Card
function ProcessStepCard({ item, idx }) {
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

  const rotateX = isHovered ? -coords.y * 8 : 0
  const rotateY = isHovered ? coords.x * 8 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setCoords({ x: 0, y: 0 })
      }}
      style={{ perspective: '1000px' }}
      className="w-full select-none"
    >
      <div
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'translateZ(18px)' : 'translateZ(0px)'}`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className={`p-8 sm:p-9 bg-black/70 backdrop-blur-md border rounded-2xl space-y-4 relative overflow-hidden transition-all duration-400 ${
          isHovered
            ? 'border-[#dfab31] shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(223,171,49,0.25)]'
            : 'border-white/15 shadow-xl'
        }`}
      >
        {/* Dynamic Specular Sheen Glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${(coords.x * 0.5 + 0.5) * 100}% ${(coords.y * 0.5 + 0.5) * 100}%, rgba(255,255,255,0.9) 0%, rgba(223,171,49,0.25) 40%, transparent 70%)`,
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-[#dfab31]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="text-4xl sm:text-5xl font-bold font-serif text-[#dfab31] leading-none drop-shadow-[0_2px_10px_rgba(223,171,49,0.5)]">
            {item.step}
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#dfab31]/15 border border-[#dfab31]/30 flex items-center justify-center text-[#dfab31]">
            {idx === 0 && <FileText className="w-5 h-5" />}
            {idx === 1 && <Scale className="w-5 h-5" />}
            {idx === 2 && <Users className="w-5 h-5" />}
          </div>
        </div>

        <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#dfab31] transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] pt-1">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          {item.description}
        </p>

        <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#dfab31]/90 uppercase tracking-wider">
          <span>Phase {idx + 1}</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
        </div>
      </div>
    </motion.div>
  )
}

export default function AppointmentPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    practiceArea: 'Civil & Criminal Litigation',
    preferredDate: '',
    message: ''
  })

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScrollButton = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', handleScrollButton)
    return () => window.removeEventListener('scroll', handleScrollButton)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)
    setSubmitError('')

    const formElement = e.currentTarget

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

      setFormSubmitted(true)
    } catch (error) {
      console.error("EmailJS appointment submission failed:", error)
      const errorMsg = error?.text || error?.message || ''
      setSubmitError(
        errorMsg
          ? `Unable to submit your appointment request: ${errorMsg}`
          : "Unable to submit your appointment request. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormSubmitted(false)
    setSubmitError('')
    setFormData({
      name: '',
      phone: '',
      email: '',
      practiceArea: 'Corporate & Commercial Law',
      preferredDate: '',
      message: ''
    })
  }

  const steps = [
    {
      step: "01",
      title: "Submit Case Details",
      description: "Fill out our encrypted intake form with your legal inquiry and preferred consultation schedule."
    },
    {
      step: "02",
      title: "Senior Counsel Review",
      description: "Our managing partners thoroughly analyze the facts, statutory merits, and jurisdiction before the call."
    },
    {
      step: "03",
      title: "Confidential Strategy Session",
      description: "Attend a private 1-on-1 strategy meeting to receive tailored legal advice and actionable next steps."
    }
  ]

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#dfab31] selection:text-black overflow-x-hidden relative">
      <Navbar />

      {/* 1. HERO BANNER - CLEAR LIGHTING & SOFT SUBTLE SHADOWS */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 bg-[#0a0a0c] border-b border-zinc-800/80 overflow-hidden min-h-[420px] flex items-center justify-center">
        {/* Background Image: Legal Consultation & Appointment Chamber Desk (No People) */}
        <div className="absolute inset-0 z-0 bg-[#0d0d0f]">
          <Image
            src="/appointment_banner_no_people.jpg"
            alt="Law Office Legal Consultation Desk Prepared for Appointment"
            fill
            className="object-cover object-center select-none brightness-95 contrast-105"
            priority
          />
          {/* Clean Subtle Overlay for Readability */}
          <div className="absolute inset-0 bg-black/35 pointer-events-none z-10" />

          {/* Gentle Edge Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/45 pointer-events-none z-10" />

          {/* Side soft contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent via-50% to-black/40 pointer-events-none z-10" />

          {/* Focused Soft Center Shadow for Text Readability */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-black/35 rounded-full blur-[80px] pointer-events-none z-10" />

          {/* Subtle gold ambient glow in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] bg-[#dfab31]/10 rounded-full blur-[110px] pointer-events-none z-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto px-6 md:px-12 relative z-20 text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#dfab31]/50 text-[#dfab31] text-xs font-mono font-semibold uppercase tracking-widest shadow-lg">
            <Shield className="w-3.5 h-3.5 text-[#dfab31]" />
            Confidential Case Evaluation & Intake
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
            Book An Appointment
          </h1>
          
          <p className="text-zinc-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Schedule a confidential consultation with our seasoned advocates to evaluate statutory merits, mitigate liabilities, and chart a winning legal roadmap.
          </p>

          <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-zinc-300 pt-2 drop-shadow-md">
            <Link href="/" className="hover:text-[#dfab31] transition-colors text-zinc-300">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <span className="text-[#dfab31] font-semibold">Appointment</span>
          </div>
        </motion.div>
      </section>

      {/* 2. MAIN APPOINTMENT FORM SECTION (Enhanced with 3D Card & Motion Physics) */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-zinc-50/60 text-zinc-900 border-t border-zinc-200 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Info, Trust Badges & Live Status */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-7"
          >
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dfab31]/12 border border-[#dfab31]/30 text-[#dfab31] text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Case Evaluation & Intake
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight leading-[1.15]">
                Get In Touch With Our Expert Legal Team
              </h2>
              
              <div className="w-16 h-1 bg-[#dfab31] rounded-full" />
              
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light pt-1">
                Facing complex legal challenges can be overwhelming. Schedule your confidential consultation today to evaluate statutory merits, mitigate liabilities, and chart a winning legal roadmap.
              </p>
            </div>

            {/* Live Intake Committee Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Intake Committee Active • Responses within 24 Hours</span>
            </div>

            {/* Interactive Feature Cards */}
            <div className="space-y-3.5 pt-2">
              
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-zinc-200/90 shadow-sm hover:border-[#dfab31] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-[#dfab31]/12 text-[#dfab31] flex items-center justify-center shrink-0 group-hover:bg-[#dfab31] group-hover:text-black transition-all duration-300 shadow-xs">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold font-serif text-zinc-900 group-hover:text-[#dfab31] transition-colors">
                    100% Confidential & Privileged
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light mt-1">
                    All discussions and submitted briefs are strictly protected under statutory attorney-client privilege.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-zinc-200/90 shadow-sm hover:border-[#dfab31] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-[#dfab31]/12 text-[#dfab31] flex items-center justify-center shrink-0 group-hover:bg-[#dfab31] group-hover:text-black transition-all duration-300 shadow-xs">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold font-serif text-zinc-900 group-hover:text-[#dfab31] transition-colors">
                    Direct Senior Attorney Review
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light mt-1">
                    A seasoned partner thoroughly reviews your facts and documentation prior to the initial strategy call.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-zinc-200/90 shadow-sm hover:border-[#dfab31] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-[#dfab31]/12 text-[#dfab31] flex items-center justify-center shrink-0 group-hover:bg-[#dfab31] group-hover:text-black transition-all duration-300 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold font-serif text-zinc-900 group-hover:text-[#dfab31] transition-colors">
                    Fast Response Guaranteed
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light mt-1">
                    Our intake committee reviews submissions and confirms meeting slots within 24 business hours.
                  </p>
                </div>
              </div>

            </div>

            {/* Direct Helpline Box with Ambient Amber Glow */}
            <div className="p-6 rounded-xl bg-[#0d0d10] border border-zinc-800 flex items-center justify-between shadow-2xl relative overflow-hidden group hover:border-[#dfab31]/60 transition-all duration-300">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#dfab31]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-[#dfab31] text-black rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="block text-[10px] text-[#dfab31] uppercase tracking-widest font-mono font-bold">
                      Direct Urgent Helpline
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <a href="tel:12003009000" className="text-lg sm:text-xl font-bold font-serif text-white hover:text-[#dfab31] transition-colors">
                    +1 200 300 9000
                  </a>
                </div>
              </div>

              <span className="text-[11px] font-mono text-zinc-400 hidden sm:block relative z-10">
                Mon - Sat / 9AM - 8PM
              </span>
            </div>

            {/* Trust Badges Footer */}
            <div className="flex items-center justify-between text-xs text-zinc-500 pt-1 font-mono">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfab31]" /> 2500+ Consultations
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfab31]" /> 98% Satisfaction
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfab31]" /> Zero Compromise
              </span>
            </div>

          </motion.div>

          {/* Right Column: Appointment Form (Executive Dark Glassmorphism 3D Card) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-gradient-to-b from-[#141419] via-[#101014] to-[#0a0a0d] text-zinc-100 border border-zinc-800/90 p-7 sm:p-10 md:p-12 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_35px_rgba(223,171,49,0.12)] relative overflow-hidden"
          >
            {/* Top Accent Gold Radiant Beam */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#dfab31] to-transparent" />
            
            {/* Ambient Corner Glows */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#dfab31]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2 mb-7">
              <div className="flex items-center justify-between">
                <span className="text-[#dfab31] text-xs font-mono font-bold tracking-widest uppercase block">
                  Confidential Case Booking
                </span>
                <span className="text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                  Avg. Response 45m
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Book Your Appointment
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                Fill in the form below and our senior legal counsel will contact you within 24 hours.
              </p>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-14 px-6 text-center space-y-6 bg-zinc-900/90 border border-[#dfab31]/40 rounded-xl"
              >
                <div className="w-16 h-16 bg-[#dfab31]/20 text-[#dfab31] border border-[#dfab31]/50 rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(223,171,49,0.35)]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold font-serif text-white">Appointment Request Received!</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name || 'Client'}</strong>. Your case reference has been logged. Our litigation intake committee will contact you at <span className="text-[#dfab31] font-semibold">{formData.phone || formData.email}</span> shortly.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={resetForm}
                    className="px-8 py-3.5 bg-[#dfab31] hover:bg-[#c89926] text-black text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(223,171,49,0.4)]"
                  >
                    Submit Another Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleAppointmentSubmit} className="space-y-4 sm:space-y-5 relative z-10">
                {/* EmailJS template variable fallbacks */}
                <input type="hidden" name="fullName" value={formData.name} />
                <input type="hidden" name="full_name" value={formData.name} />

                <input type="hidden" name="date" value={formData.preferredDate} />
                <input type="hidden" name="preferred_date" value={formData.preferredDate} />
                <input type="hidden" name="consultationDate" value={formData.preferredDate} />
                <input type="hidden" name="consultation_date" value={formData.preferredDate} />

                <input type="hidden" name="summary" value={formData.message} />
                <input type="hidden" name="briefSummary" value={formData.message} />
                <input type="hidden" name="brief_summary" value={formData.message} />
                <input type="hidden" name="caseSummary" value={formData.message} />
                <input type="hidden" name="case_summary" value={formData.message} />
                <input type="hidden" name="statement" value={formData.message} />

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-300 mb-1.5 font-medium">
                      Your Full Name <span className="text-[#dfab31]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Adv. Rajesh Sharma"
                        className="w-full bg-[#0a0a0e]/90 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 focus:bg-[#121217] transition-all duration-300 placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-300 mb-1.5 font-medium">
                      Phone / WhatsApp <span className="text-[#dfab31]">*</span>
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
                        className="w-full bg-[#0a0a0e]/90 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 focus:bg-[#121217] transition-all duration-300 placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Practice Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-300 mb-1.5 font-medium">
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
                        placeholder="name@organization.com"
                        className="w-full bg-[#0a0a0e]/90 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 focus:bg-[#121217] transition-all duration-300 placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-300 mb-1.5 font-medium">
                      Legal Practice Area <span className="text-[#dfab31]">*</span>
                    </label>
                    <div className="relative">
                      <Scale className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        name="practiceArea"
                        value={formData.practiceArea}
                        onChange={handleChange}
                        className="w-full bg-[#0a0a0e]/90 border border-zinc-800 rounded-xl pl-10 pr-8 py-3 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 focus:bg-[#121217] transition-all duration-300 appearance-none cursor-pointer"
                      >
                        <option value="Civil & Criminal Litigation">Civil & Criminal Litigation</option>
                        <option value="Constitutional Law Matters">Constitutional Law Matters</option>
                        <option value="Employment & Service Matter">Employment & Service Matter</option>
                        <option value="IPR (Intellectual Property Rights)">IPR (Intellectual Property Rights)</option>
                        <option value="Cyber Security & Technology Law">Cyber Security & Technology Law</option>
                        <option value="Corporate Law">Corporate Law</option>
                        <option value="Consumer Protection & Real Estate">Consumer Protection & Real Estate</option>
                        <option value="IBC (Insolvency & Bankruptcy Code)">IBC (Insolvency & Bankruptcy Code)</option>
                        <option value="Other Legal Issue">Other Specialized Legal Issue</option>
                      </select>
                      <ChevronRight className="w-4 h-4 text-zinc-500 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-300 mb-1.5 font-medium">
                    Preferred Consultation Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0e]/90 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 focus:bg-[#121217] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-300 mb-1.5 font-medium">
                    Brief Summary of Case / Matter
                  </label>
                  <div className="relative">
                    <textarea
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Provide a brief summary of the dispute, agreement, court forum, or key assistance required..."
                      className="w-full bg-[#0a0a0e]/90 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 focus:bg-[#121217] transition-all duration-300 placeholder:text-zinc-600 resize-none"
                    ></textarea>
                  </div>
                </div>

                {submitError && (
                  <div className="p-3.5 bg-red-950/50 border border-red-800 rounded-xl text-xs text-red-300">
                    {submitError}
                  </div>
                )}

                {/* Submit Button with Shimmer & Physics */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#dfab31] via-[#f3c64c] to-[#dfab31] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(223,171,49,0.35)] hover:shadow-[0_8px_35px_rgba(223,171,49,0.55)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer rounded-xl flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    {/* Shimmer sweep light */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                    
                    <span className="relative z-10 font-mono font-bold">
                      {isSubmitting ? "Transmitting Encrypted Request..." : "Submit Appointment Request"}
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform relative z-10" />
                  </button>
                </div>

                {/* Security Guarantee Note */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-mono pt-1 text-center">
                  <Lock className="w-3 h-3 text-[#dfab31]" />
                  <span>256-Bit SSL Encrypted • Strict Attorney-Client Privilege</span>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      {/* 3. HOW OUR CONSULTATION PROCESS WORKS (Parallax Background with 3D Step Cards) */}
      <section 
        className="relative py-24 md:py-32 px-6 md:px-12 bg-fixed bg-cover bg-center overflow-hidden border-t border-zinc-800"
        style={{ backgroundImage: "url('/parallax_scales.jpg')" }}
      >
        {/* Lighter Shading with Subtle Edge Glow */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/8 via-transparent via-50% to-orange-600/8 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <span className="text-[#dfab31] text-xs font-mono font-bold tracking-widest uppercase block">
              Streamlined & Confidential
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              How Our Consultation Process Works
            </h2>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto shadow-sm" />
            <p className="text-zinc-200 text-sm sm:text-base font-light leading-relaxed pt-1 max-w-2xl mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              A transparent, structured legal intake process designed to give you clarity and tactical advantage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, idx) => (
              <ProcessStepCard key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Widgets on Right Side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-1">
        <button className="bg-[#dfab31] hover:bg-[#c89926] text-white font-semibold text-[10px] tracking-wider px-3 py-2 rounded-l-sm shadow-md transition-colors uppercase font-mono">
          RTL
        </button>
        <button className="bg-[#dfab31] hover:bg-[#c89926] text-white p-2.5 rounded-l-sm shadow-md transition-colors flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03345 19.177 5.10904 19.4239 5.0452 19.6644L4.5 21.75C4.38202 22.2036 4.8021 22.5979 5.24434 22.4571L7.20141 21.8335C7.43579 21.7588 7.69123 21.8219 7.86874 21.9969C9.09914 22.6517 10.5057 23 12 22Z" />
          </svg>
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#dfab31] hover:bg-[#c89926] text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center focus:outline-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}

      <Footer />
    </div>
  )
}
