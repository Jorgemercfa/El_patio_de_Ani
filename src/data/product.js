// ================================
// IMPORTS - SHOWS
// ================================
import product1 from '@/assets/showpackage1.png';
import product2 from '@/assets/showpackage2.png';
import product3 from '@/assets/showpackage3.png';
import product4 from '@/assets/competitionsgames.png';
import product5 from '@/assets/magics_show.png';

// ================================
// IMPORTS - INFLABLES
// ================================
import product6 from '@/assets/inflatable1.png';
import product7 from '@/assets/inflatable2.png';
import product8 from '@/assets/inflatable3.png';
import product9 from '@/assets/inflatable4.png';
import product10 from '@/assets/inflatable5.png';
import product11 from '@/assets/inflatable6.png';
import product12 from '@/assets/inflatable7.png';
import product13 from '@/assets/inflatable8.png';
import product14 from '@/assets/inflatable9.png';
import product15 from '@/assets/inflatable10.png';

// ================================
// IMPORTS - LITTLE TIKES
// ================================
import product16 from '@/assets/little_tikes1.png';
import product17 from '@/assets/little_tikes2.png';
import product18 from '@/assets/little_tikes3.png';
import product19 from '@/assets/little_tikes4.png';
import product20 from '@/assets/little_tikes5.png';
import product21 from '@/assets/little_tikes6.png';
import product22 from '@/assets/little_tikes7.png';
import product23 from '@/assets/little_tikes8.png';
import product24 from '@/assets/little_tikes9.png';  // Climber

// ================================
// IMPORTS - TRAMPOLINES
// ================================
import product25 from '@/assets/trampoline1.png';
import product26 from '@/assets/trampoline2.png';

// ================================
// IMPORTS - JUEGOS BEBÉS
// ================================
import product27 from '@/assets/baby_game1.png';
import product28 from '@/assets/baby_game2.png';
import product29 from '@/assets/baby_game3.png';
import product30 from '@/assets/baby_game4.png';
import product31 from '@/assets/baby_game5.png';
import product32 from '@/assets/baby_game6.png';
import product33 from '@/assets/baby_game7.png';
import product34 from '@/assets/baby_game8.png';
import product35 from '@/assets/baby_game9.png';

// ================================
// IMPORTS - ESTÉTICA
// ================================
import facepaint from '@/assets/picture3.png';

// ================================
// IMPORTS - SNACKS
// ================================
import productSnack1 from '@/assets/productSnack1.png';
import productSnack2 from '@/assets/productSnack2.png';
import productSnack3 from '@/assets/productSnack3.png';
import productSnack4 from '@/assets/productSnack4.png';
import productSnack5 from '@/assets/productSnack5.png';
import productSnack6 from '@/assets/productSnack6.png';
import productSnack7 from '@/assets/productSnack7.png';
import productSnack8 from '@/assets/productSnack8.png';
import productSnack9 from '@/assets/productSnack9.png';
import productSnack10 from '@/assets/productSnack10.png';
import productSnack11 from '@/assets/productSnack11.png';
import productSnack12 from '@/assets/productSnack12.png';
import productSnack13 from '@/assets/productSnack13.png';
import productSnack14 from '@/assets/productSnack14.png';
import productSnack15 from '@/assets/productSnack15.png';
import productSnack16 from '@/assets/productSnack16.png';
import productSnack17 from '@/assets/productSnack17.png';
import productSnack18 from '@/assets/productSnack18.png';
import productSnack19 from '@/assets/productSnack19.png';

// ================================
// CONSTANTE TÉRMINOS REUTILIZABLE
// ================================
const TERMS_JUEGOS =
  'Contrato sujeto a disponibilidad. Reserva con el 50% del total. Los juegos se instalan horas antes y se retiran al finalizar el evento. No se instalan en vía pública. Precios por alquiler por evento. Costo de movilidad varía según distrito.';

const TERMS_SNACKS =
  'Reserva con el 50% del total. Los carritos se instalan 1 hora antes y se retiran al finalizar el evento. No se instalan en vía pública. Costo de movilidad varía según distrito.';

const TERMS_SHOWS =
  'Reserva con 50%. No incluye movilidad. Válido para 10 a 20 niños.';

// ================================
// EXPORT
// ================================
export default [

  // ================================
  // SHOWS INFANTILES - ANIMACIÓN
  // ================================
  {
    id: 1,
    name: 'Show Infantil - Paquete 1',
    shortDescription: 'Animación con bailes, juegos y burbujas',
    longDescription:
      'Show completo con animadoras caracterizadas, juegos interactivos, equipo de sonido profesional y cierre con mini hora loca. Ideal para niños de todas las edades.',
    image: product1,
    price: 1000,
    category: 'Shows Infantiles',
    subcategory: 'Animación',
    duration: '90 min',
    options: [
      '1 Animadora y 1 Bailarina caracterizadas con la temática',
      '4 Juegos Interactivos según la edad de los niños',
      'Dinámicas en bailes infantiles',
      'Materiales a repartir durante los bailes (pompones, maracas, timones)',
      'Canciones Infantiles',
      '1 Equipo de sonido + 1 parlante + micrófono + DJ (instalado 1 hora antes)',
      '1 Coordinadora encargada del evento',
      'Alfombra de colores (3x2 metros)',
      '15 etiquetas para los nombres de los niños',
      'Pistola de burbujas durante el show',
      'Fin de Fiesta: Mini hora loca + Globos pencil',
      'Acompañamiento de Piñata y Happy Birthday',
    ],
    Terms_of_use: TERMS_SHOWS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Cronograma',
  },
  {
    id: 2,
    name: 'Show Infantil - Paquete 2',
    shortDescription: 'Animación con muñecos temáticos, juegos y hora loca',
    longDescription:
      'Show completo con animadora caracterizada, muñecos a elección, juegos interactivos y equipo de sonido profesional. Perfecto para sorprender a los niños con sus personajes favoritos.',
    image: product2,
    price: 1400,
    category: 'Shows Infantiles',
    subcategory: 'Animación',
    duration: '90 min',
    options: [
      '1 Animadora caracterizada con la temática',
      '2 Muñecos a escoger',
      '4 Juegos Interactivos según la edad de los niños',
      'Dinámicas en bailes infantiles',
      'Materiales a repartir durante los bailes (pompones, maracas, timones)',
      'Canciones Infantiles',
      '1 Equipo de sonido + 1 parlante + micrófono + DJ (instalado 1 hora antes)',
      '1 Coordinadora encargada del evento',
      'Alfombra de colores (3x2 metros)',
      '15 etiquetas para los nombres de los niños',
      'Fin de Fiesta: Mini hora loca + Globos pencil',
      'Acompañamiento de Piñata y Happy Birthday',
    ],
    Terms_of_use: TERMS_SHOWS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Cronograma',
  },
  {
    id: 3,
    name: 'Show Infantil - Paquete 3',
    shortDescription: 'Animación premium con muñecos, magia y burbujas',
    longDescription:
      'Nuestro paquete más completo: animadora y bailarina caracterizadas, 3 muñecos a elección, show de magia y burbujas de 30 minutos, juegos interactivos y cierre con mini hora loca.',
    image: product3,
    price: 2300,
    category: 'Shows Infantiles',
    subcategory: 'Animación',
    duration: '2 horas',
    options: [
      '1 Animadora y 1 Bailarina caracterizadas con la temática',
      '3 Muñecos a escoger',
      'Show de magia y burbujas (durante 30 minutos)',
      '4 Juegos Interactivos según la edad de los niños',
      'Dinámicas en bailes infantiles',
      'Materiales a repartir durante los bailes (pompones, maracas, timones)',
      'Canciones Infantiles',
      '1 Equipo de sonido + 1 parlante + micrófono + DJ (instalado 1 hora antes)',
      '1 Coordinadora encargada del evento',
      'Alfombra de colores (3x2 metros)',
      '15 etiquetas para los nombres de los niños',
      'Fin de Fiesta: Mini hora loca + Globos pencil',
      'Acompañamiento de Piñata y Happy Birthday',
    ],
    Terms_of_use: TERMS_SHOWS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Cronograma',
  },

  // ================================
  // SHOWS INFANTILES - COMPETENCIA
  // ================================
  {
    id: 4,
    name: 'Juegos de Competencia',
    shortDescription: 'Sana competencia y trabajo en equipo',
    longDescription:
      'Circuito de 4 juegos de competencia con dos equipos, animadora, música infantil moderna y acompañamiento de piñata. Ideal para fomentar el trabajo en equipo y la diversión entre niños.',
    image: product4,
    price: 1050,
    category: 'Shows Infantiles',
    subcategory: 'Competencia',
    duration: '90 min',
    age_range: '6-12 años',
    options: [
      '1 Animadora o Animador',
      '1 Coordinadora',
      '4 Juegos de Competencia',
      'Chalecos para los 2 grupos',
      'Música infantil moderna',
      '1 Parlante + micrófono + DJ (instalado 1 hora antes del show)',
      'Acompañamiento de Piñata y Happy Birthday',
    ],
    Terms_of_use:
      'Sujeto a disponibilidad. No incluye movilidad. Coordinadora incluida.',
    buy_button: 'RESERVAR',
    details_button: 'Ver Dinámicas',
  },

  // ================================
  // SHOWS INFANTILES - MAGIA
  // ================================
  {
    id: 5,
    name: 'Show de Magia - Paquete 1',
    shortDescription: 'Show de magia con globoflexia para toda la familia',
    longDescription:
      'Show lleno de magia asombrosa y muchas risas. El mago sorprenderá a los niños con trucos increíbles y un divertido final de globoflexia con figuras para todos.',
    image: product5,
    price: 700,
    category: 'Shows Infantiles',
    subcategory: 'Magia',
    duration: '40 min',
    options: [
      'Show de Magia (40 minutos)',
      'Equipo de sonido y micrófono',
      'Final de globoflexia',
      'Figuras con globos para todos los niños de cortesía',
    ],
    Terms_of_use:
      'Reserva con 50%. No incluye movilidad. Válido para 10 a 20 niños. No existen devoluciones, solo reprogramaciones.',
    buy_button: 'RESERVAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 6,
    name: 'Show de Magia - Paquete 2',
    shortDescription: 'Show de magia y burbujas con escenografía',
    longDescription:
      'Show de magia combinado con burbujas y telón de escenografía. Incluye equipo de sonido y un espectacular final de globoflexia con figuras para todos los niños.',
    image: product5,
    price: 980,
    category: 'Shows Infantiles',
    subcategory: 'Magia',
    duration: '1 hora',
    options: [
      'Show de Magia y Burbujas',
      'Telón de escenografía',
      'Equipo de sonido y micrófono',
      'Final de globoflexia',
      'Figuras con globos para todos los niños de cortesía',
    ],
    Terms_of_use:
      'Reserva con 50%. No incluye movilidad. Válido para 10 a 20 niños. No existen devoluciones, solo reprogramaciones.',
    buy_button: 'RESERVAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 7,
    name: 'Show de Magia - Paquete 3',
    shortDescription: 'Show de magia, burbujas y experimentos científicos',
    longDescription:
      'El show de magia más completo: magia, burbujas y experimentos sorprendentes como pasta de dientes de elefante, burbuja de hielo seco y la lámpara de Aladino.',
    image: product5,
    price: 1400,
    category: 'Shows Infantiles',
    subcategory: 'Magia',
    duration: '1 hora 20 min',
    options: [
      'Show de Magia y Burbujas',
      'Telón de escenografía',
      'Show de experimentos científicos',
      'Pasta de dientes de elefante',
      'Burbuja de hielo seco',
      'Lámpara de Aladino',
      'Equipo de sonido y micrófono',
      'Final de globoflexia',
      'Figuras con globos para todos los niños de cortesía',
    ],
    Terms_of_use:
      'Reserva con 50%. No incluye movilidad. Válido para 10 a 20 niños. No existen devoluciones, solo reprogramaciones.',
    buy_button: 'RESERVAR',
    details_button: 'Ver Detalles',
  },

  // ================================
  // JUEGOS E INFLABLES - INFLABLES
  // ================================
  {
    id: 8,
    name: 'Inflable Tropical',
    shortDescription: 'Inflable temático con agua o pelotas',
    longDescription:
      'Gran inflable de temática tropical con tobogán, disponible con agua o pelotitas. Perfecto para exteriores y eventos al aire libre.',
    image: product6,
    price: 570,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    dimensions: 'Alto: 5.5m | Ancho: 3.5m | Largo: 8.5m',
    options: ['Con agua: S/ 650.00', 'Con pelotitas: S/ 570.00'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 9,
    name: 'Inflable Splash',
    shortDescription: 'Inflable con área de juego y agua o pelotas',
    longDescription:
      'Inflable Splash ideal para niños de 2 a 10 años. Disfrútalo con agua para refrescarse o con pelotitas de colores.',
    image: product7,
    price: 400,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    age_range: '2-10 años',
    dimensions: 'Alto: 2.30m | Base: 4m x 4m',
    options: ['Con agua: S/ 480.00', 'Con pelotitas: S/ 400.00'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 10,
    name: 'Inflable Lava',
    shortDescription: 'Inflable grande con doble tobogán y agua o pelotas',
    longDescription:
      'Impresionante inflable temática lava con doble tobogán y amplia zona de juego. Disponible con agua o pelotitas.',
    image: product8,
    price: 550,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    dimensions: 'Alto: 3.7m | Ancho: 5.5m | Largo: 6.8m',
    options: ['Con agua: S/ 630.00', 'Con pelotitas: S/ 550.00'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 11,
    name: 'Inflable Blanco',
    shortDescription: 'Inflable blanco personalizable con vinilos o arco de globos',
    longDescription:
      'Elegante inflable blanco tipo castillo, perfecto para personalizar con vinilos temáticos o arco de globos.',
    image: product9,
    price: 420,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    age_range: '2-6 años',
    dimensions: 'Alto: 3m | Base: 4m x 4m',
    options: [
      'Precio base: S/ 420.00',
      '+ 1 Vinil temático: S/ 90.00',
      '+ 2 Vinilos temáticos: S/ 160.00',
      '+ Arco de globos: S/ 120.00',
    ],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 12,
    name: 'Inflable Camaleón',
    shortDescription: '8 diseños temáticos a elección',
    longDescription:
      'Inflable grande con tobogán disponible en 8 diseños temáticos. Elige el favorito de los niños.',
    image: product10,
    price: 650,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    dimensions: 'Alto: 4m | Ancho: 5.5m | Largo: 5.5m',
    options: [
      'Frozen', 'Moana', 'Encanto', 'Jurassic World',
      'Paw Patrol', 'Cars', 'Mickey Mouse Club House', 'Princess',
    ],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Diseños',
  },
  {
    id: 13,
    name: 'Inflable Arcoíris',
    shortDescription: 'Megainflable con doble tobogán de altura',
    longDescription:
      'El inflable más alto del catálogo con 6.5 metros de altura y doble tobogán en colores arcoíris.',
    image: product11,
    price: 750,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    dimensions: 'Alto: 6.5m | Ancho: 4.5m | Largo: 11m',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 14,
    name: 'Inflable Acuático Curve Little Tikes',
    shortDescription: 'Inflable acuático con tobogán y área de pelotas',
    longDescription:
      'Inflable acuático Little Tikes con tobogán curvo, piscina inferior y área de pelotas. Doble modalidad: con agua o con pelotitas.',
    image: product12,
    price: 450,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    age_range: '5-10 años',
    dimensions: 'Alto: 2.4m | Ancho: 2.9m | Largo: 3.9m',
    options: ['Con pelotitas: S/ 450.00', 'Acuático: S/ 530.00'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 15,
    name: 'Inflable Grande Little Tikes',
    shortDescription: 'Inflable clásico con tobogán para los más pequeños',
    longDescription:
      'Inflable Little Tikes con tobogán y zona de saltos. Diseño seguro y colorido para niños de 2 a 5 años.',
    image: product13,
    price: 400,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    age_range: '2-5 años',
    dimensions: 'Alto: 2.80m | Base: 3.20m x 3.20m',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 16,
    name: 'Inflable Cubo Little Tikes',
    shortDescription: 'Inflable compacto con tobogán suave',
    longDescription:
      'Inflable cubo Little Tikes de tamaño compacto con tobogán suave. Ideal para espacios reducidos y niños de 2 a 5 años.',
    image: product14,
    price: 370,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    age_range: '2-5 años',
    dimensions: 'Alto: 1.90m | Base: 3.70m x 2.80m',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 17,
    name: 'Inflable Cubito',
    shortDescription: 'Mini inflable para bebés y primeros pasos',
    longDescription:
      'Pequeño inflable seguro y colorido para los más pequeñitos de 0 a 2 años.',
    image: product15,
    price: 200,
    category: 'Juegos e Inflables',
    subcategory: 'Inflables',
    age_range: '0-2 años',
    dimensions: 'Alto: 1.60m | Base: 2.40m x 2.70m',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },

  // ================================
  // JUEGOS LITTLE TIKES / STEP 2
  // ================================
  {
    id: 18,
    name: 'Laberinto 8 en 1 Little Tikes',
    shortDescription: 'Laberinto modular con 8 configuraciones distintas',
    longDescription:
      'Juego modular único configurable de 8 maneras con plataformas para trepar, túneles y lugares para escalar, esconderse y arrastrarse.',
    image: product16,
    price: 270,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos Little Tikes',
    age_range: '2-6 años',
    dimensions: 'Largo: 3.80m | Alto: 1.60m',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 19,
    name: 'Montaña Escaladora',
    shortDescription: 'Escaladora en pirámide con redes y agarraderas',
    longDescription:
      'Escaladora en forma de pirámide con 4 paredes de diferentes patrones, 2 redes para escalar, 1 piso de malla y 9 agarraderas. Va anclada al jardín.',
    image: product17,
    price: 230,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos Little Tikes',
    age_range: '2-8 años',
    dimensions: 'Alto: 2.30m | Va anclada al jardín',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 20,
    name: 'Trepador con Tobogán Torre Top',
    shortDescription: 'Escalador con tobogán, mirador y doble acceso',
    longDescription:
      'Escalador con doble acceso y parte baja usable como bancas. Cuenta con resbaladera y mirador en la parte superior.',
    image: product18,
    price: 215,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos Little Tikes',
    age_range: '2-6 años',
    dimensions: 'Largo: 2.00m | Ancho: 1.60m | Alto: 1.75m',
    options: ['Peso máximo: 20 Kg.'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 21,
    name: 'Casita Picnic Little Tikes',
    shortDescription: 'Casita de juegos con cocina, chimenea y mesa de picnic',
    longDescription:
      'Casita con timbre mágico de 6 sonidos y detalles interiores: chimenea, cocina, hornillas, armarios, hornos y mesa de picnic exterior.',
    image: product19,
    price: 215,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos Little Tikes',
    age_range: '1.5-5 años',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 22,
    name: 'Tobogán Torre',
    shortDescription: 'Tobogán con plataforma para trepar, esconderse y deslizarse',
    longDescription:
      'Divertido juego donde los niños podrán trepar a la plataforma, esconderse y deslizarse.',
    image: product20,
    price: 140,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos Little Tikes',
    age_range: '2-4 años',
    dimensions: 'Largo: 1.80m | Alto: 1.20m',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 23,
    name: 'Tobogán Tropical Little Tikes',
    shortDescription: 'Tobogán de 1.5 metros con bordes altos y seguros',
    longDescription:
      'Tobogán de 1.5 metros con bordes altos y esquinas redondeadas para diversión sin riesgos.',
    image: product21,
    price: 100,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos Little Tikes',
    age_range: '2-6 años',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 24,
    name: 'Montaña Extrema Step 2',
    shortDescription: 'Escalador de aventura tipo montaña rusa con carrito',
    longDescription:
      'Emocionante escalador estilo montaña rusa donde los niños empujan el carrito hasta la cima y luego se deslizan.',
    image: product22,
    price: 300,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos Little Tikes',
    age_range: '3-6 años',
    dimensions: 'Largo: 3.38m | Ancho: 0.79m | Alto: 1.05m',
    options: ['Peso máximo: 30 Kg.'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 25,
    name: 'Mini Montaña Rusa',
    shortDescription: 'Montaña rusa infantil para empujar y deslizarse',
    longDescription:
      'Los niños empujan el carrito hasta la parte superior y luego se deslizan solos. Fomenta el equilibrio y habilidades motoras.',
    image: product23,
    price: 160,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos Little Tikes',
    age_range: '2-4 años',
    options: ['Peso máximo: 25 Kg.'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 26,
    name: 'Climber Little Tikes',
    shortDescription: 'Trepadero con tobogán y 2 columpios anclado al jardín',
    longDescription:
      'Completo juego de exterior con tobogán, 2 columpios y 2 formas de trepar. Va anclado al jardín para máxima seguridad.',
    image: product24,
    price: 270,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos Little Tikes',
    age_range: '3-6 años',
    dimensions: 'Alto: 1.90m | Largo: 3.80m | Ancho: 1.80m',
    options: [
      '1 tobogán',
      '2 columpios',
      'Va anclado al jardín',
      'Asientos adicionales: S/ 10.00 c/u (Sapito Verde o Avión Rojo)',
    ],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },

  // ================================
  // TRAMPOLINES
  // ================================
  {
    id: 27,
    name: 'Trampolín Pequeño',
    shortDescription: 'Trampolín con malla de protección para los más pequeños',
    longDescription:
      'Trampolín con malla de protección superior e inferior. Seguro y divertido para los primeros saltos.',
    image: product25,
    price: 140,
    category: 'Juegos e Inflables',
    subcategory: 'Trampolines',
    age_range: '2-4 años',
    dimensions: 'Diámetro: 1.35m | Alto: 1.80m',
    options: ['Resistencia máxima: 35 Kg.', 'Malla de protección superior e inferior'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 28,
    name: 'Trampolín Grande - Opción 1',
    shortDescription: 'Trampolín grande para niños de 2 a 6 años',
    longDescription:
      'Trampolín grande con malla de seguridad perimetral. Resistencia de 90 Kg.',
    image: product26,
    price: 250,
    category: 'Juegos e Inflables',
    subcategory: 'Trampolines',
    age_range: '2-6 años',
    dimensions: 'Diámetro: 2.40m | Alto: 2.40m',
    options: ['Resistencia máxima: 90 Kg.'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 29,
    name: 'Trampolín Grande - Opción 2',
    shortDescription: 'Trampolín familiar para niños de 3 a 12 años',
    longDescription:
      'Trampolín de 3 metros de diámetro con malla de seguridad. Amplio y resistente para niños de todas las edades hasta 12 años.',
    image: product26,
    price: 300,
    category: 'Juegos e Inflables',
    subcategory: 'Trampolines',
    age_range: '3-12 años',
    dimensions: 'Diámetro: 3m | Alto: 2.50m',
    options: ['Resistencia máxima: 120 Kg.'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 30,
    name: 'Trampolín Grande - Opción 3',
    shortDescription: 'Trampolín XL para mayores de 6 años',
    longDescription:
      'El trampolín más grande con 3.60 metros de diámetro y resistencia de 150 Kg.',
    image: product26,
    price: 350,
    category: 'Juegos e Inflables',
    subcategory: 'Trampolines',
    age_range: '6 años en adelante',
    dimensions: 'Diámetro: 3.60m | Alto: 2.60m',
    options: ['Resistencia máxima: 150 Kg.'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },

  // ================================
  // JUEGOS PARA BEBÉS
  // ================================
  {
    id: 31,
    name: 'Túnel Oruga Morada',
    shortDescription: 'Túnel en forma de oruga para explorar y gatear',
    longDescription:
      'Divertido túnel en forma de oruga de color morado. Estimula el gateo y la exploración.',
    image: product27,
    price: 145,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos para Bebés',
    age_range: '2 años a más',
    dimensions: 'Alto: 1.21m | Largo: 1.43m | Ancho: 94cm',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 32,
    name: 'Casita Rústica con Tobogán',
    shortDescription: 'Casita con periscopio, escalones y tobogán',
    longDescription:
      'Casita rústica con periscopio de vista 180°, escalones grandes y fáciles de subir, tobogán y techo de tejas con sombra.',
    image: product28,
    price: 145,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos para Bebés',
    age_range: '1.5-3 años',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 33,
    name: 'Corralito de Colores',
    shortDescription: 'Corralito modular con pelotas incluidas',
    longDescription:
      'Corralito de 1.50m de diámetro configurable en rectangular o hexagonal. Incluye pelotas de colores y piso.',
    image: product29,
    price: 130,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos para Bebés',
    age_range: '8 meses - 2 años',
    dimensions: 'Diámetro: 1.50m | Configurable rectangular/hexagonal',
    options: ['Incluye pelotas y piso'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 34,
    name: 'Piscina de Pelotas',
    shortDescription: 'Piscina suave y segura con pelotas de colores',
    longDescription:
      'Piscina de pelotas colorida, divertida y segura para los más pequeñitos. Incluye pelotas de colores.',
    image: product30,
    price: 130,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos para Bebés',
    age_range: '8 meses - 2 años',
    options: ['Incluye pelotas'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 35,
    name: 'Túnel Gusanito',
    shortDescription: 'Túnel colorido de lino que estimula el gateo',
    longDescription:
      'Colorido túnel de lino plastificado muy resistente. Estimula el gateo de forma divertida y diferente.',
    image: product31,
    price: 89,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos para Bebés',
    age_range: '8 meses - 3 años',
    dimensions: 'Diámetro: 60cm | Largo: 2.40m',
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 36,
    name: 'Balancín Pony 1',
    shortDescription: 'Balancín grupal para 2 o 3 niños pequeños',
    longDescription:
      'Divertido balancín tipo pony apto para 2 o 3 niños simultáneamente.',
    image: product32,
    price: 70,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos para Bebés',
    age_range: '1-3 años',
    options: ['Apto para 2 o 3 niños simultáneos'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 37,
    name: 'Balancín Pony Little Tikes',
    shortDescription: 'Balancín individual disponible en rosado y azul',
    longDescription:
      'Clásico balancín pony Little Tikes disponible en color rosado y azul.',
    image: product33,
    price: 60,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos para Bebés',
    age_range: '1-3 años',
    options: ['Disponible en rosado y azul', 'Peso máximo: 23 Kg.'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 38,
    name: 'Animalitos Saltarines',
    shortDescription: 'Caballitos saltarines inflables en 4 modelos',
    longDescription:
      'Resistentes animalitos saltarines en PBC forrado en tela. Disponibles en Vaquita, Jirafa, Pony negro y Rosado.',
    image: product34,
    price: 35,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos para Bebés',
    age_range: '9 meses - 5 años',
    options: [
      'Vaquita', 'Jirafa', 'Pony Negro', 'Pony Rosado',
      'Peso máximo: 25 Kg. por unidad',
      'Precio: S/ 35.00 c/u',
    ],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },
  {
    id: 39,
    name: 'Pisos EVA',
    shortDescription: 'Pisos acolchados para zona de gateo y estimulación',
    longDescription:
      'Pisos EVA ideales para estimulación de bebés que empiezan a gatear. Seguros y fáciles de ensamblar.',
    image: product35,
    price: 5,
    category: 'Juegos e Inflables',
    subcategory: 'Juegos para Bebés',
    dimensions: '61cm x 61cm por pieza',
    options: ['Precio: S/ 5.00 c/u'],
    Terms_of_use: TERMS_JUEGOS,
    buy_button: 'ALQUILAR',
    details_button: 'Ver Detalles',
  },

  // ================================
  // ESTÉTICA INFANTIL
  // ================================
  {
    id: 40,
    name: 'Pintacaritas - Paquete Mix',
    shortDescription: 'Caritas pintadas con glitter y diseños a elección',
    longDescription:
      'Show de maquillaje artístico infantil con diseños a elección, pinturas profesionales y aplicación de glitter.',
    image: facepaint,
    price: 300,
    category: 'Estética Infantil',
    subcategory: 'Pintacaritas',
    duration: '1 hora 30 min',
    age_range: '0-10 años',
    options: [
      'Personal para evento: 1 Artista',
      'Diseños a elección',
      '1 Mesa + Espejo + Todas las pinturas',
      'iPad para escoger diseños',
      'Diseños con Glitter',
    ],
    Terms_of_use:
      'Contrato sujeto a disponibilidad. Reserva con el 50% del total. El personal se instala 15 minutos antes. No aplica movilidad (costo aparte según distrito). No se instala en vía pública.',
    buy_button: 'RESERVAR',
    details_button: 'Ver Diseños',
  },
  {
    id: 41,
    name: 'Glitter Bar Kids - Paquete Único',
    shortDescription: 'Glitter, gemas y tatuajes de brillantina',
    longDescription:
      'Experiencia de belleza infantil con mucho glitter, gemas y glitter tattoo para que los niños luzcan increíbles.',
    image: facepaint,
    price: 300,
    category: 'Estética Infantil',
    subcategory: 'Glitter Bar',
    duration: '1 hora 30 min',
    age_range: '0-10 años',
    options: [
      'Personal para evento: 1 Artista',
      'Mucho Glitter',
      '1 Mesa + Espejo + iPad para escoger diseños',
      'Gemas',
      'Glitter Tattoo',
    ],
    Terms_of_use:
      'Contrato sujeto a disponibilidad. Reserva con el 50% del total. El personal se instala 15 minutos antes. No aplica movilidad (costo aparte según distrito). No se instala en vía pública.',
    buy_button: 'RESERVAR',
    details_button: 'Ver Diseños',
  },

  // ================================
  // CARRITOS SNACKS - SALADOS
  // ================================
  {
    id: 42,
    name: 'Popcorn en Cono',
    shortDescription: 'Palomitas de maíz servidas en cono',
    longDescription:
      'Carrito de popcorn clásico con 100 unidades servidas en cono.',
    image: productSnack1,
    price: 250,
    category: 'Carritos Snacks',
    subcategory: 'Salados',
    options: ['100 unidades en cono', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 43,
    name: 'Popcorn en Caja',
    shortDescription: 'Palomitas de maíz servidas en caja',
    longDescription:
      'Carrito de popcorn con 100 unidades servidas en caja. Presentación más elegante para tus eventos.',
    image: productSnack2,
    price: 300,
    category: 'Carritos Snacks',
    subcategory: 'Salados',
    options: ['100 unidades en caja', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 44,
    name: 'Mini Cheeseburger',
    shortDescription: 'Mini hamburguesas con queso para eventos',
    longDescription:
      'Deliciosas mini cheeseburgers preparadas al momento. 50 unidades ideales para compartir.',
    image: productSnack3,
    price: 400,
    category: 'Carritos Snacks',
    subcategory: 'Salados',
    options: ['50 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 45,
    name: 'Mini Hamburguesa',
    shortDescription: 'Mini hamburguesas clásicas para eventos',
    longDescription:
      'Mini hamburguesas clásicas preparadas al momento. 50 unidades perfectas para cualquier celebración.',
    image: productSnack4,
    price: 350,
    category: 'Carritos Snacks',
    subcategory: 'Salados',
    options: ['50 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 46,
    name: 'Panchos',
    shortDescription: 'Panchos en palito estilo feria',
    longDescription:
      'Los clásicos panchos en palito, crujientes por fuera y jugosos por dentro. 50 unidades.',
    image: productSnack5,
    price: 300,
    category: 'Carritos Snacks',
    subcategory: 'Salados',
    options: ['50 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 47,
    name: 'Mini Hot Dog',
    shortDescription: 'Mini hot dogs para compartir en eventos',
    longDescription:
      'Mini hot dogs preparados al momento, tiernos y sabrosos. 50 unidades.',
    image: productSnack6,
    price: 340,
    category: 'Carritos Snacks',
    subcategory: 'Salados',
    options: ['50 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 48,
    name: 'Mini Chorizo',
    shortDescription: 'Mini chorizos al pan para eventos',
    longDescription:
      'Mini chorizos jugosos servidos en pan. 50 unidades con todo el sabor.',
    image: productSnack7,
    price: 350,
    category: 'Carritos Snacks',
    subcategory: 'Salados',
    options: ['50 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },

  // ================================
  // CARRITOS SNACKS - DULCES
  // ================================
  {
    id: 49,
    name: 'Algodón de Azúcar',
    shortDescription: 'Algodón de azúcar esponjoso y colorido',
    longDescription:
      'El clásico algodón de azúcar que encanta a chicos y grandes. 100 unidades.',
    image: productSnack8,
    price: 250,
    category: 'Carritos Snacks',
    subcategory: 'Dulces',
    options: ['100 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 50,
    name: 'Churros',
    shortDescription: 'Churros crujientes recién hechos',
    longDescription:
      'Churros dorados y crujientes preparados al momento. 100 unidades.',
    image: productSnack9,
    price: 330,
    category: 'Carritos Snacks',
    subcategory: 'Dulces',
    options: ['100 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 51,
    name: 'Mini Pionono',
    shortDescription: 'Mini piononos dulces enrollados',
    longDescription:
      'Deliciosos mini piononos esponjosos y dulces. 100 unidades.',
    image: productSnack10,
    price: 250,
    category: 'Carritos Snacks',
    subcategory: 'Dulces',
    options: ['100 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 52,
    name: 'Mini Orejitas',
    shortDescription: 'Mini orejitas hojaldradas y crocantes',
    longDescription:
      'Mini orejitas de hojaldre crocantes y dulces. 100 unidades.',
    image: productSnack11,
    price: 220,
    category: 'Carritos Snacks',
    subcategory: 'Dulces',
    options: ['100 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 53,
    name: 'Niditos de Amor',
    shortDescription: 'Galletas nidito con mermelada de corazón',
    longDescription:
      'Tiernas galletas nidito rellenas de mermelada en forma de corazón. 100 unidades.',
    image: productSnack12,
    price: 230,
    category: 'Carritos Snacks',
    subcategory: 'Dulces',
    options: ['100 unidades', 'Carrito decorado con personal de atención'],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 54,
    name: 'Helados Soft',
    shortDescription: 'Helados soft cremosos para eventos',
    longDescription:
      'Helados soft cremosos preparados al instante con máquina profesional. 100 unidades.',
    image: productSnack13,
    price: 470,
    category: 'Carritos Snacks',
    subcategory: 'Dulces',
    options: [
      '100 unidades',
      'Máquina de helados soft profesional',
      'Personal de atención',
    ],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },

  // ================================
  // DÚO PACKS
  // ================================
  {
    id: 55,
    name: 'Dúo Pack - Algodón + Popcorn',
    shortDescription: 'Combo dulce: algodón de azúcar y popcorn en cono',
    longDescription:
      'El dúo perfecto: algodón de azúcar y popcorn en cono. Dos carritos en uno para tu evento.',
    image: productSnack14,
    price: 320,
    category: 'Carritos Snacks',
    subcategory: 'Dúo Packs',
    options: [
      '50 unidades de Algodón de Azúcar',
      '50 unidades de Popcorn en cono',
      'Carritos decorados con personal de atención',
    ],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 56,
    name: 'Dúo Pack - Popcorn + Mini Hamb',
    shortDescription: 'Combo salado: popcorn en cono y mini hamburguesas',
    longDescription:
      'Popcorn en cono y mini hamburguesas. La combinación ganadora para tu evento.',
    image: productSnack15,
    price: 500,
    category: 'Carritos Snacks',
    subcategory: 'Dúo Packs',
    options: [
      '50 unidades de Popcorn en cono',
      '50 unidades de Mini Hamburguesa',
      'Carritos decorados con personal de atención',
    ],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 57,
    name: 'Dúo Pack - Popcorn + Panchos',
    shortDescription: 'Combo salado: popcorn en cono y panchos',
    longDescription:
      'El dúo clásico de feria: popcorn en cono y panchos en palito.',
    image: productSnack16,
    price: 450,
    category: 'Carritos Snacks',
    subcategory: 'Dúo Packs',
    options: [
      '50 unidades de Popcorn en cono',
      '50 unidades de Panchos',
      'Carritos decorados con personal de atención',
    ],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },

  // ================================
  // COMBOS SNACKS
  // ================================
  {
    id: 58,
    name: 'Combo Snacks - Popcorn + Mini Hamb + Panchos',
    shortDescription: 'Combo triple salado para grandes eventos',
    longDescription:
      'El combo más completo en salados: popcorn en cono, mini hamburguesas y panchos.',
    image: productSnack17,
    price: 800,
    category: 'Carritos Snacks',
    subcategory: 'Combos',
    options: [
      '50 unidades de Popcorn en cono',
      '50 unidades de Mini Hamburguesa',
      '50 unidades de Panchos',
      'Carritos decorados con personal de atención',
    ],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 59,
    name: 'Combo Snacks - Churros + Mini Hamb + Mini Chorizo',
    shortDescription: 'Combo mixto dulce y salado para eventos',
    longDescription:
      'Churros, mini hamburguesas y mini chorizos. Un combo irresistible para tu fiesta.',
    image: productSnack18,
    price: 875,
    category: 'Carritos Snacks',
    subcategory: 'Combos',
    options: [
      '50 unidades de Churros',
      '50 unidades de Mini Hamburguesa',
      '50 unidades de Mini Chorizo',
      'Carritos decorados con personal de atención',
    ],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
  {
    id: 60,
    name: 'Combo Snacks - Popcorn en Caja + Algodón + Mini Hot Dog',
    shortDescription: 'Combo dulce-salado con hot dog, algodón y popcorn',
    longDescription:
      'Popcorn en caja, algodón de azúcar y mini hot dogs. El equilibrio ideal entre dulce y salado.',
    image: productSnack19,
    price: 450,
    category: 'Carritos Snacks',
    subcategory: 'Combos',
    options: [
      '50 unidades de Popcorn en caja',
      '50 unidades de Algodón de Azúcar',
      '25 unidades de Mini Hot Dog',
      'Carritos decorados con personal de atención',
    ],
    Terms_of_use: TERMS_SNACKS,
    buy_button: 'RESERVAR',
    details_button: 'Ver Snacks',
  },
];