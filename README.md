
# 📝 Task Management ToDo App

A full-stack Task Management application built using **Next.js**, designed to handle daily tasks with role-based access. It supports both `User` and `Admin` functionalities, featuring token-based authentication, a responsive frontend, and a file-based local backend system.

---

## Project Introduction

This application allows users to manage their daily tasks efficiently. It features:

- **User Registration & Login**
- **Role-based Access: **
  - **User**: Can view, edit, and delete only the tasks assigned to them.
  - **Admin**: Can view, edit, delete _all users’_ tasks.
- Tasks are stored locally using a file-based system.
- Fully responsive design built with **Next.js**.
- Frontend and backend are integrated within the same project.

---

## Test Users

For quick testing, use these pre-configured accounts:

| Role   | Username | Password  |
|--------|----------|-----------|
| Admin  | `admin`  | `admin123`|
| User   | `ahmad`  | `user123` |
| User   | `fatima` | `user123` |
| User   | `bilal`  | `user123` |


---

## Available Scripts

Run the following commands in your terminal:

```bash

# Install dependencies
npm install

# Run the development server
npm run dev

# Create a production build
npm run build

# Start the production server
npm start
```

##  Future Improvements
Here are some planned enhancements to further improve the application:

**Add i18n Support for Multi-language Users**
Provide translations and localization options to cater to a global audience.

**Add Task Analytics Dashboard for Admin**
Provide admins with insightful statistics and task metrics (e.g., task completion rates, user activity).

**Implement Real-time Updates using WebSockets**
Allow real-time task status updates and notifications for users and admins.

**Add Test Coverage with Jest or React Testing Library**
Improve reliability and maintainability of the codebase with unit and integration tests.

---
## 🛠️ Tech Stack

**Frontend:**
- Next.js (App Router)
- TypeScript / JavaScript
- Styled-components (for component-level styling)
- @reduxjs/toolkit and react-redux (for state management)
- @tanstack/react-query (for data fetching and caching)
- jose (for decoding/verifying JWT on client side)
- js-cookie (for managing tokens and cookies on client side)

**Backend (API routes in Next.js):**
- Next.js API Routes (server-side endpoints)
- jsonwebtoken (for signing and verifying JWT tokens on server side)
---
