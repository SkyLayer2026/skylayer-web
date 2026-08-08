import { MessageCircle, Mail, MapPin, Clock } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { site, whatsappLink } from "../config.js"
import ContactForm from "../components/ContactForm.jsx"

export default function Contact() {
  usePageTitle("Contacto")

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">Contacto</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Vamos conversar sobre o seu projeto?
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Respondemos em menos de 2 horas em horário útil. Começamos sempre por entender a sua
            necessidade.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="card flex items-center gap-4 p-5 transition-colors hover:border-emerald-300"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-ink">WhatsApp</p>
                <p className="text-sm text-muted">{site.whatsappDisplay}</p>
              </div>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="card flex items-center gap-4 p-5 transition-colors hover:border-brand-300"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-ink">E-mail</p>
                <p className="text-sm text-muted">{site.email}</p>
              </div>
            </a>
            <div className="card flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface text-muted">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-ink">Localização</p>
                <p className="text-sm text-muted">{site.location}</p>
              </div>
            </div>
            <div className="card flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface text-muted">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-ink">Horário de resposta</p>
                <p className="text-sm text-muted">Segunda a sábado, em horário útil</p>
              </div>
            </div>
          </div>

          <div className="card p-7 lg:col-span-3">
            <h2 className="text-xl font-bold text-ink">Solicitar orçamento</h2>
            <p className="mt-2 text-sm text-muted">
              Conte-nos o que precisa e responderemos com os próximos passos — começando pelo
              diagnóstico.
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
