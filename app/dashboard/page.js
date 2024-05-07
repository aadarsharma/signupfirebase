'use client'
import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import app from '../../config.js';
import Image from 'next/image';

function Dashboard() {
    const auth = getAuth(app);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [cards, setCards] = useState([
        { id: 1, title: 'Rocket Science', description: 'Covers fundamentals, design, construction, and operation of rockets.', image: '/rocket.png' },
        { id: 2, title: 'Astro Physics', description: 'Covers theories of space, time, energy, and the cosmos.', image: '/atom.png' },
        { id: 3, title: 'Artificial Intelligence', description: 'Covers machine learning, neural networks, and AI applications.', image: '/ai.png' },
        { id: 4, title: 'Quantum Mechanics', description: 'Covers quantum theory, wave-particle duality, and quantum computing.', image: '/rocket.png' },
        { id: 5, title: 'Space Exploration', description: 'Covers history, missions, and future of space exploration.', image: '/atom.png' },
        { id: 6, title: 'Mars Colonization', description: 'Covers challenges, opportunities, and future of Mars colonization.', image: '/1.jpg' }
    ]);
    const containerRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) {
                router.push('/login');
            } else {
                setUser(user);
            }
        });
        return () => unsubscribe();
    }, [auth, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    }

    const scrollLeft = () => {
        containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
    };
    
    const scrollRight = () => {
        containerRef.current.scrollLeft += containerRef.current.offsetWidth;
    };

    return (
        <div className='flex flex-col h-screen bg-gray-900 text-white'>
            <nav className='bg-gray-800 p-4 flex justify-between items-center'>
                <Image src='/Frame 4-1.png' alt='Signup Image' width={80} height={80}/>
                <div>
                    <button onClick={scrollLeft} className='text-lg mx-2 bg-gray-700 hover:bg-gray-600 p-2 rounded'>{"<"}</button>
                    <button onClick={scrollRight} className='text-lg bg-gray-700 hover:bg-gray-600 p-2 rounded'>{" >"}</button>
                </div>
                <a href='/' className='text-xl font-bold text-cyan-300'>Sign Out</a>
            </nav>
            <div className='flex-grow p-4'>
                <h2 className='text-2xl font-bold mb-6'>Popular Topics 🔥</h2>
                <div className='flex items-center gap-4 overflow-hidden'>
                    <div ref={containerRef} className='flex gap-4 overflow-x-auto'>
                        {cards.map(card => (
                            <div key={card.id} className='min-w-[300px] bg-gray-800 shadow-md rounded-lg p-4 flex flex-col items-center'>
                                <Image src={card.image} alt={card.title} width={100} height={100} />
                                <h3 className='text-lg font-semibold mt-2'>{card.title}</h3>
                                <p className='text-gray-400'>{card.description}</p>
                                <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Read</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
