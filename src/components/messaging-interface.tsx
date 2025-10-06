"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Video,
  Gift,
  Calendar,
  Heart,
  MoreVertical,
  Search,
  Phone,
  VideoIcon,
  Smile,
  Shield,
  Star,
  Clock,
  CheckCheck,
  Check,
  Circle,
  MessageCircle
} from "lucide-react";
import { mockCreators, type Creator } from "@/lib/mock-data";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video' | 'booking' | 'gift';
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
}

interface Conversation {
  id: string;
  participant: Creator;
  lastMessage: Message;
  unreadCount: number;
  isOnline: boolean;
  lastSeen: string;
}

export function MessagingInterface() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversations
  const conversations: Conversation[] = mockCreators.slice(0, 4).map((creator, index) => ({
    id: `conv-${creator.id}`,
    participant: creator,
    lastMessage: {
      id: `msg-${index}`,
      senderId: creator.id,
      content: index === 0
        ? "Thank you for the wonderful session. I look forward to our next meeting."
        : index === 1
        ? "I have some availability this weekend if you'd like to schedule something special."
        : index === 2
        ? "The experience exceeded all my expectations. Thank you for being so professional."
        : "I'm available for a video call this evening if you're interested.",
      timestamp: new Date(Date.now() - index * 3600000),
      type: 'text',
      status: 'read'
    },
    unreadCount: index === 0 ? 2 : index === 1 ? 1 : 0,
    isOnline: creator.availability === 'online',
    lastSeen: creator.lastSeen
  }));

  // Mock messages for selected conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      senderId: 'user',
      content: 'Hello! I saw your profile and I\'m very interested in booking a session with you.',
      timestamp: new Date(Date.now() - 7200000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-2',
      senderId: selectedConversation ? conversations.find(c => c.id === selectedConversation)?.participant.id || '1' : '1',
      content: 'Hello! Thank you for your interest. I would love to discuss creating a memorable experience together. What kind of session are you looking for?',
      timestamp: new Date(Date.now() - 6900000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-3',
      senderId: 'user',
      content: 'I\'m interested in your premium lifestyle consultation. Could we schedule something for this weekend?',
      timestamp: new Date(Date.now() - 6600000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-4',
      senderId: selectedConversation ? conversations.find(c => c.id === selectedConversation)?.participant.id || '1' : '1',
      content: 'Absolutely! I have availability on Saturday evening or Sunday afternoon. Which would work better for you?',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      status: 'delivered'
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.participant.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = selectedConversation
    ? conversations.find(c => c.id === selectedConversation)
    : null;

  const sendMessage = () => {
    if (!message.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      content: message,
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastSeen = (timestamp: string) => {
    const now = new Date();
    const lastSeen = new Date(timestamp);
    const diffHours = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return lastSeen.toLocaleDateString();
  };

  const getMessageStatus = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-primary" />;
      default:
        return <Circle className="w-3 h-3 text-muted-foreground" />;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-screen flex bg-background border-t border-border/40">
      {/* Conversations List */}
      <div className="w-80 border-r border-border/40 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-border/40">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Badge className="bg-primary/20 text-primary">
              {conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)}
            </Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 elegant-input"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/20 ${
                  selectedConversation === conversation.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={conversation.participant.avatar}
                      alt={conversation.participant.displayName}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm truncate">
                        {conversation.participant.displayName}
                      </span>
                      {conversation.participant.verified && (
                        <Shield className="w-3 h-3 text-blue-400" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-1">
                    {conversation.lastMessage.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {conversation.isOnline ? 'Online' : `Last seen ${formatLastSeen(conversation.lastSeen)}`}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 text-xs rounded-full">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border/40 bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={selectedConv.participant.avatar}
                        alt={selectedConv.participant.displayName}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {selectedConv.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{selectedConv.participant.displayName}</h3>
                      {selectedConv.participant.verified && (
                        <Shield className="w-4 h-4 text-blue-400" />
                      )}
                      {selectedConv.participant.premium && (
                        <Star className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedConv.isOnline ? 'Online now' : `Last seen ${formatLastSeen(selectedConv.lastSeen)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <VideoIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isOwn = msg.senderId === 'user';
                  const sender = isOwn ? null : selectedConv.participant;

                  return (
                    <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse' : ''}`}>
                        {!isOwn && (
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={sender!.avatar}
                              alt={sender!.displayName}
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <div className={`rounded-2xl px-4 py-2 ${
                          isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          <div className={`flex items-center gap-1 mt-1 ${
                            isOwn ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className={`text-xs ${
                              isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {formatTime(msg.timestamp)}
                            </span>
                            {isOwn && getMessageStatus(msg.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border/40">
              <div className="flex items-end gap-2">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Gift className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Send a Gift</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-3 gap-4">
                        {['💎', '🌹', '💝', '🍾', '💰', '⭐'].map((gift, index) => (
                          <Card key={index} className="creator-card cursor-pointer hover:scale-105 transition-transform">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl mb-2">{gift}</div>
                              <div className="text-sm font-medium">${(index + 1) * 10}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Schedule a Session</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Service</label>
                          <select className="w-full elegant-input">
                            <option>Premium Consultation - $300</option>
                            <option>Intimate Conversation - $450</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Date & Time</label>
                          <Input type="datetime-local" className="elegant-input" />
                        </div>
                        <Button className="w-full sophisticated-button">
                          Send Booking Request
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex-1 relative">
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    className="elegant-input resize-none pr-12"
                    rows={1}
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 bottom-2"
                    onClick={sendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Safety Notice */}
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                <span>All conversations are monitored for safety and compliance.</span>
              </div>
            </div>
          </>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground max-w-sm">
                Choose a conversation from the sidebar to start messaging with creators.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}