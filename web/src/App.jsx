import { Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop.jsx"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx"
import Services from "./pages/Services.jsx"
import ServiceLanding from "./pages/ServiceLanding.jsx"
import Portfolio from "./pages/Portfolio.jsx"
import Diagnostico from "./pages/Diagnostico.jsx"
import Contact from "./pages/Contact.jsx"
import NotFound from "./pages/NotFound.jsx"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/servicos/:slug" element={<ServiceLanding />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
