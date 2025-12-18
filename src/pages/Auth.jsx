import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            navigate('/');
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 mb-12 fade-in">
            <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[500px]">
                {/* Image Side */}
                <div className="relative hidden md:block">
                    <img src="/images/mysore.png" alt="Royal Login" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-royal-dark/60 flex items-center justify-center p-8 text-center">
                        <div>
                            <h3 className="text-3xl font-serif font-bold text-royal-gold mb-2">Welcome Back</h3>
                            <p className="text-gray-200">Your royal journey awaits.</p>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-center text-royal-base mb-6 font-serif">Royal Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-royal-dark text-sm font-bold mb-2">Email</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold bg-royal-cream/30" placeholder="king@kingdom.com" />
                        </div>
                        <div>
                            <label className="block text-royal-dark text-sm font-bold mb-2">Password</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold bg-royal-cream/30" placeholder="••••••••" />
                        </div>
                        <button type="submit" className="w-full bg-royal-base text-white font-bold py-3 rounded-lg hover:bg-royal-dark transition shadow-lg tracking-wide uppercase mt-4">Login</button>
                    </form>
                    <p className="mt-6 text-center text-gray-600 text-sm">
                        New here? <Link to="/register" className="text-royal-gold font-bold hover:underline">Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            navigate('/');
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 mb-12 fade-in">
            <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[500px]">
                {/* Form Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                    <h2 className="text-3xl font-bold text-center text-royal-base mb-6 font-serif">Join the Kingdom</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-royal-dark text-sm font-bold mb-2">Name</label>
                            <input type="text" required value={name} onChange={e => setName(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold bg-royal-cream/30" placeholder="Prince/Princess Name" />
                        </div>
                        <div>
                            <label className="block text-royal-dark text-sm font-bold mb-2">Email</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold bg-royal-cream/30" placeholder="email@kingdom.com" />
                        </div>
                        <div>
                            <label className="block text-royal-dark text-sm font-bold mb-2">Password</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold bg-royal-cream/30" placeholder="••••••••" />
                        </div>
                        <button type="submit" className="w-full bg-royal-gold text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition shadow-lg tracking-wide uppercase mt-4">Register</button>
                    </form>
                    <p className="mt-6 text-center text-gray-600 text-sm">
                        Already have an account? <Link to="/login" className="text-royal-base font-bold hover:underline">Login</Link>
                    </p>
                </div>

                {/* Image Side */}
                <div className="relative hidden md:block order-1 md:order-2">
                    <img src="/images/hampi.png" alt="Royal Register" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-royal-base/50 flex items-center justify-center p-8 text-center">
                        <div>
                            <h3 className="text-3xl font-serif font-bold text-white mb-2">Start Your Voyage</h3>
                            <p className="text-royal-cream">Unlock exclusive itineraries today.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
