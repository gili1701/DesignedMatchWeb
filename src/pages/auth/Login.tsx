import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || '/';

  const validate = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(email, password);
      showToast('Login successful!', 'success');
      
      // Navigate to the previous page or dashboard
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: 'Invalid email or password',
      });
      showToast('Login failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login functions
  const loginAsAdmin = async () => {
    setEmail('admin@example.com');
    setPassword('password123');
    try {
      await login('admin@example.com', 'password123');
      navigate('/admin');
      showToast('Logged in as Admin', 'success');
    } catch (error) {
      showToast('Login failed', 'error');
    }
  };

  const loginAsMatchmaker = async () => {
    setEmail('matchmaker@example.com');
    setPassword('password123');
    try {
      await login('matchmaker@example.com', 'password123');
      navigate('/matchmaker');
      showToast('Logged in as Matchmaker', 'success');
    } catch (error) {
      showToast('Login failed', 'error');
    }
  };

  const loginAsCandidate = async () => {
    setEmail('candidate@example.com');
    setPassword('password123');
    try {
      await login('candidate@example.com', 'password123');
      navigate('/candidate');
      showToast('Logged in as Candidate', 'success');
    } catch (error) {
      showToast('Login failed', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-primary-800">Welcome Back</h1>
        <p className="text-neutral-600 mt-2">Sign in to your HeartMatch account</p>
      </div>

      <Card>
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              fullWidth
              leftIcon={<Mail size={18} />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              fullWidth
              leftIcon={<Lock size={18} />}
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              className="mt-2"
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">Demo Accounts</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={loginAsAdmin}
              className="text-xs py-2 px-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={loginAsMatchmaker}
              className="text-xs py-2 px-3 bg-violet-50 text-violet-700 rounded-md hover:bg-violet-100 transition-colors"
            >
              Matchmaker Demo
            </button>
            <button
              type="button"
              onClick={loginAsCandidate}
              className="text-xs py-2 px-3 bg-pink-50 text-pink-700 rounded-md hover:bg-pink-100 transition-colors"
            >
              Candidate Demo
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Create one now
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;