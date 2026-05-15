# Pandit Booking Platform

A full-stack ritual services management application built to connect users with trusted pandits for puja bookings and spiritual support.

As project lead, I guided the application design, implemented the backend API, and delivered a polished frontend experience using modern JavaScript technologies.
## Screenshots

### Home Page
![Home Page](frontend/public/images/Home_page.png)

### Login Page
![Login Page](frontend/public/images/Login_Page.png)

### Pandit List
![Pandit List](frontend/public/images/panditList1.png)

### User Dashboard
![User Dashboard](frontend/public/images/usersDashboard.png)

### User Bookings
![User Bookings](frontend/public/images/userbookings.png)

### Pandit Dashboard
![Pandit Dashboard](frontend/public/images/pandit_dashboard%20(1).png)

## Key Features

- User authentication and authorization
- Browse pandits, view profiles, and request puja services
- Booking creation and management for logged-in users
- Pandit dashboard and profile handling
- Contact form for support and inquiries
- AI-powered chatbot for user assistance and real-time support
- Seed data support for local development
- Secure password hashing, JWT authentication, and file upload handling

## Technology Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, React Router, Axios
- Styling: Bootstrap, custom CSS
- Utilities: bcrypt, jsonwebtoken, multer, nodemailer, sweetalert2

## Repository Structure

- `backend/` — Express API server, routes, controllers, models, middleware, and database seeding
- `frontend/` — React application, pages, compoments, API clients, and context logic

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

## Deployment Guide

### Backend Deployment
1. Choose a hosting platform (e.g., Heroku, Railway, Render, or AWS)
2. Set environment variables in your hosting platform:
   - `PORT` (usually set by platform)
   - `MONGO_URI` (MongoDB Atlas or hosted database)
   - `JWT_SECRET` (secure random string)
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` (for email service)
3. Deploy the backend code
4. Ensure the database is accessible from the deployed server

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy to a static hosting service (e.g., Vercel, Netlify, GitHub Pages)
3. Update API base URL in `frontend/src/api/axios.js` to point to your deployed backend
4. For Vercel deployment, the `vercel.json` file is already configured

### Environment Configuration
- Use environment variables for all sensitive data
- Never commit `.env` files to version control
- Test all features after deployment, especially email functionality and file uploads

## Notes

- Ensure MongoDB is running locally or use a hosted MongoDB connection.
- Keep `.env` values secret and never commit them to version control.
- Update API base URLs in `frontend/src/api/axios.js` if the backend is hosted on a different origin.
- For timezone-related issues, refer to `TIMEZONE_FIX_DOCUMENTATION.md`.

## Project Leadership

This project is led by the core developer, responsible for architecture, implementation, and coordination across the backend and frontend layers.
