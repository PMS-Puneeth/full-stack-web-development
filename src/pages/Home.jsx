import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/destinations')
            .then(res => res.json())
            .then(data => {
                setDestinations(data);
                setLoading(false);
            })
            .catch(err => console.error("Failed to fetch destinations", err));
    }, []);

    // Hero Carousel Logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroImages = [
        "/images/mysore.png",
        "/images/hampi.png",
        "/images/coorg.png"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroImages.length);
        }, 5000); // 5 seconds
        return () => clearInterval(timer);
    }, []);

    if (loading) return <div className="text-center mt-20 text-royal-base font-bold text-xl">Loading Royal Destinations...</div>;

    return (
        <div>
            {/* Hero Carousel */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-12 border-4 border-royal-gold group">
                {heroImages.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentSlide ? 1 : 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <img src={img} className="w-full h-full object-cover" alt="Karnataka Scenery" />
                        <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/90 via-transparent to-transparent"></div>
                    </motion.div>
                ))}

                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-left">
                    <motion.h2
                        key={currentSlide}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-extrabold mb-2 text-white font-serif drop-shadow-lg"
                    >
                        Experience Royal Karnataka
                    </motion.h2>
                    <p className="text-xl md:text-2xl text-royal-gold font-light drop-shadow-md">One State, Many Worlds.</p>
                </div>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {heroImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-royal-gold w-8' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((place, index) => (
                    <motion.div
                        key={place.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] cursor-pointer overflow-hidden border-b-4 border-royal-gold group"
                    >
                        <Link to={`/detail/${place.id}`}>
                            <div className="overflow-hidden h-48">
                                <img src={place.image} alt={place.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            </div>
                            <div className="p-5">
                                <h4 className="text-2xl font-bold text-royal-base mb-1">{place.name}</h4>
                                <p className="text-gray-500 text-sm font-medium">{place.tagline}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;
