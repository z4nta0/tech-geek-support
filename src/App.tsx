import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Support } from './pages/Support'
import { NotFound } from './pages/NotFound'

const App: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <Nav />
      <main>
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<Support />}  />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
