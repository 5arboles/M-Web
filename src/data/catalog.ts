export interface PrintItem {
  id: string
  number: string
  title: string
  code: string
  category: 'GYM' | 'ROCK' | 'BLOKECORE' | 'BRAND'
  desc: string
  svgGraphic: string
  aspect: string
  weight: string
  image: string
}

export interface ProductItem {
  id: string
  title: string
  category: 'GYM' | 'ROCK' | 'BLOKECORE'
  subtitle: string
  price: string
  weight: string
  fit: string
  image: string
  details: string[]
  badge: string
}

export interface WholesaleTier {
  name: string
  quantity: string
  discount: string
  description: string
  features: string[]
  recommended?: boolean
}

export const WHATSAPP_PHONE = '5491100000000'

export const createWhatsAppUrl = (message: string) => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}

// Fondos subidos por el usuario que rotan cada 10 segundos
export interface BackgroundItem {
  id: string
  url: string
  title: string
  subtitle: string
}

export const BACKGROUND_ITEMS: BackgroundItem[] = [
  {
    id: 'fondo-01',
    url: '/images/fondo.jpg?v=2',
    title: 'JUST TRYING MY LUCK',
    subtitle: 'THIRTEEN SUPPLY CO // DICE & FIRE',
  },
  {
    id: 'fondo-02',
    url: '/images/fondo2.jpg?v=2',
    title: 'WE ARE PRESSED BUT NOT CRUSHED',
    subtitle: 'FLAMING SKELETON // CHALK EDITION',
  },
  {
    id: 'fondo-03',
    url: '/images/fondo3.jpg?v=2',
    title: 'ERNIE BALL ORIGINAL SLINKY',
    subtitle: 'GUITAR STRINGS // EAGLE VINTAGE',
  },
]

export const BACKGROUND_IMAGES = BACKGROUND_ITEMS.map((b) => b.url)

const createSvgDataUri = (content: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
    <rect width="800" height="800" fill="none" />
    ${content}
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const PRINTS_DATA: PrintItem[] = [
  {
    id: 'print-01',
    number: '01',
    title: 'HEAVY DISCIPLINE',
    code: 'HD-280-RAW',
    category: 'GYM',
    desc: 'Tipografía brutalista de hierro, coordenadas y ficha de carga.',
    aspect: 'Front Center // Oversized Chest',
    weight: '280 GSM',
    image: '/images/1.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Clash Display', 'Arial Black', sans-serif">
        <text x="400" y="240" font-size="46" font-weight="900" text-anchor="middle" letter-spacing="4">HEAVY DISCIPLINE</text>
        <line x1="160" y1="280" x2="640" y2="280" stroke="#F5F5F5" stroke-width="6" />
        <text x="400" y="340" font-size="24" font-weight="700" text-anchor="middle" letter-spacing="8">NO SHORTCUTS // NO WEAKNESS</text>
        <rect x="250" y="400" width="300" height="130" fill="none" stroke="#F5F5F5" stroke-width="4" stroke-dasharray="10,6" />
        <text x="400" y="450" font-size="38" font-weight="900" text-anchor="middle" letter-spacing="4">RAW IRON</text>
        <text x="400" y="495" font-size="18" font-family="'Courier New', monospace" text-anchor="middle" letter-spacing="3">[ 280 GSM // EDITION 01 ]</text>
      </g>
    `),
  },
  {
    id: 'print-02',
    number: '02',
    title: 'ACID DISTORTION 1994',
    code: 'RK-DISTORT',
    category: 'ROCK',
    desc: 'Estética de concierto clandestino, tipografía desgastada y grunge underground.',
    aspect: 'Front Center // Distorted Print',
    weight: '280 GSM',
    image: '/images/2.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Impact', 'Clash Display', sans-serif">
        <text x="400" y="220" font-size="70" font-weight="900" text-anchor="middle" letter-spacing="6">DISTORTION</text>
        <text x="400" y="310" font-size="44" font-weight="800" text-anchor="middle" letter-spacing="12">UNDERGROUND</text>
        <line x1="120" y1="350" x2="680" y2="350" stroke="#F5F5F5" stroke-width="12" />
        <text x="400" y="470" font-size="110" font-weight="900" text-anchor="middle" letter-spacing="16">1994</text>
      </g>
    `),
  },
  {
    id: 'print-03',
    number: '03',
    title: 'ULTRAS SUB-CULTURE',
    code: 'BL-PITCH-86',
    category: 'BLOKECORE',
    desc: 'Fútbol callejero, estética de tribuna europea y heráldica noventera.',
    aspect: 'Front Center // Terrace Heritage',
    weight: '280 GSM',
    image: '/images/3.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Clash Display', 'Arial Black', sans-serif">
        <polygon points="400,160 550,220 530,480 400,560 270,480 250,220" fill="none" stroke="#F5F5F5" stroke-width="7" />
        <text x="400" y="300" font-size="36" font-weight="900" text-anchor="middle" letter-spacing="4">AGAINST</text>
        <text x="400" y="350" font-size="28" font-weight="800" text-anchor="middle" letter-spacing="3">MODERN FOOTBALL</text>
      </g>
    `),
  },
  {
    id: 'print-04',
    number: '04',
    title: 'M SIGNATURE ARCHIVE',
    code: 'M-ORIGINALS',
    category: 'BRAND',
    desc: 'Monograma brutalista de la marca con coordenadas de producción textil.',
    aspect: 'Front Center // Minimal High Contrast',
    weight: '280 GSM',
    image: '/images/4.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Clash Display', 'Arial Black', sans-serif">
        <text x="400" y="350" font-size="160" font-weight="900" text-anchor="middle" letter-spacing="-5">M</text>
        <line x1="220" y1="400" x2="580" y2="400" stroke="#F5F5F5" stroke-width="8" />
        <text x="400" y="460" font-size="34" font-weight="700" text-anchor="middle" letter-spacing="14">ARCHIVE</text>
      </g>
    `),
  },
  {
    id: 'print-05',
    number: '05',
    title: 'RAW IRON PUMP COVER',
    code: 'HD-IRON-PUMP',
    category: 'GYM',
    desc: 'Esquema de carga pesada, barra de pesas y corte drop-shoulder para entrenamiento.',
    aspect: 'Back Dominant // Heavy Chest',
    weight: '280 GSM',
    image: '/images/5.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Clash Display', sans-serif">
        <text x="400" y="260" font-size="80" font-weight="900" text-anchor="middle">280 GSM</text>
        <rect x="220" y="310" width="360" height="20" fill="#F5F5F5" />
        <text x="400" y="410" font-size="34" font-weight="800" text-anchor="middle" letter-spacing="6">PUMP COVER</text>
      </g>
    `),
  },
  {
    id: 'print-06',
    number: '06',
    title: 'STATIC NOISE NOCTURNE',
    code: 'RK-NOCTURNE',
    category: 'ROCK',
    desc: 'Negro sobre negro, distorsión visual y tipografía desgastada de recital.',
    aspect: 'Front Center // Acid Black',
    weight: '280 GSM',
    image: '/images/6.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Impact', sans-serif">
        <text x="400" y="270" font-size="84" font-weight="900" text-anchor="middle" letter-spacing="8">STATIC NOISE</text>
        <text x="400" y="350" font-size="40" font-weight="700" text-anchor="middle" letter-spacing="14">NOCTURNE CLUB</text>
      </g>
    `),
  },
  {
    id: 'print-07',
    number: '07',
    title: 'TERRACE HERITAGE 1986',
    code: 'BL-TERRACE-86',
    category: 'BLOKECORE',
    desc: 'Cultura casual de tablón, banderas de alambre y tipografía clásica de estadio.',
    aspect: 'Front Center // Street Casual',
    weight: '280 GSM',
    image: '/images/7.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Clash Display', sans-serif">
        <text x="400" y="260" font-size="52" font-weight="900" text-anchor="middle" letter-spacing="6">TERRACE</text>
        <text x="400" y="470" font-size="110" font-weight="900" text-anchor="middle" letter-spacing="12">1986</text>
      </g>
    `),
  },
  {
    id: 'print-08',
    number: '08',
    title: 'UNBREAKABLE REPS',
    code: 'HD-UNBREAKABLE',
    category: 'GYM',
    desc: 'Gráfica técnica para powerlifters y culturismo clásico con tipografía brutal.',
    aspect: 'Front Box // Heavy Fit',
    weight: '280 GSM',
    image: '/images/1.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Clash Display', sans-serif">
        <rect x="180" y="200" width="440" height="380" fill="none" stroke="#F5F5F5" stroke-width="6" />
        <text x="400" y="300" font-size="46" font-weight="900" text-anchor="middle" letter-spacing="4">UNBREAKABLE</text>
      </g>
    `),
  },
  {
    id: 'print-09',
    number: '09',
    title: 'REBELLION NOISE CLUB',
    code: 'RK-REBEL',
    category: 'ROCK',
    desc: 'Estética gótica contemporánea, póster de fanzine y actitud callejera.',
    aspect: 'Front Center // Gothic Street',
    weight: '280 GSM',
    image: '/images/2.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Impact', sans-serif">
        <text x="400" y="250" font-size="90" font-weight="900" text-anchor="middle" letter-spacing="6">REBELLION</text>
      </g>
    `),
  },
  {
    id: 'print-10',
    number: '10',
    title: 'TECHNICAL BOX SPEC',
    code: 'M-BOX-SPEC',
    category: 'BRAND',
    desc: 'Ficha técnica industrial de moldería textil, gramaje y algodón peinado premium.',
    aspect: 'Front Center // Minimal Specimen',
    weight: '280 GSM',
    image: '/images/3.jpg',
    svgGraphic: createSvgDataUri(`
      <g fill="#F5F5F5" font-family="'Clash Display', sans-serif">
        <text x="400" y="240" font-size="64" font-weight="900" text-anchor="middle">M // ATELIER</text>
      </g>
    `),
  },
]

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-01',
    title: 'HEAVY DISCIPLINE PUMP COVER',
    category: 'GYM',
    subtitle: 'Algodón Peinado 280 GSM — Caída pesada y hombros caídos',
    price: '$28.000',
    weight: '280 GSM',
    fit: 'Boxy / Heavy Oversize',
    image: '/images/1.jpg',
    details: [
      '100% Algodón peinado de 280 gramos.',
      'Corte Boxy ancho con caída perfecta.',
      'Costuras reforzadas de 4 hilos en hombros.',
    ],
    badge: 'BESTSELLER',
  },
  {
    id: 'prod-02',
    title: 'ACID DISTORTION TEE',
    category: 'ROCK',
    subtitle: 'Inspiración grunge y estética subterránea en negro lavado',
    price: '$28.000',
    weight: '280 GSM',
    fit: 'Drop Shoulder Fit',
    image: '/images/2.jpg',
    details: [
      'Teñido reactivo negro profundo.',
      'Gráfica frontal desgastada en tintas.',
      'Cuello cerrado ajustado al cuello.',
    ],
    badge: 'UNDERGROUND',
  },
  {
    id: 'prod-03',
    title: 'TERRACE HERITAGE 1986',
    category: 'BLOKECORE',
    subtitle: 'Cultura de tablón y fútbol antes de la corporativización',
    price: '$28.000',
    weight: '280 GSM',
    fit: 'Retro Street Cut',
    image: '/images/3.jpg',
    details: [
      'Homenaje a los hinchas de tablón y estética casual.',
      'Escudo heráldico monocromático texturizado.',
      'Corte relajado perfecto para el uso diario.',
    ],
    badge: 'BLOKECORE',
  },
]

export const WHOLESALE_TIERS: WholesaleTier[] = [
  {
    name: 'STARTER PACK',
    quantity: '10 a 24 Prendas',
    discount: '30% OFF',
    description: 'Ideal para gimnasios, cápsulas pequeñas o revendedores que inician.',
    features: [
      'Curva de talles surtida a elección (S a XXL)',
      'Combinación libre de diseños (Gym, Rock o Blokecore)',
      'Packaging individual sellado listo para entrega',
      'Despacho prioritario a todo el país en 48hs',
    ],
  },
  {
    name: 'BRAND PACK',
    quantity: '25 a 99 Prendas',
    discount: '42% OFF',
    description: 'Para marcas emergentes, boxes de entrenamiento y tiendas de ropa.',
    features: [
      'Mejor margen de reventa minorista',
      'Acceso exclusivo a preventas de nuevos drops',
      'Posibilidad de incluir packaging especial con tu sticker',
      'Atención y seguimiento personalizado directo por WhatsApp',
    ],
    recommended: true,
  },
  {
    name: 'ENTERPRISE / CLUB',
    quantity: '100+ Prendas',
    discount: 'PRECIO MAYORISTA MÁXIMO',
    description: 'Abastecimiento a gran escala, eventos masivos y cadenas de gimnasios.',
    features: [
      'Tarifa directa de fábrica por volumen',
      'Etiquetado y hang-tags a medida',
      'Asesoría técnica en textiles y gramajes pesados',
      'Muestras previas de producción aprobadas antes de confección',
    ],
  },
]
