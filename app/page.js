'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../config.js';
import Dashboard from './dashboard/page.js';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const signUpWithEmailAndPasswordHandler = async (event) => {
        event.preventDefault();
        const auth = getAuth(app);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    const signInWithGoogle = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='flex flex-col lg:flex-row min-h-screen'>
            <div className='lg:w-1/2 relative hidden lg:block'>
                <Image src='/1.jpg' alt='Signup Image' layout='fill' objectFit='cover'/>
            </div>
            <div className='lg:w-1/2 w-full flex items-center justify-center bg-gray-900 p-12'>
                <div className='max-w-md w-full space-y-8'>
                    <div className='text-center'>
                        <h1 className='text-xl font-light text-white mb-6'>Journey to a trillion miles starts from here!!</h1>
                        <h2 className='text-4xl font-bold text-white mb-8'>Sign Up</h2>
                    </div>
                    {!showSignupForm && (
                        <button
                            onClick={() => setShowSignupForm(true)}
                            className="relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign up with Email
                        </button>
                    )}
                    {showSignupForm && (
                        <form className='space-y-6' onSubmit={signUpWithEmailAndPasswordHandler}>
                            <input 
                                type='email'
                                id='email'
                                autoComplete='email'
                                required
                                placeholder='Email'
                                value={email}
                                onChange={handleEmailChange}
                                className='appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:border-blue-500 focus:bg-gray-700'
                            />
                            <input 
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                required
                                placeholder='Password'
                                value={password}
                                onChange={handlePasswordChange}
                                className='appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:border-blue-500 focus:bg-gray-700'
                            />
                            <button 
                            
                                type="submit"
                                className="relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <div>
                                    <Image className='pr-2' src='/Message-1.png' alt='Email Logo' width={30} height={30}/>
                                </div>
                                <div>
                                    Sign up with Email
                                </div>
                            </button>
                        </form>
                    )}
                    <div className="mt-4">
                        <button 
                            onClick={signInWithGoogle}
                            className="relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <div>
                                <Image className='pr-2' src='/google.png' alt='Google Logo' width={30} height={30}/>
                            </div>
                            <div>Sign up with Google</div>
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
                </div>
            </div>
            <div className='lg:w-1/2 relative block lg:hidden'>
                <Image src='/1.jpg' alt='Signup Image' layout='fill' objectFit='cover'/>
            </div>
        </div>
    );
};

export default Signup;