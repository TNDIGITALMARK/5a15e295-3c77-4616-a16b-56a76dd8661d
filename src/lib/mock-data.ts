export interface Creator {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  coverImage: string;
  verified: boolean;
  premium: boolean;
  rating: number;
  reviewCount: number;
  bio: string;
  location: string;
  languages: string[];
  specialties: string[];
  priceRange: {
    min: number;
    max: number;
  };
  availability: 'online' | 'busy' | 'offline';
  lastSeen: string;
  responseTime: string;
  completionRate: number;
  totalSessions: number;
  joinedDate: string;
  featuredContent: {
    images: string[];
    videos: string[];
  };
  services: Service[];
  stats: {
    followers: number;
    likes: number;
    views: number;
  };
}

export interface Service {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  category: string;
  duration: number; // minutes
  price: number;
  currency: string;
  thumbnail: string;
  tags: string[];
  rating: number;
  bookingCount: number;
  availability: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'video' | 'booking';
  read: boolean;
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
}

export interface Booking {
  id: string;
  creatorId: string;
  clientId: string;
  serviceId: string;
  scheduledTime: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  currency: string;
  notes?: string;
}

// Mock Data
export const mockCreators: Creator[] = [
  {
    id: '1',
    username: 'sophia_rose',
    displayName: 'Sophia Rose',
    avatar: '/api/placeholder/200/200',
    coverImage: '/api/placeholder/800/400',
    verified: true,
    premium: true,
    rating: 4.9,
    reviewCount: 1247,
    bio: 'Professional companion with expertise in intimate conversation and sophisticated experiences. Specializing in luxury lifestyle guidance and personal development.',
    location: 'Los Angeles, CA',
    languages: ['English', 'French'],
    specialties: ['Lifestyle Coaching', 'Intimate Conversations', 'Personal Development'],
    priceRange: { min: 200, max: 800 },
    availability: 'online',
    lastSeen: '2 minutes ago',
    responseTime: '< 5 minutes',
    completionRate: 98,
    totalSessions: 3420,
    joinedDate: '2022-03-15',
    featuredContent: {
      images: ['/api/placeholder/400/600', '/api/placeholder/400/600', '/api/placeholder/400/600'],
      videos: ['/api/placeholder/400/600']
    },
    services: [],
    stats: {
      followers: 15420,
      likes: 89234,
      views: 450620
    }
  },
  {
    id: '2',
    username: 'isabella_luxe',
    displayName: 'Isabella Luxe',
    avatar: '/api/placeholder/200/200',
    coverImage: '/api/placeholder/800/400',
    verified: true,
    premium: true,
    rating: 4.8,
    reviewCount: 892,
    bio: 'Elite companion specializing in high-end experiences and sophisticated clientele. Expert in art, wine, and cultural experiences.',
    location: 'New York, NY',
    languages: ['English', 'Italian', 'Spanish'],
    specialties: ['Cultural Experiences', 'Fine Dining', 'Art Appreciation'],
    priceRange: { min: 300, max: 1200 },
    availability: 'busy',
    lastSeen: '15 minutes ago',
    responseTime: '< 10 minutes',
    completionRate: 96,
    totalSessions: 2108,
    joinedDate: '2021-11-08',
    featuredContent: {
      images: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
      videos: ['/api/placeholder/400/600', '/api/placeholder/400/600']
    },
    services: [],
    stats: {
      followers: 22350,
      likes: 134567,
      views: 680450
    }
  },
  {
    id: '3',
    username: 'aria_wellness',
    displayName: 'Aria Wellness',
    avatar: '/api/placeholder/200/200',
    coverImage: '/api/placeholder/800/400',
    verified: true,
    premium: false,
    rating: 4.7,
    reviewCount: 623,
    bio: 'Wellness coach and spiritual guide. Offering transformative experiences through mindfulness, meditation, and personal empowerment.',
    location: 'Miami, FL',
    languages: ['English'],
    specialties: ['Wellness Coaching', 'Meditation', 'Spiritual Guidance'],
    priceRange: { min: 150, max: 500 },
    availability: 'online',
    lastSeen: 'Just now',
    responseTime: '< 3 minutes',
    completionRate: 94,
    totalSessions: 1456,
    joinedDate: '2023-01-20',
    featuredContent: {
      images: ['/api/placeholder/400/600', '/api/placeholder/400/600', '/api/placeholder/400/600'],
      videos: []
    },
    services: [],
    stats: {
      followers: 8920,
      likes: 45890,
      views: 234580
    }
  },
  {
    id: '4',
    username: 'valentina_elite',
    displayName: 'Valentina Elite',
    avatar: '/api/placeholder/200/200',
    coverImage: '/api/placeholder/800/400',
    verified: true,
    premium: true,
    rating: 4.9,
    reviewCount: 1556,
    bio: 'International luxury companion with expertise in business networking, cultural events, and exclusive experiences.',
    location: 'Las Vegas, NV',
    languages: ['English', 'French', 'German'],
    specialties: ['Business Networking', 'Luxury Travel', 'Exclusive Events'],
    priceRange: { min: 500, max: 2000 },
    availability: 'offline',
    lastSeen: '2 hours ago',
    responseTime: '< 15 minutes',
    completionRate: 99,
    totalSessions: 4230,
    joinedDate: '2020-09-12',
    featuredContent: {
      images: ['/api/placeholder/400/600', '/api/placeholder/400/600', '/api/placeholder/400/600', '/api/placeholder/400/600'],
      videos: ['/api/placeholder/400/600']
    },
    services: [],
    stats: {
      followers: 31200,
      likes: 187420,
      views: 892340
    }
  },
  {
    id: '5',
    username: 'luna_mystique',
    displayName: 'Luna Mystique',
    avatar: '/api/placeholder/200/200',
    coverImage: '/api/placeholder/800/400',
    verified: true,
    premium: false,
    rating: 4.6,
    reviewCount: 445,
    bio: 'Creative artist and intimate conversation specialist. Passionate about deep connections and meaningful experiences.',
    location: 'San Francisco, CA',
    languages: ['English'],
    specialties: ['Creative Arts', 'Deep Conversations', 'Emotional Connection'],
    priceRange: { min: 120, max: 400 },
    availability: 'online',
    lastSeen: '8 minutes ago',
    responseTime: '< 8 minutes',
    completionRate: 91,
    totalSessions: 987,
    joinedDate: '2023-05-03',
    featuredContent: {
      images: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
      videos: ['/api/placeholder/400/600']
    },
    services: [],
    stats: {
      followers: 6750,
      likes: 28940,
      views: 145690
    }
  },
  {
    id: '6',
    username: 'crystal_diamond',
    displayName: 'Crystal Diamond',
    avatar: '/api/placeholder/200/200',
    coverImage: '/api/placeholder/800/400',
    verified: true,
    premium: true,
    rating: 4.8,
    reviewCount: 778,
    bio: 'Luxury lifestyle consultant and personal development coach. Specializing in confidence building and elegant experiences.',
    location: 'Chicago, IL',
    languages: ['English', 'Spanish'],
    specialties: ['Lifestyle Consulting', 'Confidence Building', 'Personal Styling'],
    priceRange: { min: 250, max: 900 },
    availability: 'busy',
    lastSeen: '1 hour ago',
    responseTime: '< 12 minutes',
    completionRate: 97,
    totalSessions: 2890,
    joinedDate: '2021-07-28',
    featuredContent: {
      images: ['/api/placeholder/400/600', '/api/placeholder/400/600', '/api/placeholder/400/600'],
      videos: ['/api/placeholder/400/600', '/api/placeholder/400/600']
    },
    services: [],
    stats: {
      followers: 18640,
      likes: 97530,
      views: 456780
    }
  }
];

export const mockServices: Service[] = [
  {
    id: 's1',
    creatorId: '1',
    title: 'Premium Lifestyle Consultation',
    description: 'Personalized 1-on-1 session focusing on lifestyle enhancement and personal development goals.',
    category: 'Consulting',
    duration: 60,
    price: 300,
    currency: 'USD',
    thumbnail: '/api/placeholder/300/200',
    tags: ['lifestyle', 'consulting', 'personal-development'],
    rating: 4.9,
    bookingCount: 245,
    availability: true
  },
  {
    id: 's2',
    creatorId: '1',
    title: 'Intimate Conversation Experience',
    description: 'Deep, meaningful conversation in a private, comfortable setting designed for authentic connection.',
    category: 'Conversation',
    duration: 90,
    price: 450,
    currency: 'USD',
    thumbnail: '/api/placeholder/300/200',
    tags: ['conversation', 'intimate', 'connection'],
    rating: 4.8,
    bookingCount: 189,
    availability: true
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: '1',
    recipientId: 'client1',
    content: 'Hello! Thank you for your interest. I would love to discuss how we can create a memorable experience together.',
    timestamp: '2024-12-06T10:30:00Z',
    type: 'text',
    read: false
  },
  {
    id: 'm2',
    senderId: 'client1',
    recipientId: '1',
    content: 'Hi Sophia! I am interested in your lifestyle consultation service. Could we schedule something for this weekend?',
    timestamp: '2024-12-06T10:25:00Z',
    type: 'text',
    read: true
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    creatorId: '1',
    clientId: 'client1',
    serviceId: 's1',
    scheduledTime: '2024-12-08T19:00:00Z',
    duration: 60,
    status: 'confirmed',
    price: 300,
    currency: 'USD',
    notes: 'Looking forward to discussing personal development goals and lifestyle enhancement strategies.'
  }
];

// Helper functions
export const getCreatorById = (id: string) => mockCreators.find(creator => creator.id === id);
export const getCreatorsByCategory = (specialty: string) =>
  mockCreators.filter(creator => creator.specialties.includes(specialty));
export const getFeaturedCreators = () => mockCreators.filter(creator => creator.premium && creator.rating >= 4.8);
export const getOnlineCreators = () => mockCreators.filter(creator => creator.availability === 'online');