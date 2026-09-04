import { Routes, Route, Navigate } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop.jsx"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx"
import Services from "./pages/Services.jsx"
import ServiceLanding from "./pages/ServiceLanding.jsx"
import Dev from "./pages/Dev.jsx"
import IoT from "./pages/IoT.jsx"
import Infrastructure from "./pages/Infrastructure.jsx"
import About from "./pages/About.jsx"
import Blog from "./pages/Blog.jsx"
import BlogPost from "./pages/BlogPost.jsx"
import FaqPage from "./pages/Faq.jsx"
import Contact from "./pages/Contact.jsx"
import Diagnostico from "./pages/Diagnostico.jsx"
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
          <Route path="/dev" element={<Dev />} />
      <Route path="/iot" element={<IoT />} />
      <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contacto" element={<Contact />} />
           <Route path="/projetos" element={<Navigate to="/dev" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
