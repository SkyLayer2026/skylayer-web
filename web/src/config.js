export const site = {
  name: "Skylayer",
  tagline: "Democratizar a transformação digital",
  description:
    "Criamos sites profissionais, sistemas de gestão interna e identidade visual para pequenas e médias empresas em Moçambique.",
  email: "ola@skylayer.co.mz",
  whatsappNumber: "258840000000",
  whatsappDisplay: "+258 84 000 0000",
  location: "Maputo, Moçambique",
  social: {
    facebook: "https://facebook.com/skylayer",
    instagram: "https://instagram.com/skylayer",
    linkedin: "https://linkedin.com/company/skylayer",
  },
}

export const whatsappLink = (message = "Olá Skylayer! Gostaria de saber mais sobre os vossos serviços.") =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
