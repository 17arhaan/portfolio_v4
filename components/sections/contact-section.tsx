"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  User, 
  Building2, 
  Send, 
  MessageSquare, 
  Quote, 
  FileText, 
  Calendar as CalendarIcon,
  Check,
  X
} from "lucide-react"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import SectionHeader from "@/components/ui/section-header"
import SocialLink from "@/components/ui/social-link"
import LeetCodeLink from "@/components/leetcode-link"
import HackerRankLink from "@/components/hackerrank-link"

interface ContactSectionProps {
  isVideoPlaying: boolean
  setIsVideoPlaying: (playing: boolean) => void
  setShowConfetti: (show: boolean) => void
  VideoPlayer: React.ComponentType<{ isPlaying: boolean; onEnded: () => void }>
}

export default function ContactSection({ 
  isVideoPlaying,
  setIsVideoPlaying,
  setShowConfetti,
  VideoPlayer
}: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })
  const formRef = useRef<HTMLFormElement>(null)
  const [messageValue, setMessageValue] = useState("")
  const [messageHeight, setMessageHeight] = useState("auto")
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [date, setDate] = useState<Date>()

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageValue(e.target.value)
    setMessageHeight('auto')
    if (messageRef.current) {
      setMessageHeight(messageRef.current.scrollHeight + 'px')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        availability: formData.get('availability'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      }

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        formRef.current?.reset()
        setMessageValue("")
        setMessageHeight("auto")
        setSubmitStatus({
          type: 'success',
          message: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: '',
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: '',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-transparent">
      <div className="container mx-auto px-6">
        <SectionHeader title="Get in Touch" icon={<Mail className="w-6 h-6" />} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-300 italic mt-6 mb-16 max-w-2xl mx-auto"
        >
          Let's collaborate and create something amazing together.
        </motion.p>

        <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mt-8">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col h-full"
          >
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <a href="mailto:17arhaan.connect@gmail.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0 hover:bg-white/20 transition-colors">
                  <Mail className="w-4 h-4 text-gray-300" />
                </a>
                <div>
                  <p className="text-gray-400 text-xs">Email</p>
                  <a href="mailto:17arhaan.connect@gmail.com" className="text-white font-medium hover:text-gray-300 transition-colors text-sm">
                    17arhaan.connect@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <a href="tel:+919650984445" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0 hover:bg-white/20 transition-colors">
                  <Phone className="w-4 h-4 text-gray-300" />
                </a>
                <div>
                  <p className="text-gray-400 text-xs">Phone</p>
                  <a href="tel:+919650984445" className="text-white font-medium hover:text-gray-300 transition-colors text-sm">
                    +919650984445
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-gray-400 mb-3 text-sm">Follow Me:</p>
              <div className="flex space-x-4">
                <SocialLink icon={<Github className="w-5 h-5" />} href="https://github.com/17arhaan" />
                <SocialLink icon={<Linkedin className="w-5 h-5" />} href="https://www.linkedin.com/in/arhaan17/" />
                <LeetCodeLink href="https://leetcode.com/u/arhaan17/" />
                <HackerRankLink href="https://www.hackerrank.com/profile/17arhaan" />
              </div>
            </div>

            {/* Redesigned Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 relative">
                {/* Large quote marks */}
                <div className="absolute -top-3 -left-1 text-white/10 text-5xl font-serif leading-none">"</div>
                <div className="absolute -bottom-5 -right-1 text-white/10 text-5xl font-serif leading-none">"</div>

                {/* Quote icon */}
                <div className="flex justify-center mb-3">
                  <div className="bg-white/10 rounded-full p-1.5">
                    <Quote className="w-4 h-4 text-white/70" />
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-white/90 text-sm font-light leading-relaxed tracking-wide text-center">
                  I believe great technology should feel personal, solving real problems with a human touch. Let's
                  create something meaningful together.
                </p>

                {/* Decorative line */}
                <div className="mt-3 flex justify-center">
                  <motion.div
                    className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent w-16"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Signature & video trigger */}
            <div className="mt-8 flex flex-col items-center md:translate-x-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="cursor-pointer"
                onClick={() => setIsVideoPlaying(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIsVideoPlaying(true);
                  }
                }}
              >
                <Image 
                  src="/sign.png" 
                  alt="Arhaan Girdhar Signature" 
                  width={140} 
                  height={140} 
                  className="h-28 w-auto object-contain hover:opacity-90 transition-opacity"
                  loading="lazy"
                  unoptimized={true}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg p-6"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1.5">
                    Name <span className="text-white/60">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
                    Email <span className="text-white/60">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1.5">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1.5">
                    Company
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Removed Inquiry Type and Website fields */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-400 mb-1.5">
                    Availability
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <CalendarIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          id="availability"
                          name="availability"
                          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all cursor-text"
                          value={date ? format(date, "PPP") : ""}
                          readOnly
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border border-white/10" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="rounded-md"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1.5">
                    Subject <span className="text-white/60">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1.5">
                  Message <span className="text-white/60">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gray-500 absolute left-3 top-4" />
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    ref={messageRef}
                    value={messageValue}
                    onChange={handleMessageChange}
                    style={{ height: messageHeight, overflow: 'hidden', resize: 'none' }}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all resize-none"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-2.5 text-white font-medium rounded-md transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-white/10 opacity-50 cursor-not-allowed' 
                    : submitStatus.type === 'success'
                    ? 'bg-green-500/20 hover:bg-green-500/30 border border-green-500/30'
                    : submitStatus.type === 'error'
                    ? 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/30'
                    : 'bg-white/10 hover:bg-white/15 border border-white/10'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Sending...
                  </>
                ) : submitStatus.type === 'success' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center"
                  >
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mr-2"
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                    Message Sent!
                  </motion.div>
                ) : submitStatus.type === 'error' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center"
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="mr-2"
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                    Failed to Send
                  </motion.div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
            <p className="text-gray-400 text-sm mt-6 text-center">
              &copy; {new Date().getFullYear()} Arhaan Girdhar. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 