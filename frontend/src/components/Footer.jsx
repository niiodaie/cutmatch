import React from 'react';
import { Instagram, Twitter, Youtube, Music } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Music, label: 'TikTok', href: '#' },
    { icon: Twitter, label: 'X (Twitter)', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' }
  ];

  const footerLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              CutMatch
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              The global platform for inclusive hairstyle discovery. Find your perfect look, 
              connect with skilled stylists, and express your unique identity.
            </p>
            <div className="text-sm text-gray-400">
              Powered by <span className="text-purple-400 font-semibold">Visnec Nexus</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Language & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            
            {/* Language Selector */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Language</label>
              <Select defaultValue="en">
                <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="en" className="text-white hover:bg-gray-700">
                    🇺🇸 English
                  </SelectItem>
                  <SelectItem value="fr" className="text-white hover:bg-gray-700">
                    🇫🇷 Français
                  </SelectItem>
                  <SelectItem value="sw" className="text-white hover:bg-gray-700">
                    🇰🇪 Kiswahili
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Follow Us</label>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Button
                      key={social.label}
                      variant="ghost"
                      size="sm"
                      className="p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => window.open(social.href, '_blank')}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="sr-only">{social.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} CutMatch. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm">
            Made with ❤️ for the global hair community
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

