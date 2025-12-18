import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ItineraryPlanner = ({ destinationId, destinationName }) => {
    const { user } = useOutletContext();
    const [days, setDays] = useState(3);
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/ai-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destinationId, days: parseInt(days) })
            });
            const data = await res.json();
            if (data.success) {
                setPlan(data);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    if (!user) {
        return (
            <div className="bg-royal-dark text-white p-8 rounded-xl shadow-2xl text-center border border-royal-gold">
                <span className="text-4xl">👑</span>
                <h3 className="text-2xl font-bold text-royal-gold mb-2 mt-4">Royal Planner Access Restricted</h3>
                <p className="mb-6 text-gray-300">Login to unlock our exclusive AI itinerary curator for {destinationName}.</p>
                <Link to="/login" className="bg-royal-gold text-white font-bold py-2 px-6 rounded-full hover:bg-yellow-600 transition">
                    Login to Access
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl border-t-8 border-royal-base">
            <h3 className="text-3xl font-bold text-royal-base mb-2">Plan your {destinationName} Trip</h3>
            <p className="text-gray-600 mb-6">Select duration and let our Royal AI customize your days.</p>

            <div className="flex items-center gap-4 mb-8">
                <div className="flex-grow">
                    <label className="block text-gray-700 font-bold mb-2">Number of Days</label>
                    <select
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        className="w-full p-3 border-2 border-royal-gold/30 rounded-lg focus:border-royal-gold focus:outline-none bg-royal-cream"
                    >
                        {[1, 2, 3, 4, 5, 6, 7].map(d => <option key={d} value={d}>{d} Days</option>)}
                    </select>
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="mt-6 bg-royal-base text-white font-bold py-3 px-8 rounded-lg hover:bg-royal-dark transition shadow-lg disabled:opacity-70"
                >
                    {loading ? 'Curating...' : 'Generate Plan ✨'}
                </button>
            </div>

            {plan && (
                <div className="space-y-6 mt-8 border-t border-gray-100 pt-8 animate-fade-in">
                    <div className="p-4 bg-royal-light border border-royal-base/20 rounded text-royal-dark">
                        <p className="italic">"{plan.note}"</p>
                    </div>

                    <div className="space-y-4">
                        {plan.plan.map((day, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-4 items-start"
                            >
                                <div className="bg-royal-gold text-white font-bold w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center shadow-md">
                                    Day {day.day}
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex-grow">
                                    <h4 className="font-bold text-lg text-royal-base">☀️ Morning: {day.activity}</h4>
                                    <h4 className="font-bold text-lg text-royal-dark mt-2">🌙 Evening: {day.evening}</h4>
                                    <div className="mt-3 pt-3 border-t border-gray-100 text-sm flex justify-between items-center">
                                        <span className="text-gray-500">Stay at: <span className="font-semibold text-royal-base">{day.stay.name}</span></span>
                                        <span className="text-royal-gold font-bold">{day.stay.price}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItineraryPlanner;
