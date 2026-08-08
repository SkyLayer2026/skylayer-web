import { MessageCircle, Mail, MapPin, Clock } from "lucide-react"
import { site, whatsappLink } from "../config.js"
import ContactForm from "../components/ContactForm.jsx"

export default function Contact() {
  return (
    <>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Contacto</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Respondemos em menos de 2 horas em horário útil. Fale connosco pelo canal que preferir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <MessageCircle className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold text-slate-900">WhatsApp</p>
                <p className="text-sm text-slate-600">{site.whatsappDisplay}</p>
              </div>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-300 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold text-slate-900">E-mail</p>
                <p className="text-sm text-slate-600">{site.email}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold text-slate-900">Localização</p>
                <p className="text-sm text-slate-600">{site.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Clock className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold text-slate-900">Horário de resposta</p>
                <p className="text-sm text-slate-600">Segunda a sábado, em horário útil</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-3">
            <h2 className="text-xl font-bold text-slate-900">Envie a sua mensagem</h2>
            <p className="mt-2 text-sm text-slate-600">
              Conte-nos o que precisa e responderemos com os próximos passos.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
