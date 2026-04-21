# 🧠 Brainly — Your Second Brain

Brainly is a full-stack web application that acts as a **personal knowledge management system**, allowing users to save, organize, and revisit useful content from platforms like YouTube and Twitter.

It is extended with a Chrome Extension (**Brainly Saver**) for seamless, one-click content saving.

---

# 🚀 Live Demo

🌐 Frontend: https://brainly-umber.vercel.app/

🔗 Extension Repo: https://github.com/H4RSHUH/Brainly-Saver-extension

---

# 📌 Overview

Brainly helps you build your own **digital second brain**.

Instead of losing useful content across platforms, you can:

* Save YouTube videos 🎥
* Save Tweets 🐦
* Organize everything in one place 🧠
* Access it anytime via dashboard

---

# ⚡ Features

## 🖥️ Web Application

* User Authentication (Signup/Login)
* Dashboard with saved content
* Content categorization (YouTube / Twitter)
* Shareable links
* Clean UI with modal-based content addition

## 🔌 Chrome Extension

* One-click save from browser
* Works on:

  * YouTube video pages
  * Twitter/X tweet pages
* Title input before saving
* Direct backend integration

---

# 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)

### Extension

* Chrome Extension (Manifest V3)
* Vanilla JS

---

# 📁 Project Structure

```text
brainly/
│
├── brainly-main-fe/        # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── index.html
│
├── second-brain-be/        # Backend (Node + Express)
│   ├── src/
│   ├── dist/
│   ├── package.json
│
└── README.md
```

---

# ⚙️ Setup & Installation

## 🔧 1. Clone Repository

```bash
git clone https://github.com/your-repo/brainly.git
cd brainly
```

---

## 🖥️ 2. Backend Setup

```bash
cd second-brain-be
npm install
```

### Create `.env`

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
npm run dev
```

---

## 🌐 3. Frontend Setup

```bash
cd brainly-main-fe
npm install
```

### Create `.env`

```env
VITE_BACKEND_URL=https://your-backend-url
```

### Run Frontend

```bash
npm run dev
```

---

# 🔌 4. Chrome Extension Setup

## Enable Developer Mode

1. Open Chrome
2. Go to:

```text
chrome://extensions
```

3. Enable **Developer Mode**

---

## Load Extension

1. Click **Load Unpacked**
2. Select:

```text
brainly-extension/
```

---

# 🧪 How to Use

---

## 🧠 Web App

1. Signup/Login
2. Go to Dashboard
3. Add or view saved content

---

## 🔌 Extension

### Step 1 — Login

* Open extension popup
* Enter credentials

---

### Step 2 — Save Content

#### ▶️ YouTube

* Open a video page
* Click extension
* Enter title
* Click Save

#### 🐦 Twitter

* Open a tweet
* Click extension
* Enter title
* Click Save

---

## ❌ Unsupported Pages

* YouTube homepage ❌
* Twitter feed ❌
* Other websites ❌

👉 Only **valid video & tweet URLs** are supported

---

# 🔐 Authentication

* Uses JWT-based authentication
* Token stored securely in browser storage
* Required for both web app and extension

---

# 🚀 Deployment

### Frontend

* Deployed on Vercel

### Backend

* Deployed on Render

---

# 🎯 Key Highlights

* Full-stack architecture
* Real-world Chrome extension integration
* Clean API design
* Secure authentication
* Production-ready deployment

---

# 🔮 Future Improvements

* Support for more platforms (LinkedIn, Reddit)
* Auto-fetch metadata (title, thumbnail)
* Improved UI/UX (animations, responsiveness)
* Dark mode
* Search & filtering

---

# 👨‍💻 Author

**Harsh Garg**

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project:

* Star the repo ⭐
* Share with others 🚀

---

# 💡 Final Thought

Brainly transforms scattered content into a structured knowledge system —
helping you **think better, learn faster, and remember more**.
