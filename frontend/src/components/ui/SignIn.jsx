// ui/SignIn.jsx
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold text-center">Sign In to CutMatch</h2>

      <form onSubmit={handleEmailSignIn} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="input w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="btn w-full">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <button onClick={handleGoogleSignIn} className="btn w-full bg-red-600 text-white">
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;
