export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Our Gear", href: "#gear" },
  { label: "Why Nosha", href: "#why-nosha" },
  { label: "Our Story", href: "#about" },
  { label: "For Academies", href: "#academies" },
] as const

export const gearCategories = [
  {
    name: "Karate Gi",
    value: "karate",
    image: "/images/gear-karate.webp",
    backImage: "/images/gear-karate-back.webp",
    label: "Respect in every movement.",
    description: "Traditional wrap-front gi, ready for your next kata.",
    note: "Wrap-front jacket · Training & grading",
  },
  {
    name: "Taekwondo Dobok",
    value: "taekwondo",
    image: "/images/gear-taekwondo.webp",
    backImage: "/images/gear-taekwondo-back.webp",
    label: "Room to find your rhythm.",
    description: "A V-neck dobok for forms, footwork and everyday practice.",
    note: "V-neck cut · Freedom of movement",
  },
  {
    name: "Judo Gi",
    value: "judo",
    image: "/images/gear-judo.webp",
    backImage: "/images/gear-judo-back.webp",
    label: "For the art of control.",
    description: "A woven judogi for the practice of grip and balance.",
    note: "Woven fabric · Traditional cross-over cut",
  },
  {
    name: "Belts & Protective Gear",
    value: "protection",
    image: "/images/gear-protection.webp",
    label: "The details that matter.",
    description:
      "Belts and protective equipment to complete your training kit.",
    note: "Belts · Sparring essentials",
  },
  {
    name: "Training Accessories",
    value: "accessories",
    image: "/images/gear-accessories.webp",
    label: "Pack for the practice.",
    description: "Carry the essentials, from your first bow to the trip home.",
    note: "Training bags · Everyday essentials",
  },
] as const

export type GearName = (typeof gearCategories)[number]["name"]

export const disciplineGuides = [
  {
    value: "karate",
    label: "Karate",
    name: "Karate Gi",
    title: "Start with the fundamentals.",
    description:
      "A traditional wrap-front jacket and trousers. Your club’s preferred cut and fabric weight are the best place to begin.",
    steps: [
      {
        title: "Check your club’s requirements",
        text: "Ask about the preferred style, colour and fabric weight for your class or grading.",
      },
      {
        title: "Share your measurements",
        text: "Send your height and usual size. If you already have a gi you like, tell us how it fits.",
      },
      {
        title: "Complete your kit",
        text: "Confirm your belt colour and whether you need any sparring equipment.",
      },
    ],
  },
  {
    value: "taekwondo",
    label: "Taekwondo",
    name: "Taekwondo Dobok",
    title: "Make room for movement.",
    description:
      "Your dobok should match your school’s style. Collar colour and cut can depend on your grade and association.",
    steps: [
      {
        title: "Confirm the collar style",
        text: "Check whether your instructor wants a white or black collar for your grade.",
      },
      {
        title: "Find your preferred fit",
        text: "Share your height, size and any preference for sleeve and trouser length.",
      },
      {
        title: "Tell us how you train",
        text: "Let us know whether you focus on forms, sparring or a mixture of both.",
      },
    ],
  },
  {
    value: "judo",
    label: "Judo",
    name: "Judo Gi",
    title: "Find your feel on the mat.",
    description:
      "The cut, weave and weight all shape the feel of a judogi. Start with the requirements of your club and your training.",
    steps: [
      {
        title: "Choose your training style",
        text: "Tell us whether this is your first judogi or a replacement for one you already train in.",
      },
      {
        title: "Talk weave and weight",
        text: "Share any fabric specification your coach recommends. We’ll confirm the available options.",
      },
      {
        title: "Check before competing",
        text: "Give us the event requirements so specifications can be checked before you order.",
      },
    ],
  },
] as const

export const faqs = [
  {
    question: "I’m buying my first uniform. Where do I start?",
    answer:
      "Start with your discipline and your instructor’s requirements. Send us your height, usual size and any preferred cut or fabric weight. If you are unsure, choose ‘Help me choose’ in the contact form and tell us about your training.",
  },
  {
    question: "Can I enquire for a whole club or academy?",
    answer:
      "Yes. Choose ‘Club or academy’ in the form and include your uniform types, a size breakdown, approximate quantities and your target date. We’ll discuss the available options before anything is confirmed.",
  },
  {
    question: "Can our uniforms carry our academy branding?",
    answer:
      "Tell us what you have in mind, where you want your club name placed and how many pieces you need. We’ll confirm which personalisation options are available, along with artwork requirements and pricing.",
  },
  {
    question: "Are prices, delivery and availability confirmed online?",
    answer:
      "We handle enquiries directly so the details can match your needs. Ask us to confirm the exact specification, included items, price, availability and delivery timing before placing an order.",
  },
  {
    question: "How should I care for my uniform?",
    answer:
      "Follow the care label on your specific garment. If shrinkage, washing temperature or drying matters to your choice, mention it when you enquire so we can check the fabric guidance with you.",
  },
] as const
