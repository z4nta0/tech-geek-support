import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { Cards } from './pages/Cards'
import { Support } from './pages/Support'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'
import MothersDayCard from './pages/MothersDayCard'

const App: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <Nav />
      <main>
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<Home />}    />
          <Route path="/work"    element={<Work />}    />
          <Route path="/cards"   element={<Cards />}   />
          <Route path="/mothersdaycard" element={<MothersDayCard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about"   element={<About />}   />
          <Route path="/contact" element={<Contact />} />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
