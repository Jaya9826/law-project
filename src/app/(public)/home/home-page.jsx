'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ArrowRight, Shield, Users, Landmark, Handshake, Gavel, Home, Check, Facebook, Twitter, Linkedin, Instagram, ChevronDown, HelpCircle, Play, Scale, X, Calendar, Phone, Clock, Briefcase } from 'lucide-react'
import Navbar from "../../../components/layout/navbar/navbar"
import Footer from "../../../components/layout/footer/footer"
import InternshipSection from "../../../components/home/internship-section"
import { motion, AnimatePresence } from 'framer-motion'


// Mock Data for Hero Slider matching reference design
const slides = [
  {
    id: 1,
    tagline: "NEED LEGAL GUIDANCE?",
    titleHtml: (
      <>
        We Fight <br />
        for <span className="text-[#dfab31]">Your Rights</span>
      </>
    ),
    description: "Providing legal representation and counsel to safeguard your rights. Navigate complex legal challenges, and pursue justice with unwavering dedication..",
    primaryBtn: "Explore Our Services",
    link: "/appointment"
  },
  {
    id: 2,
    tagline: "EXPERT LEGAL COUNSEL",
    titleHtml: (
      <>
        Honest & <br />
        <span className="text-[#dfab31]">Trustworthy</span> Counsel
      </>
    ),
    description: "Expert legal advice and trusted representation dedicated to solving your complex problems and defending your constitutional rights.",
    primaryBtn: "Explore Our Services",
    link: "/appointment"
  },
  {
    id: 3,
    tagline: "DEDICATED ATTORNEYS",
    titleHtml: (
      <>
        Committed To <br />
        <span className="text-[#dfab31]">Justice</span> & Truth
      </>
    ),
    description: "Passionate defense and strategic counsel tailored to protect what matters most to you, your family, and your business.",
    primaryBtn: "Explore Our Services",
    link: "/appointment"
  }
]

// Practice Areas Cards Data (Matching Reference Mockup)
const practiceCards = [
  {
    id: 1,
    step: "01",
    title: "Business Law",
    image: "/business_law_no_people.jpg",
    icon: Briefcase,
    description: "Explore innovative strategies, expert guidance, and tailored solutions to propel your success forward.",
    link: "/appointment"
  },
  {
    id: 2,
    step: "02",
    title: "Family Law",
    image: "/family_law_no_people.jpg",
    icon: Users,
    description: "Compassionate guidance for sensitive family matters with a focus on your well-being and lasting solutions.",
    link: "/appointment"
  },
  {
    id: 3,
    step: "03",
    title: "Criminal Law",
    image: "/criminal_law_no_people.jpg",
    icon: Gavel,
    description: "Strong defense with a focus on protecting your rights, reputation, and future.",
    link: "/appointment"
  }
]

// Experience Section Tabs Data
const experienceTabs = [
  {
    id: 'attorneys',
    label: 'Our Attorneys',
    content: 'Our attorneys are the cornerstone of our commitment to providing exceptional legal services. Each member of our team brings a wealth of experience, specialized knowledge, and a deep dedication to achieving the best outcomes for our clients. We pride ourselves on our collaborative approach, ensuring that every case benefits from the collective expertise of our diverse legal team.'
  },
  {
    id: 'expertise',
    label: 'Our Expertise',
    content: 'With decades of combined experience across diverse legal disciplines, our attorneys possess the specialized knowledge required to tackle the most complex legal challenges. We leverage cutting-edge legal strategies and meticulous preparation to achieve outstanding results for every client.'
  },
  {
    id: 'firm',
    label: 'Our Firm',
    content: 'Founded on the principles of integrity, excellence, and unwavering advocacy, our firm has grown into a premier legal powerhouse. We are committed to fostering lasting relationships with our clients and serving our community with honor, professionalism, and distinction.'
  }
]

// 3 Columns Practice Areas Data
const practiceColumns = [
  [
    "Corporate and M&A",
    "Construction and Real Estate",
    "Commercial Dispute Resolution",
    "Employment"
  ],
  [
    "Banking and Finance",
    "Capital Market",
    "Environmental",
    "Intellectual Property Right"
  ],
  [
    "Government",
    "Foundation/Non Profit Organization",
    "Bankruptcy",
    "Criminal"
  ]
]

// Testimonials Data
const testimonials = [
  {
    id: 1,
    title: "Trustworthy lawyer",
    content: "From the initial consultation to the final resolution, their professionalism and dedication were evident. They kept me informed every step of the way and fought tirelessly to protect my rights.",
    author: "John D.",
    role: "Family Law Client"
  },
  {
    id: 2,
    title: "Quality lawyer service",
    content: "Their attention to detail and strategic approach were instrumental in achieving a favorable outcome. I am forever grateful for their hard work and commitment.",
    author: "Maria S.",
    role: "Criminal Defense Client"
  },
  {
    id: 3,
    title: "Top lawyer listed",
    content: "They fought for my right to fair compensation and kept me informed throughout the process. Their expertise in personal injury law made a significant difference in my recovery.",
    author: "Alex R.",
    role: "Personal Injury Client"
  }
]

// Lawyer Team Data
const lawyerTeam = [
  {
    id: 1,
    name: "Fynley Wilkinson",
    role: "Managing Partner",
    image: "/team_lawyer_1.jpg"
  },
  {
    id: 2,
    name: "Sasha Welsh",
    role: "Senior Partner",
    image: "/experience_attorney.jpg"
  },
  {
    id: 3,
    name: "John Shepard",
    role: "Associate",
    image: "/team_lawyer_3.jpg"
  }
]

// Fun Facts / What we did stats
const statsData = [
  { value: "4500", label: "Home Protected" },
  { value: "16k", label: "People Saved" },
  { value: "4m", label: "Money Saved" },
  { value: "52k", label: "Contract Signed" },
  { value: "100+", label: "Countries" },
  { value: "2k", label: "Staff Member" }
]

// Latest News Data
const latestNews = [
  {
    id: 1,
    day: "10",
    month: "NOV",
    category: "LAW FIRM",
    title: "The Lawyer European Awards shortlist",
    description: "When facing legal issues, whether personal or business-related, many people may consider handling the matter themselves to save money.",
    author: "FYNLEY WILKINSON",
    image: "/news_1.jpg",
    link: "/news"
  },
  {
    id: 2,
    day: "15",
    month: "NOV",
    category: "LAW FIRM",
    title: "Six firms that are setting the trend",
    description: "When facing legal issues, whether personal or business-related, many people may consider handling the matter themselves to save money.",
    author: "FYNLEY WILKINSON",
    image: "/news_2.jpg",
    link: "/news"
  },
  {
    id: 3,
    day: "20",
    month: "NOV",
    category: "LAW FIRM",
    title: "When it comes to law firm mergers",
    description: "When facing legal issues, whether personal or business-related, many people may consider handling the matter themselves to save money.",
    author: "FYNLEY WILKINSON",
    image: "/family_law.jpg",
    link: "/news"
  }
]

// 4 Pillars / Features Data
const practicePillars = [
  {
    icon: Shield,
    title: "Experienced",
    subtitle: "Over 25+ years of courtroom trial dominance and appellate litigation.",
    highlight: "25+ Years Record"
  },
  {
    icon: Users,
    title: "Client Focused",
    subtitle: "Personalized legal strategy tailored to protect what matters most to you.",
    highlight: "1-on-1 Partner Care"
  },
  {
    icon: Landmark,
    title: "Dedicated Advocacy",
    subtitle: "Fearless courtroom litigation and tireless constitutional pursuit.",
    highlight: "Relentless Defense"
  },
  {
    icon: Handshake,
    title: "Trust & Integrity",
    subtitle: "Strict attorney-client privilege with 100% transparent counsel.",
    highlight: "100% Confidential"
  }
]

// 4 Feature Pillars Card (Matching Reference Design with Subtle Warm Orange/Gold Finish)
function FeaturePillarCard({ item, index }) {
  const IconComponent = item.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#191614] via-[#141211] to-[#100f0e] border border-[#dfab31]/25 hover:border-[#dfab31] transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_45px_rgba(223,171,49,0.2)] flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Subtle top amber light highlight */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#dfab31]/40 to-transparent group-hover:via-[#dfab31] transition-all duration-500" />

      {/* Ambient warm orange corner glow */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#dfab31]/8 rounded-full blur-2xl group-hover:bg-[#dfab31]/18 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header: Icon in Gold Outline Box & Step Counter */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl border border-[#dfab31]/50 bg-[#dfab31]/10 text-[#dfab31] flex items-center justify-center transition-all duration-300 group-hover:border-[#dfab31] group-hover:bg-[#dfab31]/20 shadow-[0_0_15px_rgba(223,171,49,0.15)]">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="font-mono text-sm font-semibold text-zinc-500 group-hover:text-[#dfab31] transition-colors">
            0{index + 1}
          </span>
        </div>

        {/* Title in Playfair Display Serif */}
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-normal group-hover:text-[#dfab31] transition-colors mt-4">
          {item.title}
        </h3>

        {/* Description in Clean Montserrat */}
        <p className="text-sm text-zinc-400 font-normal leading-relaxed mt-2.5">
          {item.subtitle}
        </p>
      </div>

      {/* Divider & Bottom Highlight */}
      <div className="mt-6 pt-5 border-t border-[#dfab31]/20 flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-[#dfab31] relative z-10">
        <span className="w-2 h-2 rounded-full bg-[#dfab31] flex-shrink-0 shadow-[0_0_8px_rgba(223,171,49,0.6)]" />
        <span className="tracking-wide">{item.highlight}</span>
      </div>
    </motion.div>
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
        className={`group flex flex-col justify-between text-center bg-white border transition-all duration-500 p-4 pb-7 rounded-2xl select-none ${isHovered
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
          className="relative h-[360px] sm:h-[400px] w-full overflow-hidden rounded-xl bg-zinc-900"
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

        {/* Name & Role with 3D Elevation */}
        <div
          style={{
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s ease-out',
          }}
          className="space-y-1.5 pt-4 px-3"
        >
          <h3 className="text-xl font-bold font-serif text-zinc-900 tracking-wide group-hover:text-[#dfab31] transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-[#dfab31] text-xs font-mono font-semibold uppercase tracking-wider">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [transparentImage, setTransparentImage] = useState('')
  const [activeExpTab, setActiveExpTab] = useState('attorneys')
  const expRef = useRef(null)
  const [expOffset, setExpOffset] = useState(0)

  // Smooth parallax scroll listener for Experience Section (Static image illusion)
  useEffect(() => {
    const handleParallax = () => {
      if (expRef.current) {
        const rect = expRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        if (rect.top < windowHeight && rect.bottom > 0) {
          const sectionMiddle = rect.top + rect.height / 2
          const windowMiddle = windowHeight / 2
          const diffFromCenter = sectionMiddle - windowMiddle
          setExpOffset(-diffFromCenter * 0.45)
        }
      }
    }
    window.addEventListener('scroll', handleParallax, { passive: true })
    handleParallax()
    return () => window.removeEventListener('scroll', handleParallax)
  }, [])

  // Client-side background removal (BFS flood-fill starting from edges to clean JPEG noise and preserve coat)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = `${slides[currentSlide].image}?v=11`
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data
        const w = canvas.width
        const h = canvas.height

        // Visited grid to prevent loops
        const visited = new Uint8Array(w * h)
        const queue = []

        // Start BFS from top corners and side edge pixels
        const startPoints = [
          [0, 0], [w - 1, 0], [Math.floor(w / 2), 0],
          [0, Math.floor(h / 4)], [w - 1, Math.floor(h / 4)]
        ]

        for (const [sx, sy] of startPoints) {
          const idx = sy * w + sx
          if (!visited[idx]) {
            visited[idx] = 1
            queue.push(idx)
          }
        }

        // BFS to find connected background pixels
        while (queue.length > 0) {
          const curr = queue.shift()
          const cx = curr % w
          const cy = (curr / w) | 0

          const pixelStart = curr * 4
          const r = data[pixelStart]
          const g = data[pixelStart + 1]
          const b = data[pixelStart + 2]

          // Threshold of 28 is high enough to clean all JPEG compression artifacts/noise completely
          if (r < 28 && g < 28 && b < 28) {
            data[pixelStart + 3] = 0 // transparent

            // Check 4-way neighbors
            const neighbors = [
              [cx + 1, cy], [cx - 1, cy],
              [cx, cy + 1], [cx, cy - 1]
            ]

            for (const [nx, ny] of neighbors) {
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                const nIdx = ny * w + nx
                if (!visited[nIdx]) {
                  visited[nIdx] = 1
                  queue.push(nIdx)
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0)
        setTransparentImage(canvas.toDataURL('image/png'))
      } catch (err) {
        console.error("Canvas chroma-key error:", err)
      }
    }
  }, [currentSlide])

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

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

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white overflow-x-hidden relative">

      <Navbar />

      {/* 3. HERO SLIDER (MATCHING EXACT REFERENCE DESIGN) */}
      <section className="relative min-h-[860px] lg:h-screen lg:min-h-[900px] flex items-center overflow-hidden bg-[#0d0d0f]">

        {/* Full Background Courtroom Gavel, Scales & Books Image */}
        <div className="absolute inset-0 z-0 bg-[#0d0d0f]">
          <Image
            src="/luxury_law_banner.jpg"
            alt="Courtroom Gavel and Scales of Justice"
            fill
            className="object-cover object-center select-none"
            priority
            quality={100}
          />
          {/* No heavy dark overlay - pure warm natural mahogany courtroom lighting */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />
        </div>

        {/* Upper-Right Background Wall Plaque (Matching reference mockup) */}
        <div className="hidden lg:flex flex-col items-center text-center absolute top-36 right-16 xl:right-32 pointer-events-none select-none opacity-50 z-10">
          <span className="font-serif text-xs xl:text-[13px] tracking-[0.35em] text-[#dfab31] uppercase leading-relaxed font-bold">
            JUSTICE<br />BUILDS<br />A BETTER<br />TOMORROW
          </span>
          <div className="w-12 h-[1px] bg-[#dfab31]/70 mt-3" />
        </div>

        {/* Far Right Slide Counter (Matching reference mockup) */}
        <div className="hidden lg:flex flex-col items-center gap-2.5 absolute right-8 top-1/2 -translate-y-1/2 z-20 font-mono text-xs">
          <span className="font-bold text-[#dfab31] text-sm">0{currentSlide + 1}</span>
          <div className="w-[1.5px] h-12 bg-zinc-600/60" />
          <span className="text-zinc-500 font-medium">03</span>
        </div>

        {/* Main Content Container (Left-Aligned, Matching reference mockup) */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 w-full relative z-20 flex flex-col justify-center h-full pt-32 sm:pt-36 pb-24">

          {/* Eyebrow Tagline */}
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="w-8 sm:w-12 h-[1.5px] bg-[#dfab31]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.28em] text-[#dfab31] font-mono uppercase">
              {slides[currentSlide].tagline}
            </span>
            <div className="w-8 sm:w-12 h-[1.5px] bg-[#dfab31]" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-serif font-bold text-white leading-[1.08] tracking-tight max-w-2xl drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
            {slides[currentSlide].titleHtml}
          </h1>

          {/* Short Accent Gold Bar under headline */}
          <div className="w-16 sm:w-20 h-[2.5px] bg-[#dfab31] rounded-full my-5" />

          {/* Description Paragraph */}
          <p className="text-base sm:text-[17px] text-zinc-300 max-w-xl leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            {slides[currentSlide].description}
          </p>

          {/* Action Button */}
          <div className="pt-6">
            <Link
              href={slides[currentSlide].link}
              className="bg-[#dfab31] hover:bg-[#c99522] text-zinc-950 font-bold px-8 py-3.5 rounded-lg text-sm sm:text-base inline-flex items-center gap-2.5 shadow-[0_4px_25px_rgba(223,171,49,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer"
            >
              {slides[currentSlide].primaryBtn}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Floating Stats Bar (Matching reference mockup) */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-10 mt-6 border-t border-zinc-800/80 max-w-2xl">
            {/* Stat 1 */}
            <div className="flex items-center gap-3.5">
              <Users className="w-8 h-8 text-[#dfab31] flex-shrink-0" />
              <div>
                <span className="block text-2xl font-extrabold text-white leading-none">
                  500+
                </span>
                <span className="block text-xs text-zinc-400 font-medium mt-1">
                  Clients Represented
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-[1px] h-9 bg-zinc-800" />

            {/* Stat 2 */}
            <div className="flex items-center gap-3.5">
              <Shield className="w-8 h-8 text-[#dfab31] flex-shrink-0" />
              <div>
                <span className="block text-2xl font-extrabold text-white leading-none">
                  98%
                </span>
                <span className="block text-xs text-zinc-400 font-medium mt-1">
                  Success Rate
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-[1px] h-9 bg-zinc-800" />

            {/* Stat 3 */}
            <div className="flex items-center gap-3.5">
              <Scale className="w-8 h-8 text-[#dfab31] flex-shrink-0" />
              <div>
                <span className="block text-2xl font-extrabold text-white leading-none">
                  15+
                </span>
                <span className="block text-xs text-zinc-400 font-medium mt-1">
                  Years of Experience
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel controls - Far Left and Far Right Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-[#dfab31] transition-colors z-30 focus:outline-none cursor-pointer"
          aria-label="Previous Slide"
        >
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-[#dfab31] transition-colors z-30 focus:outline-none cursor-pointer"
          aria-label="Next Slide"
        >
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Bottom Hero Footer Bar (Matching reference mockup) */}
        <div className="absolute bottom-6 inset-x-0 z-30 max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex items-center justify-between pointer-events-auto">

          {/* Left Motto */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-serif italic text-zinc-400">
            <div className="w-6 h-[1.5px] bg-[#dfab31]" />
            <span className="text-zinc-200">Your Rights.</span>{" "}
            <span className="text-[#dfab31] font-semibold">Our Responsibility.</span>
          </div>

          {/* Center Mouse Scroll Indicator */}
          <div className="hidden md:flex flex-col items-center gap-1 text-zinc-400">
            <div className="w-4 h-7 rounded-full border border-zinc-400/80 flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-[#dfab31] rounded-full animate-bounce" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-zinc-400">
              — Scroll to Explore —
            </span>
          </div>

          {/* Right Social Icons */}
          <div className="flex items-center space-x-2.5">
            <a href="#" className="w-8 h-8 rounded-full bg-black/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#dfab31] hover:border-[#dfab31] transition-all" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-black/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#dfab31] hover:border-[#dfab31] transition-all" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-black/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#dfab31] hover:border-[#dfab31] transition-all" aria-label="LinkedIn">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-black/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#dfab31] hover:border-[#dfab31] transition-all" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </section>


      {/* 4. CONSULTATION & CONTACT BANNER (EXACT REFERENCE DESIGN - COMPACT HEIGHT) */}
      <section className="relative overflow-hidden py-8 sm:py-9 lg:py-10 z-20 bg-[#fbf8f2] border-b border-zinc-200/80">

        {/* Neoclassical Courthouse Pillars Watermark Spanning Pure Right Side */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] xl:w-[50%] pointer-events-none overflow-hidden select-none">
          <div className="relative w-full h-full opacity-45 mix-blend-multiply">
            <Image
              src="/courthouse_pediment_watermark.jpg"
              alt="Justica Neoclassical Architecture"
              fill
              className="object-cover object-right-top"
              priority
            />
          </div>
          {/* Soft fade on left edge so text remains crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f2] via-[#fbf8f2]/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 relative z-10">

          {/* Left Column: Tagline, Heading & Description */}
          <div className="space-y-2.5 text-left max-w-2xl">
            {/* Tagline with Gold Line */}
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#c59b27]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#c59b27] uppercase font-mono">
                We Are Here to Help
              </span>
            </div>

            {/* Heading in Playfair Display */}
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold text-[#141416] tracking-tight leading-[1.15]">
              Contact Us Now!<br />
              Get a Free Consultation for <span className="text-[#c59b27] font-serif italic font-normal">Your Case.</span>
            </h2>

            {/* Subtitle / Description */}
            <p className="text-zinc-600 text-xs sm:text-[14px] leading-relaxed">
              Speak with our experienced legal team and get clear guidance for your legal matters.<br className="hidden sm:inline" />
              Your rights. Our responsibility.
            </p>
          </div>

          {/* Right Column: Two Action Buttons & Trust Badges */}
          <div className="flex flex-col items-start lg:items-end gap-4 shrink-0 w-full lg:w-auto">

            {/* Button Pair */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
              {/* Primary Golden Appointment Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#dfab31] hover:bg-[#c99522] text-zinc-950 text-xs sm:text-sm font-bold uppercase tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-[0_8px_20px_rgba(223,171,49,0.35)] transition-all duration-300 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-zinc-950 flex-shrink-0" />
                  <span>MAKE APPOINTMENT</span>
                  <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>

              {/* Secondary Light Call Now Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <a
                  href="tel:12003009000"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-zinc-900 text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-zinc-300 hover:border-zinc-400 shadow-sm transition-all duration-300 group cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-zinc-800 flex-shrink-0" />
                  <span>CALL NOW</span>
                </a>
              </motion.div>
            </div>

            {/* Trust Badges Row */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-[13px] text-zinc-700 font-medium pt-0.5">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-zinc-800 flex-shrink-0" />
                <span className="whitespace-nowrap">100% Confidential</span>
              </div>
              <div className="w-[1px] h-3.5 bg-zinc-300" />
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-zinc-800 flex-shrink-0" />
                <span className="whitespace-nowrap">Expert Guidance</span>
              </div>
              <div className="w-[1px] h-3.5 bg-zinc-300" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-zinc-800 flex-shrink-0" />
                <span className="whitespace-nowrap">Quick Response</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4.1 4 FEATURE PILLARS (EXACT REFERENCE DESIGN - OBSIDIAN BLACK BACKGROUND WITH WARM ORANGE GLOW) */}
      <section className="bg-[#0b0a0c] py-12 sm:py-14 relative z-20 border-b border-zinc-900 overflow-hidden">
        {/* Ambient Warm Orange/Gold Glow in Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[360px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practicePillars.map((item, index) => (
              <FeaturePillarCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WELCOME SECTION (SPLIT BACKGROUND: HALF BLACK, HALF WHITE - COMPACT HEIGHT) */}
      <section id="about" className="relative py-14 sm:py-16 px-6 md:px-12 bg-white overflow-hidden scroll-mt-20">

        {/* Top Dark Background (Half Black) */}
        <div className="absolute top-0 inset-x-0 h-[60%] sm:h-[62%] bg-[#0e0d10]" />
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-[#dfab31]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">

          {/* Top text block with scroll reveal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start"
          >

            {/* Left Column: Tagline, Title & Micro-motto */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1.5px] bg-[#dfab31]" />
                <span className="block text-xs font-bold tracking-[0.25em] text-[#dfab31] font-mono uppercase">
                  Welcome to Justica
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold font-serif text-white tracking-tight leading-[1.14]">
                Reputation. Respect.<br />
                <span className="text-[#dfab31]">Result.</span>
              </h2>
              <div className="w-14 h-[2.5px] bg-[#dfab31] rounded-full mt-1.5 mb-2" />
              <p className="text-[11px] sm:text-xs font-mono tracking-[0.22em] text-zinc-400 uppercase">
                Your Trust Drives Our Commitment.
              </p>
            </div>

            {/* Right Column: Paragraph & 3 Trust Metrics */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-zinc-300 leading-relaxed text-xs sm:text-[13.5px] font-normal">
                We understand that legal issues can be some of the most challenging and stressful experiences in life. Whether you are dealing with a complex family matter, facing criminal charges, or navigating the intricacies of business law, our mission is to provide you with comprehensive, compassionate, and expert legal guidance. Our seasoned attorneys are committed to the highest standard of legal representation tailored to meet your unique needs.
              </p>

              {/* 3 Credibility Badges with Vertical Dividers */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4 pt-3.5 border-t border-zinc-800/80">
                <div className="flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-[#dfab31] flex-shrink-0" />
                  <div>
                    <h4 className="text-white text-xs sm:text-[13px] font-bold font-serif">Experienced</h4>
                    <p className="text-zinc-400 text-[11px]">Trusted Legal Experts</p>
                  </div>
                </div>

                <div className="hidden sm:block w-[1px] h-7 bg-zinc-800" />

                <div className="flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-[#dfab31] flex-shrink-0" />
                  <div>
                    <h4 className="text-white text-xs sm:text-[13px] font-bold font-serif">Client-First</h4>
                    <p className="text-zinc-400 text-[11px]">Your Goals, Our Priority</p>
                  </div>
                </div>

                <div className="hidden sm:block w-[1px] h-7 bg-zinc-800" />

                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-[#dfab31] flex-shrink-0" />
                  <div>
                    <h4 className="text-white text-xs sm:text-[13px] font-bold font-serif">Proven Results</h4>
                    <p className="text-zinc-400 text-[11px]">Justice That Matters</p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Cards Grid: Full photo visible first, compact height, hover overlay slides up from bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
            {practiceCards.map((card, idx) => {
              const IconComponent = card.icon
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="relative h-[235px] sm:h-[250px] w-full overflow-hidden group rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.22)] border border-zinc-900/40 hover:border-[#dfab31]/70 transition-all duration-500 cursor-pointer"
                >
                  {/* Background Image (Visible First) */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 select-none"
                  />

                  {/* Subtle Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Normal State Bottom Golden Banner */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#dfab31]/95 backdrop-blur-xs py-3.5 px-5 flex items-center justify-between text-zinc-950 z-10 transition-opacity duration-300 group-hover:opacity-0">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 flex-shrink-0 text-zinc-950" />
                      <span className="font-bold text-base sm:text-lg font-serif tracking-normal text-zinc-950">
                        {card.title}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-950" />
                  </div>

                  {/* Hover State: Translucent Dark Overlay sliding up smoothly from bottom */}
                  <div className="absolute inset-0 bg-[#0d0d10]/95 backdrop-blur-md z-20 p-5 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div>
                      {/* Icon + Title Header */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#dfab31]/15 text-[#dfab31]">
                          <IconComponent className="w-5 h-5 flex-shrink-0" />
                        </div>
                        <h3 className="font-bold font-serif text-lg sm:text-xl text-white">
                          {card.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal mt-2.5">
                        {card.description}
                      </p>
                    </div>

                    {/* READ MORE Button */}
                    <div className="pt-2">
                      <Link
                        href={card.link}
                        className="w-full py-2.5 bg-[#dfab31] hover:bg-[#c89926] text-zinc-950 text-xs font-bold tracking-widest uppercase rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg group-hover:shadow-amber-500/20"
                      >
                        <span>READ MORE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Footer Bar of Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-200">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-serif italic text-zinc-500">
              <span className="w-6 h-[1.5px] bg-[#dfab31]" />
              <span>Justice Today. A Better Tomorrow.</span>
            </div>

            <Link
              href="/appointment"
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold font-mono tracking-wider text-zinc-900 hover:text-[#dfab31] transition-colors group cursor-pointer"
            >
              <span className="w-6 h-[1.5px] bg-[#dfab31]" />
              <span>View All Practice Areas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. EXPERIENCES SECTION (Compact Height, Natural Page Scroll & Static Parallax Background Image) */}
      <section ref={expRef} className="bg-[#0b0b0d] text-zinc-100 overflow-hidden border-t border-zinc-900/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[560px] items-stretch">

          {/* Left Column: Lawyer Image with Static Parallax Counter-Scroll */}
          <div className="relative w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-full overflow-hidden bg-[#16161a]">
            <div
              className="absolute -inset-y-28 inset-x-0 will-change-transform transition-transform duration-75 ease-out"
              style={{ transform: `translate3d(0, ${expOffset}px, 0)` }}
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

          {/* Right Column: Content with Tabs */}
          <div className="flex flex-col justify-center py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-14 xl:px-20 space-y-6 max-w-2xl">
            <div className="space-y-2.5">
              <span className="block text-xs font-semibold tracking-[0.25em] text-[#dfab31] font-mono uppercase">
                EXPERIENCES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-[1.18]">
                Let Our Experience <br className="hidden sm:block" />
                be Your Guide
              </h2>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {experienceTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveExpTab(tab.id)}
                  className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold tracking-normal transition-all duration-300 rounded-xs cursor-pointer ${activeExpTab === tab.id
                    ? 'bg-[#dfab31] text-black shadow-[0_2px_15px_rgba(223,171,49,0.35)]'
                    : 'text-white hover:text-[#dfab31] bg-transparent'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="space-y-6 pt-1">
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                {experienceTabs.find((t) => t.id === activeExpTab)?.content}
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

      {/* 7. PRACTICE AREAS CHECKLIST SECTION */}
      <section className="bg-white text-zinc-900 py-20 md:py-28 px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight">
              Practice Areas
            </h2>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto" />
            <p className="text-zinc-600 text-sm sm:text-[15px] leading-relaxed font-light pt-2 max-w-2xl mx-auto">
              We&apos;re dedicated to offering comprehensive, expert legal services tailored to meet your specific needs. Our team of seasoned attorneys brings decades of combined experience across a wide array of practice areas.
            </p>
          </div>

          {/* 3-Column List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-6 max-w-5xl mx-auto">
            {practiceColumns.map((col, colIdx) => (
              <div key={colIdx} className="space-y-4">
                {col.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 group cursor-pointer">
                    <div className="w-5 h-5 bg-black flex items-center justify-center text-white shrink-0 group-hover:bg-[#dfab31] transition-colors duration-200">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-zinc-800 text-sm sm:text-[15px] font-medium group-hover:text-[#dfab31] transition-colors duration-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. WHAT WE DID? (FUN FACTS / STATS) SECTION WITH PARALLAX BACKGROUND */}
      <section
        className="relative py-28 md:py-36 px-6 md:px-12 bg-fixed bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/parallax_scales.jpg')" }}
      >
        {/* Subtle Dark Overlay to preserve background clarity and contrast */}
        <div className="absolute inset-0 bg-black/55 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Header Column */}
            <div className="lg:col-span-4 space-y-4">
              <span className="block text-xs font-semibold tracking-[0.25em] text-[#dfab31] font-mono uppercase">
                FUN FACTS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
                What we did?
              </h2>
              <div className="w-14 h-0.5 bg-[#dfab31]" />
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-light pt-2 max-w-sm">
                Trust in our expertise and let us champion your legal rights with skill and compassion.
              </p>
            </div>

            {/* Right Stats 3x2 Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
              {statsData.map((stat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    {stat.value}
                  </span>
                  <span className="block text-xs sm:text-sm text-[#dfab31] font-medium tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 9. OUR LAWYER TEAM SECTION (Staggered Entrance & 3D Interactive Animation) */}
      <section id="team" className="bg-white text-zinc-900 py-24 md:py-32 px-6 md:px-12 lg:px-16 relative z-10 border-t border-zinc-200 scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-14">

          {/* Header with entrance animation */}
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

          {/* Team Cards Grid with 3D Staggered Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full">
            {lawyerTeam.map((member, idx) => (
              <LawyerTeam3DCard
                key={member.id}
                member={member}
                index={idx}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 10. TESTIMONIALS SECTION WITH PARALLAX */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 bg-fixed bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/courtroom_empty_bg.jpg')" }}
      >
        {/* Lighter overlay so background courtroom image is clearly visible */}
        <div className="absolute inset-0 bg-black/45 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Testimonials
            </h2>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto shadow-sm" />
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-black/35 backdrop-blur-[3px] border border-white/20 p-8 sm:p-9 shadow-2xl relative flex flex-col justify-between group hover:border-[#dfab31]/60 hover:bg-black/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  {/* Gold Quote Mark Icon */}
                  <div className="text-[#dfab31] text-4xl sm:text-5xl font-serif leading-none select-none mb-4 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    “
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                    {item.title}
                  </h3>
                  <p className="text-zinc-200 text-sm sm:text-[15px] leading-relaxed font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {item.content}
                  </p>
                </div>

                <div className="pt-6 mt-4">
                  <span className="text-[#dfab31] text-xs sm:text-sm font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                    {item.author}, {item.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination indicator dots */}
          <div className="flex items-center justify-center gap-2 pt-6">
            <span className="w-6 h-2 bg-[#dfab31] shadow-[0_0_8px_rgba(223,171,49,0.5)] cursor-pointer" />
            <span className="w-2 h-2 bg-white/40 hover:bg-white/70 cursor-pointer transition-colors" />
            <span className="w-2 h-2 bg-white/40 hover:bg-white/70 cursor-pointer transition-colors" />
          </div>
        </div>
      </section>

      {/* 11. LAW INTERNSHIP SECTION */}
      <InternshipSection />

      {/* 12. LATEST NEWS SECTION */}
      <section className="bg-white text-zinc-900 py-24 md:py-32 px-6 md:px-12 lg:px-16 relative z-10 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto space-y-14">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight">
              Latest News
            </h2>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto" />
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full">
            {latestNews.map((news) => (
              <div
                key={news.id}
                className="bg-white border-0 rounded-xs group overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image with Date Badge */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                    />

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-[#dfab31] text-white py-2 px-3.5 min-w-[54px] text-center shadow-md">
                      <span className="block text-xl sm:text-2xl font-bold leading-none font-serif">
                        {news.day}
                      </span>
                      <span className="block text-[10px] font-bold tracking-widest uppercase mt-0.5 font-mono">
                        {news.month}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 space-y-3">
                    <span className="block text-[11px] font-bold tracking-widest text-[#dfab31] font-mono uppercase">
                      {news.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-zinc-900 group-hover:text-[#dfab31] transition-colors leading-snug cursor-pointer">
                      {news.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-light">
                      {news.description}
                    </p>
                  </div>
                </div>

                {/* Author Footer */}
                <div className="px-7 pb-7 pt-1">
                  <span className="block text-[10px] font-bold tracking-widest text-zinc-400 font-mono uppercase">
                    {news.author}
                  </span>
                </div>
              </div>
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
          className="fixed bottom-6 right-6 z-50 bg-[#dfab31] hover:bg-[#c89926] text-white p-3 rounded shadow-lg transition-colors flex items-center justify-center focus:outline-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}

      {/* Footer Component Matching Reference Design */}
      <Footer />
    </div>
  )
}

