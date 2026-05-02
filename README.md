# StudentHub 🎓
A web-based platform for San Jose State University students to discover events, academic resources, and deals — all in one place.

## 👥 Team
- Arvin Andiappan
- Prabhjot Singh
- Rafael Caculba
- Ved Dabhi

**Course:** CMPE 131 - Software Engineering I  
**Professor:** Ishie Eswar  
**University:** San Jose State University

---

## 📋 About the Project
CampusHub allows SJSU students to:
- Browse current campus events
- Discover local deals and discounts
- Access academic resources
- View item locations on an interactive map
- Leave reviews and ratings
- Sign up and log in securely

---

## 🏗️ Architecture
CampusHub follows a **3-Tier Client-Server Architecture**:

```
User → Frontend (HTML/CSS/JS) → Backend (Node.js/Express) → Database (PostgreSQL)
```

- **Frontend** — HTML, CSS, JavaScript
- **Backend** — Node.js with Express
- **Database** — PostgreSQL

---

## 🚀 Getting Started

The live backend is accessible at:
https://studenthub-backend-rpn0.onrender.com

### For Local Development

**Prerequisites**
- [Node.js](https://nodejs.org/) (v18 or higher)
- Git

**Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Wayfleh/SJSU-Software-Engineering-Project.git
cd SJSU-Software-Engineering-Project
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Start the backend server**
```bash
npm run dev
```

4. **Open the frontend**
- Open `frontend/HTML/index.html` using VS Code with Live Server extension

## 📁 Project Structure

```
SJSU-Software-Engineering-Project/
├── frontend/
│   ├── HTML/          # All HTML pages
│   ├── assets/
│   │   ├── css/       # Stylesheets
│   │   ├── js/        # JavaScript files
│   │   ├── icons/     # Icon assets
│   │   └── images/    # Image assets
│   ├── data/          # JSON data files
│   └── guidelines/    # Project guidelines
├── backend/
│   └── src/
│       ├── controllers/   # Route logic (auth, items, reviews)
│       ├── routes/        # API route definitions
│       ├── middleware/     # Error handling
│       ├── config/        # Database config
│       ├── utils/         # Helper functions
│       ├── app.js         # Express app setup
│       └── server.js      # Server entry point
└── README.md
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in an existing user |

### Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| POST | `/api/items` | Add a new item (auth required) |
| DELETE | `/api/items/:id` | Remove an item (auth required) |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Get all reviews |
| POST | `/api/reviews` | Submit a review (auth required) |
| DELETE | `/api/reviews/:id` | Delete a review (auth required) |

---

## 🗺️ Features by Sprint

| Sprint | Focus | Key Features |
|--------|-------|-------------|
| Sprint 1 | Core Foundation | Database setup, backend API, navbar, item cards |
| Sprint 2 | Map & Interface | Google Maps integration, sorting, filtering |
| Sprint 3 | Authentication | User login/signup, password hashing, route protection |
| Sprint 4 | Reviews & Launch | Review system, testing, deployment, UI polish |

---

## 🔐 Security
- Passwords are hashed before being stored in the database
- Restricted routes require authentication
- Input validation on all API endpoints
