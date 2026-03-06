export interface NewsArticle {
  id: string;
  title: string;
  excerpt?: string;
  category: string;
  image?: string;
  author?: string;
  timestamp: string;
  isQuote?: boolean;
  quoteText?: string;
}

export const heroArticle: NewsArticle = {
  id: "1",
  title: "Where protests are part of life and women guard a river: The defenders of the Aravallis",
  excerpt: "For the people who live along the hill range in Rajasthan, the existential fight against rampant mining started long before the Supreme Court ruling and continues even after the spotlight has dimmed",
  category: "Gallery",
  timestamp: "2 hours ago",
};

export const heroQuote = {
  id: "2",
  personName: "Pawan Khera",
  quoteText: "What exactly does Jaishankar do? Is his job limited to delivering speeches at international fora",
  category: "India",
  timestamp: "3 hours ago",
};

export const bulletHeadlines: NewsArticle[] = [
  {
    id: "3",
    title: "Indian IT stocks set to lose $50 billion in worst week since pandemic on AI fears",
    category: "Business",
    timestamp: "4 hours ago",
  },
  {
    id: "4",
    title: "Rahul Gandhi plans movement against India-US deal in huddle with farm union leaders",
    category: "India",
    timestamp: "3 hours ago",
  },
];

export const bottomHeroStories: NewsArticle[] = [
  {
    id: "5",
    title: "Bangladesh polls: Hindu BNP leader Gayeshwar Roy triumphs in Dhaka constituency",
    category: "World",
    timestamp: "1 hour ago",
  },
  {
    id: "6",
    title: "T20WC: Ahead of India clash, Pakistan spinner's mysterious crease freeze sparks fresh row",
    category: "Sports",
    timestamp: "2 hours ago",
  },
  {
    id: "7",
    title: "Bengaluru techie who killed parents referred to NIMHANS for psychiatric evaluation",
    category: "India",
    timestamp: "5 hours ago",
  },
];

export const sidebarStories: NewsArticle[] = [
  {
    id: "8",
    title: "Alcohol's impact on the body: From brain changes to cancer risk",
    category: "Health",
    timestamp: "3 hours ago",
  },
  {
    id: "9",
    title: "'O'Romeo': Shahid is Charlie, Haider and Kabir Singh combined in a tale of love and violence",
    category: "Entertainment",
    timestamp: "2 hours ago",
  },
];

export const trendingStories: NewsArticle[] = [
  {
    id: "10",
    title: "PM Modi, Shehbaz Sharif congratulate Tarique Rahman as BNP claims victory in Dhaka polls",
    category: "World",
    timestamp: "1 hour ago",
  },
  {
    id: "11",
    title: "From London exile to Dhaka power: Tarique Rahman nears Bangladesh PM post",
    category: "World",
    timestamp: "2 hours ago",
  },
  {
    id: "12",
    title: "The Epstein files and the hidden world of an unaccountable elite",
    category: "World",
    timestamp: "4 hours ago",
  },
  {
    id: "13",
    title: "McDonald's outlet in Jaipur gets regulatory warning over rotten tomatoes in storage, reused oil",
    category: "Business",
    timestamp: "3 hours ago",
  },
  {
    id: "14",
    title: "Kremlin confirms that Russia has blocked WhatsApp, pushes state-backed alternative",
    category: "World",
    timestamp: "5 hours ago",
  },
  {
    id: "15",
    title: "Apple expands India presence with new Borivali store in Mumbai set to open on Feb 26",
    category: "Business",
    timestamp: "6 hours ago",
  },
  {
    id: "16",
    title: "Arijit Singh goes the spiritual way after playback retirement, drops indie Shiva bhajan",
    category: "Entertainment",
    timestamp: "2 hours ago",
  },
];

export const opinionArticles: NewsArticle[] = [
  {
    id: "17",
    title: "Renewal time",
    excerpt: "Bangladesh is neither collapsing nor securely consolidated. It is a nation arguing with itself — about authority, identity, accountability and the meaning of its founding promise",
    author: "Amitabh Mattoo",
    category: "Opinion",
    timestamp: "6 hours ago",
  },
  {
    id: "18",
    title: "Dire deal",
    excerpt: "The Economic Survey emphasised productivity and market integration, while remaining silent on how such transitions will absorb a farm population dominated by small cultivators",
    author: "Jaideep Hardikar",
    category: "Opinion",
    timestamp: "8 hours ago",
  },
  {
    id: "19",
    title: "The bhadralok identity crisis",
    excerpt: "The Bengali bhadralok is experiencing a cultural upheaval that challenges everything the class once stood for",
    author: "Sumit Mitra",
    category: "Opinion",
    timestamp: "7 hours ago",
  },
];

export const navCategories = [
  "HOME", "OPINION", "INDIA", "WEST BENGAL", "WORLD",
  "BUSINESS", "SPORTS", "ENTERTAINMENT", "EDUGRAPH", "MORE"
];
