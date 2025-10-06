"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  MessageSquare,
  Star,
  Clock,
  Eye,
  Heart,
  Settings,
  Plus,
  Edit,
  Camera,
  Video,
  FileText,
  Bell,
  Shield,
  CreditCard,
  Activity,
  Target
} from "lucide-react";

export function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewServiceDialog, setShowNewServiceDialog] = useState(false);

  // Mock data for dashboard
  const stats = {
    totalEarnings: 12450,
    monthlyEarnings: 3200,
    totalSessions: 156,
    monthlySessions: 42,
    rating: 4.8,
    reviews: 89,
    profileViews: 2340,
    followers: 890
  };

  const recentBookings = [
    { id: 1, client: 'Anonymous Client', service: 'Premium Consultation', date: '2024-12-08', time: '19:00', amount: 300, status: 'confirmed' },
    { id: 2, client: 'Anonymous Client', service: 'Intimate Conversation', date: '2024-12-09', time: '20:30', amount: 450, status: 'pending' },
    { id: 3, client: 'Anonymous Client', service: 'Lifestyle Coaching', date: '2024-12-10', time: '18:00', amount: 250, status: 'completed' }
  ];

  const messages = [
    { id: 1, client: 'Anonymous Client', preview: 'Thank you for the amazing session...', time: '2 min ago', unread: true },
    { id: 2, client: 'Anonymous Client', preview: 'I would like to book another...', time: '1 hour ago', unread: true },
    { id: 3, client: 'Anonymous Client', preview: 'The experience exceeded my...', time: '3 hours ago', unread: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
        <p className="text-muted-foreground">Manage your profile, services, and earnings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="creator-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold">${stats.monthlyEarnings}</div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <div className="text-xs text-green-400 mt-1">+15% from last month</div>
              </CardContent>
            </Card>

            <Card className="creator-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold">{stats.monthlySessions}</div>
                <p className="text-sm text-muted-foreground">Sessions This Month</p>
                <div className="text-xs text-blue-400 mt-1">+8% from last month</div>
              </CardContent>
            </Card>

            <Card className="creator-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Target className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">{stats.rating}</div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <div className="text-xs text-yellow-400 mt-1">{stats.reviews} reviews</div>
              </CardContent>
            </Card>

            <Card className="creator-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold">{stats.profileViews}</div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <div className="text-xs text-purple-400 mt-1">+23% this week</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings Chart */}
            <Card className="creator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Monthly Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Lifetime Earnings</span>
                    <span className="font-bold text-lg">${stats.totalEarnings}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    On track to exceed monthly target by 15%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Profile Performance */}
            <Card className="creator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Profile Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Profile Completeness</span>
                  <span className="text-primary font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Followers</span>
                    <span>{stats.followers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Response Rate</span>
                    <span className="text-green-400">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card className="creator-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                    <div className="flex-1">
                      <div className="font-medium">{booking.service}</div>
                      <div className="text-sm text-muted-foreground">
                        {booking.date} at {booking.time}
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <div className="font-bold">${booking.amount}</div>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Booking Management</h2>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40 elegant-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="creator-card">
            <CardContent className="p-0">
              <div className="space-y-0">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-6 border-b border-border/50 last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="font-medium">{booking.service}</div>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {booking.client} • {booking.date} at {booking.time}
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <div className="font-bold text-lg">${booking.amount}</div>
                    </div>
                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline">Decline</Button>
                          <Button size="sm" className="sophisticated-button">Accept</Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Messages</h2>
            <Badge className="bg-primary/20 text-primary">
              {messages.filter(m => m.unread).length} unread
            </Badge>
          </div>

          <Card className="creator-card">
            <CardContent className="p-0">
              <div className="space-y-0">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-center gap-4 p-6 border-b border-border/50 last:border-0 cursor-pointer hover:bg-muted/20 ${message.unread ? 'bg-primary/5' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{message.client}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{message.preview}</p>
                    </div>
                    {message.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Service Management</h2>
            <Dialog open={showNewServiceDialog} onOpenChange={setShowNewServiceDialog}>
              <DialogTrigger asChild>
                <Button className="sophisticated-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Service</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Title</label>
                    <Input placeholder="e.g., Premium Consultation" className="elegant-input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea placeholder="Detailed service description..." className="elegant-input" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Price ($)</label>
                      <Input type="number" placeholder="300" className="elegant-input" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Duration (min)</label>
                      <Input type="number" placeholder="60" className="elegant-input" />
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full sophisticated-button">Create Service</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {/* Mock services */}
            {[1, 2].map((service) => (
              <Card key={service} className="creator-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Premium Lifestyle Consultation</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Personalized 1-on-1 session focusing on lifestyle enhancement and personal development.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>60 minutes</span>
                        <span>•</span>
                        <span>$300</span>
                        <span>•</span>
                        <span>24 bookings</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Content Management</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Add Photos
              </Button>
              <Button variant="outline">
                <Video className="w-4 h-4 mr-2" />
                Add Videos
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="creator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Photo Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((photo) => (
                    <div key={photo} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="creator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((video) => (
                    <div key={video} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <Video className="w-8 h-8 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-2xl font-bold">Account Settings</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="creator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Display Name</label>
                  <Input defaultValue="Sophia Rose" className="elegant-input" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Bio</label>
                  <Textarea defaultValue="Professional companion with expertise in..." className="elegant-input" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input defaultValue="Los Angeles, CA" className="elegant-input" />
                </div>
              </CardContent>
            </Card>

            <Card className="creator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Booking Requests</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Messages</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Updates</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Marketing Emails</span>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="creator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Profile Visibility</span>
                  <Select defaultValue="public">
                    <SelectTrigger className="w-32 elegant-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="members">Members Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require Verification</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-block Inappropriate Messages</span>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="creator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Default Pricing</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min price" className="elegant-input" />
                    <Input placeholder="Max price" className="elegant-input" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Instant Booking</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require Deposits</span>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}