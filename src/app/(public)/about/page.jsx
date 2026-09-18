'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer'
import { motion } from 'framer-motion'
import {
  ChevronRight, ChevronLeft, ArrowRight, Shield, Users, Landmark, Scale,
  Check, Facebook, Twitter, Linkedin, Instagram, Sparkles, Award,
  FileText, Search, Gavel, Mail, Eye, X
} from 'lucide-react'

// Team Data
const lawyerTeam = [
  {
    name: "Fynley Wilkinson",
    role: "Managing Partner",
    image: "/team_lawyer_1.jpg",
    bio: "Specializing in High Court appellate litigation and commercial dispute resolution with 22+ years of trial experience."
  },
  {
    name: "Sasha Welsh",
    role: "Senior Partner",
    image: "/experience_attorney.jpg",
    bio: "Advising Fortune 500 multinationals and emerging enterprises on cross-border M&A and regulatory compliance."
  },
  {
    name: "John Shepard",
    role: "Associate",
    image: "/team_lawyer_3.jpg",
    bio: "Dedicated advocate in white-collar criminal defense, property title verification, and statutory arbitration."
  }
]

// Gallery Data - 6 Unique Real Office Chamber Photos
const galleryItems = [
  {
    id: 1,
    title: "Chambers Entrance & Official Board",
    category: "Chambers & Office",
    image: "/gallery/office_entrance_chambers.jpg",
    description: "Official chambers of Adv. Devendra Singh Pilodiya & Adv. Shubham Jat at Race Course Road, Indore. Practice in Civil, Criminal, Cyber & Corporate Law."
  },
  {
    id: 2,
    title: "Advocate Chamber & Justice Glass Door",
    category: "Chambers & Office",
    image: "/gallery/office_justice_chamber_door.jpg",
    description: "Inner chamber entrance featuring Lady of Justice frosted glass artwork leading into the primary consultation workspace."
  },
  {
    id: 3,
    title: "Senior Partner Executive Chamber",
    category: "Chambers & Office",
    image: "/gallery/office_cabin_main.jpg",
    description: "Dedicated executive desk and private counsel chamber for confidential case briefings, client consultations, and litigation strategy."
  },
  {
    id: 4,
    title: "Counsel Strategy Desk & Workspace",
    category: "Chambers & Office",
    image: "/gallery/office_cabin_desk.jpg",
    description: "Strategic workspace equipped for rigorous case review, statutory references, client hearings, and legal dispute analysis."
  },
  {
    id: 5,
    title: "Executive Consultation Suite",
    category: "Consultation Lounge",
    image: "/gallery/office_consultation_desk.jpg",
    description: "Spacious advocate chamber equipped with client briefing desk, consultation couch, and litigation review area."
  },
  {
    id: 6,
    title: "Litigation Case Records & Legal Archives",
    category: "Legal Archives",
    image: "/gallery/office_legal_archives.jpg",
    description: "Extensive physical archive of running litigation dossiers, case precedent binders, statutory volumes, and research workstations."
  }
]

// 3D Interactive Card Component for Gallery with Popup Animation
function Gallery3DCard({ item, onClick }) {
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    // Relative cursor coordinates from center: -1 to +1
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCoords({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCoords({ x: 0, y: 0 })
  }

  // Realistic 3D Tilt angles (up to 12 degrees)
  const rotateX = isHovered ? -coords.y * 12 : 0
  const rotateY = isHovered ? coords.x * 12 : 0
  const scale = isHovered ? 1.05 : 1
  const translateY = isHovered ? -10 : 0

  return (
    <div
      className="w-full"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out'
            : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease-out, border-color 0.6s ease-out',
        }}
        className={`group relative h-72 sm:h-80 md:h-88 rounded-2xl overflow-hidden cursor-pointer border bg-[#141418] select-none ${
          isHovered
            ? 'border-[#dfab31] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(223,171,49,0.35)] z-20'
            : 'border-zinc-800/80 shadow-2xl z-10'
        }`}
      >
        {/* Clean, Full-Visibility Photo - NO text overlay */}
        <Image
          src={item.image}
          alt={item.title || "Office Chamber"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center select-none transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* 3D Specular Light Glare on Hover */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${(coords.x * 0.5 + 0.5) * 100}% ${(coords.y * 0.5 + 0.5) * 100}%, rgba(255,255,255,0.9) 0%, rgba(223,171,49,0.2) 35%, transparent 70%)`,
          }}
        />

        {/* 3D Floating Popup View Badge on Hover */}
        <div
          style={{
            transform: isHovered ? 'translateZ(50px) scale(1)' : 'translateZ(0px) scale(0.8)',
            transformStyle: 'preserve-3d',
          }}
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-[#dfab31]/80 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(223,171,49,0.4)] text-white">
            <Eye className="w-4 h-4 text-[#dfab31]" />
            <span className="text-xs font-mono font-semibold tracking-wider text-zinc-100 uppercase">
              Click to View
            </span>
          </div>
        </div>

        {/* Subtle Golden Edge Ring on Hover */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl border-2 transition-colors duration-300 ${
            isHovered ? 'border-[#dfab31]/80' : 'border-transparent'
          }`}
        />
      </div>
    </div>
  )
}

// 3D Interactive Multi-Layer Collage for "Who We Are" Section
function WhoWeAre3DVisual() {
  const containerRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCoords({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setCoords({ x: 0, y: 0 })
  }

  // 3D tilt angles (up to 10 degrees)
  const rotateX = isHovered ? -coords.y * 10 : 0
  const rotateY = isHovered ? coords.x * 10 : 0

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative pb-10 sm:pb-14 select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Tilting Stage */}
      <div
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out'
            : 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="relative w-full"
      >
        {/* Main Image: Indian Advocates in Legal Chamber */}
        <div
          style={{
            transform: isHovered ? 'translateZ(20px) scale(1.02)' : 'translateZ(0px) scale(1)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-out, border-color 0.5s ease-out',
          }}
          className={`relative w-full h-[360px] sm:h-[430px] md:h-[460px] overflow-hidden rounded-2xl border transition-all duration-500 bg-zinc-900 ${
            isHovered
              ? 'border-[#dfab31] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45),0_0_35px_rgba(223,171,49,0.25)]'
              : 'border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
          }`}
        >
          <Image
            src="/who_we_are_chamber_no_people.jpg"
            alt="Law Firm Executive Partner Consultation Chamber and Library Desk"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center select-none transition-transform duration-700 ease-out"
            priority
          />
        </div>

        {/* Overlapping Gold "2500+ Solved Cases" Badge - 3D Pop Out */}
        <div
          style={{
            transform: isHovered
              ? `translateZ(65px) translateX(${-coords.x * 8}px) translateY(${-coords.y * 8}px) scale(1.04)`
              : 'translateZ(30px) translateX(0px) translateY(0px) scale(1)',
            transformStyle: 'preserve-3d',
            transition: isHovered
              ? 'transform 0.15s ease-out, box-shadow 0.3s ease-out'
              : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-out',
          }}
          className="absolute -bottom-6 -left-3 sm:-left-6 bg-[#dfab31] p-6 sm:p-8 rounded-xl shadow-[0_20px_45px_rgba(0,0,0,0.3),0_0_25px_rgba(223,171,49,0.35)] text-white z-30 space-y-1 border border-amber-300/40"
        >
          <span className="block text-4xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-none drop-shadow-md">
            2500+
          </span>
          <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-zinc-950">
            Solved Cases
          </span>
        </div>

        {/* Overlapping Inset Courtroom Image - 3D Pop Out */}
        <div
          style={{
            transform: isHovered
              ? `translateZ(55px) translateX(${coords.x * 10}px) translateY(${coords.y * 10}px) scale(1.05)`
              : 'translateZ(25px) translateX(0px) translateY(0px) scale(1)',
            transformStyle: 'preserve-3d',
            transition: isHovered
              ? 'transform 0.15s ease-out, box-shadow 0.3s ease-out'
              : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-out',
          }}
          className="absolute -bottom-8 -right-3 sm:-right-6 w-44 sm:w-56 h-28 sm:h-36 overflow-hidden rounded-xl shadow-[0_25px_50px_rgba(0,0,0,0.35)] border-4 border-white z-30 bg-zinc-900"
        >
          <Image
            src="/court_hero_banner.jpg"
            alt="Scales and Gavel"
            fill
            sizes="250px"
            className="object-cover object-center select-none"
          />
        </div>

      </div>
    </div>
  )
}

// 3D Interactive Card Component for Lawyer Team with Staggered Entrance
function LawyerTeam3DCard({ member, index }) {
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

  // 3D Tilt angles (up to 8 degrees)
  const rotateX = isHovered ? -coords.y * 8 : 0
  const rotateY = isHovered ? coords.x * 8 : 0
  const translateY = isHovered ? -12 : 0
  const scale = isHovered ? 1.03 : 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out'
            : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease-out, border-color 0.6s ease-out',
        }}
        className={`group flex flex-col justify-between text-center bg-white border transition-all duration-500 p-4 pb-7 rounded-2xl select-none ${
          isHovered
            ? 'border-[#dfab31] shadow-[0_28px_65px_-12px_rgba(0,0,0,0.18),0_0_35px_rgba(223,171,49,0.22)]'
            : 'border-zinc-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.06)]'
        }`}
      >
        {/* Photo Container with 3D Pop Out & Rounded Corners */}
        <div
          style={{
            transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s ease-out',
          }}
          className="relative h-[340px] sm:h-[390px] w-full overflow-hidden rounded-xl bg-zinc-900"
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108 select-none"
          />

          {/* Dynamic 3D Specular Light Glare */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
            style={{
              opacity: isHovered ? 0.35 : 0,
              background: `radial-gradient(circle at ${(coords.x * 0.5 + 0.5) * 100}% ${(coords.y * 0.5 + 0.5) * 100}%, rgba(255,255,255,0.9) 0%, rgba(223,171,49,0.2) 35%, transparent 70%)`,
            }}
          />

          {/* Golden Social Icons Bar Floating in 3D */}
          <div
            style={{
              transform: isHovered
                ? `translateZ(50px) translateX(-50%) translateY(-6px) scale(1.05)`
                : 'translateZ(10px) translateX(-50%) translateY(0px) scale(1)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            className="absolute bottom-0 left-1/2 bg-[#dfab31] px-5 py-2.5 rounded-t-xl flex items-center gap-4 text-zinc-950 shadow-xl z-20 border-t border-x border-amber-300/40"
          >
            <a href="#" className="hover:text-white hover:scale-125 transition-all duration-200 cursor-pointer" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5 fill-current" />
            </a>
            <a href="#" className="hover:text-white hover:scale-125 transition-all duration-200 cursor-pointer" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5 fill-current" />
            </a>
            <a href="#" className="hover:text-white hover:scale-125 transition-all duration-200 cursor-pointer" aria-label="LinkedIn">
              <Linkedin className="w-3.5 h-3.5 fill-current" />
            </a>
            <a href="#" className="hover:text-white hover:scale-125 transition-all duration-200 cursor-pointer" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Name & Role & Bio with 3D Elevation */}
        <div
          style={{
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s ease-out',
          }}
          className="space-y-2 pt-3 px-3"
        >
          <h3 className="text-xl font-bold font-serif text-zinc-900 tracking-wide group-hover:text-[#dfab31] transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-[#dfab31] text-xs font-mono font-semibold uppercase tracking-wider">
            {member.role}
          </p>
          <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed pt-1">
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// 3D Interactive Process Card Component for "Request Quote, Investigation, Case Fight"
const processStepsData = [
  {
    step: "01",
    phaseTag: "PHASE 01 // CASE INTAKE",
    title: "Request Quote & Merit Evaluation",
    icon: FileText,
    badgeText: "Merit Analysis",
    description: "Submit your legal matter for a prompt, attorney-client privileged assessment. Our senior partners evaluate statutory feasibility, outline procedural strategy, and provide transparent milestone fee structures with zero hidden surprises.",
    highlights: [
      "100% Confidential Case Briefing",
      "Statutory Merits & Risk Assessment",
      "Fixed Milestone & Fee Transparency"
    ],
    ctaText: "Request Consultation",
    ctaLink: "/appointment"
  },
  {
    step: "02",
    phaseTag: "PHASE 02 // EVIDENCE DISCOVERY",
    title: "Investigation & Forensic Discovery",
    icon: Search,
    badgeText: "Due Diligence",
    description: "Exhaustive legal investigation to uncover critical documentation, review opposition contentions, benchmark high-court precedents, and assemble an unassailable factual dossier prior to courtroom submissions.",
    highlights: [
      "Documentary & Precedent Discovery",
      "Opposition Vulnerability Analysis",
      "Airtight Legal Drafting & Petitions"
    ],
    ctaText: "Explore Investigation Strategy",
    ctaLink: "/appointment"
  },
  {
    step: "03",
    phaseTag: "PHASE 03 // TRIAL ADVOCACY",
    title: "Case Fight & Court Representation",
    icon: Gavel,
    badgeText: "Relentless Advocacy",
    description: "Formidable, persuasive oral advocacy before High Courts, District Tribunals, and Appellate Benches. We deploy sharp cross-examination, urgent injunctive motions, and relentless courtroom stamina to secure favorable decrees.",
    highlights: [
      "High Court & Appellate Counsel",
      "Interim Injunctions & Stay Relief",
      "Relentless Cross-Examination"
    ],
    ctaText: "Consult Trial Advocates",
    ctaLink: "/appointment"
  }
]

function Process3DCard({ item, index }) {
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

  const rotateX = isHovered ? -coords.y * 9 : 0
  const rotateY = isHovered ? coords.x * 9 : 0
  const translateY = isHovered ? -12 : 0
  const scale = isHovered ? 1.025 : 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="w-full relative"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out'
            : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease-out, border-color 0.6s ease-out',
        }}
        className={`group relative flex flex-col justify-between h-full bg-white rounded-2xl border transition-all duration-500 p-7 sm:p-8 select-none overflow-hidden ${
          isHovered
            ? 'border-[#dfab31] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12),0_0_35px_rgba(223,171,49,0.2)] z-20'
            : 'border-zinc-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.05)] z-10'
        }`}
      >
        {/* Subtle Top Glowing Golden Accent Line on Hover */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dfab31] to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Ambient Warm Watermark Number in Background */}
        <span
          style={{
            transform: isHovered ? 'translateZ(10px) scale(1.05)' : 'translateZ(0px) scale(1)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s ease-out',
          }}
          className="absolute -bottom-4 -right-2 text-8xl sm:text-9xl font-serif font-black text-zinc-900/[0.04] group-hover:text-[#dfab31]/10 select-none pointer-events-none transition-colors duration-500 leading-none"
        >
          {item.step}
        </span>

        {/* Top Header: Floating Step Badge & 3D Icon */}
        <div className="space-y-6 relative z-10">
          <div className="flex items-center justify-between gap-3">
            {/* Phase Tag */}
            <span
              style={{
                transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease-out',
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#dfab31]/15 text-[#b07d12] border border-[#dfab31]/35 shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-[#dfab31]" />
              {item.phaseTag}
            </span>

            {/* Badge */}
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-400">
              {item.badgeText}
            </span>
          </div>

          {/* 3D Floating Icon Box */}
          <div
            style={{
              transform: isHovered ? 'translateZ(45px) scale(1.06)' : 'translateZ(15px) scale(1)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#dfab31]/20 via-[#dfab31]/10 to-transparent border border-[#dfab31]/40 flex items-center justify-center text-[#dfab31] shadow-md group-hover:bg-[#dfab31] group-hover:text-black transition-colors duration-400"
          >
            <item.icon className="w-8 h-8 transition-transform duration-400 group-hover:rotate-6" />
          </div>

          {/* Title & Description */}
          <div
            style={{
              transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s ease-out',
            }}
            className="space-y-3"
          >
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-zinc-900 group-hover:text-[#dfab31] transition-colors duration-300 leading-snug">
              {item.title}
            </h3>
            <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Highlights Checklist */}
          <div
            style={{
              transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s ease-out',
            }}
            className="pt-4 pb-2 border-t border-zinc-100 space-y-2.5"
          >
            {item.highlights.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-700 font-medium">
                <div className="w-4 h-4 rounded-full bg-[#dfab31]/15 text-[#b07d12] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div
          style={{
            transform: isHovered ? 'translateZ(35px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.35s ease-out',
          }}
          className="pt-6 relative z-10"
        >
          <Link
            href={item.ctaLink}
            className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono font-bold uppercase tracking-wider group-hover:bg-[#dfab31] group-hover:text-black transition-all duration-300 shadow-md group-hover:shadow-lg"
          >
            <span>{item.ctaText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutUsPage() {
  const [activeExpTab, setActiveExpTab] = useState('attorneys')
  const [imageOffset, setImageOffset] = useState(0)
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)

  const galleryCategories = ['All', 'Chambers & Office', 'Consultation Lounge', 'Legal Archives']

  const filteredGalleryItems = activeGalleryFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeGalleryFilter)
  const experienceRef = useRef(null)

  // Lightbox Next/Prev Handlers
  const handlePrevLightbox = (e) => {
    e?.stopPropagation()
    if (!lightboxItem) return
    const currentIndex = filteredGalleryItems.findIndex(item => item.id === lightboxItem.id)
    const prevIndex = (currentIndex - 1 + filteredGalleryItems.length) % filteredGalleryItems.length
    setLightboxItem(filteredGalleryItems[prevIndex])
  }

  const handleNextLightbox = (e) => {
    e?.stopPropagation()
    if (!lightboxItem) return
    const currentIndex = filteredGalleryItems.findIndex(item => item.id === lightboxItem.id)
    const nextIndex = (currentIndex + 1) % filteredGalleryItems.length
    setLightboxItem(filteredGalleryItems[nextIndex])
  }

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxItem) return
      if (e.key === 'Escape') setLightboxItem(null)
      if (e.key === 'ArrowLeft') handlePrevLightbox()
      if (e.key === 'ArrowRight') handleNextLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxItem, filteredGalleryItems])

  // Smooth scroll listener to make the image appear static in the background while page scrolls naturally
  useEffect(() => {
    const handleScroll = () => {
      if (experienceRef.current) {
        const rect = experienceRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        if (rect.top < windowHeight && rect.bottom > 0) {
          const sectionMiddle = rect.top + rect.height / 2
          const windowMiddle = windowHeight / 2
          const diffFromCenter = sectionMiddle - windowMiddle
          // Counter-scroll translation keeps the image static on the screen
          setImageOffset(-diffFromCenter * 0.45)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tabContent = {
    attorneys: {
      text: "Our attorneys are the cornerstone of our commitment to providing exceptional legal services. Each member of our team brings a wealth of experience, specialized knowledge, and a deep dedication to achieving the best outcomes for our clients. We pride ourselves on our collaborative approach, ensuring that every case benefits from the collective expertise of our diverse legal team."
    },
    expertise: {
      text: "With decades of combined courtroom trial experience and cross-border commercial negotiation, our multidisciplinary practice handles high-stakes disputes with precision and strategic foresight. From complex constitutional writ petitions to corporate restructuring, we ensure rigorous legal protection."
    },
    firm: {
      text: "Founded on the pillars of unyielding integrity, fearless advocacy, and client devotion, Justica has evolved into a premier national practice. We bridge traditional legal wisdom with modern technological analytics to deliver winning strategies for institutions, businesses, and individuals."
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#dfab31] selection:text-black overflow-x-clip">
      
      <Navbar />

      {/* 1. HERO BANNER */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-28 bg-[#0a0a0c] border-b border-zinc-800/80 overflow-hidden min-h-[420px] flex items-center justify-center">
        {/* Background Image with Transparent Overlays */}
        <div className="absolute inset-0 z-0 bg-[#0d0d0f]">
          <Image
            src="/about_hero_banner_no_people.jpg"
            alt="Prestigious Judicial Chamber and Law Library"
            fill
            className="object-cover object-center select-none brightness-95 contrast-105"
            priority
          />
          {/* Soft dark shadow directly in the center to make white text pop clearly while keeping image bright */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-black/28 rounded-full blur-[80px] pointer-events-none z-10" />
          {/* Light subtle edge fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/30 pointer-events-none z-10" />
          {/* Subtle warm orange shadow like home page banner */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/16 via-transparent via-50% to-orange-600/16 pointer-events-none z-10" />
          {/* Very subtle warm gold ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#dfab31]/8 rounded-full blur-[120px] pointer-events-none z-10" />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-20 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            About Us
          </h1>
          
          <div className="space-y-2">
            <p className="text-zinc-200 text-lg sm:text-xl font-serif tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              Reputation. Respect. Result.
            </p>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto shadow-sm" />
          </div>

          <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-zinc-300 pt-3 drop-shadow-md">
            <Link href="/" className="hover:text-[#dfab31] transition-colors text-zinc-300">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <span className="text-[#dfab31] font-semibold">About Us</span>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE SECTION (Left text slide-in, Right image slide-in & 3D Interactive Visual) */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column - Slides in from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-3">
              <span className="block text-xs font-bold tracking-[0.25em] text-[#dfab31] font-mono uppercase">
                WHO WE ARE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight leading-tight">
                Your partner for legal
              </h2>
            </div>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
              Explore innovative strategies, expert guidance, and tailored solutions to propel your success forward. Whether navigating intricate corporate transactions, resolving courtroom litigation, or safeguarding family legacy, our mission is to deliver uncompromising excellence.
            </p>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
              At Justica, we bridge traditional legal wisdom with modern strategic analytics. Every advocate in our firm brings specialized courtroom expertise, ensuring that our clients receive authoritative counsel and formidable representation at every turn.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/appointment"
                className="bg-[#dfab31] hover:bg-[#c89926] text-black font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-[0_4px_25px_rgba(223,171,49,0.35)] hover:shadow-[0_6px_30px_rgba(223,171,49,0.5)] cursor-pointer rounded-xs"
              >
                Schedule Consultation
              </Link>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                <Shield className="w-4 h-4 text-[#dfab31]" />
                <span>100% Confidential & Privileged</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Collage - Slides in from RIGHT with 3D Interactive Animation */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-6"
          >
            <WhoWeAre3DVisual />
          </motion.div>

        </div>
      </section>

      {/* 3. FEATURES SECTION (Compact Height, Natural Page Scroll & Static Parallax Background Image) */}
      <section ref={experienceRef} className="bg-[#111113] text-zinc-100 relative overflow-hidden border-t border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[560px] items-stretch">
          
          {/* Left Column: Lawyer Image with Static Parallax Counter-Scroll */}
          <div className="relative w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-full overflow-hidden bg-[#16161a]">
            <div 
              className="absolute -inset-y-28 inset-x-0 will-change-transform transition-transform duration-75 ease-out"
              style={{ transform: `translate3d(0, ${imageOffset}px, 0)` }}
            >
              <Image
                src="/hero_lawyer_library.jpg"
                alt="Justica Senior Legal Counsel"
                fill
                className="object-cover select-none"
                style={{ objectPosition: 'center 38%' }}
                priority
              />
            </div>
          </div>

          {/* Right Column: Text content with balanced compact height */}
          <div className="flex flex-col justify-center py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-14 xl:px-20 space-y-6 max-w-2xl">
            <div className="space-y-2.5">
              <span className="block text-xs font-bold tracking-[0.25em] text-[#dfab31] font-mono uppercase">
                FEATURES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight leading-[1.18]">
                Let Our Experience <br className="hidden sm:block" />
                be Your Guide
              </h2>
            </div>

            {/* Tabs Selector matching Image 2 */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setActiveExpTab('attorneys')}
                className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold tracking-normal transition-all duration-300 rounded-xs cursor-pointer ${
                  activeExpTab === 'attorneys'
                    ? 'bg-[#dfab31] text-black shadow-[0_2px_15px_rgba(223,171,49,0.35)]'
                    : 'text-white hover:text-[#dfab31] bg-transparent'
                }`}
              >
                Our Attorneys
              </button>

              <button
                type="button"
                onClick={() => setActiveExpTab('expertise')}
                className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold tracking-normal transition-all duration-300 rounded-xs cursor-pointer ${
                  activeExpTab === 'expertise'
                    ? 'bg-[#dfab31] text-black shadow-[0_2px_15px_rgba(223,171,49,0.35)]'
                    : 'text-white hover:text-[#dfab31] bg-transparent'
                }`}
              >
                Our Expertise
              </button>

              <button
                type="button"
                onClick={() => setActiveExpTab('firm')}
                className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold tracking-normal transition-all duration-300 rounded-xs cursor-pointer ${
                  activeExpTab === 'firm'
                    ? 'bg-[#dfab31] text-black shadow-[0_2px_15px_rgba(223,171,49,0.35)]'
                    : 'text-white hover:text-[#dfab31] bg-transparent'
                }`}
              >
                Our Firm
              </button>
            </div>

            {/* Dynamic Tab Description - Clean, seamless text matching Image 2 */}
            <div className="space-y-6 pt-1">
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                {tabContent[activeExpTab].text}
              </p>

              {/* Key Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5 border-t border-zinc-800/70">
                <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dfab31]" />
                  <span>Senior Supreme Court Counsel</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dfab31]" />
                  <span>35+ Years Combined Practice</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dfab31]" />
                  <span>100% Confidential Advisory</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dfab31]" />
                  <span>Multi-jurisdictional Defense</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR LAWYER TEAM SECTION (Staggered Entrance & 3D Interactive Animation) */}
      <section className="bg-white text-zinc-900 py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="space-y-16">
          
          {/* Section Header with smooth entrance animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="block text-xs font-bold tracking-[0.25em] text-[#dfab31] font-mono uppercase">
              LEGAL PRACTITIONERS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight">
              Our Lawyer Team
            </h2>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto" />
            <p className="text-zinc-600 text-sm sm:text-base font-light">
              Seasoned legal practitioners bringing decades of courtroom advocacy and strategic consultation.
            </p>
          </motion.div>

          {/* 3 Lawyer Cards Grid with Staggered 3D Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {lawyerTeam.map((member, idx) => (
              <LawyerTeam3DCard
                key={idx}
                member={member}
                index={idx}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4.5 OUR GALLERY SECTION (Dark Theme) */}
      <section id="gallery" className="py-24 md:py-32 px-6 md:px-12 bg-[#0d0d0f] border-t border-zinc-800/80 text-zinc-100 overflow-hidden relative scroll-mt-20">
        {/* Subtle warm ambient glow in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#dfab31]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="block text-xs font-bold tracking-[0.25em] text-[#dfab31] font-mono uppercase">
              OUR GALLERY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Our Law Chambers & Office Infrastructure
            </h2>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto" />
            <p className="text-zinc-400 text-sm sm:text-base font-light pt-1">
              Take a visual tour inside our advocate chambers, executive consultation suites, client lounge, and litigation archives at Race Course Road, Indore.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveGalleryFilter(cat)}
                className={`px-4 sm:px-5 py-2 text-xs font-mono font-semibold tracking-wide uppercase transition-all duration-300 rounded-xs cursor-pointer ${
                  activeGalleryFilter === cat
                    ? 'bg-[#dfab31] text-zinc-950 shadow-[0_2px_15px_rgba(223,171,49,0.35)]'
                    : 'bg-[#141418] text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Image Grid with 3D Popup Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGalleryItems.map((item) => (
              <Gallery3DCard
                key={item.id}
                item={item}
                onClick={() => setLightboxItem(item)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
          onClick={() => setLightboxItem(null)}
        >
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrevLightbox}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 hover:bg-[#dfab31] text-white hover:text-black flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer shadow-xl hover:scale-105"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNextLightbox}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 hover:bg-[#dfab31] text-white hover:text-black flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer shadow-xl hover:scale-105"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl w-full bg-[#141418] border border-zinc-800 rounded-xs overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/75 hover:bg-[#dfab31] text-white hover:text-black flex items-center justify-center transition-colors duration-200 border border-white/20 cursor-pointer shadow-lg"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Counter Badge */}
            <div className="absolute top-4 left-4 z-30 px-3 py-1 bg-black/75 backdrop-blur-sm border border-white/10 rounded-xs text-xs font-mono text-zinc-300">
              {filteredGalleryItems.findIndex(item => item.id === lightboxItem.id) + 1} / {filteredGalleryItems.length}
            </div>

            {/* Modal Image */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-[#08080a] flex items-center justify-center">
              <Image
                src={lightboxItem.image}
                alt={lightboxItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Details Footer */}
            <div className="p-6 bg-[#0f0f11] border-t border-zinc-800 space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-[#dfab31] text-black text-[10px] font-mono font-bold tracking-widest uppercase rounded-xs">
                  {lightboxItem.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                {lightboxItem.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                {lightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. 20 YEARS EXPERIENCE BANNER (Dark Section with Background Picture) */}
      <section className="bg-[#0a0a0c] text-zinc-100 py-24 md:py-32 px-6 md:px-12 relative overflow-hidden mt-16 md:mt-24 border-0">
        {/* Background Image with Reduced Darkness for Clear Photo Visibility */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/parallax_scales.jpg"
            alt="Law Practice Experience Background"
            fill
            className="object-cover object-center select-none brightness-100 contrast-105"
          />
          {/* Light subtle overlay so the background picture is clearly visible and vibrant */}
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 pointer-events-none" />
          {/* Subtle warm gold ambient glow */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-[#dfab31]/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* Big Framed 20 Years Box */}
          <div className="lg:col-span-4">
            <div className="p-8 sm:p-10 text-center rounded-2xl bg-black/60 backdrop-blur-xl border border-[#dfab31]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(223,171,49,0.2)] relative overflow-hidden transition-all duration-300 hover:border-[#dfab31]/80 group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#dfab31]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfab31]/20 border border-[#dfab31]/40 text-[#dfab31] text-[10px] font-mono font-bold tracking-widest uppercase mb-3">
                <Award className="w-3 h-3" />
                <span>ESTABLISHED 2004</span>
              </div>

              <span className="block text-6xl sm:text-7xl lg:text-8xl font-bold font-serif text-white tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
                20
              </span>
              <span className="block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#dfab31] font-mono mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Years of Legal Excellence
              </span>
              <p className="text-zinc-300 text-xs font-light pt-2 max-w-xs mx-auto">
                Two decades of high-stakes courtroom litigation, statutory advisory, and constitutional advocacy.
              </p>
            </div>
          </div>

          {/* Middle Heading */}
          <div className="lg:col-span-4 space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-[0.25em] text-[#dfab31] font-mono uppercase">
              <Sparkles className="w-3 h-3" />
              TRUSTED COUNSEL
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white tracking-tight leading-snug drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Justica is Your Best Partner for Complex Legal Solutions
            </h2>
            <div className="w-16 h-1 bg-[#dfab31] rounded-full" />
          </div>

          {/* Right Description & Quick Trust Pills */}
          <div className="lg:col-span-4 space-y-5">
            <p className="text-zinc-100 text-sm sm:text-base leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              We take pride in the depth and breadth of experience that our team of lawyers brings to the table. With years of dedicated practice in various areas of law, our attorneys have honed their skills, developed specialized knowledge, and earned a reputation for excellence in their respective fields.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 space-y-0.5">
                <span className="block text-xl font-bold font-serif text-[#dfab31]">2,500+</span>
                <span className="block text-[11px] font-mono text-zinc-300 uppercase tracking-wider">Litigation Victories</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 space-y-0.5">
                <span className="block text-xl font-bold font-serif text-[#dfab31]">99.2%</span>
                <span className="block text-[11px] font-mono text-zinc-300 uppercase tracking-wider">Client Trust Rate</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. PROCESS / ACTION CARDS (Request Quote, Investigation, Case Fight - Enhanced with 3D Physics) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#f8f9fa] text-zinc-900 border-b border-zinc-200/80 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#dfab31]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dfab31]/15 border border-[#dfab31]/35 text-[#b07d12] text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#dfab31]" />
              <span>Our Strategic Litigation Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight leading-tight">
              From Initial Briefing to Decisive Court Victory
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-light leading-relaxed">
              Every legal dispute requires tactical foresight, exhaustive evidence assembly, and fearless trial representation. Discover how our structured three-phase roadmap protects your interests from day one.
            </p>
          </div>

          {/* 3D Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {processStepsData.map((step, idx) => (
              <Process3DCard key={step.step} item={step} index={idx} />
            ))}
          </div>

          {/* Trust Assurance Strip under Cards */}
          <div className="mt-14 sm:mt-16 p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#dfab31]/15 text-[#dfab31] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-serif text-zinc-900">
                  Strict Confidentiality Assured
                </h4>
                <p className="text-xs text-zinc-500 font-light">
                  Protected under Section 126 of the Indian Evidence Act & professional privilege rules.
                </p>
              </div>
            </div>

            <div className="h-px md:h-10 w-full md:w-px bg-zinc-200" />

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#dfab31]/15 text-[#dfab31] flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-serif text-zinc-900">
                  Transparent Milestone Billing
                </h4>
                <p className="text-xs text-zinc-500 font-light">
                  Direct clarity on professional fees, stage-wise invoicing, and zero surprise surcharges.
                </p>
              </div>
            </div>

            <div className="h-px md:h-10 w-full md:w-px bg-zinc-200" />

            <Link
              href="/appointment"
              className="px-6 py-3 rounded-xl bg-[#dfab31] hover:bg-[#c99824] text-zinc-950 text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Book Consultation Now
            </Link>
          </div>

        </div>
      </section>

      {/* 7. CONSULTATION CALLOUT BANNER */}
      <section className="bg-[#dfab31] text-zinc-950 py-6 md:py-7 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-0.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-zinc-950 leading-tight">
              Require Dedicated Legal Representation or Advisory?
            </h3>
            <p className="text-zinc-900 font-medium text-xs sm:text-sm">
              Connect with our senior advocates for immediate case evaluation and strategic counsel.
            </p>
          </div>
          <Link
            href="/appointment"
            className="bg-black hover:bg-zinc-900 text-white font-bold text-[11px] sm:text-xs uppercase tracking-widest px-6 py-3 whitespace-nowrap transition-all duration-300 shadow-md rounded-xs hover:shadow-lg"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
