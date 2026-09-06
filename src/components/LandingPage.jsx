import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Rocket,
  Zap,
  Shield,
  Globe,
  Users,
  ArrowRight,
  Moon,
  Sun,
  Mail,
  Phone,
} from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Inline SVG components for brand icons not available in lucide-react v1.41+
const GithubIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.801 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61C3.65 17.758 2.5 17.258 2.5 17.258 1.5 16.642 1.5 15.642 1.5 15.642c0-1.18.252-2.41 1.174-3.317-1.19-.326-2.43-1.292-2.43-2.827 0-2.008 1.35-3.625 3.07-3.625 1.157 0 2.303.42 3.146.982-.303.92-.557 2.29-.47 3.638-1.67.5-3.44-.845-3.44-3.38 0-.726.25-1.435.71-1.965-.07-.29-.31-.435-.57-4.27.18-.557.91-1.83.91-3.67 0-1.84.72-3.39 1.88-4.2-1.196-.83-1.87-1.97-1.87-3.19h-.01c-.007 1.04.33-2.15.926-3.3h-.02c0 1.03.29 2.04.8 2.81.83-1.36 1.93-2.44 3.23-3.12l-.01-.2v-4.05c0-1.24 1.06-2.27 2.37-2.27.75 0 1.46.32 1.98.85.52-.17 1.06-.34 1.64-.34 2.17 0 3.52.94 4.06 2.18.94-.31 1.93-.48 2.95-.48l.03 3.97c1.3-.7 2.1-2.09 2.1-3.56 0-1.53-.46-2.97-1.2-4.02.82.27 1.58.7 2.19 1.26.53-.37 1.1-.72 1.71-.96.63.82 1.06 1.82 1.06 2.94 0 .01-.01.02-.01.03" />
  </svg>
)

const TwitterIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.44 8.33 9.33 12.17h-7.79l-5.77-7.47-8.31 7.47H1.5L9.94 11.76 1.5 3H7.86L14.04 11.37l7.42-6.12ZM16.7 19.67h1.6L6.6 3.1h-2L16.7 19.67Z" />
  </svg>
)

const LinkedInIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.842-3.037-1.85 0-2.136 1.457-2.136 2.94v5.666H9.351V8.614h3.413v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.6 0 4.26 2.367 4.26 5.45v6.677Z" />
    <path d="M5.337 7.357a2.06 2.06 0 0 1-2.06-2.06 2.06 2.06 0 1 1 2.06 2.06Zm1.782 10.782H3.555V8.607h3.564v9.532Zm-3.56 0H1.776V8.607h3.564v9.532Z" />
  </svg>
)

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Smooth-scrolls to a section by id, preventing the default anchor jump.
function scrollToSection(e, id) {
  if (e) e.preventDefault()
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Navbar ──────────────────────────────────────────────────────────────
function Navbar({ dark, setDark }) {
  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Características', href: '#caracteristicas' },
    { label: 'Precios', href: '#precios' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-colors',
        dark ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-white/80 backdrop-blur-xl border-b border-border',
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                'bg-primary text-white',
              )}
            >
              <Rocket className="w-6 h-6" />
            </div>
            <span className={cn('text-xl font-bold', dark ? 'text-text' : 'text-gray-900')}>
              NexusUI
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href.slice(1))}
                className={cn(
                  'text-sm font-medium hover:text-primary transition-colors',
                  dark ? 'text-text-secondary' : 'text-gray-600',
                )}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Theme Toggle & CTA */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setDark(!dark)}
              className={cn(
                'p-2 rounded-lg transition-colors',
                dark
                  ? 'bg-surface hover:bg-border text-text-secondary hover:text-text'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800',
              )}
              whileTap={{ scale: 0.9 }}
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <motion.button
              onClick={(e) => scrollToSection(e, 'precios')}
              className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-white bg-primary hover:bg-primary-hover transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Comenzar
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

// ── Hero Section ────────────────────────────────────────────────────────
function HeroSection({ dark }) {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 300], [0, -50])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <motion.section
      id="inicio"
      className="pt-28 pb-20 lg:pt-32 lg:pb-28 relative overflow-hidden scroll-mt-24"
      style={{ y: yParallax }}
    >
      {/* Background gradient */}
      <div className={cn('absolute inset-0 -z-10', dark ? 'bg-gradient-to-br from-background via-surface to-background' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50')} />

      {/* Floating blobs */}
      <motion.div
        className={cn('absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-30 -z-10', dark ? 'bg-gradient-to-r from-primary/40 to-accent/40' : 'bg-gradient-to-r from-primary/20 to-accent/20')}
        animate={{ x: [0, 30, -30, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className={cn('absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-25 -z-10', dark ? 'bg-gradient-to-l from-accent/30 to-primary/30' : 'bg-gradient-to-l from-accent/15 to-primary/15')}
        animate={{ x: [0, -40, 40, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero headline */}
        <motion.h1
          className={cn('text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight', dark ? 'text-text' : 'text-gray-900')}
          variants={itemVariants}
        >
          <span className="block">Construye experiencias digitales</span>
          <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            hermosas en modo oscuro
          </span>
        </motion.h1>

        <motion.p
          className={cn('text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed', dark ? 'text-text-secondary' : 'text-gray-600')}
          variants={itemVariants}
        >
          NexusUI es un sistema de diseño moderno y una plantilla de landing page
          que permite a los desarrolladores crear interfaces impresionantes,
          accesibles y listas para producción con React, Tailwind CSS y
          animaciones fluidas con Framer Motion.
        </motion.p>

        {/* CTA buttons */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16" variants={itemVariants}>
          <motion.button
            onClick={(e) => scrollToSection(e, 'precios')}
            className="group inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg text-white bg-primary hover:bg-primary-hover shadow-[0_0_30px_rgba(153,69,255,0.4)] hover:shadow-[0_0_40px_rgba(153,69,255,0.6)] transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Comenzar</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            className={cn('group inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all', dark ? 'border-border hover:bg-surface text-text-secondary hover:text-text' : 'border-gray-300 hover:bg-gray-100 text-gray-700')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Globe className="mr-2 w-5 h-5" />
            <span>Ver demostración</span>
          </motion.button>
        </motion.div>
            </motion.div>
    </motion.section>
  )
}

// ── Features Section ────────────────────────────────────────────────────
function FeaturesSection({ dark }) {
  const features = [
    { icon: Rocket, title: 'Velocidad extrema', description: 'Construido con Vite y optimizado para producción. Lanza tu próximo proyecto en tiempo récord con hot reloading instantáneo y compilaciones ultrarrápidas.', color: 'from-primary to-accent' },
    { icon: Shield, title: 'Seguro por defecto', description: 'Prácticas de seguridad de nivel empresarial integradas desde el inicio. Sin vulnerabilidades ni concesiones: solo código limpio y seguro.', color: 'from-accent to-primary' },
    { icon: Globe, title: 'Escala global', description: 'Despliega donde quieras: en Vercel, Netlify o tu propia infraestructura. Diseñado para escalar del prototipo a millones de usuarios.', color: 'from-primary to-accent' },
    { icon: Users, title: 'Colaboración en equipo', description: 'Diseñado para equipos. Bibliotecas de componentes, tokens de diseño y documentación que hacen del trabajo en equipo un placer.', color: 'from-accent to-primary' },
    { icon: Zap, title: 'Animaciones fluidas', description: 'Framer Motion potencia cada interacción, ofreciendo animaciones sedosas a 60fps y micro-interacciones en todo el sitio.', color: 'from-primary to-accent' },
    { icon: Shield, title: 'Modo oscuro primero', description: "El modo oscuro no es una ocurrencia tardía: está construido desde cero con un sistema de colores bello y accesible.", color: 'from-accent to-primary' },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <motion.section
      id="caracteristicas"
      className="py-20 lg:py-28 relative scroll-mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={cardVariants}>
          <motion.span
            className={cn('inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4', dark ? 'bg-primary/10 text-primary' : 'bg-purple-100 text-purple-700')}
            whileHover={{ scale: 1.05 }}
          >
            Features
          </motion.span>
          <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', dark ? 'text-text' : 'text-gray-900')}>
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className={cn('text-lg max-w-2xl mx-auto', dark ? 'text-text-secondary' : 'text-gray-600')}>
            Un kit de herramientas completo diseñado para acelerar tu flujo de
            trabajo de desarrollo y ayudarte a crear aplicaciones web modernas
            más rápido.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants} whileHover={{ y: -8, scale: 1.02 }}>
              <div
                className={cn(
                  'h-full p-8 rounded-2xl border transition-all duration-300 group',
                  dark ? 'bg-surface border-border hover:border-primary/30 hover:bg-card' : 'bg-white border-gray-200 hover:shadow-xl hover:border-purple-200',
                )}
              >
                <motion.div
                  className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-6', `bg-gradient-to-r ${feature.color}`)}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className={cn('text-xl font-semibold mb-3', dark ? 'text-text' : 'text-gray-900')}>
                  {feature.title}
                </h3>
                <p className={cn('leading-relaxed', dark ? 'text-text-secondary' : 'text-gray-600')}>
                  {feature.description}
                </p>
                <motion.button
                  className={cn('mt-6 flex items-center text-sm font-medium', dark ? 'text-primary hover:text-primary-hover' : 'text-purple-600 hover:text-purple-700')}
                  whileHover={{ x: 5 }}
                >
                  <span>Más información</span>
                  <ArrowRight className="ml-1 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
                    ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ── Pricing Section ─────────────────────────────────────────────────────
function PricingSection({ dark }) {
  const plans = [
    {
      name: 'Básico',
      price: '$0',
      period: '/mes',
      description: 'Para personas que exploran la plataforma en su primer proyecto.',
      features: ['3 proyectos', 'Componentes básicos', 'Soporte de la comunidad'],
      highlighted: false,
      cta: 'Empieza gratis',
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/mes',
      description: 'Herramientas avanzadas y soporte prioritario para lanzar más rápido.',
      features: ['Proyectos ilimitados', 'Todos los componentes y plantillas', 'Soporte prioritario', 'Dominios personalizados'],
      highlighted: true,
      cta: 'Comenzar',
    },
    {
      name: 'Empresarial',
      price: 'Personalizado',
      period: '',
      description: 'Soluciones a medida para equipos y organizaciones a gran escala.',
      features: ['Todo lo de Pro', 'SSO y seguridad avanzada', 'Gestor dedicado', 'SLA e incorporación'],
      highlighted: false,
      cta: 'Contactar ventas',
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <motion.section
      id="precios"
      className="py-20 lg:py-28 relative scroll-mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={cardVariants}>
          <motion.span
            className={cn('inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4', dark ? 'bg-primary/10 text-primary' : 'bg-purple-100 text-purple-700')}
            whileHover={{ scale: 1.05 }}
          >
            Pricing
          </motion.span>
          <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', dark ? 'text-text' : 'text-gray-900')}>
            Precios simples y transparentes
          </h2>
          <p className={cn('text-lg max-w-2xl mx-auto', dark ? 'text-text-secondary' : 'text-gray-600')}>
            Empieza gratis y escala a medida que creces. Sin costes ocultos, cancela cuando quieras.
          </p>
        </motion.div>

        {/* Pricing grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={cardVariants} whileHover={{ y: -8 }}>
              <div
                className={cn(
                  'relative h-full p-8 rounded-2xl border flex flex-col transition-all duration-300',
                  plan.highlighted
                    ? dark
                      ? 'bg-card border-primary/60 shadow-[0_0_40px_rgba(153,69,255,0.25)]'
                      : 'bg-white border-purple-400 shadow-xl'
                    : dark
                      ? 'bg-surface border-border hover:border-primary/30'
                      : 'bg-white border-gray-200 hover:shadow-lg',
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                    Más popular
                  </span>
                )}
                <h3 className={cn('text-lg font-semibold mb-2', dark ? 'text-text' : 'text-gray-900')}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className={cn('text-4xl font-extrabold', dark ? 'text-text' : 'text-gray-900')}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={cn('ml-1 text-sm', dark ? 'text-text-secondary' : 'text-gray-500')}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={cn('text-sm leading-relaxed mb-6', dark ? 'text-text-secondary' : 'text-gray-600')}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className={cn('flex items-start text-sm', dark ? 'text-text-secondary' : 'text-gray-600')}>
                      <Zap className={cn('w-4 h-4 mr-2 mt-0.5 flex-shrink-0', dark ? 'text-primary' : 'text-purple-600')} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={cn(
                    'w-full py-3 rounded-xl font-semibold transition-all',
                    plan.highlighted
                      ? 'bg-primary hover:bg-primary-hover text-white shadow-lg'
                      : dark
                        ? 'bg-surface hover:bg-border text-text border border-border'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200',
                  )}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ── CTA Section ─────────────────────────────────────────────────────────
function CTASection({ dark }) {
  return (
    <motion.section
      className="py-20 lg:py-28 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          className="rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            ¿Listo para lanzar tu próximo proyecto?
          </motion.h2>
          <motion.p
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Empieza a construir con NexusUI hoy. Únete a miles de desarrolladores
            que ya lanzan más rápido y crean mejores experiencias de usuario.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <motion.button
              className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Empieza gratis</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <motion.button
              className="inline-flex items-center px-6 py-3 border border-white/30 text-white rounded-xl font-medium transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Solicita una demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
    )
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer({ dark }) {

  const footerLinks = {
    Producto: ['Características', 'Precios', 'Documentación', 'Novedades'],
    Empresa: ['Nosotros', 'Empleo', 'Blog', 'Prensa'],
    Recursos: ['Guías', 'Soporte', 'API', 'Estado'],
  }

    const socialLinks = [
    { icon: GithubIcon, href: '#', label: 'GitHub' },
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
    { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Correo electrónico' },
    { icon: Phone, href: '#', label: 'Teléfono' },
  ]

  return (
    <motion.footer
      id="contacto"
      className={cn(
        'pt-16 pb-8 border-t scroll-mt-24',
        dark ? 'bg-background border-border' : 'bg-white border-gray-200',
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-text">NexusUI</span>
            </div>
            <p className={cn('text-sm leading-relaxed', dark ? 'text-text-secondary' : 'text-gray-600')}>
              Un sistema de diseño moderno para crear experiencias digitales
              hermosas con el modo oscuro como prioridad.
            </p>
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all',
                    dark
                      ? 'bg-surface hover:bg-border text-text-secondary hover:text-text'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800',
                  )}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className={cn('font-semibold mb-4', dark ? 'text-text' : 'text-gray-900')}>
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <motion.li key={link}>
                    <motion.a
                      href="#"
                      className={cn(
                        'text-sm hover:text-primary transition-colors',
                        dark ? 'text-text-secondary' : 'text-gray-600',
                      )}
                      whileHover={{ x: 3 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <motion.div
          className={cn(
            'pt-8 border-t text-center text-sm',
            dark ? 'border-border text-text-secondary' : 'border-gray-200 text-gray-600',
          )}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
                    <p>&copy; {new Date().getFullYear()} NexusUI. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

// ── Main LandingPage ────────────────────────────────────────────────────
export default function LandingPage() {
  const [dark, setDark] = useState(true)

  // Apply or remove the `dark` class on <html>
  useEffect(() => {
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
      html.style.colorScheme = 'dark'
    } else {
      html.classList.remove('dark')
      html.style.colorScheme = 'light'
    }
  }, [dark])

  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-300',
        dark ? 'bg-background text-text' : 'bg-white text-gray-900',
      )}
    >
      <Navbar dark={dark} setDark={setDark} />
      <HeroSection dark={dark} />
      <FeaturesSection dark={dark} />
      <PricingSection dark={dark} />
      <CTASection dark={dark} />
      <Footer dark={dark} />
    </div>
  )
}


