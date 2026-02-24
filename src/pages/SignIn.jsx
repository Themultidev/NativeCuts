import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service');
  const style = searchParams.get('style');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <>
    
    <div className="bg-black min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-[url('/lastank.jpg')] bg-cover bg-center">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-2xl">
        <Link to="/" className="text-amber-500 text-sm hover:underline">&larr; Back to Home</Link>

        <h1 className="text-3xl font-extrabold text-white text-center mt-4">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>

        {service && style && (
          <p className="text-center text-sm text-gray-400 mt-2">
            Booking <span className="text-amber-500 font-semibold">{style}</span> — {service.replace('-', ' ')}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-500 focus:outline-none transition"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-500 focus:outline-none transition"
              placeholder="JohnDoe@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-500 focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-amber-500 text-black font-bold text-lg hover:bg-amber-400 transition"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-amber-500 font-semibold hover:underline">
              
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
    </>
  );
};

export default SignIn;
