/* ==========================================================================
   MENU — every price in Kenyan Shillings (KES)
   ========================================================================== */

export type Category = "coffee" | "breakfast" | "mains" | "snacks" | "desserts" | "drinks";
export type Diet = "vegetarian" | "halal" | "spicy";

export interface SizeOption {
  label: string;
  delta: number;
}
export interface Addon {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: Category;
  diets: Diet[];
  image: string;
  spec?: string;
  popular?: boolean;
  sizes?: SizeOption[];
  addons?: Addon[];
}

export const CATEGORIES: { id: Category; label: string; note: string }[] = [
  { id: "coffee", label: "Coffee", note: "Espresso, pour-over & Kenyan single origin" },
  { id: "breakfast", label: "Breakfast", note: "Served 07:00 – 11:30 daily" },
  { id: "mains", label: "Mains", note: "Swahili coast plates & café classics" },
  { id: "snacks", label: "Snacks", note: "Fried, spiced & made to share" },
  { id: "desserts", label: "Desserts", note: "Baked in-house every morning" },
  { id: "drinks", label: "Drinks", note: "Fresh juices, chai & coolers" },
];

export const DIET_FILTERS: { id: Diet; label: string }[] = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "halal", label: "Halal" },
  { id: "spicy", label: "Spicy" },
];

const MILK_SIZES: SizeOption[] = [
  { label: "Small", delta: 0 },
  { label: "Medium", delta: 40 },
  { label: "Large", delta: 80 },
];

const COFFEE_ADDONS: Addon[] = [
  { label: "Extra shot", price: 80 },
  { label: "Oat milk", price: 80 },
  { label: "Vanilla syrup", price: 60 },
  { label: "Hazelnut syrup", price: 60 },
  { label: "Cinnamon dust", price: 30 },
];

export const MENU: MenuItem[] = [
  /* ------------------------------ COFFEE ------------------------------ */
  {
    id: "esp-double",
    name: "Double Espresso",
    tagline: "Short, loud, honest",
    description:
      "18g of our Nyeri AA roasted medium-dark, pulled to 36g in 28 seconds. Thick crema, cocoa finish, no fuss.",
    price: 220,
    category: "coffee",
    diets: [],
    image: "/images/Double-Espresso.jpg",
    spec: "NYERI AA · 18G IN / 36G OUT",
    popular: true,
    addons: [{ label: "Extra shot", price: 80 }],
  },
  {
    id: "americano",
    name: "Americano",
    tagline: "Espresso, lengthened",
    description:
      "Double espresso opened with hot filtered water for a clean, long cup that keeps you working until lunch.",
    price: 250,
    category: "coffee",
    diets: [],
    image: "/images/Americano-pour.jpg",
    sizes: [
      { label: "Small", delta: 0 },
      { label: "Large", delta: 50 },
    ],
    addons: [{ label: "Extra shot", price: 80 }],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    tagline: "The 07:00 ritual",
    description:
      "Equal parts espresso, steamed milk and a thick cap of micro-foam, finished with a dusting of cocoa.",
    price: 330,
    category: "coffee",
    diets: ["vegetarian"],
    image: "/images/Cappuccino-cup.jpg",
    sizes: MILK_SIZES,
    addons: COFFEE_ADDONS,
    popular: true,
  },
  {
    id: "flat-white",
    name: "Flat White",
    tagline: "Silk, not froth",
    description:
      "Ristretto base with milk steamed to a wet-paint texture — the strongest milk drink on the bar.",
    price: 360,
    category: "coffee",
    diets: ["vegetarian"],
    image: "/images/Flat-White-cup.jpg",
    sizes: MILK_SIZES,
    addons: COFFEE_ADDONS,
  },
  {
    id: "latte",
    name: "Café Latte",
    tagline: "Our canvas for latte art",
    description:
      "Smooth, milky and gentle. Watch the tulip form as it lands — this is the cup we photograph most.",
    price: 360,
    category: "coffee",
    diets: ["vegetarian"],
    image: "/images/latte-cup.jpg",
    sizes: MILK_SIZES,
    addons: COFFEE_ADDONS,
    popular: true,
  },
  {
    id: "mocha",
    name: "Coastal Mocha",
    tagline: "Coffee meets dark chocolate",
    description:
      "Double espresso, house dark-chocolate ganache and steamed milk, topped with shaved coconut.",
    price: 390,
    category: "coffee",
    diets: ["vegetarian"],
    image: "/images/dark-chocolate-mocha.jpg",
    sizes: MILK_SIZES,
    addons: COFFEE_ADDONS,
  },
  {
    id: "kenya-aa",
    name: "Kenyan AA Pour-Over",
    tagline: "Single origin, hand poured",
    description:
      "Nyeri AA from the Tekangu co-operative. Blackcurrant, tomato-leaf sweetness and a bright citric finish. Brewed to order, 4 minutes.",
    price: 450,
    category: "coffee",
    diets: [],
    image: "/images/Kenyan-AA-pour.jpg",
    spec: "NYERI · 1,750 MASL · WASHED",
    popular: true,
    sizes: [
      { label: "250ml", delta: 0 },
      { label: "350ml", delta: 60 },
    ],
  },
  {
    id: "cold-brew",
    name: "18-Hour Cold Brew",
    tagline: "Slow, smooth, zero bitterness",
    description:
      "Steeped overnight in filtered water, served over ice with a twist of orange peel.",
    price: 380,
    category: "coffee",
    diets: [],
    image: "/images/18-Hour-brew-pour.jpg",
    sizes: [
      { label: "Regular", delta: 0 },
      { label: "Large", delta: 70 },
    ],
    addons: [{ label: "Vanilla syrup", price: 60 }],
  },
  {
    id: "affogato",
    name: "Affogato",
    tagline: "Dessert wearing a coffee hat",
    description:
      "Two scoops of vanilla ice cream drowned in a double espresso. Add a shot of liqueur-free mischief.",
    price: 420,
    category: "coffee",
    diets: ["vegetarian"],
    image: "/images/Affogato-glass.jpg",
    addons: [{ label: "Extra shot", price: 80 }],
  },

  /* ---------------------------- BREAKFAST ---------------------------- */
  {
    id: "full-breakfast",
    name: "Chill & Chew Full Breakfast",
    tagline: "Menyu kamili ya asubuhi",
    description:
      "Two eggs any style, beef sausage, grilled tomato, sautéed greens, toast and a pot of house chai. Served until 11:30.",
    price: 650,
    category: "breakfast",
    diets: ["halal"],
    image: "/images/c&c-full-breakfast.jpg",
    popular: true,
    sizes: [{ label: "One egg", delta: -40 }, { label: "Two eggs", delta: 0 }],
  },
  {
    id: "masala-omelette",
    name: "Masala Omelette",
    tagline: "Eggs with a Swahili accent",
    description:
      "Three eggs folded around onion, tomato, coriander and green chilli, served with toast and kachumbari.",
    price: 480,
    category: "breakfast",
    diets: ["vegetarian", "spicy"],
    image: "/images/Masala-Omelette.jpg",
    addons: [{ label: "Cheese", price: 70 }, { label: "Avocado", price: 90 }],
  },
  {
    id: "avo-toast",
    name: "Smashed Avocado Toast",
    tagline: "Sourdough, lime, chilli",
    description:
      "Thick-cut sourdough, avocado crushed with lime and coriander, chilli flakes and a soft-poached egg.",
    price: 520,
    category: "breakfast",
    diets: ["vegetarian", "spicy"],
    image: "/images/avo-toast.jpg",
    addons: [{ label: "Poached egg", price: 80 }, { label: "Feta", price: 90 }],
  },
  {
    id: "strawbery-pancakes",
    name: "Strawbery Fruit Pancakes",
    tagline: "Sweet, sharp, coastal",
    description:
      "Stack of buttermilk pancakes with strawbery fruit pulp, toasted coconut and a drizzle of honey.",
    price: 550,
    category: "breakfast",
    diets: ["vegetarian"],
    image: "/images/strawbery-pancakes.jpg",
    popular: true,
  },
  {
    id: "french-toast",
    name: "Coconut French Toast",
    tagline: "Brioche, coconut milk, banana",
    description:
      "Brioche soaked in coconut milk and egg, griddled golden, with caramelised banana and cinnamon sugar.",
    price: 500,
    category: "breakfast",
    diets: ["vegetarian"],
    image: "/images/french-toast.jpg",
  },
  {
    id: "mandazi-chai-set",
    name: "Mandazi & Chai Set",
    tagline: "The coast's favourite pair",
    description:
      "Three warm cardamom mandazi with a pot of masala chai. The correct way to start a Mombasa morning.",
    price: 350,
    category: "breakfast",
    diets: ["vegetarian"],
    image: "/images/mandazi-chai.jpg",
    popular: true,
  },

  /* ------------------------------- MAINS ------------------------------- */
  {
    id: "swahili-biryani",
    name: "Swahili Chicken Biryani",
    tagline: "Biriani ya kuku",
    description:
      "Basmati layered with marinated chicken, fried onion, saffron and our own biryani masala, served with raita and kachumbari.",
    price: 780,
    category: "mains",
    diets: ["halal", "spicy"],
    image: "/images/Swahili-Chicken-biryani.jpg",
    spec: "SLOW-STEAMED · SERVES ONE",
    popular: true,
    addons: [{ label: "Extra raita", price: 60 }, { label: "Boiled egg", price: 50 }],
  },
  {
    id: "prawn-coconut-rice",
    name: "Prawn Curry & Coconut Rice",
    tagline: "Mwani kama bahari",
    description:
      "King prawns simmered in coconut milk, tamarind and curry leaf, poured over steamed coconut rice.",
    price: 880,
    category: "mains",
    diets: ["spicy"],
    image: "/images/prawn-coconut-rice.jpg",
    popular: true,
  },
  {
    id: "beef-pilau",
    name: "Beef Pilau",
    tagline: "The Friday plate",
    description:
      "Basmati cooked in pilau masala with tender beef chunks, served with side salad and plain yoghurt.",
    price: 700,
    category: "mains",
    diets: ["halal"],
    image: "/images/beef-pilau.jpg",
  },
  {
    id: "kingfish-swahili",
    name: "Grilled Kingfish Swahili",
    tagline: "Kipuza wa kuchoma",
    description:
      "Line-caught kingfish fillet marinated in tamarind, garlic and peri-peri, grilled and served with coconut rice.",
    price: 950,
    category: "mains",
    diets: ["halal", "spicy"],
    image: "/images/kingfish-swahili.jpg",
    spec: "LINE-CAUGHT · TAMARIND MARINADE",
  },
  {
    id: "beef-burger",
    name: "Nyali Beef Burger",
    tagline: "Half-pound, smashed",
    description:
      "Grilled beef patty, smoked cheese, caramelised onion and house burger sauce in a toasted brioche bun, with masala fries.",
    price: 690,
    category: "mains",
    diets: ["halal"],
    image: "/images/beef-burger.jpg",
    popular: true,
    addons: [
      { label: "Extra patty", price: 250 },
      { label: "Cheese", price: 70 },
      { label: "Jalapeños", price: 60 },
    ],
  },
  {
    id: "chicken-wrap",
    name: "Peri-Peri Chicken Wrap",
    tagline: "Grilled, wrapped, gone",
    description:
      "Char-grilled chicken strips, crunchy slaw, garlic mayo and peri-peri in a warm tortilla.",
    price: 580,
    category: "mains",
    diets: ["halal", "spicy"],
    image: "/images/chicken-wrap.jpg",
    addons: [{ label: "Cheese", price: 70 }, { label: "Extra chicken", price: 180 }],
  },
  {
    id: "ndengu-curry",
    name: "Ndengu & Coconut Curry",
    tagline: "Green grams, coastal style",
    description:
      "Slow-simmered ndengu in coconut milk with tomato and spices, served with coconut rice and chapati.",
    price: 550,
    category: "mains",
    diets: ["vegetarian", "spicy"],
    image: "/images/ndengu-curry.jpg",
  },

  /* ------------------------------- SNACKS ------------------------------- */
  {
    id: "mandazi",
    name: "Cardamom Mandazi",
    tagline: "Three pieces, fried to order",
    description:
      "Light, not-too-sweet dough flavoured with cardamom and coconut milk — best eaten warm with chai.",
    price: 180,
    category: "snacks",
    diets: ["vegetarian"],
    image: "/images/Cardamom-mandazi.jpg",
    sizes: [{ label: "3 pieces", delta: 0 }, { label: "6 pieces", delta: 150 }],
    popular: true,
  },
  {
    id: "samosas",
    name: "Beef Samosas",
    tagline: "Crisp pastry, spiced beef",
    description:
      "Hand-folded pastries filled with minced beef, onion and cumin, served with tamarind chutney.",
    price: 220,
    category: "snacks",
    diets: ["halal", "spicy"],
    image: "/images/Beef-Samosas.jpg",
    sizes: [{ label: "3 pieces", delta: 0 }, { label: "6 pieces", delta: 180 }],
    popular: true,
  },
  {
    id: "viazi-karai",
    name: "Viazi Karai",
    tagline: "Salted, fried potatoes",
    description:
      "Boiled potatoes tossed in a spiced salt and deep-fried crisp — the Mombasa street snack, done properly.",
    price: 250,
    category: "snacks",
    diets: ["vegetarian", "spicy"],
    image: "/images/Viazi-Karai.jpg",
    addons: [{ label: "Chilli mayo", price: 50 }],
  },
  {
    id: "bhajia",
    name: "Spinach Bhajia",
    tagline: "Gram flour crunch",
    description:
      "Spinach leaves in spiced chickpea batter, fried crisp and served with coriander chutney.",
    price: 260,
    category: "snacks",
    diets: ["vegetarian", "spicy"],
    image: "/images/Spinach-Bhajia.jpg",
  },
  {
    id: "masala-fries",
    name: "Masala Fries",
    tagline: "Dusted, not drowned",
    description:
      "Skin-on fries tossed in our house masala spice with a garlic aioli on the side.",
    price: 300,
    category: "snacks",
    diets: ["vegetarian", "spicy"],
    image: "/images/Masala-Fries.jpg",
    addons: [{ label: "Cheese sauce", price: 80 }],
  },
  {
    id: "chicken-wings",
    name: "Peri-Peri Wings",
    tagline: "Six, lacquered, sticky",
    description:
      "Chicken wings glazed in peri-peri and honey, grilled until lacquered, with ranch dip.",
    price: 450,
    category: "snacks",
    diets: ["halal", "spicy"],
    image: "/images/Peri-Peri-Wings.jpg",
    sizes: [{ label: "6 pieces", delta: 0 }, { label: "12 pieces", delta: 380 }],
  },

  /* ------------------------------ DESSERTS ------------------------------ */
  {
    id: "coconut-cake",
    name: "Coconut & Lime Cake",
    tagline: "Our house signature",
    description:
      "Moist coconut sponge layered with cream cheese frosting, toasted coconut and lime zest.",
    price: 380,
    category: "desserts",
    diets: ["vegetarian"],
    image: "/images/dessert.jpg",
    popular: true,
  },
  {
    id: "chocolate-cake",
    name: "Dark Chocolate Cake",
    tagline: "Deep, fudgy, unapologetic",
    description:
      "Three layers of fudge cake with dark ganache and a pinch of sea salt.",
    price: 400,
    category: "desserts",
    diets: ["vegetarian"],
    image: "/images/dessert.jpg",
  },
  {
    id: "passion-cheesecake",
    name: "Passion Fruit Cheesecake",
    tagline: "Sharp on a biscuit base",
    description:
      "Baked vanilla cheesecake topped with warm passion fruit coulis.",
    price: 450,
    category: "desserts",
    diets: ["vegetarian"],
    image: "/images/dessert.jpg",
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    tagline: "Two scoops",
    description:
      "Vanilla, chocolate or coconut — ask for today's batch. Add toppings below.",
    price: 250,
    category: "desserts",
    diets: ["vegetarian"],
    image: "/images/dessert.jpg",
    sizes: [{ label: "2 scoops", delta: 0 }, { label: "3 scoops", delta: 90 }],
    addons: [
      { label: "Chocolate sauce", price: 60 },
      { label: "Toasted coconut", price: 50 },
      { label: "Fresh berries", price: 120 },
    ],
  },
  {
    id: "fruit-cup",
    name: "Tropical Fruit Cup",
    tagline: "Whatever's ripe today",
    description:
      "Mango, pineapple, watermelon and papaya cut fresh, with lime and mint.",
    price: 320,
    category: "desserts",
    diets: ["vegetarian", "halal"],
    image: "/images/juices.jpg",
  },

  /* ------------------------------- DRINKS ------------------------------- */
  {
    id: "passion-juice",
    name: "Passion Fruit Juice",
    tagline: "Tangy, seeded, addictive",
    description:
      "Fresh passion fruit pulp shaken with a little sugar and cold water. Served over ice.",
    price: 250,
    category: "drinks",
    diets: ["vegetarian", "halal"],
    image: "/images/juices.jpg",
    sizes: [{ label: "300ml", delta: 0 }, { label: "500ml", delta: 70 }],
    popular: true,
  },
  {
    id: "mango-juice",
    name: "Mango Juice",
    tagline: "Thick, golden, ripe",
    description:
      "Blended mango with a squeeze of lime — no water added unless you ask.",
    price: 250,
    category: "drinks",
    diets: ["vegetarian", "halal"],
    image: "/images/juices.jpg",
    sizes: [{ label: "300ml", delta: 0 }, { label: "500ml", delta: 70 }],
  },
  {
    id: "ukwaju",
    name: "Ukwaju (Tamarind)",
    tagline: "Sweet-sour classic",
    description:
      "Tamarind pods simmered and strained into a deep, sweet-sour cooler.",
    price: 280,
    category: "drinks",
    diets: ["vegetarian", "halal"],
    image: "/images/juices.jpg",
  },
  {
    id: "issoti",
    name: "Issoti (Hibiscus)",
    tagline: "Ruby cold, lightly sweet",
    description:
      "Dried hibiscus flowers steeped cold overnight with ginger and a little honey.",
    price: 260,
    category: "drinks",
    diets: ["vegetarian", "halal"],
    image: "/images/juices.jpg",
  },
  {
    id: "chai-masala",
    name: "Chai Masala",
    tagline: "Cardamom, ginger, condensed milk",
    description:
      "Black tea boiled with fresh ginger, cardamom and milk, sweetened the Kenyan way. Served scalding hot.",
    price: 260,
    category: "drinks",
    diets: ["vegetarian", "halal"],
    image: "/images/mandazi-chai.jpg",
    sizes: [{ label: "Cup", delta: 0 }, { label: "Pot (2 cups)", delta: 140 }],
    popular: true,
  },
  {
    id: "lime-soda",
    name: "Fresh Lime Soda",
    tagline: "Sweet or salty — say which",
    description:
      "Hand-squeezed lime, sugar or salt, topped with soda. Ask for 'sweet-salt' if you can't decide.",
    price: 200,
    category: "drinks",
    diets: ["vegetarian", "halal"],
    image: "/images/juices.jpg",
  },
  {
    id: "soft-drink",
    name: "Soft Drink",
    tagline: "Chilled can",
    description: "Coke, Fanta, Sprite or Stoney — ice cold from the counter fridge.",
    price: 120,
    category: "drinks",
    diets: ["vegetarian", "halal"],
    image: "/images/juices.jpg",
  },
  {
    id: "water",
    name: "Still / Sparkling Water",
    tagline: "500ml",
    description: "Chilled bottled water. Still or sparkling.",
    price: 100,
    category: "drinks",
    diets: ["vegetarian", "halal"],
    image: "/images/juices.jpg",
    sizes: [{ label: "Still", delta: 0 }, { label: "Sparkling", delta: 20 }],
  },
];

export const FEATURED_IDS = [
  "swahili-biryani",
  "latte",
  "mandazi",
  "passion-juice",
  "kenya-aa",
  "passion-cheesecake",
];

export function getItem(id: string): MenuItem | undefined {
  return MENU.find((m) => m.id === id);
}
