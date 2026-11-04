export type InsuranceId =
  | "auto"
  | "moto"
  | "hogar"
  | "vida"
  | "empresa"
  | "viaje"
  | "alquiler"
  | "trabajo"
  | "otros";

export type InsuranceType = {
  id: InsuranceId;
  label: string;
  description: string;
  /** Mensaje de WhatsApp al consultar desde la tarjeta */
  waMessage: string;
  /** Puntos breves que se muestran en la tarjeta (solo lo que ya figura en la descripción) */
  points: string[];
};

/**
 * Vistos en el Instagram: auto, hogar (incl. incendio), vida (incl. ahorro), alquiler (garantía),
 * viaje y accidentes de trabajo. SIN confirmar: moto, empresa y otros.
 */
export const insuranceTypes: InsuranceType[] = [
  {
    id: "auto",
    label: "Seguro de automóviles",
    description: "Alternativas de cobertura para tu vehículo. Cotización sin costo y en minutos.",
    waMessage: "Hola, quiero consultar por un seguro para mi vehículo.",
    points: ["Alternativas de cobertura", "Cotización sin costo"],
  },
  {
    id: "moto",
    label: "Seguro de motos",
    description: "Protegé tu moto y a quienes se cruzan con ella. Te explicamos cada opción.",
    waMessage: "Hola, quiero consultar por un seguro para mi moto.",
    points: ["Te explicamos cada opción", "Cotización sin costo"],
  },
  {
    id: "hogar",
    label: "Seguro de hogar",
    description: "Protección frente a hurto, incendio, tempestades, explosión y más. También podés consultar por tu mascota.",
    waMessage: "Hola, quiero recibir asesoramiento sobre seguros de hogar.",
    points: ["Hurto e incendio", "Tempestades y explosión", "Consulta por tu mascota"],
  },
  {
    id: "vida",
    label: "Seguro de vida",
    description: "Respaldo para vos y tu familia, con opciones de protección y de ahorro. Te orientamos para elegir con claridad.",
    waMessage: "Hola, quiero recibir asesoramiento sobre seguros de vida.",
    points: ["Opciones de protección", "Opciones de ahorro"],
  },
  {
    id: "empresa",
    label: "Seguro de comercio y empresas",
    description: "Coberturas para tu local, tu equipo y tu actividad, según el rubro.",
    waMessage: "Hola, quiero recibir asesoramiento sobre seguros para mi comercio o empresa.",
    points: ["Local, equipo y actividad", "Según tu rubro"],
  },
  {
    id: "viaje",
    label: "Seguro de viaje",
    description: "Viajá con respaldo ante imprevistos médicos o de equipaje.",
    waMessage: "Hola, quiero consultar por un seguro de viaje.",
    points: ["Imprevistos médicos", "Equipaje"],
  },
  {
    id: "alquiler",
    label: "Seguro de alquiler",
    description: "Garantía de alquiler: alternativas para alquilar con respaldo.",
    waMessage: "Hola, quiero consultar por un seguro de alquiler.",
    points: ["Garantía de alquiler", "Alternativas para alquilar"],
  },
  {
    id: "trabajo",
    label: "Accidentes de trabajo",
    description: "Cobertura frente a accidentes laborales. Te explicamos qué opciones existen según tu actividad.",
    waMessage: "Hola, quiero consultar por un seguro de accidentes de trabajo.",
    points: ["Accidentes laborales", "Opciones según tu actividad"],
  },
  {
    id: "otros",
    label: "Otros seguros",
    description: "¿Necesitás otra cobertura? Contanos y buscamos la alternativa adecuada.",
    waMessage: "Hola, quiero consultar por otro tipo de seguro.",
    points: ["Contanos qué necesitás", "Buscamos la alternativa"],
  },
];

export const getInsurance = (id: string) => insuranceTypes.find((t) => t.id === id);

export const faqs = [
  {
    q: "¿Qué necesito para cotizar un seguro?",
    a: "Depende del seguro. Para un vehículo suele alcanzar con marca, modelo, año y uso. Para el hogar, la localidad y el tipo de propiedad. En el formulario solo pedimos lo básico; si hace falta algo más, te lo consultamos después. No necesitás enviar documentos para pedir una cotización.",
  },
  {
    q: "¿Qué diferencia existe entre cobertura total y parcial?",
    a: "Los nombres y alcances varían según la aseguradora, pero en general una cobertura parcial protege frente a algunos eventos puntuales (por ejemplo, daños a terceros, robo o incendio), mientras que una cobertura más amplia suma también daños al propio vehículo. Antes de decidir conviene leer qué incluye y qué excluye cada póliza; te ayudamos a compararlas.",
  },
  {
    q: "¿Qué es el seguro obligatorio SOA?",
    a: "El SOA (Seguro Obligatorio de Automóviles) es el seguro que exige la normativa uruguaya para circular con un vehículo. Cubre daños personales a terceros ocasionados en un accidente y no cubre los daños materiales al vehículo. Consultanos y te explicamos cómo contratarlo.",
  },
  {
    q: "¿Cómo funciona una franquicia?",
    a: "La franquicia es la parte del daño que queda a cargo del asegurado cuando ocurre un siniestro; la aseguradora cubre el resto según las condiciones de la póliza. Las condiciones exactas dependen de cada contrato, por eso conviene revisarlas antes de contratar.",
  },
  {
    q: "¿Qué debo hacer si tengo un siniestro?",
    a: "Primero, cuidá tu seguridad y la de las personas involucradas, y avisá a los servicios de emergencia si corresponde. Luego registrá lo ocurrido (fotos, datos de los involucrados) y comunicate cuanto antes con tu aseguradora o con nosotros para que te orientemos. Los plazos y requisitos dependen de la compañía y de tu póliza.",
  },
  {
    q: "¿Puedo solicitar asesoramiento por WhatsApp?",
    a: "Sí. Podés escribirnos desde el botón de WhatsApp o completar el formulario: al enviarlo se abre una conversación con tus datos ya ordenados para que no tengas que repetirlos.",
  },
];
