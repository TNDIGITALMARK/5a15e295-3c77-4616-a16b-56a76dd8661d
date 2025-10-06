"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  MessageCircle,
  Star,
  MapPin,
  Clock,
  Verified,
  Crown,
  Filter,
  Search,
  Sparkles,
  Users,
  TrendingUp,
  Shield
} from "lucide-react";
import { mockCreators, getFeaturedCreators, getOnlineCreators, type Creator } from "@/lib/mock-data";

interface FilterState {
  search: string;
  location: string;
  priceRange: string;
  availability: string;
  specialty: string;
  rating: string;
}

export function CreatorDiscoveryDashboard() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    priceRange: '',
    availability: '',
    specialty: '',
    rating: ''
  });

  const [activeTab, setActiveTab] = useState('all');

  const filteredCreators = useMemo(() => {
    let creators = mockCreators;

    // Tab filtering
    if (activeTab === 'featured') {
      creators = getFeaturedCreators();
    } else if (activeTab === 'online') {
      creators = getOnlineCreators();
    }

    // Search filtering
    if (filters.search) {
      creators = creators.filter(creator =>
        creator.displayName.toLowerCase().includes(filters.search.toLowerCase()) ||
        creator.bio.toLowerCase().includes(filters.search.toLowerCase()) ||
        creator.specialties.some(s => s.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Location filtering
    if (filters.location) {
      creators = creators.filter(creator => creator.location.includes(filters.location));
    }

    // Price range filtering
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      creators = creators.filter(creator =>
        creator.priceRange.min >= min && creator.priceRange.max <= max
      );
    }

    // Availability filtering
    if (filters.availability) {
      creators = creators.filter(creator => creator.availability === filters.availability);
    }

    // Specialty filtering
    if (filters.specialty) {
      creators = creators.filter(creator =>
        creator.specialties.includes(filters.specialty)
      );
    }

    // Rating filtering
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      creators = creators.filter(creator => creator.rating >= minRating);
    }

    return creators;
  }, [filters, activeTab]);

  const availabilityStatus = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>;
      case 'busy':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Busy</Badge>;
      default:
        return <Badge variant="secondary">Offline</Badge>;
    }
  };

  const formatPrice = (min: number, max: number) => {
    return `$${min} - $${max}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-12 py-16 gradient-elegant rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            Connect & Create.
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Redefine Your World
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Premium platform for authentic adult connections. Discover verified creators,
            engage in meaningful interactions, and experience luxury redefined.
          </p>
          <Button size="lg" className="sophisticated-button text-lg px-8 py-4">
            Start Exploring
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="creator-card text-center">
          <CardContent className="p-6">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-sm text-muted-foreground">Verified Creators</div>
          </CardContent>
        </Card>
        <Card className="creator-card text-center">
          <CardContent className="p-6">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">99.8%</div>
            <div className="text-sm text-muted-foreground">Safety Rating</div>
          </CardContent>
        </Card>
        <Card className="creator-card text-center">
          <CardContent className="p-6">
            <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">4.8★</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
        <Card className="creator-card text-center">
          <CardContent className="p-6">
            <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">1,243</div>
            <div className="text-sm text-muted-foreground">Premium Members</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Tabs */}
      <div className="mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="all">All Creators</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="online">Online Now</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Advanced Filters */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Refine Your Search</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search creators..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10 elegant-input"
              />
            </div>

            <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
              <SelectTrigger className="elegant-input">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Miami">Miami</SelectItem>
                <SelectItem value="Las Vegas">Las Vegas</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
              <SelectTrigger className="elegant-input">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Prices</SelectItem>
                <SelectItem value="100-300">$100 - $300</SelectItem>
                <SelectItem value="300-600">$300 - $600</SelectItem>
                <SelectItem value="600-1000">$600 - $1000</SelectItem>
                <SelectItem value="1000-2000">$1000+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
              <SelectTrigger className="elegant-input">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.specialty} onValueChange={(value) => setFilters(prev => ({ ...prev, specialty: value }))}>
              <SelectTrigger className="elegant-input">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Specialties</SelectItem>
                <SelectItem value="Lifestyle Coaching">Lifestyle Coaching</SelectItem>
                <SelectItem value="Intimate Conversations">Intimate Conversations</SelectItem>
                <SelectItem value="Cultural Experiences">Cultural Experiences</SelectItem>
                <SelectItem value="Wellness Coaching">Wellness Coaching</SelectItem>
                <SelectItem value="Business Networking">Business Networking</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.rating} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}>
              <SelectTrigger className="elegant-input">
                <SelectValue placeholder="Min Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Rating</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.7">4.7+ Stars</SelectItem>
                <SelectItem value="4.8">4.8+ Stars</SelectItem>
                <SelectItem value="4.9">4.9+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Showing {filteredCreators.length} creator{filteredCreators.length !== 1 ? 's' : ''}
        </p>
        <Select defaultValue="featured">
          <SelectTrigger className="w-48 elegant-input">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured First</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredCreators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>

      {/* Load More */}
      {filteredCreators.length > 0 && (
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            Load More Creators
          </Button>
        </div>
      )}
    </div>
  );
}

function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Card className="creator-card overflow-hidden">
      <div className="relative">
        <div className="aspect-[4/5] relative">
          <Image
            src={creator.avatar}
            alt={creator.displayName}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="absolute top-4 left-4 flex gap-2">
          {creator.verified && (
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Verified className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {creator.premium && (
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>

        <div className="absolute top-4 right-4">
          {availabilityStatus(creator.availability)}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white mb-1">{creator.displayName}</h3>
          <div className="flex items-center text-white/80 text-sm mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            {creator.location}
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{creator.rating}</span>
            <span className="text-muted-foreground text-sm">({creator.reviewCount})</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-primary">
              {formatPrice(creator.priceRange.min, creator.priceRange.max)}
            </div>
            <div className="text-xs text-muted-foreground">per session</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {creator.bio}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {creator.specialties.slice(0, 2).map((specialty) => (
            <Badge key={specialty} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {creator.specialties.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{creator.specialties.length - 2} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {creator.responseTime}
          </div>
          <div>{creator.completionRate}% completion rate</div>
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/creator/${creator.id}`}>
              View Profile
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}