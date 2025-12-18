import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';

export const BookingOptions = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useOutletContext();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/destinations/${id}`)
            .then(res => res.json())
            .then(data => setPlace(data))
            .catch(() => navigate('/'));
    }, [id, navigate]);

    const handleOption = (type) => {
        if (!user) {
            // Very simple redirect logic for now
            navigate('/login');
        } else {
            navigate(`/${type}/${id}`);
        }
    }

    if (!place) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto text-center pt-10">
            <h2 className="text-3xl font-bold mb-2">Plan your trip to <span className="text-royal-gold">{place.name}</span></h2>
            <p className="text-gray-500 mb-10">Select a category to view options</p>

            <div className="grid md:grid-cols-2 gap-8">
                <div onClick={() => handleOption('guides')}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-2 border-t-4 border-blue-500 group">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition">
                        <span className="text-4xl">🧑‍🏫</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Book a Guide</h3>
                    <p className="text-gray-500">Find local experts to show you hidden gems.</p>
                </div>

                <div onClick={() => handleOption('hotels')}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-2 border-t-4 border-green-500 group">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition">
                        <span className="text-4xl">🏨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Book a Stay</h3>
                    <p className="text-gray-500">Cozy rooms and resorts for a relaxing night.</p>
                </div>
            </div>
            <Link to={`/detail/${id}`} className="block mt-12 text-gray-500 hover:text-royal-base underline">Cancel</Link>
        </div>
    );
};

export const BookingList = ({ type }) => {
    const { id } = useParams();
    const { user } = useOutletContext();
    const [items, setItems] = useState([]);
    const [place, setPlace] = useState(null);
    const [modal, setModal] = useState({ show: false, message: '' });

    useEffect(() => {
        const fetchData = async () => {
            const placeRes = await fetch(`http://localhost:3000/api/destinations/${id}`);
            const placeData = await placeRes.json();
            setPlace(placeData);

            const itemsRes = await fetch(`http://localhost:3000/api/${type}/${id}`);
            const itemsData = await itemsRes.json();
            setItems(itemsData);
        };
        fetchData();
    }, [id, type]);

    const handleBook = async (item) => {
        const res = await fetch('http://localhost:3000/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: type === 'guides' ? 'Guide' : 'Room',
                itemName: item.name,
                userEmail: user.email
            })
        });
        const data = await res.json();
        if (data.success) {
            setModal({
                show: true,
                message: `You have requested to book ${item.name}. Confirmation email sent to ${user.email}.`
            });
        }
    };

    if (!place) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            {modal.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Booking Request Sent!</h3>
                        <p className="text-gray-600 mb-6">{modal.message}</p>
                        <button onClick={() => setModal({ show: false })} className="bg-royal-base text-white font-semibold py-2 px-6 rounded-lg">Awesome!</button>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold capitalize">{type} in {place.name}</h2>
                <Link to={`/booking-options/${id}`} className="text-gray-500 hover:text-black">← Back</Link>
            </div>

            <div className="grid gap-6">
                {items.length === 0 && <p className="text-center text-gray-500">No items found.</p>}

                {items.map(item => (
                    <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-100">
                        {type === 'guides' ? (
                            <img src={item.image || "https://placehold.co/300x300/e2e8f0/64748b?text=Guide"} className="w-24 h-24 rounded-full object-cover border-4 border-royal-gold shadow-md" />
                        ) : (
                            <img src={item.image || "https://placehold.co/300x200/e2e8f0/64748b?text=Room"} className="w-full md:w-48 h-48 object-cover rounded-lg shadow-sm" />
                        )}

                        <div className="flex-grow text-center md:text-left">
                            <h4 className="text-xl font-bold text-royal-base">{item.name}</h4>
                            {type === 'guides' ? (
                                <>
                                    <p className="text-sm text-gray-500 mb-1">Languages: {item.lang}</p>
                                    <p className="text-sm text-gray-500">Experience: {item.exp}</p>
                                </>
                            ) : (
                                <p className="text-gray-500 text-sm mt-1">Contact: {item.contact}</p>
                            )}
                        </div>

                        <div className="text-center min-w-[150px]">
                            <p className="text-xl font-bold text-royal-gold mb-2">{item.price}</p>
                            <button onClick={() => handleBook(item)}
                                className="bg-royal-base text-white px-6 py-2 rounded-lg hover:bg-royal-dark transition shadow-lg w-full">
                                {type === 'guides' ? 'Contact' : 'Book Room'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
