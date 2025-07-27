-- CutMatch Database Schema for Supabase

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table for user preferences
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  skin_tone TEXT,
  hair_type TEXT,
  preferred_length TEXT,
  cultural_background TEXT,
  gender_expression TEXT,
  language_preference TEXT DEFAULT 'en',
  enable_affirmations BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT profiles_user_id_unique UNIQUE(user_id)
);

-- Create favorites table for saved hairstyles
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  style_id TEXT NOT NULL,
  style_name TEXT NOT NULL,
  style_data JSONB NOT NULL,
  personal_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT favorites_user_style_unique UNIQUE(user_id, style_id)
);

-- Create shared_styles table for style sharing
CREATE TABLE IF NOT EXISTS shared_styles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  share_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  style_data JSONB NOT NULL,
  personal_note TEXT,
  view_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- Create analytics table for usage tracking
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_created_at ON favorites(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_favorites_style_id ON favorites(style_id);
CREATE INDEX IF NOT EXISTS idx_shared_styles_share_id ON shared_styles(share_id);
CREATE INDEX IF NOT EXISTS idx_shared_styles_created_at ON shared_styles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shared_styles_public ON shared_styles(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);

-- Row Level Security (RLS) Policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id AND auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Favorites policies
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can insert own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can update own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can delete own favorites" ON favorites;

CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own favorites" ON favorites
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Shared styles policies
ALTER TABLE shared_styles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view shared styles" ON shared_styles;
DROP POLICY IF EXISTS "Users can insert own shared styles" ON shared_styles;
DROP POLICY IF EXISTS "Users can update own shared styles" ON shared_styles;
DROP POLICY IF EXISTS "Users can delete own shared styles" ON shared_styles;

CREATE POLICY "Anyone can view public shared styles" ON shared_styles
  FOR SELECT USING (is_public = true AND expires_at > NOW());

CREATE POLICY "Users can view own shared styles" ON shared_styles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert shared styles" ON shared_styles
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own shared styles" ON shared_styles
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own shared styles" ON shared_styles
  FOR DELETE USING (auth.uid() = user_id);

-- Analytics events policies
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert analytics events" ON analytics_events;
DROP POLICY IF EXISTS "Users can view own analytics events" ON analytics_events;

CREATE POLICY "Anyone can insert analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own analytics events" ON analytics_events
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Admin policy for analytics (optional - for admin dashboard)
CREATE POLICY "Service role can view all analytics" ON analytics_events
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

-- Functions and Triggers

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_favorites_updated_at ON favorites;
CREATE TRIGGER update_favorites_updated_at BEFORE UPDATE ON favorites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count for shared styles
CREATE OR REPLACE FUNCTION increment_shared_style_views(share_id_param TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE shared_styles 
  SET view_count = view_count + 1 
  WHERE share_id = share_id_param AND is_public = true AND expires_at > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired shared styles
CREATE OR REPLACE FUNCTION cleanup_expired_shared_styles()
RETURNS VOID AS $$
BEGIN
  DELETE FROM shared_styles WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user profile with defaults
CREATE OR REPLACE FUNCTION get_user_profile(user_id_param UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  full_name TEXT,
  skin_tone TEXT,
  hair_type TEXT,
  preferred_length TEXT,
  cultural_background TEXT,
  gender_expression TEXT,
  language_preference TEXT,
  enable_affirmations BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    COALESCE(p.full_name, '') as full_name,
    COALESCE(p.skin_tone, 'medium') as skin_tone,
    COALESCE(p.hair_type, 'wavy') as hair_type,
    COALESCE(p.preferred_length, 'medium') as preferred_length,
    COALESCE(p.cultural_background, 'mixed') as cultural_background,
    COALESCE(p.gender_expression, 'neutral') as gender_expression,
    COALESCE(p.language_preference, 'en') as language_preference,
    COALESCE(p.enable_affirmations, true) as enable_affirmations,
    p.created_at,
    p.updated_at
  FROM profiles p
  WHERE p.user_id = user_id_param;
  
  -- If no profile exists, return defaults
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT 
      user_id_param as id,
      user_id_param as user_id,
      '' as full_name,
      'medium' as skin_tone,
      'wavy' as hair_type,
      'medium' as preferred_length,
      'mixed' as cultural_background,
      'neutral' as gender_expression,
      'en' as language_preference,
      true as enable_affirmations,
      NOW() as created_at,
      NOW() as updated_at;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Sample data for testing (optional)
-- This would typically be run separately in development

/*
-- Insert sample user profile (replace with actual user ID)
INSERT INTO profiles (id, user_id, full_name, skin_tone, hair_type, preferred_length, cultural_background, gender_expression, language_preference) 
VALUES (
  'sample-user-id',
  'sample-user-id',
  'Sample User',
  'medium',
  'curly',
  'medium',
  'mixed',
  'neutral',
  'en'
) ON CONFLICT (user_id) DO NOTHING;

-- Insert sample favorite style
INSERT INTO favorites (user_id, style_id, style_name, style_data, personal_note)
VALUES (
  'sample-user-id',
  'afro-fade-1',
  'Short Afro Fade',
  '{"name": "Short Afro Fade", "category": "Fade", "maintenance": "Low", "length": "Short", "difficulty": "Easy", "confidence": 92}',
  'Ask for a 2 on the sides, blend to natural on top'
) ON CONFLICT (user_id, style_id) DO NOTHING;
*/

