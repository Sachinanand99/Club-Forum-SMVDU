# Club Forum (SMVDU) 🚩

**Club Forum** is a lightweight web application to manage university clubs, listings and events. It provides club pages, coordinator management, user authentication (Google & local), posting/listing features, comments, and email notifications — built for SMVDU mini-projects and demo purposes.

---

## 🚀 Features

- Club management (create, edit, view, follow)
- Listings / posts with images
- User authentication: Google OAuth + local (email/password)
- Role-based actions: admins and coordinators
- Cloud media storage via Cloudinary
- Email notifications using Nodemailer
- Server-side validation with Joi
- EJS server-rendered views with responsive layout

---

## 🧰 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Passport (Google OAuth + passport-local)
- Cloudinary (file uploads)
- Nodemailer (email)
- EJS templates, CSS, client JS

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (16+)
- MongoDB (local or Atlas)

### Install

```bash
git clone <repo-url>
cd Club-Forum-SMVDU
npm install
```

### Environment variables

Create a `.env` file in the project root with the following variables:

- `ATLASDB_URL` — MongoDB connection URI (used in production)
- `MONGO_URL` — (optional) local DB URL used by `init/init.js` when seeding (default: mongodb://localhost:27017/clubs)
- `SECRET` — session secret for express-session
- `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` — Cloudinary credentials
- `EMAIL_USER`, `EMAIL_PASS` — SMTP user and password for sending emails
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — Google OAuth credentials
- `ADMIN_LIST` — comma-separated list of admin emails (e.g., `a@x.com,b@y.com`)

### Seed sample data (optional)

```bash
npm run init
# runs init/init.js to populate sample clubs & listings (development only)
```

### Run the app

- Development (auto-reload):

```bash
npm run dev
```

- Production:

```bash
npm run prod
```

Open http://localhost:8080 to view the app.

---

## 🗂 Project Structure

- `app.js` — main Express app
- `Controllers/` — route handlers and business logic
- `models/` — Mongoose schemas (Club, Listing, Comment, User)
- `routes/` — Express routes (auth, clubs, listings)
- `views/` — EJS templates and layout
- `public/` — static assets (CSS, JS, images)
- `init/` — helper to seed sample data
- `utils/` — helpers (emailSender, error handling)

---

## 🧪 Scripts

- `npm run dev` — start dev server with nodemon
- `npm run prod` — start production server
- `npm run init` — seed DB with sample data (for development)

---

## 👥 Authors

Charanpreet Kaur, Koripalli Venkata Ramani, Sachin Anand

---

**License:** ISC
