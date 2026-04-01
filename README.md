# Pandit Booking Platform

A full-stack ritual services management application built to connect users with trusted pandits for puja bookings and spiritual support.

As project lead, I guided the application design, implemented the backend API, and delivered a polished frontend experience using modern JavaScript technologies.

## Screenshots

Home Page  
![Home Page](frontend/public/images/Home_page.png)

Login Page  
![Login Page](frontend/public/images/Login_Page.png)

Pandit List  
![Pandit List](frontend/public/images/pandit lists.png)

Pandit Dashboard  
![Pandit Dashboard](frontend/public/images/pandit_dashboard%20(1).png)

## Key Features

- User authentication and authorization
- Browse pandits, view profiles, and request puja services
- Booking creation and management for logged-in users
- Pandit dashboard and profile handling
- Contact form for support and inquiries
- Seed data support for local development
- Secure password hashing, JWT authentication, and file upload handling

## Technology Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, React Router, Axios
- Styling: Bootstrap, custom CSS
- Utilities: bcrypt, jsonwebtoken, multer, nodemailer, sweetalert2

## Repository Structure

- `backend/` — Express API server, routes, controllers, models, middleware, and database seeding
- `frontend/` — React application, pages, components, API clients, and context logic

## Setup Instructions

### Backend

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the required configuration values:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
4. Seed sample data (optional):
   ```bash
   npm run seed
   ```
5. Start the backend server:
   ```bash
   npm run start
   ```

### Frontend

1. Open a terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the provided local URL in your browser.

## Available Scripts

### Backend
- `npm run start` — launch the backend with nodemon
- `npm run seed` — populate the database with seed data

### Frontend
- `npm run dev` — start Vite development server
- `npm run build` — build the production frontend
- `npm run preview` — preview the built frontend
- `npm run lint` — run ESLint checks

## Notes

- Ensure MongoDB is running locally or use a hosted MongoDB connection.
- Keep `.env` values secret and never commit them to version control.
- Update API base URLs in `frontend/src/api/axios.js` if the backend is hosted on a different origin.

## Project Leadership

This project is led by the core developer, responsible for architecture, implementation, and coordination across the backend and frontend layers.

---

If you want, I can also add a short `Project Overview` section or generate a `Deployment` guide next.