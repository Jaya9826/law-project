'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight, ChevronDown, Search, HelpCircle, Shield,
  Phone, Mail, ArrowRight, MessageSquare, Scale, CheckCircle2
} from 'lucide-react'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer'

// Comprehensive legal FAQ data categorized
const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'consultation', label: 'Consultation & Booking' },
  { id: 'privilege', label: 'Privilege & Confidentiality' },
  { id: 'fees', label: 'Fees & Retainers' },
  { id: 'practice', label: 'Practice Areas' },
  { id: 'careers', label: 'Internships & Careers' }
]

const allFaqs = [
  {
    category: 'consultation',
    question: "How do I schedule an initial case consultation with an advocate?",
    answer: "You can book a confidential consultation by submitting our Appointment form online or calling our direct helpline (+1 200 300 9000). Our intake committee will review your matter and confirm a meeting slot with senior legal counsel within 24 business hours."
  },
  {
    category: 'privilege',
    question: "Are consultation discussions protected by attorney-client privilege?",
    answer: "Yes, absolutely. All communications, case briefs, documents, and preliminary discussions are strictly protected under statutory attorney-client privilege from the very moment you reach out, regardless of whether formal engagement ensues."
  },
  {
    category: 'practice',
    question: "What areas of legal practice does Justica specialize in?",
    answer: "Justica offers specialized counsel across Corporate & Commercial Law, Civil & Criminal Litigation, Arbitration & Dispute Resolution, Real Estate & RERA, Intellectual Property, and Family & Matrimonial Law."
  },
  {
    category: 'fees',
    question: "How does Justica structure legal advisory and litigation fees?",
    answer: "We provide transparent, structured fee models tailored to each matter, including fixed retainers, stage-wise litigation milestones, and transaction advisory billing with zero hidden costs. Detailed fee quotes are provided post initial evaluation."
  },
  {
    category: 'careers',
    question: "Can law students and graduates apply for internships at Justica?",
    answer: "Yes! We run comprehensive, practical legal internship programs across Litigation, Corporate Advisory, and Legal Research throughout the year. You can visit our Internships page to submit your application directly online."
  },
  {
    category: 'consultation',
    question: "Do you offer virtual or video-conferencing consultations?",
    answer: "Yes, we regularly conduct secure video consultations via Zoom, Microsoft Teams, and Google Meet for outstation and international clients who cannot visit our chambers in person."
  },
  {
    category: 'privilege',
    question: "How does Justica safeguard sensitive case documents?",
    answer: "All case dossiers, digital evidence, and communication records are encrypted and stored in compliance with top-tier cybersecurity standards. Only the assigned defense team has access to your sensitive legal files."
  },
  {
    category: 'practice',
    question: "Can your firm represent matters before the Supreme Court and High Courts?",
    answer: "Yes, our Senior Advocates and Advocates-on-Record regularly appear before the Supreme Court of India, various State High Courts, National Tribunals (NCLAT, NCLT, NGT, NCDRC), and International Arbitration forums."
  },
  {
    category: 'fees',
    question: "Is there a consultation fee for the first evaluation meeting?",
    answer: "We offer a structured preliminary case evaluation. For specific standard inquiries, preliminary triage is complimentary. For deep-dive contractual or documentary scrutiny, a nominal structured advisory fee applies, credited against future retainers."
  },
  {
    category: 'careers',
    question: "What is the duration and selection process for legal internships?",
    answer: "Our internships typically span 4 to 8 weeks. Applications are reviewed by our litigation intake committee based on academic merit, research writing capability, and statement of purpose. Selected interns receive practical courtroom exposure."
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(0)

  // Filter FAQs based on active category and search query
  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#dfab31] selection:text-black overflow-x-clip">
      
      <Navbar />

      {/* 1. HERO BANNER (Cinematic Dark Banner) */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-28 bg-[#0a0a0c] border-b border-zinc-800/80 overflow-hidden min-h-[420px] flex items-center justify-center">
        {/* Background Image with Legal Knowledge Base & Law Library (No People) */}
        <div className="absolute inset-0 z-0 bg-[#0d0d0f]">
          <Image
            src="/faq_banner_no_people.jpg"
            alt="Justica Legal Knowledge Base & Law Library Archives"
            fill
            className="object-cover object-center select-none brightness-100 contrast-105"
            priority
          />
          {/* Soft dark shadow directly in the center to make white text pop clearly while keeping image bright */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-black/32 rounded-full blur-[80px] pointer-events-none z-10" />
          {/* Light subtle edge fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/30 pointer-events-none z-10" />
          {/* Warm gold ambient glow in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#dfab31]/10 rounded-full blur-[120px] pointer-events-none z-10" />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-20 text-center space-y-4">
          <span className="text-[#dfab31] text-xs font-mono font-bold tracking-[0.3em] uppercase block">
            KNOWLEDGE BASE & GUIDELINES
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Frequently Asked Questions
          </h1>
          
          <div className="space-y-2">
            <p className="text-zinc-200 text-base sm:text-lg font-light tracking-wide max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              Clear, transparent answers regarding case intake, court litigation, attorney-client privilege, and fee structures.
            </p>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto shadow-sm" />
          </div>

          <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-zinc-300 pt-3 drop-shadow-md">
            <Link href="/" className="hover:text-[#dfab31] transition-colors text-zinc-300">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <Link href="/about" className="hover:text-[#dfab31] transition-colors text-zinc-300">About</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <span className="text-[#dfab31] font-semibold">FAQ</span>
          </div>
        </div>
      </section>

      {/* 2. FAQ CONTENT SECTION WITH CLEAN WHITE BACKGROUND */}
      <div className="bg-white text-zinc-900 py-16 md:py-24">
        
        {/* Search & Categories Bar */}
        <div className="px-6 md:px-12 max-w-5xl mx-auto mb-12">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="w-5 h-5 text-zinc-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by keyword (e.g. consultation, privilege, fees, internship)..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xs pl-14 pr-5 py-4 text-sm text-zinc-900 focus:bg-white focus:outline-none focus:border-[#dfab31] focus:ring-2 focus:ring-[#dfab31]/20 transition-all placeholder:text-zinc-400 shadow-xs"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 justify-center">
            {faqCategories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setOpenIndex(0)
                  }}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-xs cursor-pointer ${
                    isActive
                      ? 'bg-[#dfab31] text-black shadow-md'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black border border-zinc-200'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Accordion FAQ List */}
        <div className="px-6 md:px-12 max-w-5xl mx-auto pb-20">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-zinc-50 border border-zinc-200 rounded-xs p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-zinc-400 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-zinc-900">No matching questions found</h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                We couldn&apos;t find any answer matching &quot;{searchQuery}&quot;. Please try another keyword or contact our legal team directly.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
                className="mt-3 px-6 py-2.5 bg-[#dfab31] text-black font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#c89926] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div
                    key={idx}
                    className={`border transition-all duration-300 rounded-xs overflow-hidden ${
                      isOpen
                        ? 'border-[#dfab31] bg-white shadow-md ring-1 ring-[#dfab31]/30'
                        : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                    >
                      <span className={`font-serif font-bold text-base sm:text-lg transition-colors ${
                        isOpen ? 'text-[#dfab31]' : 'text-zinc-900 group-hover:text-[#dfab31]'
                      }`}>
                        {faq.question}
                      </span>
                      <div
                        className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                          isOpen
                            ? 'bg-[#dfab31] text-black rotate-180'
                            : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200 group-hover:text-black'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-3 text-zinc-600 text-sm sm:text-[15px] font-light leading-relaxed border-t border-zinc-100 bg-zinc-50/60 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Still Have Questions CTA Box */}
        <div className="px-6 md:px-12 max-w-5xl mx-auto">
          <div className="relative bg-[#0d0d10] text-white border border-[#dfab31]/40 p-8 sm:p-12 rounded-xs overflow-hidden shadow-2xl">
            {/* Subtle Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfab31]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-2 max-w-xl">
                <span className="text-[#dfab31] text-xs font-mono font-bold tracking-widest uppercase block">
                  Direct Legal Assistance
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  Still have unanswered questions?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  Our senior advocates and legal counsel are here to assist with tailored advice for your specific legal dispute or transaction.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href="/appointment"
                  className="px-8 py-4 bg-[#dfab31] hover:bg-[#c89926] text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(223,171,49,0.35)] rounded-xs flex items-center gap-2 group cursor-pointer"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
