'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import truck1 from '@/app/public/truck-1.jpg'
import truck2 from '@/app/public/truck-2.jpg'
import truck3 from '@/app/public/truck-3.jpg'
import { Truck, MapPin, Phone, Mail, Star, ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendTelegramMessage } from '@/lib/telegram'

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus('loading')
    console.log(formData)
    try {
      const result = await sendTelegramMessage(formData)
      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.log (error)
      setSubmitStatus('error')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }
  const slides = [
    { image: truck1, alt: "Truck Model A", title: "Powerful Performance", description: "Experience unmatched power with our latest model" },
    { image: truck2, alt: "Truck Model B", title: "Exceptional Comfort", description: "Luxury meets functionality in our spacious cabins" },
    { image: truck3, alt: "Truck Model C", title: "Advanced Technology", description: "Stay connected with cutting-edge onboard systems" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
  }

  return (
    <div className="flex flex-col w-full mx-auto">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Truck className="h-6 w-6" />
          <span className="sr-only">Acme Trucks</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#home">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#inventory">
            Inventory
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#services">
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Drive Your Dreams with Acme Trucks
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Discover our wide range of powerful and reliable trucks. From light-duty to heavy-duty, we have the perfect truck for your needs.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  href="#contact"
                >
                  Contact Us
                </Link>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-800 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  href="#services"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="inventory" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6 relative">
            <div className="relative overflow-hidden rounded-lg" style={{ height: '400px' }}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden={index !== currentSlide}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="text-xl font-bold">{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-white' : 'bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide}
                />
              ))}
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Our Services</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-12 xl:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-gray-200 p-4">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">New Trucks</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Explore our latest models with cutting-edge technology and superior performance.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-gray-200 p-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Used Trucks</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Quality pre-owned trucks at competitive prices, thoroughly inspected and certified.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-gray-200 p-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Maintenance</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Expert maintenance and repair services to keep your truck running at its best.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Have questions or ready to find your perfect truck? Reach out to our team of experts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <p>123 Truck Lane, Motorville, TK 12345</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <p>info@acmetrucks.com</p>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <Input
          name="email"
          placeholder="Your Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Input
          name="phone"
          placeholder="Your Phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <Textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" disabled={submitStatus === 'loading'}>
          {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
      {submitStatus === 'success' && (
        <p className="text-green-600">Message sent successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-600">Failed to send message. Please try again.</p>
      )}
    </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Trucks. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}


