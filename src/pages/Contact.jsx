import React, { useState } from 'react';

const Contact = () => {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    }

    return (
        <div className="max-w-5xl mx-auto fade-in mt-12 mb-12">
            <div className="grid md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden bg-white">
                {/* Image Section */}
                <div className="relative hidden md:block">
                    <img src="/images/badami.png" alt="Royal Support" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-royal-dark/40 flex items-center justify-center p-8">
                        <div className="text-white text-center">
                            <h3 className="text-4xl font-serif font-bold mb-4">Royal Assistance</h3>
                            <p className="text-royal-cream text-lg">Our ministers are ready to serve you.</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-8 md:p-12 border-t-8 border-royal-gold">
                    <h2 className="text-3xl font-extrabold text-royal-base mb-2 text-center font-serif">Get in Touch</h2>
                    <p className="text-gray-500 text-center mb-8">Have a query about your royal journey?</p>

                    {sent ? (
                        <div className="bg-green-50 p-8 rounded-xl text-center text-green-800 border border-green-200">
                            <p className="font-bold text-2xl mb-2">Message Sent! 🕊️</p>
                            <p>We'll send a royal decree shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-royal-dark font-bold mb-2">Your Name</label>
                                <input type="text" required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-royal-gold outline-none bg-royal-cream/30" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-royal-dark font-bold mb-2">Message</label>
                                <textarea required rows="4" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-royal-gold outline-none bg-royal-cream/30" placeholder="How can we help?"></textarea>
                            </div>
                            <button className="w-full bg-royal-base text-white font-bold py-3 rounded-lg hover:bg-royal-dark transition shadow-lg tracking-wide uppercase">
                                Send Message
                            </button>
                        </form>
                    )}

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm space-y-1">
                        <p className="font-semibold text-royal-base">Voyage Karunadu Dept of Tourism</p>
                        <p>Bangalore, Karnataka, India</p>
                        <p>contact@voyagekarunadu.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
