'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer'
import { Search, ChevronRight, Calendar, User, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react'

// Main Featured Article
const featuredArticle = {
  id: 'supreme-court-precedents',
  badge: 'LEGAL BLOG',
  date: 'January 20, 2026',
  readTime: '6 min read',
  author: 'Adv. Rajesh Sharma',
  title: 'Constitutional & Civil Jurisprudence: Landmark Precedents from Supreme Court of India',
  description: 'A deep legal analysis on recent constitutional bench rulings, statutory interpretations under Article 226/32, and their direct impact on citizens, corporations, and judicial governance across high courts.',
  image: '/supreme_court_india.jpg'
}

// Side Featured Articles (Magazine Layout)
const sideArticles = [
  {
    id: 'consumer-directors-liability',
    badge: 'CONSUMER LAW',
    date: 'January 14, 2026',
    readTime: '4 min read',
    title: 'Execution Cannot Go Beyond the Decree: Supreme Court on Personal Liability of Directors in Consumer Disputes',
    image: '/supreme_court_india.jpg'
  },
  {
    id: 'commercial-arbitration-section34',
    badge: 'ARBITRATION LAW',
    date: 'December 14, 2025',
    readTime: '5 min read',
    title: 'Commercial Dispute Resolution & Setting Aside Arbitral Awards under Section 34',
    image: '/business_law.jpg'
  },
  {
    id: 'interim-relief-section9',
    badge: 'ARBITRATION LAW',
    date: 'December 08, 2025',
    readTime: '4 min read',
    title: 'Interim Relief Measures in Commercial Contracts Under Section 9 of Arbitration Act',
    image: '/criminal_law.jpg'
  }
]

// All Blog Articles Catalog
const allArticles = [
  {
    id: 1,
    title: 'The Lawyer European Awards shortlist & Global Legal Practice',
    category: 'LAW FIRM',
    date: 'November 10, 2025',
    author: 'Fynley Wilkinson',
    readTime: '5 min read',
    image: '/news_1.jpg',
    excerpt: 'When facing complex cross-border legal issues, corporations require agile advisory frameworks and international standard litigation support.'
  },
  {
    id: 2,
    title: 'Six Emerging Law Firms That Are Setting Trends in 2026',
    category: 'INDUSTRY TRENDS',
    date: 'November 15, 2025',
    author: 'Fynley Wilkinson',
    readTime: '4 min read',
    image: '/news_2.jpg',
    excerpt: 'Modern technology integration, automated legal research, and client-first fee structures are redefining boutique law firm success.'
  },
  {
    id: 3,
    title: 'Strategic Legal Due Diligence in High-Value Corporate Mergers',
    category: 'CORPORATE LAW',
    date: 'November 20, 2025',
    author: 'Fynley Wilkinson',
    readTime: '6 min read',
    image: '/family_law.jpg',
    excerpt: 'Key pitfalls and compliance checklists to evaluate during domestic and international corporate acquisitions and joint ventures.'
  },
  {
    id: 4,
    title: 'White Collar Crime Defense & Regulatory Enforcement Dynamics',
    category: 'CRIMINAL LAW',
    date: 'October 28, 2025',
    author: 'Adv. Meera Sen',
    readTime: '5 min read',
    image: '/criminal_law.jpg',
    excerpt: 'An overview of statutory investigation powers, anticipatory bails, and defensive compliance strategies for senior executives.'
  },
  {
    id: 5,
    title: 'Intellectual Property Protection for Startups & Tech Enterprises',
    category: 'IP LAW',
    date: 'October 12, 2025',
    author: 'Adv. Amit Verma',
    readTime: '4 min read',
    image: '/business_law.jpg',
    excerpt: 'Securing patents, trademarks, and trade secrets in fast-evolving AI software ecosystems and global digital markets.'
  },
  {
    id: 6,
    title: 'Real Estate Title Verification & RERA Compliance Guidelines',
    category: 'PROPERTY LAW',
    date: 'September 30, 2025',
    author: 'Adv. Sneha Kulkarni',
    readTime: '5 min read',
    image: '/empty_bookshelf.jpg',
    excerpt: 'A comprehensive buyer and developer roadmap to navigate land title searches, encumbrance certificates, and RERA disputes.'
  }
]

const categories = [
  'All Categories',
  'LEGAL BLOG',
  'CONSUMER LAW',
  'ARBITRATION LAW',
  'CORPORATE LAW',
  'CRIMINAL LAW',
  'PROPERTY LAW'
]

export default function NewsBlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = allArticles.filter(item => {
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#dfab31] selection:text-black overflow-x-hidden">
      
      <Navbar />

      {/* Hero Banner Header */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-28 bg-[#0a0a0c] border-b border-zinc-800/80 overflow-hidden min-h-[420px] flex items-center justify-center">
        {/* Background Image: Supreme Court of India & Legal Chamber with Home-Page Style Lighting */}
        <div className="absolute inset-0 z-0 bg-[#0d0d0f]">
          <Image
            src="/supreme_court_india.jpg"
            alt="Supreme Court & Legal Research Library"
            fill
            className="object-cover object-center select-none brightness-100 contrast-105"
            priority
          />
          {/* Soft dark shadow directly in the center to make white text pop clearly while keeping image bright */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-black/28 rounded-full blur-[80px] pointer-events-none z-10" />
          {/* Light subtle edge fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/30 pointer-events-none z-10" />
          {/* Warm orange shadow on Left and Right edges matching home page banner */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/18 via-transparent via-50% to-orange-600/18 pointer-events-none z-10" />
          {/* Warm gold ambient glow in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#dfab31]/10 rounded-full blur-[120px] pointer-events-none z-10" />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-20 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#dfab31]/40 text-[#dfab31] text-xs font-mono font-semibold uppercase tracking-widest shadow-lg">
            <BookOpen className="w-3.5 h-3.5 text-[#dfab31]" />
            Legal Blog & Supreme Court Insights
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Legal Blog / Updates
          </h1>
          
          <p className="text-zinc-200 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            India&apos;s One Of The Leading Law Blogs — Authoritative legal commentary, supreme court analysis & statutory updates.
          </p>

          <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-zinc-300 pt-2 drop-shadow-md">
            <Link href="/" className="hover:text-[#dfab31] transition-colors text-zinc-300">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <span className="text-[#dfab31] font-semibold">News & Blog Updates</span>
          </div>
        </div>
      </section>

      {/* Featured Magazine Section (Clean White Background & Borderless Cards) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-white">
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="h-5 w-1.5 bg-[#dfab31]" />
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-zinc-900 tracking-tight">
              Featured Legal Updates
            </h2>
          </div>
          <p className="text-zinc-600 text-sm sm:text-base font-light">
            Curated highlight rulings and benchmark legal precedents shaping national jurisdiction.
          </p>
        </div>

        {/* 2-Column Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          
          {/* Left Column: Big Featured Article Card (Borderless with Rich Shadow) */}
          <div className="lg:col-span-6">
            <div className="group relative h-[480px] sm:h-[580px] w-full overflow-hidden block rounded-xs shadow-[0_15px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_22px_55px_rgba(0,0,0,0.28)] bg-black transition-all duration-300 transform hover:-translate-y-1">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 transition-opacity duration-300 group-hover:from-black/90" />

              {/* Gold Pill Badge */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <span className="inline-block bg-[#dfab31] text-black text-[11px] font-bold tracking-wider px-3.5 py-1.5 rounded-full uppercase shadow-md font-mono">
                  {featuredArticle.badge}
                </span>
                <span className="text-zinc-200 text-xs font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  {featuredArticle.readTime}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-10 space-y-3">
                <div className="flex items-center gap-3 text-zinc-300 text-xs font-mono tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#dfab31]" />
                    {featuredArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#dfab31]" />
                    {featuredArticle.author}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white group-hover:text-[#dfab31] transition-colors leading-snug">
                  {featuredArticle.title}
                </h3>
                
                <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                  {featuredArticle.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 1 Top Wide Card + 2 Bottom Split Cards (Borderless with Rich Shadow) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-7">
            
            {/* Top Wide Card */}
            <div className="group relative h-[235px] sm:h-[275px] w-full overflow-hidden block rounded-xs shadow-[0_15px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_22px_55px_rgba(0,0,0,0.28)] bg-black transition-all duration-300 transform hover:-translate-y-1">
              <Image
                src={sideArticles[0].image}
                alt={sideArticles[0].title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-opacity duration-300 group-hover:from-black/90" />

              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <span className="inline-block bg-[#dfab31] text-black text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-md font-mono">
                  {sideArticles[0].badge}
                </span>
                <span className="text-zinc-200 text-[11px] font-mono bg-black/60 px-2.5 py-0.5 rounded-full border border-white/15">
                  {sideArticles[0].readTime}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-1.5">
                <span className="text-zinc-300 text-xs font-mono tracking-wider block">
                  {sideArticles[0].date}
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-bold font-serif text-white group-hover:text-[#dfab31] transition-colors leading-snug line-clamp-2">
                  {sideArticles[0].title}
                </h3>
              </div>
            </div>

            {/* Bottom Row: 2 Split Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 h-[235px] sm:h-[275px]">
              {sideArticles.slice(1, 3).map((item) => (
                <div
                  key={item.id}
                  className="group relative h-full w-full overflow-hidden block rounded-xs shadow-[0_15px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_22px_55px_rgba(0,0,0,0.28)] bg-black transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-opacity duration-300 group-hover:from-black/90" />

                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block bg-[#dfab31] text-black text-[9px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase shadow-md font-mono">
                      {item.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 space-y-1">
                    <span className="text-zinc-300 text-[11px] font-mono tracking-wider block">
                      {item.date}
                    </span>
                    <h3 className="text-sm sm:text-[15px] font-bold font-serif text-white group-hover:text-[#dfab31] transition-colors leading-snug line-clamp-3">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Main Articles Catalog Section (Clean White Background, No White Borders) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-100 bg-white">
        
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-12">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-xs cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#dfab31] text-black font-bold shadow-md'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search legal articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 pl-10 rounded-xs focus:outline-none focus:border-[#dfab31] focus:ring-1 focus:ring-[#dfab31]/40 transition-colors placeholder:text-zinc-400"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* 3-Column Articles Grid (Clean White Cards, No Borders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xs overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-60 w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  />
                  <div className="absolute top-4 left-4 z-10 bg-[#dfab31] text-black font-bold text-[10px] tracking-widest uppercase px-3 py-1 font-mono shadow-md">
                    {article.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-7 space-y-3">
                  <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#dfab31]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-serif text-zinc-900 group-hover:text-[#dfab31] transition-colors leading-snug cursor-pointer">
                    {article.title}
                  </h3>

                  <p className="text-zinc-600 text-sm leading-relaxed font-light line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Action Footer */}
              <div className="px-7 pb-6 pt-4 flex items-center justify-between border-t border-zinc-100">
                <span className="text-[11px] font-mono text-zinc-500 font-semibold uppercase">
                  {article.author}
                </span>

                <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#dfab31] group-hover:translate-x-1.5 transition-transform">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* Free Consultation Callout Banner (Compact Sleek Height) */}
      <section className="bg-[#dfab31] text-zinc-950 py-6 md:py-7 px-6 md:px-12 mt-6">
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
