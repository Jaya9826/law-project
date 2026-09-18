'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight, ArrowRight, Facebook, Twitter, Linkedin, Instagram, Mail
} from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer'

// Team Data matching Justica Theme
const teamMembers = [
  {
    name: "Fynley Wilkinson",
    role: "MANAGING PARTNER",
    experience: "18+ Years Exp.",
    specialty: "Corporate Litigation & Commercial Disputes",
    image: "/team_lawyer_1.jpg",
    bio: "Consequat occaecat ullamco amet non eiusmod nostrud dolore irure incididunt est duis anim sunt officia. Fugiat velit proident aliquip nisi incididunt nostrud exercitation proident est nisi. Irure magna elit commodo anim ex veniam culpa eiusmod id nostrud sit cupidatat in veniam ad. Eiusmod consequat eu adipisicing minim anim aliquip cupidatat culpa excepteur quis. Occaecat sit eu exercitation irure Lorem incididunt nostrud.",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      email: "fynley@justica.com"
    }
  },
  {
    name: "Sasha Welsh",
    role: "SENIOR PARTNER",
    experience: "14+ Years Exp.",
    specialty: "Constitutional, Civil & Appellate Counsel",
    image: "/experience_attorney.jpg",
    bio: "Consequat occaecat ullamco amet non eiusmod nostrud dolore irure incididunt est duis anim sunt officia. Fugiat velit proident aliquip nisi incididunt nostrud exercitation proident est nisi. Irure magna elit commodo anim ex veniam culpa eiusmod id nostrud sit cupidatat in veniam ad. Eiusmod consequat eu adipisicing minim anim aliquip cupidatat culpa excepteur quis. Occaecat sit eu exercitation irure Lorem incididunt nostrud.",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      email: "sasha@justica.com"
    }
  },
  {
    name: "John Shepard",
    role: "ASSOCIATE COUNSEL",
    experience: "9+ Years Exp.",
    specialty: "Arbitration & Contractual Disputes",
    image: "/team_lawyer_3.jpg",
    bio: "Consequat occaecat ullamco amet non eiusmod nostrud dolore irure incididunt est duis anim sunt officia. Fugiat velit proident aliquip nisi incididunt nostrud exercitation proident est nisi. Irure magna elit commodo anim ex veniam culpa eiusmod id nostrud sit cupidatat in veniam ad. Eiusmod consequat eu adipisicing minim anim aliquip cupidatat culpa excepteur quis. Occaecat sit eu exercitation irure Lorem incididunt nostrud.",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      email: "john@justica.com"
    }
  }
]

// 3D Interactive Tilting Portrait Card
function TeamMember3DCard({ member, isEven }) {
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    // Normalizing coords from -1 to 1 based on card center
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCoords({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setCoords({ x: 0, y: 0 })
  }

  // Smooth responsive 3D tilt
  const rotateX = isHovered ? -coords.y * 10 : 0
  const rotateY = isHovered ? coords.x * 10 : 0

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Tilting Frame */}
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
        {/* Ambient Gold Glow Backdrop on Hover */}
        <div
          className={`absolute -inset-3 rounded-2xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(223,171,49,0.22) 0%, transparent 70%)',
            transform: 'translateZ(-15px)',
          }}
        />

        {/* Constrained Portrait Card */}
        <div
          style={{
            transform: isHovered ? 'translateZ(25px) scale(1.02)' : 'translateZ(0px) scale(1)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-out, border-color 0.4s ease-out',
          }}
          className={`relative w-full h-[350px] sm:h-[380px] md:h-[400px] rounded-2xl overflow-hidden border bg-zinc-950 transition-all duration-400 ${
            isHovered
              ? 'border-[#dfab31] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.38),0_0_25px_rgba(223,171,49,0.22)]'
              : 'border-zinc-200 shadow-[0_10px_25px_rgba(0,0,0,0.06)]'
          }`}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className={`object-cover object-top select-none transition-transform duration-700 ease-out ${
              isHovered ? 'scale-106' : 'scale-100'
            }`}
          />

          {/* Bottom Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          {/* Specular Light Glare following cursor */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
            style={{
              opacity: isHovered ? 0.38 : 0,
              background: `radial-gradient(circle at ${(coords.x * 0.5 + 0.5) * 100}% ${(coords.y * 0.5 + 0.5) * 100}%, rgba(255,255,255,0.95) 0%, rgba(223,171,49,0.3) 40%, transparent 70%)`,
            }}
          />

          {/* Bottom Subtle Pill inside Image */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/15 text-[#dfab31]">
              {member.role}
            </span>
          </div>
        </div>

        {/* 3D Floating Experience Badge */}
        {member.experience && (
          <div
            style={{
              transform: isHovered
                ? `translateZ(50px) translateX(${coords.x * 5}px) translateY(${coords.y * 5}px)`
                : 'translateZ(20px)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            className={`absolute -top-2.5 ${
              isEven ? '-right-2 sm:-right-2.5' : '-left-2 sm:-left-2.5'
            } bg-zinc-950/95 text-white border border-[#dfab31]/70 px-3 py-1 rounded-lg shadow-lg backdrop-blur-md flex items-center gap-1.5 pointer-events-none`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#dfab31] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#dfab31] tracking-wider">
              {member.experience}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// Single Team Member Row with Staggered Entrance Animations and Compact Spacing
function TeamMemberRow({ member, idx, isLast }) {
  const isEven = idx % 2 === 0

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 xl:gap-14 py-8 md:py-11 ${
        !isLast ? 'border-b border-zinc-200/70' : ''
      }`}
    >
      {/* Text Information Column (7 cols) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`lg:col-span-7 flex flex-col justify-center space-y-4 ${
          isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
        }`}
      >
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[2px] bg-[#dfab31]" />
            <span className="text-[#dfab31] text-xs font-mono font-bold tracking-[0.25em] uppercase">
              {member.role}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-zinc-900 tracking-tight leading-tight">
            {member.name}
          </h2>
          {member.specialty && (
            <p className="text-xs sm:text-sm font-medium text-zinc-500 font-mono tracking-wide">
              {member.specialty}
            </p>
          )}
        </div>

        <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
          {member.bio}
        </p>

        {/* Social Media Links */}
        <div className="flex items-center gap-2.5 pt-1 text-zinc-400">
          <a
            href={member.socials.facebook}
            className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center hover:border-[#dfab31] hover:text-[#dfab31] hover:bg-[#dfab31]/5 transition-all duration-300"
            aria-label={`${member.name} Facebook`}
          >
            <Facebook className="w-3.5 h-3.5 fill-current" />
          </a>
          <a
            href={member.socials.twitter}
            className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center hover:border-[#dfab31] hover:text-[#dfab31] hover:bg-[#dfab31]/5 transition-all duration-300"
            aria-label={`${member.name} Twitter`}
          >
            <Twitter className="w-3.5 h-3.5 fill-current" />
          </a>
          <a
            href={member.socials.linkedin}
            className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center hover:border-[#dfab31] hover:text-[#dfab31] hover:bg-[#dfab31]/5 transition-all duration-300"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin className="w-3.5 h-3.5 fill-current" />
          </a>
          <a
            href={member.socials.instagram}
            className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center hover:border-[#dfab31] hover:text-[#dfab31] hover:bg-[#dfab31]/5 transition-all duration-300"
            aria-label={`${member.name} Instagram`}
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a
            href={`mailto:${member.socials.email}`}
            className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center hover:border-[#dfab31] hover:text-[#dfab31] hover:bg-[#dfab31]/5 transition-all duration-300"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>

      {/* Image Column with Contained 3D Interactive Card (5 cols) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`lg:col-span-5 flex items-center justify-center ${
          isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
        }`}
      >
        <TeamMember3DCard member={member} isEven={isEven} />
      </motion.div>
    </div>
  )
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#dfab31] selection:text-black overflow-x-hidden">
      
      <Navbar />

      {/* 1. HERO BANNER - SLIGHTLY DARKER WITH WARM ORANGE SHADOW */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Background Image with Darker Cinematic Shading & Warm Orange Side Shadows */}
        <div className="absolute inset-0 z-0 bg-[#0d0d0f]">
          <Image
            src="/court_hero_banner.jpg"
            alt="The Team - Justica Counselors at Law"
            fill
            className="object-cover object-center select-none brightness-90 contrast-105"
            priority
          />
          {/* Moderate Dark Translucent Overlay across entire banner */}
          <div className="absolute inset-0 bg-black/45 pointer-events-none z-10" />

          {/* Deep Vertical Vignette Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none z-10" />

          {/* Warm Orange Shadow on Left and Right Edges matching Home Banner */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-transparent via-50% to-orange-600/30 pointer-events-none z-10" />

          {/* Soft Dark Shadow directly in the center to make text pop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-black/35 rounded-full blur-[80px] pointer-events-none z-10" />

          {/* Warm gold ambient glow in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#dfab31]/12 rounded-full blur-[120px] pointer-events-none z-10" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-20 space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
            The Team
          </h1>
          <p className="text-[#dfab31] text-xs sm:text-sm font-mono font-semibold tracking-[0.25em] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Reputation. Respect. Result.
          </p>

          <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-zinc-300 pt-5 drop-shadow-md">
            <Link href="/" className="hover:text-[#dfab31] transition-colors text-zinc-300">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <Link href="/about" className="hover:text-[#dfab31] transition-colors text-zinc-300">About</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <span className="text-[#dfab31] font-semibold">The Team</span>
          </div>
        </div>
      </section>

      {/* 2. TEAM MEMBERS SECTION - BALANCED COMPACT GAP WITHOUT EMPTY SPACE */}
      <section className="py-12 md:py-16 bg-white text-zinc-900">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          {teamMembers.map((member, idx) => (
            <TeamMemberRow
              key={idx}
              member={member}
              idx={idx}
              isLast={idx === teamMembers.length - 1}
            />
          ))}
        </div>
      </section>

      {/* 3. CONSULTATION CALL TO ACTION */}
      <section className="py-20 px-6 md:px-12 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-[#dfab31] text-xs font-mono font-bold tracking-widest uppercase block">
              Direct Representation
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-zinc-900">
              Schedule a Consultation with Our Advocates
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 font-light max-w-xl">
              Connect directly with our partners to discuss your civil, corporate, arbitration, or criminal dispute under strict confidentiality.
            </p>
          </div>

          <Link
            href="/appointment"
            className="px-8 py-4 bg-[#dfab31] hover:bg-[#c89926] text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(223,171,49,0.35)] rounded-xs flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <span>Book an Appointment</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
