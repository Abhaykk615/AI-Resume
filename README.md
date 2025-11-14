# AI Resume Builder

AI Resume Builder is a sophisticated web application that leverages artificial intelligence to help users craft professional resumes. The application features an intuitive interface and robust backend services for secure data management.

## 📌 Index  

- [Tech Stack](#tech-stack)  
- [Demo](#demo)  
- [Features](#features)
- [Installation](#installation)  
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)

---

## Tech Stack

### Frontend
- **Framework:** React.js 18
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS with Tailwind Merge
- **UI Components:** Radix UI, Lucide Icons
- **Form Handling:** React Hook Form
- **Routing:** React Router DOM v6
- **AI Integration:** Google Generative AI
- **Notifications:** Sonner
- **Animations:** Framer Motion

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JWT, Bcrypt
- **Database:** MongoDB with Mongoose ODM

### Development Tools
- **Package Manager:** npm
- **Bundler:** Vite
- **Linting:** ESLint
- **Code Formatting:** Prettier
- **Version Control:** Git

## Demo

🌐 Live demo: [AI Resume Builder](https://main--ai-resume-builder-07.netlify.app/)  


---
## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or Yarn
- MongoDB (local or cloud instance)
- Google Generative AI API Key (for AI features)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   NODE_ENV=development
   ALLOWED_SITE=http://localhost:5173
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the Frontend directory with:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_GOOGLE_AI_KEY=your_google_ai_api_key
   ```

---

## ✨ Features

### AI-Powered Resume Building
- **Smart Summary Generation**: AI-generated professional summaries based on job title and experience level
- **Content Enhancement**: AI suggestions for improving resume content
- **Experience Level Customization**: Tailored resume suggestions for different experience levels (Entry, Mid, Senior)

### User Experience
- **Real-time Preview**: See changes to your resume as you make them
- **Multiple Templates**: Choose from various professional resume templates
- **Drag-and-Drop Interface**: Intuitive resume section management
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Resume Management
- **Save & Export**: Save multiple resume versions and export as PDF
- **Sections Management**: Easily add, remove, or reorder resume sections
- **Skills & Endorsements**: Highlight key skills and receive AI-powered suggestions

### Security & Authentication
- **Secure User Accounts**: JWT-based authentication with bcrypt password hashing
- **Data Privacy**: Your resume data is stored securely
- **Social Login**: Quick sign-up with Google/GitHub
