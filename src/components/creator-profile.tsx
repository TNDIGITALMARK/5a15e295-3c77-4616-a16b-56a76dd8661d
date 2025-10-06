"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Star,
  MapPin,
  Clock,
  Verified,
  Crown,
  Heart,
  MessageCircle,
  Share,
  Calendar as CalendarIcon,
  Shield,
  Award,
  Users,
  Globe,
  Camera,
  Video,
  Gift,
  CreditCard,
  Phone,
  Mail,
  Check
} from "lucide-react";
import { getCreatorById, mockServices, type Creator } from "@/lib/mock-data";

interface CreatorProfileProps {
  creatorId: string;
}

export function CreatorProfile({ creatorId }: CreatorProfileProps) {
  const creator = getCreatorById(creatorId);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [activeTab, setActiveTab] = useState('about');

  if (!creator) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Creator not found</h1>
        <p className="text-muted-foreground">The creator you're looking for doesn't exist.</p>
      </div>
    );
  }

  const availabilityColor = {
    online: 'text-green-400 bg-green-500/20 border-green-500/30',
    busy: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    offline: 'text-muted-foreground bg-muted/20 border-muted/30'
  };

  const creatorServices = mockServices.filter(service => service.creatorId === creator.id);

  const formatPrice = (min: number, max: number) => {
    return `$${min} - $${max}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={creator.coverImage}
          alt={`${creator.displayName} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative -mt-32 z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:w-1/3">
            <Card className="creator-card mb-6">
              <CardContent className="p-0">
                {/* Profile Picture */}
                <div className="relative -mt-16 mb-6 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background">
                      <Image
                        src={creator.avatar}
                        alt={creator.displayName}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-background ${
                      creator.availability === 'online' ? 'bg-green-500' :
                      creator.availability === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                  </div>
                </div>

                <div className="px-6 pb-6">
                  {/* Name and Verification */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">{creator.displayName}</h1>
                      {creator.verified && <Verified className="w-5 h-5 text-blue-400" />}
                      {creator.premium && <Crown className="w-5 h-5 text-primary" />}
                    </div>
                    <p className="text-muted-foreground">@{creator.username}</p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-center mb-4">
                    <Badge className={availabilityColor[creator.availability]}>
                      {creator.availability.charAt(0).toUpperCase() + creator.availability.slice(1)}
                      {creator.availability === 'online' && ' • Available Now'}
                    </Badge>
                  </div>

                  {/* Location and Response Time */}
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {creator.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Responds in {creator.responseTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {creator.languages.join(', ')}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                      <div className="text-xl font-bold text-primary">{formatNumber(creator.stats.followers)}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">{formatNumber(creator.stats.likes)}</div>
                      <div className="text-xs text-muted-foreground">Likes</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">{formatNumber(creator.stats.views)}</div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full sophisticated-button"
                      size="lg"
                      onClick={() => setShowBookingDialog(true)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Session
                    </Button>

                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        <Heart className={`w-4 h-4 ${isFollowing ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info Card */}
            <Card className="creator-card mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completion Rate</span>
                  <Badge variant="secondary">{creator.completionRate}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Sessions</span>
                  <span className="text-sm font-medium">{creator.totalSessions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Member Since</span>
                  <span className="text-sm font-medium">
                    {new Date(creator.joinedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{creator.rating}</span>
                    <span className="text-xs text-muted-foreground">({creator.reviewCount})</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Range Card */}
            <Card className="creator-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {formatPrice(creator.priceRange.min, creator.priceRange.max)}
                  </div>
                  <p className="text-sm text-muted-foreground">Per session</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card className="creator-card">
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {creator.bio}
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-2">
                          {creator.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {creator.languages.map((language) => (
                            <Badge key={language} variant="outline">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <div className="grid gap-4">
                  {creatorServices.map((service) => (
                    <Card key={service.id} className="creator-card">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {service.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-primary">${service.price}</div>
                            <div className="text-xs text-muted-foreground">{service.duration} minutes</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {service.rating}
                            </div>
                            <div>{service.bookingCount} bookings</div>
                          </div>
                          <Button
                            onClick={() => {
                              setSelectedService(service.id);
                              setShowBookingDialog(true);
                            }}
                            className="sophisticated-button"
                          >
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {creator.featuredContent.images.map((image, index) => (
                    <Card key={index} className="creator-card overflow-hidden">
                      <div className="aspect-[4/5] relative">
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </Card>
                  ))}
                  {creator.featuredContent.videos.map((video, index) => (
                    <Card key={`video-${index}`} className="creator-card overflow-hidden">
                      <div className="aspect-[4/5] relative">
                        <Image
                          src={video}
                          alt={`Video thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Video className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="creator-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Reviews & Testimonials
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span>{creator.rating}</span>
                        <span className="text-muted-foreground text-sm">({creator.reviewCount} reviews)</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Mock reviews */}
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-border/50 pb-4 last:border-0">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              <Users className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">Anonymous Client</span>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">2 days ago</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Exceptional experience. Professional, engaging, and exceeded all expectations.
                                Highly recommend for anyone seeking quality companionship.
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card className="creator-card">
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Service</label>
              <select className="w-full elegant-input">
                <option value="">Choose a service...</option>
                {creatorServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title} - ${service.price}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Preferred Date & Time</label>
              <Input type="datetime-local" className="elegant-input" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Special Requests (Optional)</label>
              <Textarea placeholder="Any special requests or preferences..." className="elegant-input" />
            </div>
            <div className="pt-4 border-t">
              <Button className="w-full sophisticated-button" size="lg">
                <Check className="w-4 h-4 mr-2" />
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}