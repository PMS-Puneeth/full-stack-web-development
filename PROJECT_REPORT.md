# Voyage Karunadu - Project Report & Developer Guide

**For College Presentation & Future Development**

---

## 1. Project Overview
**Voyage Karunadu** is a modern, interactive web application designed to promote tourism in Karnataka. Unlike static websites, it offers a "Royal" user experience, strict authentication, and a context-aware **AI Itinerary Planner**.

### Tech Stack
-   **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion (Animations).
-   **Backend**: Node.js, Express.js.
-   **Database**: In-Memory Mock Database (Simulation of a real DB).
-   **Design**: Custom "Royal" Theme (Purple/Gold), Playfair Display Typography.

---

## 2. Key Logical Components (How it Works)

### A. Authentication (The Gatekeeper)
*File: `server/index.js` & `src/pages/Auth.jsx`*
-   **Logic**: We use a "Mock DB" (`db.users` array) in the server's memory.
-   **Register**: When a user signs up, we check if the email exists. If not, we push the user object to the array.
-   **Login**: We search the array for a matching email/password combination.
-   **State**: On the frontend, if login is successful, we store the user object in `localStorage`. This keeps the user logged in even if they refresh.

### B. The AI Itinerary Planner (The Brain)
*File: `server/index.js` (Endpoint `/api/ai-plan`) & `src/components/ItineraryPlanner.jsx`*
-   **Concept**: Instead of using expensive real AI (like ChatGPT) which costs money per call, we implemented a **Rule-Based Recommendation Engine**.
-   **Logic**:
    1.  The frontend sends the `destinationId` (e.g., 'hampi') and `days` (e.g., 3).
    2.  The backend looks up the destination's features.
    3.  It mathematically cycles through activities and evening plans to ensure a unique-looking schedule for up to 7 days.
    4.  It assigns a hotel from the database.
-   **Security**: The frontend component checks if `user` exists. If not, it shows the "Restricted Access" card.

### C. Royal Design System
*File: `tailwind.config.js` & `src/index.css`*
-   We defined custom colors: `royal-base` (Purple), `royal-gold`, `royal-cream`.
-   We enforced the `Playfair Display` font for all headers to give that "Palace" vibe.

---

## 3. How to Modify the Code (For Future Work)

### Changing Background Images or Destination Data
**Location**: `server/index.js` -> `db.destinations` object.
-   **To Update**: Change the `image` URL property for any destination. You can use Unsplash URLs or local image paths.
-   **To Add a Place**: Copy the `hampi` block, paste it, rename the key to `newplace`, and update details.

### Connecting a Real Database (MongoDB)
Currently, data is lost when the server restarts. To make it permanent:
1.  Install Mongoose: `npm install mongoose`.
2.  Connect to MongoDB Atlas.
3.  Replace `db.users` array with `User.find()` and `User.create()` calls.
4.  Replace `db.destinations` with a Mongoose Schema.

### Sending Real Emails
Currently, we only log "Booking request..." to the terminal console.
**To Fix**:
1.  Install Nodemailer: `npm install nodemailer`.
2.  In the `/api/book` endpoint:
    ```javascript
    let transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: '...', pass: '...' } });
    await transporter.sendMail({ to: userEmail, subject: 'Booking Confirmed', text: '...' });
    ```

---

## 4. College Presentation Script (Cheatsheet)

**Slide 1: Introduction**
"Good morning. My project is **Voyage Karunadu**, a next-gen tourism platform dedicated to the heritage of Karnataka."

**Slide 2: The Problem**
"Existing tourism sites are static, boring, and overwhelming. They don't help you *plan*, they just dump information."

**Slide 3: The Solution**
"We built a **Royal Experience**. Key features include:
1.  **AI Planner**: Generates day-wise itineraries instantly.
2.  **Context Aware**: It knows *where* you are looking (e.g., Hampi) and plans accordingly.
3.  **Modern Tech**: Built on React for speed and Express for a robust backend."

**Slide 4: Technical Highlight**
"We implemented a custom Authentication flow and a REST API backend. The design system uses Tailwind CSS for a consistent 'Royal' theme across the app."

**Slide 5: Conclusion**
"Voyage Karunadu isn't just a website; it's a digital guide that brings Karnataka's history to life."

---

## 5. Folder Structure
-   `/src`: Frontend React Code.
    -   `/pages`: Individual views (Home, Detail, etc).
    -   `/components`: Reusable parts (Layout, Planner).
-   `/server`: Backend Node.js Code.
    -   `index.js`: The API Server and Mock Database.
