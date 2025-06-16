# 📚 Virtual Bookshelf

## 🚀 Project Overview

**Virtual Bookshelf** is a full-stack web application designed for book lovers to catalog, track, and review their reading journey. Users can add books, manage reading status, write reviews, and discover popular reads through community upvotes.

---

## 🧑‍💻 Features

- 🔐 **Authentication** (Email/Password & Google via Firebase)
- 📝 **Add, Update, Delete Books** (Private access)
- 📈 **Reading Progress Tracker**
- 💬 **Reviews with Edit/Delete**
- 🔼 **Upvote System** for community recommendations
- 🔍 **Search & Filter** by title, author, and reading status
- 📊 **Profile Dashboard** with charts (books by category)
- 🎨 **Responsive UI** using Tailwind CSS & Framer Motion animations

---

## 🌐 Live Demo

- **Client**: [Netlify/Firebase/Vercel Deployment Link](#)
- **Server**: [Render/Vercel/Heroku Deployment Link](#)

---

## 🧰 Tech Stack

| Category       | Technology                         |
| -------------- | ---------------------------------- |
| Frontend       | React, Tailwind CSS, Framer Motion |
| Backend        | Node.js, Express.js, MongoDB       |
| Authentication | Firebase (Email & Google)          |
| Deployment     | Vercel/Netlify + Render            |

---

## 🧭 Pages & Routes

### 🔓 Public Routes

- `/` → Home (Banner, Popular Books, Categories, Extra Sections)
- `/bookshelf` → Browse books with filters & search
- `/books/:id` → Book details with reviews, upvotes, tracker
- `/login` → Login via Email/Google
- `/register` → Registration
- `/about` → About the platform
- `/contact` → Contact info
- `*` → 404 Error Page

### 🔒 Private Routes

- `/add-book` → Add a new book
- `/my-books` → View, update, delete user’s own books
- `/update-book/:id` → Update book info
- `/profile` → Profile with reading summary & chart

---

## 📋 Book Model Schema

```json
{
  "book_title": "string",
  "cover_photo": "url",
  "total_page": "number",
  "book_author": "string",
  "book_category": "Fiction | Non-Fiction | Fantasy",
  "reading_status": "Read | Reading | Want-to-Read",
  "book_overview": "string",
  "user_email": "string (auto-filled)",
  "user_name": "string (auto-filled)",
  "upvote": 0
}


# Clone the repo
git clone https://github.com/yourname/virtual-bookshelf.git
cd virtual-bookshelf

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Run both servers
# Start client
cd ../client
npm run dev

# Start server
cd ../server
nodemon index.js
```
