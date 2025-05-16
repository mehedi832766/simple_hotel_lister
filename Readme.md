# 🏨 Hotel Hunter

A full-stack hotel search and bookmarking app that fetches real-time hotel data from external sources like Booking.com. Built using Django (DRF) for the backend and React with Tailwind CSS for the frontend. Users can search hotels, filter results by rating, bookmark listings, and interact with the app using secure JWT authentication.

---

## 🚀 Project Highlights

- Real-time hotel data scraping from third-party websites using BeautifulSoup.
- Filter hotel listings by rating.
- Bookmark hotels from search results.
- Fully responsive frontend with modern UI.
- JWT-based authentication for secure access.
- DRF APIs and PostgreSQL database.

---

## 🎥 Sample Demo Video

Watch a short walkthrough of the application in action:
[Screencast from 2025-05-06 11-30-59.webm](https://github.com/user-attachments/assets/e89a7b8d-2029-49c7-a33f-ab025db1d339)




---

## 🛠️ Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React.js, Tailwind CSS        |
| Backend     | Django, Django REST Framework |
| Auth        | JWT Authentication            |
| Database    | PostgreSQL                    |
| Scraping    | BeautifulSoup (Python)        |
| Integration | Axios Interceptors            |

---

## 📦 Setup & Installation

### Prerequisites

- Python 3.9+
- Node.js 14+
- PostgreSQL
- npm / yarn

### 🔧 Backend (Django + DRF)

```bash
# 1. Create virtual environment
python -m venv venv
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set up PostgreSQL database
# Create a DB and update settings.py with credentials

# 4. Run migrations
python manage.py migrate

# 5. Start backend server
python manage.py runserver
```

💻 Frontend (React + Tailwind)

```bash

# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

```

▶️ Running the Application Locally
Once both the frontend and backend are running:

- Frontend: http://localhost:5173

- Backend API: http://localhost:8000/api

Make sure to configure .env for both frontend and backend with the appropriate URLs and secrets.


## 📊 Data Handling Option
 ✅ Option A: Real-time hotel data is fetched dynamically from a third-party travel website (e.g., Booking.com) based on user search queries, using BeautifulSoup for scraping.

## 🤖 AI Tools Used
### ✅ GitHub Copilot:

- Cleaned up unused variables and imports.

- Removed redundant code blocks.

- Assisted in debugging API response issues.


## 📎 Extra Notes
- Axios interceptors are used to automatically attach JWT tokens to requests.

- Django ORM handles all database operations.

- JWT authentication secures protected routes and endpoints.
