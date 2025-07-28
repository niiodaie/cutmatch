# FaceUp - AI Hairstyle Recommendations

FaceUp is a modern web application that uses AI technology to analyze facial features and provide personalized hairstyle recommendations. Built with React, Tailwind CSS, and Framer Motion for a smooth, professional user experience.

## 🌟 Features

### Core Functionality
- **AI-Powered Analysis**: Upload photos for intelligent facial feature analysis
- **Personalized Recommendations**: Get hairstyle suggestions tailored to your unique features
- **Interactive Photo Upload**: Drag-and-drop or camera capture functionality
- **Preference Customization**: Set gender, hair type, and lifestyle preferences
- **Detailed Recommendations**: Each suggestion includes styling tips, difficulty level, and maintenance requirements

### User Experience
- **Modern UI/UX**: Clean, gradient-based design with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Authentication Flow**: Complete login and signup system with social login options
- **Progressive Enhancement**: Works without JavaScript for basic functionality

### Additional Pages
- **Hero Landing Page**: Engaging introduction with feature highlights
- **How to Use Guide**: Step-by-step instructions for best results
- **Subscription Plans**: Free vs Pro tier comparison
- **404 Error Page**: Helpful navigation when pages aren't found

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone or extract the project**
   ```bash
   cd faceup-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm run build
# or
npm run build
```

The built files will be in the `dist/` directory.

## 🏗️ Project Structure

```
faceup-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (shadcn/ui)
│   │   ├── Hero.jsx        # Landing page hero section
│   │   ├── RecommendationCard.jsx  # Hairstyle recommendation display
│   │   └── SocialLoginButtons.jsx  # Authentication components
│   ├── routes/             # Page components
│   │   ├── Recommend.jsx   # Main recommendation page
│   │   ├── Login.jsx       # User login page
│   │   ├── Signup.jsx      # User registration page
│   │   ├── Subscribe.jsx   # Subscription plans page
│   │   ├── HowToUse.jsx    # Usage instructions page
│   │   └── NotFound.jsx    # 404 error page
│   ├── lib/                # Utility libraries
│   │   ├── mockRecommendations.js  # Sample hairstyle data
│   │   └── aiPromptBuilder.js      # AI prompt construction utilities
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global styles and custom CSS
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── index.html              # HTML template
└── package.json            # Project dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Indigo gradient (#6366f1 to #8b5cf6)
- **Secondary**: Amber (#f59e0b)
- **Accent**: Pink (#ec4899)
- **Success**: Emerald (#10b981)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weight
- **UI Elements**: System font stack for optimal performance

### Components
- Built with shadcn/ui for consistency
- Custom animations using Framer Motion
- Responsive design with Tailwind CSS
- Accessible by default with proper ARIA labels

## 🔧 Technology Stack

### Frontend Framework
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **JavaScript**: ES6+ with modern syntax

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Framer Motion**: Smooth animations and transitions
- **Lucide Icons**: Beautiful, consistent icon set

### Development Tools
- **ESLint**: Code linting and quality checks
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefixing

## 🤖 AI Integration

### Mock Implementation
The current implementation uses mock data and simulated AI responses for development and demonstration purposes.

### AI Prompt Builder
- Constructs detailed prompts for AI services
- Includes user preferences and photo analysis
- Supports multiple prompt types (hairstyle, face shape, hair type)
- Validates input data before processing

### Recommendation Engine
- Filters suggestions based on user preferences
- Provides detailed styling information
- Includes difficulty and maintenance ratings
- Supports favorite and sharing functionality

### Future Integration
Ready for integration with real AI services:
- OpenAI GPT-4 Vision for image analysis
- Custom trained models for hairstyle recognition
- Real-time recommendation generation
- Advanced facial feature detection

## 📱 Features in Detail

### Photo Upload System
- **Multiple Input Methods**: Camera capture, file upload, drag-and-drop
- **Image Validation**: Checks file type and size
- **Preview Functionality**: Shows uploaded image before analysis
- **Error Handling**: Graceful handling of upload failures

### Recommendation Display
- **Rich Cards**: Detailed information for each hairstyle
- **Interactive Elements**: Favorite, share, and save functionality
- **Filtering Options**: Sort by difficulty, maintenance, or style type
- **Professional Tips**: Expert advice for each recommendation

### Authentication System
- **Social Login**: Google OAuth integration ready
- **Email/Password**: Traditional authentication flow
- **Form Validation**: Real-time validation with helpful error messages
- **Security Features**: Password strength indicator, remember me option

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for medium screens
- **Desktop Enhancement**: Full-featured experience on large screens
- **Touch-Friendly**: Large tap targets and gesture support

## 🔒 Security & Privacy

### Data Protection
- No personal photos stored permanently
- Client-side image processing when possible
- Secure authentication token handling
- GDPR-compliant data practices

### Best Practices
- Input sanitization and validation
- Secure API communication
- Error handling without data exposure
- Regular security dependency updates

## 🚀 Deployment

### Static Hosting
The application can be deployed to any static hosting service:
- **Vercel**: Automatic deployments from Git
- **Netlify**: Continuous deployment with form handling
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable cloud storage with CloudFront CDN

### Environment Variables
For production deployment, configure:
```env
VITE_API_BASE_URL=your-api-endpoint
VITE_GOOGLE_CLIENT_ID=your-google-oauth-id
VITE_ANALYTICS_ID=your-analytics-id
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Photo upload functionality
- [ ] Recommendation generation
- [ ] User authentication flow
- [ ] Responsive design on all devices
- [ ] Navigation between pages
- [ ] Form validation and error handling

### Automated Testing (Future)
- Unit tests for utility functions
- Component testing with React Testing Library
- End-to-end testing with Playwright
- Visual regression testing

## 🤝 Contributing

### Development Workflow
1. Create feature branch from main
2. Implement changes with proper testing
3. Update documentation as needed
4. Submit pull request with detailed description

### Code Standards
- Use ESLint configuration for consistent formatting
- Follow React best practices and hooks guidelines
- Write descriptive commit messages
- Include comments for complex logic

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For technical support or questions:
- Check the troubleshooting section below
- Review the How to Use guide in the application
- Contact the development team

## 🔧 Troubleshooting

### Common Issues

**Development server won't start**
- Ensure Node.js 18+ is installed
- Delete `node_modules` and reinstall dependencies
- Check for port conflicts (default: 5173)

**Images not uploading**
- Verify file size is under 10MB
- Check file format (JPG, PNG, WebP supported)
- Ensure browser permissions for camera access

**Styling issues**
- Clear browser cache and reload
- Check for Tailwind CSS compilation errors
- Verify all dependencies are installed

**Performance issues**
- Optimize images before upload
- Check browser developer tools for errors
- Ensure adequate device memory

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core UI implementation
- ✅ Mock AI integration
- ✅ Authentication flow
- ✅ Responsive design

### Phase 2 (Planned)
- Real AI service integration
- User profile management
- Favorite hairstyles storage
- Social sharing features

### Phase 3 (Future)
- Stylist marketplace integration
- Appointment booking system
- Advanced filtering options
- Mobile app development

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies.**

