# CutMatch - AI-Powered Hairstyle Recommendation App

CutMatch is a mobile-first AI-powered hairstyle suggestion app that helps users discover their ideal hairstyle based on face shape, hair type, and cultural preferences. The app is globally inclusive, multilingual, location-aware, and includes monetization features.

## 🚀 Features

- **AI-Powered Recommendations**: Get 3-5 personalized hairstyle suggestions based on facial analysis
- **Inclusive & Diverse**: Supports all hair types including curly, coily, straight, wavy, kinky, and protective styles
- **Photo Upload/Capture**: Take or upload photos using expo-camera and expo-image-picker
- **Multilingual Support**: Available in English, French, and Spanish with automatic language detection
- **Geo-Location**: Find nearby barbershops and salons with community ratings
- **Community Reviews**: Read and leave reviews for local barbers and stylists
- **Mobile-First Design**: Optimized for iOS and Android with React Native and Expo
- **Monetization Ready**: Affiliate integration, Pro subscriptions, and ad placements

## 💰 Monetization Features

### Free Tier
- 3 AI hairstyle suggestions per photo upload
- Basic affiliate product recommendations
- Ad-supported experience
- Community reviews and barber search

### Pro Tier ($4.99/month or $49.99/year)
- Ad-free experience
- Premium curated product bundles
- Save unlimited favorite styles
- Priority AI styling engine
- Exclusive styling tips and tutorials

### Affiliate Integration
- Amazon affiliate links for hair care products
- "Try With This Look" product suggestions
- Care kits and styling tools recommendations
- Commission tracking ready

## 📱 Screens

1. **Splash Screen**: Welcome screen with app branding
2. **Upload Screen**: Photo capture and upload functionality
3. **Analyzing Screen**: AI processing with visual feedback
4. **Suggestions Screen**: Display of personalized hairstyle recommendations with ads/products
5. **Detail Screen**: Detailed view of selected hairstyle with affiliate products
6. **Barber List Screen**: Nearby barbershops and salons
7. **Barber Detail Screen**: Detailed barber information with reviews

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation
- **Internationalization**: react-i18next
- **Location Services**: expo-location
- **Image Handling**: expo-image-picker, expo-camera
- **Authentication**: Supabase Auth (ready for integration)
- **Database**: Supabase (schema ready)
- **Analytics**: Google Analytics (placeholder)
- **Ads**: Google AdSense (placeholder)
- **Styling**: StyleSheet (React Native)

## 📁 Project Structure

```
cutmatch/
├── src/
│   ├── screens/           # App screens
│   ├── components/        # Reusable UI components
│   ├── utils/            # Utilities and helpers
│   ├── locales/          # Translation files
│   └── assets/           # Images and icons
├── site/                 # Landing page
├── legal/               # Privacy and terms documents
├── store-copy/          # App store descriptions
└── README.md
```

## 🎨 Design System

- **Primary Color**: Purple (#6A0DAD)
- **Secondary Color**: White (#FFFFFF)
- **Accent Colors**: Gold (#DAA520), Black (#000000)
- **Typography**: System fonts with clear hierarchy
- **Icons**: Custom app icons in purple/white and gold/black variants

## 🌍 Internationalization

The app supports multiple languages with automatic detection:
- English (en)
- French (fr)
- Spanish (es)

Translation files are located in `src/locales/` and use react-i18next for implementation.

## 📍 Location Features

- Automatic location detection using expo-location
- Mock nearby barber data with realistic information
- Distance calculation and sorting
- Integration ready for Google Places API or Yelp Fusion API

## 🤖 AI Engine

The mock AI style engine (`src/utils/mock-style-engine.js`) includes:
- Diverse hairstyle database with 8+ styles
- Face shape and hair type simulation
- Cultural and inclusive styling options
- Realistic style metadata (maintenance, descriptions, etc.)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cutmatch
```

2. Install dependencies:
```bash
npm install
```

3. Install Expo CLI (if not already installed):
```bash
npm install -g @expo/cli
```

4. Start the development server:
```bash
npm start
```

5. Run on specific platforms:
```bash
npm run android  # Android
npm run ios      # iOS (requires macOS)
npm run web      # Web browser
```

## 📱 Testing

The app can be tested using:
- Expo Go app on physical devices
- iOS Simulator (macOS required)
- Android Emulator
- Web browser for basic functionality

## 🌐 Landing Page

A responsive landing page is included in the `site/` directory featuring:
- Modern design with CutMatch branding
- Feature highlights and benefits
- Email signup form
- Privacy and terms links
- Mobile-responsive layout

## 📄 Legal Documents

Complete privacy policy and terms of service are provided in both Markdown and HTML formats:
- `legal/privacy.md` and `site/legal/privacy.html`
- `legal/terms.md` and `site/legal/terms.html`

## 🏪 App Store Assets

Ready-to-use app store materials in `store-copy/`:
- App title
- Short description (for app store listings)
- Full description (detailed feature list)
- App icons (1024x1024) in multiple variants

## 🔮 Future Enhancements

Based on the updated requirements, future versions could include:

### Authentication & User Accounts
- Supabase Auth integration
- User profiles and preferences
- Guest mode option

### Affiliate Integration
- Product recommendations for each hairstyle
- Amazon affiliate links
- Shopping integration

### Monetization
- Free tier with basic features
- Premium subscription with advanced features
- In-app purchases

### Enhanced Features
- Real-time barber booking
- Advanced AI with more style options
- Social sharing capabilities
- Favorite styles saving

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Email: support@cutmatch.app
- Website: cutmatch.visnec.ai

## 📄 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

- Diverse hairstyle imagery from Unsplash
- React Native and Expo communities
- Inclusive design principles and accessibility guidelines

---

**Note**: This app promotes inclusive beauty standards and celebrates all hair types and ethnicities. CutMatch may earn commissions from affiliate links used in the app.



## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Git

### Local Development Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd cutmatch
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install Expo CLI (if not already installed):**
```bash
npm install -g @expo/cli
```

4. **Start the development server:**
```bash
npm start
```

5. **Run on specific platforms:**
```bash
npm run android  # Android
npm run ios      # iOS (requires macOS)
npm run web      # Web browser
```

## 🌐 Deployment Guide

### 1. Expo App Deployment

#### For Development/Testing:
```bash
# Build for development
npx expo build:android
npx expo build:ios
```

#### For Production:
```bash
# Configure app.json with your credentials
# Build for app stores
npx expo build:android --type app-bundle
npx expo build:ios --type archive

# Or use EAS Build (recommended)
npm install -g @expo/eas-cli
eas build --platform android
eas build --platform ios
```

#### Environment Variables for Expo:
Create `.env` file:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
EXPO_PUBLIC_AMAZON_AFFILIATE_TAG=your_affiliate_tag
```

### 2. Vercel Deployment (Landing Page)

#### Setup:
1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy landing page:**
```bash
cd site/
vercel --prod
```

#### Vercel Configuration:
Create `site/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/index.html"
    },
    {
      "src": "/legal/(.*)",
      "dest": "/legal/$1"
    }
  ]
}
```

#### Environment Variables for Vercel:
```bash
vercel env add GOOGLE_ANALYTICS_ID
vercel env add AFFILIATE_TAG
```

### 3. Render Deployment (Backend API)

#### Setup:
1. **Create `api/` directory structure:**
```
api/
├── package.json
├── server.js
├── routes/
│   ├── suggestions.js
│   └── barbers.js
└── utils/
    └── supabase.js
```

2. **Create `api/package.json`:**
```json
{
  "name": "cutmatch-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "@supabase/supabase-js": "^2.0.0",
    "dotenv": "^16.0.0"
  }
}
```

3. **Deploy to Render:**
- Connect your GitHub repository
- Set build command: `cd api && npm install`
- Set start command: `cd api && npm start`

#### Environment Variables for Render:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
NODE_ENV=production
PORT=10000
```

### 4. Supabase Setup

#### Database Schema:
```sql
-- Users table (handled by Supabase Auth)
-- Additional profile data
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name TEXT,
  hair_type TEXT,
  preferences JSONB,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Barber reviews
CREATE TABLE barber_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  barber_id TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved styles
CREATE TABLE saved_styles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  style_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE barber_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_styles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

#### Supabase Configuration:
1. Create new project at https://supabase.com
2. Run the schema SQL in the SQL editor
3. Configure authentication providers
4. Set up storage buckets if needed
5. Get your project URL and anon key

## 📊 Analytics & Monitoring

### Google Analytics Setup:
1. Create GA4 property
2. Add tracking ID to environment variables
3. Implement tracking in `src/utils/analytics.js`

### Error Monitoring:
Consider integrating Sentry for error tracking:
```bash
npm install @sentry/react-native
```

## 🔧 Configuration Files

### app.json (Expo Configuration):
```json
{
  "expo": {
    "name": "CutMatch",
    "slug": "cutmatch",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/icons/app-icon-purple.png",
    "splash": {
      "image": "./src/assets/images/splash-light.png",
      "resizeMode": "contain",
      "backgroundColor": "#6A0DAD"
    },
    "platforms": ["ios", "android", "web"],
    "ios": {
      "bundleIdentifier": "com.cutmatch.app",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.cutmatch.app",
      "versionCode": 1
    },
    "web": {
      "favicon": "./src/assets/icons/app-icon-purple.png"
    }
  }
}
```

## 🧪 Testing

### Local Testing:
```bash
# Run tests
npm test

# Test on devices
npm run android
npm run ios
```

### Production Testing:
1. Test Expo app on physical devices
2. Verify landing page on Vercel
3. Test API endpoints on Render
4. Confirm Supabase integration

## 🚀 Go-Live Checklist

### Pre-Launch:
- [ ] Configure all environment variables
- [ ] Test all deployment targets
- [ ] Verify affiliate links work
- [ ] Test payment integration (Pro tier)
- [ ] Confirm analytics tracking
- [ ] Review privacy policy and terms
- [ ] Test on multiple devices

### Launch:
- [ ] Deploy to app stores (iOS App Store, Google Play)
- [ ] Launch landing page
- [ ] Activate API backend
- [ ] Enable analytics
- [ ] Monitor error logs

### Post-Launch:
- [ ] Monitor user feedback
- [ ] Track conversion metrics
- [ ] Optimize based on analytics
- [ ] Plan feature updates

## 📞 Support & Maintenance

### Monitoring:
- Expo: Monitor build status and crashes
- Vercel: Check deployment logs and performance
- Render: Monitor API uptime and response times
- Supabase: Monitor database performance and auth

### Updates:
- Regular dependency updates
- Security patches
- Feature releases
- Bug fixes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

---

**Note**: This app promotes inclusive beauty standards and celebrates all hair types and ethnicities. CutMatch may earn commissions from affiliate links used in the app.

