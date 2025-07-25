# CutMatch Deployment Guide

This guide provides step-by-step instructions for deploying the CutMatch application across multiple platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository access
- Accounts for deployment platforms:
  - Expo/EAS (for mobile app)
  - Vercel (for landing page)
  - Render (for backend API)
  - Supabase (for database and auth)

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Set Up Database Schema

Run this SQL in the Supabase SQL editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name TEXT,
  hair_type TEXT,
  preferences JSONB DEFAULT '{}',
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Barber reviews table
CREATE TABLE barber_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  barber_id TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved styles table
CREATE TABLE saved_styles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  style_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE barber_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_styles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON barber_reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert reviews" ON barber_reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON barber_reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON barber_reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Saved styles policies
CREATE POLICY "Users can view own saved styles" ON saved_styles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved styles" ON saved_styles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved styles" ON saved_styles
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_barber_reviews_barber_id ON barber_reviews(barber_id);
CREATE INDEX idx_barber_reviews_user_id ON barber_reviews(user_id);
CREATE INDEX idx_saved_styles_user_id ON saved_styles(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. Configure Authentication

1. Go to Authentication > Settings in Supabase
2. Configure email templates
3. Set up any OAuth providers (Google, etc.)
4. Configure redirect URLs for password reset

## 🚀 Backend API Deployment (Render)

### 1. Prepare Repository

Ensure your `api/` directory contains:
- `package.json`
- `server.js`
- `routes/` directory
- `utils/` directory

### 2. Deploy to Render

1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure:
   - **Build Command**: `cd api && npm install`
   - **Start Command**: `cd api && npm start`
   - **Environment**: Node.js

### 3. Set Environment Variables

In Render dashboard, add these environment variables:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-supabase-service-key
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://cutmatch.visnec.ai
```

### 4. Test Deployment

Once deployed, test these endpoints:
- `GET /health` - Health check
- `GET /api/suggestions/styles` - Get styles
- `GET /api/barbers/nearby?lat=40.7128&lng=-74.0060` - Get nearby barbers

## 🌐 Landing Page Deployment (Vercel)

### 1. Prepare Site Directory

Ensure your `site/` directory contains:
- `index.html`
- `legal/privacy.html`
- `legal/terms.html`
- `vercel.json`

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
cd site/
npm install -g vercel
vercel --prod
```

#### Option B: GitHub Integration
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `site/`
4. Deploy

### 3. Configure Custom Domain

1. In Vercel dashboard, go to your project
2. Go to Settings > Domains
3. Add `cutmatch.visnec.ai`
4. Configure DNS records as instructed

### 4. Set Environment Variables

```
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
AFFILIATE_TAG=cutmatch-20
```

## 📱 Mobile App Deployment (Expo/EAS)

### 1. Install EAS CLI

```bash
npm install -g @expo/eas-cli
eas login
```

### 2. Configure EAS

```bash
cd cutmatch/
eas build:configure
```

This creates `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### 3. Set Environment Variables

Create `.env` file:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
EXPO_PUBLIC_AMAZON_AFFILIATE_TAG=cutmatch-20
EXPO_PUBLIC_API_BASE_URL=https://cutmatch-api.onrender.com
```

### 4. Build for App Stores

#### Android (Google Play)
```bash
eas build --platform android --profile production
```

#### iOS (App Store)
```bash
eas build --platform ios --profile production
```

### 5. Submit to App Stores

#### Google Play Store
```bash
eas submit --platform android
```

#### Apple App Store
```bash
eas submit --platform ios
```

## 🔧 Configuration Files

### app.json (Expo Configuration)

Update with your actual values:

```json
{
  "expo": {
    "name": "CutMatch",
    "slug": "cutmatch",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/icons/app-icon-purple.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./src/assets/images/splash-light.png",
      "resizeMode": "contain",
      "backgroundColor": "#6A0DAD"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.cutmatch.app",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.cutmatch.app",
      "versionCode": 1
    },
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    }
  }
}
```

## 📊 Analytics Setup

### Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (GA_MEASUREMENT_ID)
3. Add to environment variables
4. Configure goals and conversions

### Monitoring

Set up monitoring for:
- API uptime (Render)
- Website performance (Vercel)
- App crashes (Expo)
- Database performance (Supabase)

## 🧪 Testing Deployment

### 1. Test API Endpoints

```bash
# Health check
curl https://cutmatch-api.onrender.com/health

# Get styles
curl https://cutmatch-api.onrender.com/api/suggestions/styles

# Get nearby barbers
curl "https://cutmatch-api.onrender.com/api/barbers/nearby?lat=40.7128&lng=-74.0060"
```

### 2. Test Landing Page

- Visit https://cutmatch.visnec.ai
- Test email signup form
- Check privacy/terms links
- Verify mobile responsiveness

### 3. Test Mobile App

- Install on test devices
- Test photo upload
- Verify API connectivity
- Test location services
- Check analytics tracking

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Check API CORS configuration
2. **Environment Variables**: Verify all required vars are set
3. **Build Failures**: Check Node.js versions and dependencies
4. **Database Errors**: Verify Supabase connection and RLS policies

### Logs and Debugging

- **Render**: Check deployment logs in dashboard
- **Vercel**: View function logs and analytics
- **Expo**: Use `expo logs` for debugging
- **Supabase**: Check logs in dashboard

## 📈 Post-Deployment

### 1. Monitor Performance

- Set up alerts for API downtime
- Monitor app store reviews
- Track user analytics
- Monitor database usage

### 2. Regular Updates

- Update dependencies monthly
- Deploy security patches promptly
- Monitor for breaking changes
- Update app store listings

### 3. Scaling Considerations

- Monitor API rate limits
- Consider CDN for static assets
- Plan for database scaling
- Implement caching strategies

## 📞 Support

For deployment issues:
- Check logs in respective platforms
- Review environment variables
- Verify API connectivity
- Test with minimal configurations

---

**Note**: This deployment guide assumes you have the necessary accounts and permissions for all platforms. Adjust configurations based on your specific requirements and constraints.

