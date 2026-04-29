import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Star,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Shield,
  Zap,
  Clock,
  Award,
  Calendar,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle,
  Sparkles,
  Home,
  Building2,
  ChevronLeft,
} from 'lucide-react';

// ----------- Scroll Animation Hook -----------
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll(
      '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-scale'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ----------- Logo SVG Component -----------
function RKLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#000" />
      <rect width="64" height="64" rx="14" fill="url(#logoGrad)" opacity="0.15" />
      <path d="M14 48 L32 14 L50 48 Z" fill="none" stroke="#E10600" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M22 48 L32 28 L42 48" fill="none" stroke="#0A84FF" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="13" r="3.5" fill="#E10600" />
      <path d="M46 9 L50 5 M46 5 L50 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 22 L19 19 M16 19 L19 22" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#E10600" />
          <stop offset="100%" stopColor="#0A84FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ----------- Navbar -----------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Results', href: '#results' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button onClick={() => scrollTo('#hero')} className="flex items-center gap-3 group">
              <RKLogo size={40} />
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-lg tracking-tight">RK Cleaning</span>
                <span className="text-rk-gray-400 text-xs font-medium tracking-widest uppercase">Service LLC</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-rk-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => scrollTo('#contact')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-rk-red rounded-full hover:bg-rk-red-dark transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 active:scale-95"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-rk-gray-300 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-rk-gray-900 flex flex-col pt-24 pb-8 px-6 transition-transform duration-400 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="flex items-center justify-between py-4 text-white text-lg font-medium border-b border-rk-gray-800 hover:text-rk-red transition-colors"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
              <ChevronRight size={18} className="text-rk-gray-500" />
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-8 py-4 text-white font-semibold bg-rk-red rounded-2xl hover:bg-rk-red-dark transition-colors"
          >
            Book a Cleaning
          </button>
        </div>
      </div>
    </>
  );
}

// ----------- Hero Section -----------
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury cleaning"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rk-red/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full border border-white/10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-rk-red animate-pulse-slow" />
          <span className="text-rk-gray-300 text-sm font-medium tracking-wide">
            Mississippi's Premier Cleaning Service
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6 animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          Experience the{' '}
          <span className="block">
            <span className="text-gradient-red">Next Level</span>
          </span>
          <span className="text-rk-gray-200">of Cleaning.</span>
        </h1>

        <p
          className="max-w-2xl mx-auto text-rk-gray-300 text-lg sm:text-xl font-light leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          Premium residential and commercial cleaning services designed for perfection.
          Every surface. Every corner. Every time.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 px-8 py-4 bg-rk-red text-white font-semibold rounded-full hover:bg-rk-red-dark transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:gap-3 active:scale-95 text-base"
          >
            Book a Cleaning
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-base border border-white/20"
          >
            Get a Free Quote
          </a>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center mt-16 animate-fade-up"
          style={{ animationDelay: '400ms' }}
        >
          {[
            { number: '500+', label: 'Homes Cleaned' },
            { number: '99%', label: 'Client Satisfaction' },
            { number: '5★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-white">{stat.number}</div>
              <div className="text-rk-gray-400 text-sm font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-rk-gray-500 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-rk-gray-500 to-transparent" />
      </div>
    </section>
  );
}

// ----------- Services Section -----------
function Services() {
  const services = [
    {
      title: 'Home Cleaning',
      description: 'Meticulous residential cleaning tailored to your home. Deep cleans, regular maintenance, and everything in between — done to perfection.',
      image: 'https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?q=80&w=2000&auto=format&fit=crop',
      icon: <Home size={20} />,
      accent: 'rk-red',
    },
    {
      title: 'Airbnb & Apartment',
      description: 'Fast turnaround cleaning for short-term rentals. Guest-ready spaces, fresh linens, and five-star hospitality standards guaranteed.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000&auto=format&fit=crop',
      icon: <Sparkles size={20} />,
      accent: 'rk-blue',
    },
    {
      title: 'Rental Property',
      description: 'Move-in and move-out cleaning that protects your investment. Deep cleans that satisfy landlords, impress tenants, and maximize deposits.',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2000&auto=format&fit=crop',
      icon: <CheckCircle size={20} />,
      accent: 'rk-red',
    },
    {
      title: 'Commercial & Office',
      description: 'Pristine workplaces that inspire productivity. Scheduled commercial cleaning with professional-grade products and discreet service.',
      image: 'https://images.unsplash.com/photo-1581091215367-59ab6b7a4b3b?q=80&w=2000&auto=format&fit=crop',
      icon: <Building2 size={20} />,
      accent: 'rk-blue',
    },
  ];

  return (
    <section id="services" className="py-32 bg-rk-gray-950 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-rk-red/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-rk-red text-sm font-semibold tracking-widest uppercase mb-4 animate-on-scroll">
            Our Services
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight animate-on-scroll">
            Precision cleaning for
            <br />
            <span className="text-gradient-rb">every environment.</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-rk-gray-400 text-lg leading-relaxed animate-on-scroll">
            From private residences to commercial spaces, we deliver the same uncompromising standard of excellence.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer animate-on-scroll`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-white text-xs font-semibold ${
                    service.accent === 'rk-red'
                      ? 'bg-rk-red/20 border border-rk-red/40'
                      : 'bg-rk-blue/20 border border-rk-blue/40'
                  }`}
                >
                  {service.icon}
                  {service.title}
                </div>
                <p className="text-rk-gray-300 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                  Learn more
                  <ArrowRight size={16} className="text-rk-red" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------- Why Choose Us -----------
function WhyChooseUs() {
  const features = [
    {
      icon: <Shield size={28} />,
      title: 'Trusted Professionals',
      description: 'Fully vetted, background-checked cleaners you can trust in your home or business.',
      color: 'text-rk-red',
      bg: 'bg-rk-red/10',
      border: 'border-rk-red/20',
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Attention to Detail',
      description: 'We clean every corner, surface, and crevice. Nothing escapes our meticulous eye.',
      color: 'text-rk-blue',
      bg: 'bg-rk-blue/10',
      border: 'border-rk-blue/20',
    },
    {
      icon: <Zap size={28} />,
      title: 'Reliable & Fast',
      description: 'On time, every time. Efficient cleaning that respects your schedule and space.',
      color: 'text-rk-red',
      bg: 'bg-rk-red/10',
      border: 'border-rk-red/20',
    },
    {
      icon: <Award size={28} />,
      title: 'Premium Quality',
      description: 'Professional-grade products and techniques that deliver spotless results every time.',
      color: 'text-rk-blue',
      bg: 'bg-rk-blue/10',
      border: 'border-rk-blue/20',
    },
    {
      icon: <Calendar size={28} />,
      title: 'Flexible Scheduling',
      description: 'Book on your terms. Morning, evening, weekdays, weekends — we work around you.',
      color: 'text-rk-red',
      bg: 'bg-rk-red/10',
      border: 'border-rk-red/20',
    },
    {
      icon: <Clock size={28} />,
      title: '100% Satisfaction',
      description: 'Not happy? We come back and make it right — no questions asked, no extra charge.',
      color: 'text-rk-blue',
      bg: 'bg-rk-blue/10',
      border: 'border-rk-blue/20',
    },
  ];

  return (
    <section id="why-us" className="py-32 bg-black relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Red glow orb */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-rk-red/5 blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-rk-blue/5 blur-3xl -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-rk-blue text-sm font-semibold tracking-widest uppercase mb-4 animate-on-scroll">
            Why RK Cleaning
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight animate-on-scroll">
            The standard others
            <br />
            <span className="text-gradient-blue">aspire to match.</span>
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group glass rounded-3xl p-8 hover:bg-white/[0.06] transition-all duration-400 border ${f.border} animate-on-scroll cursor-default`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
              <p className="text-rk-gray-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------- Before & After Slider -----------
function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateSlider(e.clientX);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updateSlider(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) updateSlider(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) updateSlider(e.touches[0].clientX);
    };
    const stopDrag = () => { isDragging.current = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [updateSlider]);

  return (
    <section id="results" className="py-32 bg-rk-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-rk-red text-sm font-semibold tracking-widest uppercase mb-4 animate-on-scroll">
            The RK Difference
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight animate-on-scroll">
            See the transformation
            <br />
            <span className="text-gradient-red">in real time.</span>
          </h2>
          <p className="mt-6 text-rk-gray-400 text-lg animate-on-scroll">
            Drag the slider to reveal before and after results.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-scale">
          <div
            ref={containerRef}
            className="before-after-container select-none"
            style={{ userSelect: 'none' }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* After image (full width, underneath) */}
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2000&auto=format&fit=crop"
              alt="After cleaning"
              className="w-full h-96 md:h-[520px] object-cover object-center block"
              draggable={false}
            />

            {/* Before image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2000&auto=format&fit=crop"
                alt="Before cleaning"
                className="absolute inset-0 h-full object-cover object-center block"
                style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }}
                draggable={false}
              />
            </div>

            {/* Labels */}
            <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full text-white text-sm font-bold pointer-events-none">
              Before
            </div>
            <div className="absolute top-6 right-6 glass px-4 py-2 rounded-full text-white text-sm font-bold pointer-events-none">
              After
            </div>

            {/* Divider */}
            <div
              className="before-after-divider"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="before-after-handle">
                <div className="flex items-center gap-1">
                  <ChevronLeft size={14} className="text-rk-gray-800" />
                  <ChevronRight size={14} className="text-rk-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------- About Section -----------
function About() {
  return (
    <section id="about" className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative animate-on-scroll-left">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2000&auto=format&fit=crop"
                alt="RK Cleaning team professionals"
                className="w-full h-[500px] lg:h-[600px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 glass border border-white/10 rounded-2xl p-6 max-w-xs shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-rk-red rounded-full flex items-center justify-center">
                  <Award size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Ryan Kemp</div>
                  <div className="text-rk-gray-400 text-xs">CEO & Founder</div>
                </div>
              </div>
              <p className="text-rk-gray-300 text-xs leading-relaxed">
                "Our mission is simple — deliver premium cleaning that our clients are genuinely proud to come home to."
              </p>
            </div>

            {/* Years badge */}
            <div className="absolute -top-6 -left-6 w-24 h-24 glass border border-rk-red/30 rounded-2xl flex flex-col items-center justify-center glow-red">
              <span className="text-rk-red text-2xl font-black">5+</span>
              <span className="text-rk-gray-300 text-xs font-medium text-center leading-tight">Years of Excellence</span>
            </div>
          </div>

          {/* Text */}
          <div className="animate-on-scroll-right">
            <p className="text-rk-blue text-sm font-semibold tracking-widest uppercase mb-4">
              Our Story
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
              Cleaning elevated to
              <br />
              <span className="text-gradient-red">an art form.</span>
            </h2>

            <div className="space-y-5 text-rk-gray-300 text-base leading-relaxed">
              <p>
                RK Cleaning Service LLC was founded on a single belief: that a truly clean space transforms how you live
                and work. Based in Walls, Mississippi, we've built our reputation one spotless room at a time.
              </p>
              <p>
                Under the leadership of CEO <span className="text-white font-semibold">Ryan Kemp</span>, our team
                holds itself to the highest professional standards — combining meticulous technique with genuine care for
                every client we serve.
              </p>
              <p>
                We don't just clean spaces — we restore them. Every engagement is approached with the attention to
                detail and personal pride that defines luxury service at every level.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-rk-gray-800">
              {[
                { n: '500+', l: 'Clients Served' },
                { n: '100%', l: 'Satisfaction Rate' },
                { n: '5★', l: 'Avg. Rating' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-black text-white">{s.n}</div>
                  <div className="text-rk-gray-500 text-xs mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-rk-red text-white font-semibold rounded-full hover:bg-rk-red-dark transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 group"
            >
              Work With Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------- Testimonials -----------
function Testimonials() {
  const reviews = [
    {
      name: 'Jasmine T.',
      location: 'Memphis, TN',
      rating: 5,
      review: "Absolutely incredible service. My home has never looked this good. Ryan's team pays attention to every single detail — I could not be happier.",
    },
    {
      name: 'Marcus D.',
      location: 'Walls, MS',
      rating: 5,
      review: 'I use RK Cleaning for my Airbnb properties and the turnarounds are flawless. My guests consistently mention the cleanliness in their reviews.',
    },
    {
      name: 'Stephanie M.',
      location: 'Southaven, MS',
      rating: 5,
      review: 'From booking to the final walk-through, the experience is completely professional. My office looks pristine every single week.',
    },
    {
      name: 'David L.',
      location: 'Hernando, MS',
      rating: 5,
      review: 'They cleaned my rental property between tenants and it looked brand new. Worth every penny for the peace of mind and quality delivered.',
    },
    {
      name: 'Tamika R.',
      location: 'Olive Branch, MS',
      rating: 5,
      review: "Reliable, thorough, and genuinely kind. I trust RK Cleaning completely. They've become an essential part of my monthly routine.",
    },
    {
      name: 'Carlos V.',
      location: 'Memphis, TN',
      rating: 5,
      review: 'I hired them for a deep clean before selling my home. The realtor was stunned. Multiple buyers commented on how immaculate everything was.',
    },
  ];

  return (
    <section id="testimonials" className="py-32 bg-rk-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-rk-blue text-sm font-semibold tracking-widest uppercase mb-4 animate-on-scroll">
            Client Reviews
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight animate-on-scroll">
            Trusted by hundreds.
            <br />
            <span className="text-gradient-blue">Loved by all.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="glass rounded-3xl p-8 border border-white/6 hover:border-white/12 hover:bg-white/[0.05] transition-all duration-400 animate-on-scroll group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={16} className="text-rk-red fill-rk-red" />
                ))}
              </div>

              <p className="text-rk-gray-300 text-sm leading-relaxed mb-6 italic">
                "{r.review}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-rk-gray-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rk-red to-rk-blue flex items-center justify-center text-white font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{r.name}</div>
                  <div className="text-rk-gray-500 text-xs">{r.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------- Contact Section -----------
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-rk-red/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-rk-blue/5 blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div className="animate-on-scroll-left">
            <p className="text-rk-red text-sm font-semibold tracking-widest uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
              Schedule your
              <br />
              <span className="text-gradient-red">cleaning today.</span>
            </h2>
            <p className="text-rk-gray-400 text-base leading-relaxed mb-10">
              Ready to experience the RK difference? Contact us for a free quote or to book your first cleaning.
              We serve Walls, Mississippi and the surrounding Memphis metro area.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-rk-red/10 border border-rk-red/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-rk-red" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">Our Location</div>
                  <div className="text-rk-gray-400 text-sm">
                    6940 Ranch Ridge Cove W<br />Walls, Mississippi 38680
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-rk-blue/10 border border-rk-blue/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-rk-blue" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">Email Us</div>
                  <a
                    href="mailto:info@rkcleaningservice.com"
                    className="text-rk-gray-400 text-sm hover:text-rk-blue transition-colors"
                  >
                    info@rkcleaningservice.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-rk-red/10 border border-rk-red/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-rk-red" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">Call Us</div>
                  <div className="text-rk-gray-400 text-sm">Available by appointment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="animate-on-scroll-right">
            <div className="glass border border-white/8 rounded-3xl p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-rk-red/15 border border-rk-red/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={36} className="text-rk-red" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-3">Message Received!</h3>
                  <p className="text-rk-gray-400 text-base leading-relaxed">
                    Thank you for reaching out. We'll be in touch within 24 hours to confirm your booking.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-white text-2xl font-bold mb-6">Request a Free Quote</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-rk-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                        className="w-full bg-rk-gray-800 border border-rk-gray-700 rounded-xl px-4 py-3 text-white placeholder-rk-gray-500 text-sm focus:outline-none focus:border-rk-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-rk-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-rk-gray-800 border border-rk-gray-700 rounded-xl px-4 py-3 text-white placeholder-rk-gray-500 text-sm focus:outline-none focus:border-rk-blue transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-rk-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full bg-rk-gray-800 border border-rk-gray-700 rounded-xl px-4 py-3 text-white placeholder-rk-gray-500 text-sm focus:outline-none focus:border-rk-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-rk-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">
                      Service Needed
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-rk-gray-800 border border-rk-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rk-blue transition-colors appearance-none"
                    >
                      <option value="" className="bg-rk-gray-800">Select a service...</option>
                      <option value="home" className="bg-rk-gray-800">Home Cleaning</option>
                      <option value="airbnb" className="bg-rk-gray-800">Airbnb / Apartment</option>
                      <option value="rental" className="bg-rk-gray-800">Rental Property</option>
                      <option value="commercial" className="bg-rk-gray-800">Commercial / Office</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-rk-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      placeholder="Tell us about your space and cleaning needs..."
                      className="w-full bg-rk-gray-800 border border-rk-gray-700 rounded-xl px-4 py-3 text-white placeholder-rk-gray-500 text-sm focus:outline-none focus:border-rk-blue transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-rk-red text-white font-bold text-base rounded-2xl hover:bg-rk-red-dark transition-all duration-200 hover:shadow-xl hover:shadow-red-500/30 disabled:opacity-70 active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Schedule My Cleaning
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------- Footer -----------
function Footer() {
  const links = {
    Services: ['Home Cleaning', 'Airbnb Cleaning', 'Rental Property', 'Commercial'],
    Company: ['About Us', 'Our Team', 'Reviews', 'Contact'],
    Support: ['Get a Quote', 'Book a Clean', 'FAQs', 'Privacy Policy'],
  };

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-rk-gray-950 border-t border-rk-gray-800">
      {/* CTA Banner */}
      <div className="bg-rk-red py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Ready for a spotless space?
          </h2>
          <p className="text-red-200 text-base mb-8">
            Join hundreds of satisfied clients across the Memphis metro area.
          </p>
          <button
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rk-red font-bold text-base rounded-full hover:bg-gray-100 transition-all duration-200 shadow-xl group"
          >
            Book Your Cleaning
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <RKLogo size={44} />
              <div>
                <div className="text-white font-bold text-lg">RK Cleaning Service</div>
                <div className="text-rk-gray-500 text-xs tracking-widest uppercase">LLC</div>
              </div>
            </div>
            <p className="text-rk-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Premium cleaning services for homes, rentals, and businesses across Walls, Mississippi and the greater Memphis area.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Instagram size={18} />, label: 'Instagram' },
                { icon: <Facebook size={18} />, label: 'Facebook' },
                { icon: <Twitter size={18} />, label: 'Twitter' },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-10 h-10 glass border border-rk-gray-700 rounded-xl flex items-center justify-center text-rk-gray-400 hover:text-white hover:border-rk-gray-500 transition-all duration-200"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase">{section}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollTo('#contact')}
                      className="text-rk-gray-400 text-sm hover:text-white transition-colors duration-200 text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-rk-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-rk-gray-500 text-sm">
            © {new Date().getFullYear()} RK Cleaning Service LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-rk-gray-600" />
            <span className="text-rk-gray-500 text-xs">6940 Ranch Ridge Cove W, Walls, MS 38680</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ----------- Main App -----------
export default function App() {
  useScrollAnimation();

  return (
    <div className="bg-black text-white font-sans">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <BeforeAfter />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
