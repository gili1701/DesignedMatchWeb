import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { UserRole } from '../../types';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CANDIDATE);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await register(email, password, name, role);
      
      showToast(
        role === UserRole.MATCHMAKER 
          ? 'Registration successful! Your account is pending approval by an administrator.' 
          : 'Registration successful!', 
        'success'
      );
      
      if (role === UserRole.CANDIDATE) {
        navigate('/candidate/profile');
      } else if (role === UserRole.MATCHMAKER) {
        navigate('/pending-approval');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        general: 'Registration failed. Please try again.',
      });
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-primary-800">Create Your Account</h1>
        <p className="text-neutral-600 mt-2">Join HeartMatch to find your perfect match</p>
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
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              fullWidth
              leftIcon={<User size={18} />}
              required
            />

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
              helperText="Must be at least 6 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              fullWidth
              leftIcon={<Lock size={18} />}
              required
            />

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                I'm registering as a
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.CANDIDATE)}
                  className={`py-2 px-4 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    role === UserRole.CANDIDATE
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.MATCHMAKER)}
                  className={`py-2 px-4 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    role === UserRole.MATCHMAKER
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Matchmaker
                </button>
              </div>
              {role === UserRole.MATCHMAKER && (
                <p className="mt-1 text-xs text-amber-600">
                  Note: Matchmaker accounts require approval from an administrator.
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button type="submit" fullWidth loading={isLoading}>
              Create Account
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;