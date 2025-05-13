import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <Heart className="text-primary-200 w-32 h-32 mb-8" />
      <h1 className="text-4xl font-serif font-bold text-neutral-800 mb-4">Page Not Found</h1>
      <p className="text-lg text-neutral-600 max-w-md mb-8">
        We couldn't find the page you're looking for. The path to love can sometimes be winding!
      </p>
      <Link to="/">
        <Button icon={<Home size={18} />}>
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;