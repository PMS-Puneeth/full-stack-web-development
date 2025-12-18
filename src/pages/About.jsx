import React from 'react';

const About = () => {
    return (
        <div className="max-w-6xl mx-auto fade-in mt-6 mb-12">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-extrabold text-royal-base mb-4 font-serif">The Soul of India</h2>
                <div className="w-32 h-1 bg-gradient-to-r from-royal-gold to-royal-base mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
                    <p>
                        <span className="font-bold text-royal-base text-2xl font-serif">Karnataka</span> is a land of diverse landscapes and rich cultural tapestry. From the majestic monuments of Hampi to the serene coffee plantations of Coorg, it offers something for every traveler.
                    </p>
                    <p>
                        Our design is inspired by the <span className="text-royal-gold font-bold">Royal Gold</span> and <span className="text-royal-base font-bold">Deep Purple</span> of the Mysore Wadeyars, representing royalty and wisdom.
                    </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-royal-gold rotate-2 hover:rotate-0 transition duration-500">
                    <img src="/images/mysore.png" alt="Mysore Palace" className="w-full h-64 object-cover transform hover:scale-110 transition duration-700" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-royal-cream p-8 rounded-2xl border-l-8 border-royal-base shadow-lg group hover:-translate-y-2 transition duration-300">
                    <div className="h-48 rounded-xl overflow-hidden mb-6">
                        <img src="/images/hampi.png" alt="Heritage" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                    <h3 className="font-bold text-2xl text-royal-base mb-3 font-serif">Heritage</h3>
                    <p className="text-gray-600">Home to two UNESCO World Heritage sites and hundreds of protected monuments reflecting the Chalukya, Hoysala, and Vijayanagara architectures.</p>
                </div>
                <div className="bg-royal-cream p-8 rounded-2xl border-l-8 border-royal-gold shadow-lg group hover:-translate-y-2 transition duration-300">
                    <div className="h-48 rounded-xl overflow-hidden mb-6">
                        <img src="/images/coorg.png" alt="Nature" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                    <h3 className="font-bold text-2xl text-royal-base mb-3 font-serif">Nature</h3>
                    <p className="text-gray-600">The Western Ghats, a biodiversity hotspot, runs through the state, offering lush green forests, waterfalls, and wildlife sanctuaries.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
