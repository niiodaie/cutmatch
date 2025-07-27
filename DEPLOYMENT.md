# CutMatch Deployment Guide

This guide provides step-by-step instructions for deploying the CutMatch mobile application and its backend infrastructure.

## 📋 Pre-Deployment Checklist

### Required Accounts & Services
- [ ] Expo Developer Account
- [ ] Apple Developer Account (iOS)
- [ ] Google Play Console Account (Android)
- [ ] Supabase Account
- [ ] Google Analytics Account
- [ ] Domain name (optional, for custom branding)

### Required Tools
- [ ] Node.js 18+ installed
- [ ] Expo CLI installed (`npm install -g @expo/cli`)
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Git installed and configured

## 🗄️ Backend Deployment (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a project name: `cutmatch-production`
3. Select a region closest to your target users
4. Generate a strong database password

### 2. Set Up Database Schema

1. Navigate to the SQL Editor in your Supabase dashboard
2. Copy the contents of `backend/supabase/schema.sql`
3. Execute the SQL to create tables, policies, and functions
4. Verify all tables are created successfully

### 3. Configure Authentication

1. Go to Authentication > Settings
2. Enable email authentication
3. Configure email templates (optional)
4. Set up OAuth providers if needed (Google, Apple)
5. Configure redirect URLs:
   - `https://cutmatch.app` (production website)
   - `exp://` (for Expo development)

### 4. Set Up Row Level Security

The schema includes RLS policies, but verify they're active:
1. Go to Authentication > Policies
2. Ensure all tables have appropriate policies
3. Test with a sample user account

### 5. Configure Storage (Optional)

If you plan to store user photos:
1. Go to Storage and create a bucket named `user-photos`
2. Set up policies for authenticated users
3. Configure image transformations if needed

## 📱 Mobile App Deployment

### 1. Environment Configuration

Create production environment file:
```bash
# frontend/.env.production
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
EXPO_PUBLIC_GA4_API_SECRET=your-api-secret
```

### 2. Update App Configuration

Edit `frontend/app.json`:
```json
{
  "expo": {
    "name": "CutMatch",
    "slug": "cutmatch",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/icons/app-icon-purple-updated.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./src/assets/icons/splash-icon-purple.png",
      "resizeMode": "contain",
      "backgroundColor": "#6A0DAD"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.visnec.cutmatch",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/icons/app-icon-purple-updated.png",
        "backgroundColor": "#6A0DAD"
      },
      "package": "com.visnec.cutmatch",
      "versionCode": 1
    },
    "web": {
      "favicon": "./src/assets/icons/app-icon-purple-updated.png"
    },
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    }
  }
}
```

### 3. EAS Build Configuration

Create `frontend/eas.json`:
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
    "production": {
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://your-project.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "your-anon-key",
        "EXPO_PUBLIC_GA4_MEASUREMENT_ID": "G-XXXXXXXXXX",
        "EXPO_PUBLIC_GA4_API_SECRET": "your-api-secret"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 4. Build the App

```bash
cd cutmatch-project/frontend

# Login to EAS
eas login

# Configure the project
eas build:configure

# Build for both platforms
eas build --platform all --profile production
```

### 5. Submit to App Stores

#### iOS App Store
```bash
# Submit to App Store Connect
eas submit --platform ios

# Or manually upload the .ipa file to App Store Connect
```

Required for iOS submission:
- App Store Connect account
- App privacy policy URL
- App description and keywords
- Screenshots for different device sizes
- App review information

#### Google Play Store
```bash
# Submit to Google Play Console
eas submit --platform android

# Or manually upload the .aab file to Google Play Console
```

Required for Android submission:
- Google Play Console account
- App privacy policy URL
- App description and keywords
- Screenshots for different device sizes
- Content rating questionnaire

## 📊 Analytics Setup

### Google Analytics 4

1. Create a new GA4 property at [analytics.google.com](https://analytics.google.com)
2. Set up a mobile app data stream
3. Copy the Measurement ID and API Secret
4. Add them to your environment variables
5. Configure custom events in GA4 dashboard

### Custom Events Tracked
- App launches and sessions
- Photo uploads and analysis
- Style interactions (view, favorite, share)
- User profile updates
- Error tracking

## 🔧 Production Optimizations

### Performance
- Enable Hermes JavaScript engine for Android
- Optimize image assets and use WebP format
- Implement lazy loading for heavy components
- Use React.memo for expensive renders

### Security
- Validate all environment variables
- Implement certificate pinning
- Use secure storage for sensitive data
- Enable ProGuard for Android builds

### Monitoring
- Set up Sentry for error tracking
- Configure performance monitoring
- Set up uptime monitoring for backend
- Create alerts for critical metrics

## 🚀 CI/CD Pipeline (Optional)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy CutMatch
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Build and submit
        run: |
          cd frontend
          eas build --platform all --profile production --non-interactive
          eas submit --platform all --profile production --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

## 📱 Testing Before Launch

### Pre-Launch Testing Checklist
- [ ] Test on multiple device sizes (phone, tablet)
- [ ] Test on both iOS and Android
- [ ] Verify all translations work correctly
- [ ] Test camera and photo upload functionality
- [ ] Verify sharing features work
- [ ] Test offline functionality
- [ ] Verify analytics events are firing
- [ ] Test user registration and authentication
- [ ] Verify data persistence and sync

### Beta Testing
1. Use Expo's internal distribution for team testing
2. Set up TestFlight for iOS beta testing
3. Use Google Play Internal Testing for Android
4. Collect feedback and iterate

## 🔄 Post-Launch Maintenance

### Monitoring
- Monitor app store reviews and ratings
- Track analytics for user behavior
- Monitor backend performance and errors
- Set up alerts for critical issues

### Updates
- Plan regular feature updates
- Monitor for security vulnerabilities
- Keep dependencies up to date
- Respond to app store review feedback

### Scaling
- Monitor database performance
- Plan for increased user load
- Consider CDN for image assets
- Optimize API response times

## 📞 Support & Troubleshooting

### Common Issues

**Build Failures**
- Check environment variables are set correctly
- Verify all dependencies are compatible
- Clear Expo cache: `expo r -c`

**Authentication Issues**
- Verify Supabase URL and keys
- Check redirect URLs are configured
- Ensure RLS policies are correct

**Performance Issues**
- Profile app with Flipper or React DevTools
- Check for memory leaks
- Optimize image sizes and formats

### Getting Help
- Expo Documentation: [docs.expo.dev](https://docs.expo.dev)
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- React Native Documentation: [reactnative.dev](https://reactnative.dev)

---

**Deployment completed successfully!** 🚀

Your CutMatch app is now ready to help users discover their perfect hairstyle across the globe.

