import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ItineraryPlanner from '../components/ItineraryPlanner';

const Detail = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/api/destinations/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Not Found');
                return res.json();
            })
            .then(data => setPlace(data))
            .catch(() => navigate('/'));
    }, [id, navigate]);

    if (!place) return <div className="text-center mt-20 text-royal-base font-bold text-xl">Loading Royal Destination...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Link to="/" className="mb-6 flex items-center text-gray-600 hover:text-royal-gold font-semibold transition w-fit">
                ← Back to Kingdom Map
            </Link>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 md:h-96 mb-8 group border-4 border-royal-gold">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-base/90 to-transparent flex flex-col justify-end p-8">
                    <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-2 font-serif">{place.name}</h1>
                    <p className="text-royal-gold text-xl tracking-wide uppercase font-bold">{place.tagline}</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-royal-base">
                        <h3 className="text-3xl font-bold text-royal-base mb-4 font-serif">About the Heritage</h3>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6 font-light">{place.desc}</p>
                        <h4 className="font-bold text-royal-gold mb-4 text-xl border-b pb-2 border-gray-100">Key Highlights</h4>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {place.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-700">
                                    <span className="text-royal-gold">✦</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AI Planner Section */}
                    <ItineraryPlanner destinationId={place.id} destinationName={place.name} />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-royal-base to-royal-dark p-8 rounded-xl shadow-xl text-white text-center border-2 border-royal-gold">
                        <h3 className="text-3xl font-serif mb-4 text-royal-gold">Ready to Visit?</h3>
                        <p className="mb-8 opacity-90">Secure expert guides and royal stays for a seamless experience.</p>
                        <Link to={`/booking-options/${place.id}`}
                            className="block w-full bg-royal-gold text-white font-bold text-lg py-4 rounded-lg shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition">
                            Book Experiences
                        </Link>
                    </div>

                    <div className="bg-royal-cream p-6 rounded-xl border border-royal-gold/20">
                        <h4 className="font-bold text-royal-base mb-2">Did You Know?</h4>
                        <p className="text-sm text-gray-600 italic">Karnataka has the second highest number of nationally protected monuments in India, second only to Uttar Pradesh.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Detail;
