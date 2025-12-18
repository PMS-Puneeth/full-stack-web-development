import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const Layout = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <div className="text-royal-dark min-h-screen flex flex-col font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-royal-dark/95 shadow-xl backdrop-blur-sm border-b-4 border-royal-gold">
                <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center max-w-7xl gap-4">
                    <Link to="/" className="cursor-pointer flex items-center gap-3 text-decoration-none group">
                        <img src="/logo.png" alt="Voyage Karunadu Logo" className="w-24 h-24 object-contain group-hover:scale-110 transition drop-shadow-md" />
                        <div className="flex flex-col">
                            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
                                Voyage <span className="text-royal-gold">Karunadu</span>
                            </h1>
                            <span className="text-xs text-gray-300 tracking-widest uppercase">The Royal Experience</span>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-8 font-semibold text-gray-300">
                        <Link to="/about" className="hover:text-royal-gold transition hover:underline underline-offset-4">About the Kingdom</Link>
                        <Link to="/contact" className="hover:text-royal-gold transition hover:underline underline-offset-4">Royal Support</Link>
                    </nav>

                    <div>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="hidden md:inline font-semibold text-royal-gold">Welcome, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm border border-royal-gold text-royal-gold font-bold px-6 py-2 rounded-full hover:bg-royal-gold hover:text-white transition uppercase tracking-wider"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-royal-gold text-white font-bold py-2 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition uppercase tracking-wider text-sm"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-6 max-w-7xl flex-grow relative z-10">
                <Outlet context={{ user, setUser }} />
            </main>

            {/* Footer */}
            <footer className="bg-royal-dark text-white p-12 mt-12 border-t-8 border-royal-gold relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-royal-base rounded-full opacity-20"></div>

                <div className="container mx-auto text-center max-w-7xl relative z-10">
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <div className="w-2 h-2 bg-royal-gold rounded-full"></div>
                        <h4 className="text-3xl font-serif font-bold text-white">Voyage Karunadu</h4>
                        <div className="w-2 h-2 bg-royal-gold rounded-full"></div>
                    </div>
                    <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto font-light leading-relaxed">
                        Experience the majesty of Karnataka. From the golden ruins of Hampi to the misty peaks of Coorg, embark on a journey fit for royalty.
                    </p>
                    <div className="flex justify-center gap-8 text-sm font-semibold text-royal-gold tracking-widest uppercase">
                        <Link to="/about" className="hover:text-white transition">Heritage</Link>
                        <Link to="/contact" className="hover:text-white transition">Contact</Link>
                    </div>
                    <div className="mt-8 border-t border-gray-800 pt-8">
                        <p className="text-xs text-gray-600">&copy; 2025 Karnataka Tourism. Designed with Royal Standards.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
