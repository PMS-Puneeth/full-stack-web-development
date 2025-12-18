import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

// --- MOCK DATABASE ---
const db = {
    users: [], // { name, email, password }
    destinations: {
        hampi: {
            id: 'hampi',
            name: 'Hampi',
            tagline: 'The Forgotten Empire',
            desc: 'A UNESCO World Heritage site featuring the stunning ruins of the Vijayanagara Empire.',
            image: '/images/hampi.png',
            features: ['Virupaksha Temple', 'Stone Chariot', 'Tungabhadra River']
        },
        mysore: {
            id: 'mysore',
            name: 'Mysore',
            tagline: 'City of Palaces',
            desc: 'Known for its glittering royal heritage and magnificent monuments and buildings.',
            image: '/images/mysore.png',
            features: ['Mysore Palace', 'Chamundi Hill', 'Brindavan Gardens']
        },
        coorg: {
            id: 'coorg',
            name: 'Coorg',
            tagline: 'Scotland of India',
            desc: 'Wake up to the smell of coffee and misty hills in this beautiful hill station.',
            image: '/images/coorg.png',
            features: ['Abbey Falls', 'Raja Seat', 'Dubare Elephant Camp']
        },
        gokarna: {
            id: 'gokarna',
            name: 'Gokarna',
            tagline: 'Land of Palm Trees & Peace',
            desc: 'A temple town with pristine beaches, offering a relaxed alternative to Goa.',
            image: '/images/gokarna.png',
            features: ['Om Beach', 'Mahabaleshwar Temple', 'Kudle Beach']
        },
        badami: {
            id: 'badami',
            name: 'Badami',
            tagline: 'Red Sandstone Cliffs',
            desc: 'Famous for its rock-cut structural temples located in a ravine at the foot of a outcrop.',
            image: '/images/badami.png',
            features: ['Cave Temples', 'Agastya Lake', 'Bhutanatha Group']
        },
        hassan: {
            id: 'hassan',
            name: 'Hassan',
            tagline: 'Temple Architecture Capital',
            desc: 'Home to the magnificent Hoysala architecture of Belur and Halebidu.',
            image: '/images/hassan.png?v=5', //  User Provided Image
            features: ['Belur Chennakeshava', 'Halebidu Hoysaleswara', 'Shravanabelagola']
        }
    },
    guides: {
        hampi: [
            { id: 1, name: 'Ramesh K', lang: 'English, Kannada', exp: '10 Years', price: '₹1500/day', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=600' },
            { id: 2, name: 'Sarah J', lang: 'English, French', exp: '5 Years', price: '₹2000/day', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600' }
        ],
        mysore: [
            { id: 3, name: 'Ganesh M', lang: 'Kannada, Hindi', exp: '15 Years', price: '₹1200/day', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600' }
        ],
        coorg: [
            { id: 4, name: 'Bopanna', lang: 'Kodava, English', exp: '8 Years', price: '₹1800/day', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600' }
        ],
        gokarna: [
            { id: 5, name: 'Shiva', lang: 'English, Hindi', exp: '4 Years', price: '₹1000/day', image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=600' }
        ],
        badami: [
            { id: 6, name: 'Basava', lang: 'Kannada, Telugu', exp: '12 Years', price: '₹1400/day', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=600' }
        ],
        hassan: [
            { id: 7, name: 'Vishnu', lang: 'English, Kannada', exp: '15 Years', price: '₹1600/day', image: 'https://images.unsplash.com/photo-1616140801646-7c2a715fe35c?q=80&w=600' }
        ]
    },
    hotels: {
        hampi: [
            { id: 1, name: 'Heritage Resort', rating: '4.5', price: '₹4500', contact: 'stay@hampiheritage.com', image: 'https://images.unsplash.com/photo-1590490360182-137d62341e1d?q=80&w=600' },
            { id: 2, name: 'Rocky Guesthouse', rating: '3.8', price: '₹1200', contact: 'rocky@guesthouse.com', image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?q=80&w=600' }
        ],
        mysore: [
            { id: 3, name: 'Royal Orchid', rating: '5.0', price: '₹6000', contact: 'book@royalorchid.com', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600' }
        ],
        coorg: [
            { id: 4, name: 'Coffee Estate Stay', rating: '4.8', price: '₹3500', contact: 'relax@coorgestate.com', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600' }
        ],
        gokarna: [
            { id: 5, name: 'Namaste Cafe Stay', rating: '4.2', price: '₹2000', contact: 'om@namaste.com', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600' }
        ],
        badami: [
            { id: 6, name: 'Clarks Inn', rating: '4.0', price: '₹3000', contact: 'info@clarksbadami.com', image: 'https://images.unsplash.com/photo-1560668962-d48e0ccec345?q=80&w=600' }
        ],
        hassan: [
            { id: 7, name: 'Hoysala Village Resort', rating: '4.6', price: '₹5500', contact: 'book@hoysalavillage.com', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600' }
        ]
    }
};

// --- ENDPOINTS ---

// Get all destinations
app.get('/api/destinations', (req, res) => {
    // Return array of destinations
    res.json(Object.values(db.destinations));
});

// Get specific destination
app.get('/api/destinations/:id', (req, res) => {
    const dest = db.destinations[req.params.id];
    if (dest) res.json(dest);
    else res.status(404).json({ error: 'Destination not found' });
});

// Get guides for a destination
app.get('/api/guides/:destId', (req, res) => {
    const guides = db.guides[req.params.destId] || [];
    res.json(guides);
});

// Get hotels for a destination
app.get('/api/hotels/:destId', (req, res) => {
    const hotels = db.hotels[req.params.destId] || [];
    res.json(hotels);
});

// Login (Real Mock)
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = db.users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({
            success: true,
            user: { name: user.name, email: user.email }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials. Please register first.' });
    }
});

// Register (Real Mock)
app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const exists = db.users.find(u => u.email === email);
    if (exists) return res.status(400).json({ error: 'User already exists' });

    // Save user
    db.users.push({ name, email, password });

    res.json({
        success: true,
        user: { name, email }
    });
});

// Send Booking Request (Mock)
app.post('/api/book', (req, res) => {
    const { type, itemName, userEmail } = req.body;
    console.log(`Booking request for ${type} "${itemName}" from ${userEmail}`);
    // Simulate processing
    setTimeout(() => {
        res.json({ success: true, message: 'Booking request sent successfully' });
    }, 1000);
});

// AI Itinerary Planner (Destination Specific)
app.post('/api/ai-plan', (req, res) => {
    const { destinationId, days } = req.body;

    const dest = db.destinations[destinationId];
    if (!dest) return res.status(404).json({ error: 'Destination not found' });

    // Generate day-wise plan for THIS destination
    let plan = [];

    // Mock features rotation
    const activities = [
        `Visit ${dest.features[0]} at sunrise`,
        `Explore local markets near ${dest.features[1]}`,
        `Sunset walk by ${dest.features[2]}`,
        `Heritage walk guided tour`,
        `Relaxing evening with local cuisine`
    ];

    for (let i = 1; i <= days; i++) {
        // Find a hotel (mock)
        const hotel = db.hotels[dest.id] ? db.hotels[dest.id][0] : { name: 'Local Stay', price: '₹1000' };

        plan.push({
            day: i,
            activity: activities[(i - 1) % activities.length],
            evening: activities[(i + 1) % activities.length],
            stay: hotel
        });
    }

    const note = `A royal itinerary curated specifically for your stay in ${dest.name}.`;

    res.json({ success: true, plan, note });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
