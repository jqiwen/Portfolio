import { About } from './components/About'
import { BackToTop } from './components/BackToTop'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { EngineeringSummary } from './components/EngineeringSummary'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { MobileApp } from './components/MobileApp'
import { useEffect, useState } from 'react'
import { Projects } from './components/Projects'
import { SectionRail } from './components/SectionRail'
// import { Skills } from './components/Skills'

function App() {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setMobile(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  if (mobile) return <MobileApp />

  return (
    <>
      <Navbar />
      <SectionRail />
      <BackToTop />
      <main id="main-content">
        <Hero />
        <EngineeringSummary />
        <About />
        <Education />
        <Experience />
        <Projects />
        {/* <Skills /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
