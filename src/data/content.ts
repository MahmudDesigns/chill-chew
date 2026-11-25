/* Editorial content: story, reviews, gallery, FAQs, marquee lines. */

export const STORY = {
  eyebrow: "Karibu Chill & Chew",
  proverb: "Kahawa ni moyo wa asubuhi — coffee is the heart of the morning",
  title: "A coastal café that tastes like Mombasa",
  body: [
    "Chill & Chew started in 2019 with one espresso machine, a stack of kanga-printed napkins and a stubborn belief that the coast deserves better coffee. Today we roast small batches of Kenyan single origin, fry mandazi to order and plate Swahili food the way our grandmothers did.",
    "Everything is made in an open kitchen behind the counter. You will hear the grinder, smell the cardamom and see the steam curl off your cup before it reaches you. That is the whole idea.",
  ],
  stats: [
    { value: "7", label: "Years on Links Road" },
    { value: "12", label: "Coastal suppliers" },
    { value: "4.9", label: "Average rating" },
    { value: "320+", label: "Cups pulled daily" },
  ],
};

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  when: string;
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Amina Mwangi",
    role: "Food blogger, Nairobi",
    rating: 5,
    text: "The Swahili biryani here is the real thing — layered, fragrant, not greasy. I came for the latte art and stayed for three hours writing.",
    when: "2 weeks ago",
  },
  {
    id: "r2",
    name: "Yusuf Ali",
    role: "Regular, Bamburi",
    rating: 5,
    text: "My 07:30 ritual. Double espresso and mandazi before work, and the team already knows my order. Consistent every single morning.",
    when: "1 month ago",
  },
  {
    id: "r3",
    name: "Grace Otieno",
    role: "Designer, Nyali",
    rating: 5,
    text: "Best wifi, best light, best playlist in Mombasa. The passion juice is dangerous and the coconut cake never survives the table.",
    when: "3 weeks ago",
  },
  {
    id: "r4",
    name: "Hamid Said",
    role: "Tour guide, Old Town",
    rating: 4,
    text: "I bring every guest here before we walk the fort. Halal menu, fair prices, and the chai masala is properly spiced — not the sweet soup you get elsewhere.",
    when: "2 months ago",
  },
  {
    id: "r5",
    name: "Lucy Wanjiru",
    role: "Student, Mombasa University",
    rating: 5,
    text: "Viazi karai with chilli mayo and a cold brew. That's the whole review. Oh, and the delivery to Tudor arrived in 28 minutes.",
    when: "5 days ago",
  },
  {
    id: "r6",
    name: "Brian Kiplagat",
    role: "Photographer",
    rating: 5,
    text: "Shot a whole editorial in here — limewashed walls, orange light at 5pm, steam everywhere. Staff let me rearrange the furniture without a fuss.",
    when: "6 weeks ago",
  },
];

export type GalleryCategory = "all" | "coffee" | "food" | "space" | "coast";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: Exclude<GalleryCategory, "all">;
  fallback?: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/hero-cup.jpg",
    alt: "Flat white with tulip latte art on a charcoal table",
    caption: "The 08:12 flat white",
    category: "coffee",
  },
  {
    id: "g2",
    src: "/images/biryani.jpg",
    alt: "Swahili chicken biryani on a dark plate",
    caption: "Biriani ya kuku, plated",
    category: "food",
  },
  {
    id: "g3",
    src: "/images/interior.jpg",
    alt: "Café interior with limewashed walls and warm light",
    caption: "Golden hour on the terrace",
    category: "space",
  },
  {
    id: "g4",
    src: "/images/coffee-pour.jpg",
    alt: "Espresso extracting from a portafilter",
    caption: "18g in, 36g out",
    category: "coffee",
  },
  {
    id: "g5",
    src: "/images/exterior.jpg",
    alt: "Café facade on a Mombasa street at dusk",
    caption: "Links Road after sunset",
    category: "coast",
  },
  {
    id: "g6",
    src: "/images/mandazi-chai.jpg",
    alt: "Mandazi with a glass of masala chai",
    caption: "Mandazi, fried to order",
    category: "food",
  },
  {
    id: "g7",
    src: "/images/juices.jpg",
    alt: "Fresh passion fruit and mango juice",
    caption: "Passion & mango, no water added",
    category: "food",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
    alt: "Cup of coffee with latte art seen from above",
    caption: "Milk, poured",
    category: "coffee",
    fallback: "/images/hero-cup.jpg",
  },
  {
    id: "g9",
    src: "/images/dessert.jpg",
    alt: "Slice of coconut cake with ice cream",
    caption: "Coconut & lime cake",
    category: "food",
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
    alt: "Café seating with plants and daylight",
    caption: "The window seats",
    category: "space",
    fallback: "/images/interior.jpg",
  },
  {
    id: "g11",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    alt: "Indian Ocean shoreline near Mombasa",
    caption: "Ten minutes from the ocean",
    category: "coast",
    fallback: "/images/exterior.jpg",
  },
];

export const GALLERY_FILTERS: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "food", label: "Food" },
  { id: "space", label: "Space" },
  { id: "coast", label: "Coast" },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Do you take reservations?",
    a: "Yes — book through the reservation page or WhatsApp us. We hold tables for 15 minutes past the booking time. Walk-ins are always welcome at the counter bar.",
  },
  {
    q: "Which areas do you deliver to?",
    a: "Nyali, Bamburi, Tudor, Mtwapa, Old Town and Likoni. Each area has its own flat fee shown at checkout, and delivery usually takes 20–60 minutes depending on traffic along the coast road.",
  },
  {
    q: "Is the food halal?",
    a: "All our meat is halal certified and our suppliers are listed in Old Town. Vegetarian and vegan options are marked on every menu item.",
  },
  {
    q: "How does M-Pesa payment work?",
    a: "Choose M-Pesa at checkout, confirm your number, then approve the prompt on your phone with your PIN. This demo simulates that flow — no real money moves and no payment provider is connected.",
  },
  {
    q: "Can I order for a large group or event?",
    a: "For 10 guests or more, or for catering, call +254 712 345 678 at least 24 hours ahead. We do platters of biryani, samosas, mandazi and coffee urns.",
  },
  {
    q: "Do you have wifi and power outlets?",
    a: "Yes — free fibre wifi, plenty of outlets along the wall benches and no time limit on weekdays before 16:00.",
  },
  {
    q: "Is there parking?",
    a: "Free parking for 14 cars behind the building, plus street parking on Links Road. The entrance is step-free.",
  },
];

export const MARQUEE_LINES = [
  "Specialty coffee",
  "Biriani ya kuku",
  "Mandazi to order",
  "Chai masala",
  "Fresh passion juice",
  "Open daily in Mombasa",
  "Halal kitchen",
  "M-Pesa accepted",
];
