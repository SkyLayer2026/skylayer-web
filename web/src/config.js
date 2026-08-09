export const site = {
  name: "Skylayer",
  tagline: "Tecnologia não deve ser um privilégio",
  description:
    "Soluções digitais estáveis, seguras, acessíveis e inclusivas para empresas e profissionais em Moçambique. Sites profissionais, sistemas de gestão, automação e infraestrutura.",
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
