import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, Search, MessageCircle, Mail, Phone, 
  FileText, Video, Book, ChevronDown, ChevronRight,
  Send, Clock, CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

const faqData = [
  {
    id: '1',
    question: 'How do I check in/out for attendance?',
    answer: 'You can check in/out by navigating to the Attendance page and clicking the respective buttons. The system will automatically record your time and location.',
    category: 'Attendance'
  },
  {
    id: '2',
    question: 'How can I view my salary details?',
    answer: 'Go to the Salaries page where you can view your monthly salary breakdown, including basic salary, allowances, and deductions. You can also download salary slips.',
    category: 'Salary'
  },
  {
    id: '3',
    question: 'How do I request leave?',
    answer: 'Navigate to the Leave Management section, click on "Request Leave", fill out the form with your leave details, and submit it for approval.',
    category: 'Leave'
  },
  {
    id: '4',
    question: 'How can I update my profile information?',
    answer: 'Visit your Profile page, click "Edit Profile", make the necessary changes, and save your updates. Some fields may require admin approval.',
    category: 'Profile'
  },
  {
    id: '5',
    question: 'What should I do if I forgot my password?',
    answer: 'Click on "Forgot Password" on the login page and enter your email address. You will receive a password reset link via email.',
    category: 'Account'
  },
  {
    id: '6',
    question: 'How do I generate reports?',
    answer: 'As an admin, you can generate various reports from the Reports section. Select the report type, choose date ranges, and export in your preferred format.',
    category: 'Reports'
  }
];

const supportChannels = [
  {
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    icon: Mail,
    contact: 'support@corehr.com',
    responseTime: '24 hours'
  },
  {
    title: 'Phone Support',
    description: 'Speak directly with our support team',
    icon: Phone,
    contact: '+1 (555) 123-4567',
    responseTime: 'Immediate'
  },
  {
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    icon: MessageCircle,
    contact: 'Available 9 AM - 5 PM EST',
    responseTime: '< 5 minutes'
  }
];

const resources = [
  {
    title: 'User Guide',
    description: 'Complete guide to using the system',
    icon: Book,
    type: 'PDF'
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video instructions',
    icon: Video,
    type: 'Video'
  },
  {
    title: 'API Documentation',
    description: 'Technical documentation for developers',
    icon: FileText,
    type: 'Web'
  }
];

export const HelpSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState<string[]>([]);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: '',
    message: ''
  });
  const { toast } = useToast();

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setOpenFaqs(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Ticket Created",
      description: "Your support request has been submitted. We'll get back to you soon!",
    });
    setContactForm({ subject: '', category: '', message: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Help & Support Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch with our support team
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {supportChannels.map((channel, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <channel.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
              <p className="text-muted-foreground mb-3">{channel.description}</p>
              <p className="font-medium text-sm">{channel.contact}</p>
              <Badge variant="secondary" className="mt-2">
                {channel.responseTime}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find quick answers to the most common questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredFaqs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={openFaqs.includes(faq.id)}
                onOpenChange={() => toggleFaq(faq.id)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="text-xs">
                      {faq.category}
                    </Badge>
                    <span className="font-medium">{faq.question}</span>
                  </div>
                  {openFaqs.includes(faq.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No FAQs found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>
              Helpful guides and documentation to get the most out of the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <resource.icon className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <Badge variant="outline">{resource.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Contact Support
            </CardTitle>
            <CardDescription>
              Can't find what you're looking for? Send us a message and we'll help you out
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full p-2 border border-border rounded-md bg-background"
                    value={contactForm.category}
                    onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account & Profile</option>
                    <option value="attendance">Attendance</option>
                    <option value="salary">Salary & Payroll</option>
                    <option value="leave">Leave Management</option>
                    <option value="reports">Reports</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail. Include any error messages or steps you took."
                  rows={6}
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>We typically respond within 24 hours</span>
                </div>
                <Button type="submit" className="gap-2 bg-gradient-primary">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-4 text-center">
              <CheckCircle className="h-8 w-8 text-success flex-shrink-0" />
              <div>
                <h3 className="font-semibold">System Status: All Systems Operational</h3>
                <p className="text-sm text-muted-foreground">
                  All services are running normally. Last updated: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};