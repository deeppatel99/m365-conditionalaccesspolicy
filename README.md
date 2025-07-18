# Inactive Users 90 Days – Full Stack App

This project contains a **Node.js/Express backend** and a **React (TypeScript) frontend** for lead capture, OTP email authentication, and a protected dashboard.

## Folder Structure

```
project-root/
  backend/
  frontend/
```

---

## Backend Setup

1. **Install dependencies:**

   ```sh
   cd backend
   npm install
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in your real SMTP credentials and any other required values.
   - Example:
     ```
     PORT=5000
     SMTP_HOST=smtp.example.com
     SMTP_PORT=587
     SMTP_USER=your@email.com
     SMTP_PASS=yourpassword
     RESTRICTED_DOMAINS=test.com,yahoo.com
     ```

3. **Start the backend server:**
   ```sh
   npm start
   ```
   The backend will run on `http://localhost:5000` (or the port you set).

---

## Frontend Setup

1. **Install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **Configure environment variables (if needed):**

   - If your frontend needs to know the backend API URL, create a `.env` file in `frontend/`:
     ```
     REACT_APP_API_URL=http://localhost:3001/api
     ```
   - (Adjust the URL if your backend runs elsewhere.)

3. **Start the frontend app:**
   ```sh
   npm start
   ```
   The frontend will run on `http://localhost:3000` by default.

---

## Notes

- **Do not commit your `.env` files** with real secrets to version control.
- If you see errors about missing dependencies, run `npm install` in the respective folder.
- For production, you may want to use process managers (like PM2) and a reverse proxy (like Nginx).

---

## Project Features

- Lead capture with domain restriction
- OTP email verification (SMTP required)
- Protected dashboard
- Modern, responsive UI (Material UI)
- TypeScript for type safety

---

## Contact

For any issues or questions, please contact the developer.

---

## Quick Start (Summary)

1. **Install dependencies for both frontend and backend:**
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. **Start the backend:**
   ```sh
   cd backend
   npm start
   ```
3. **Start the frontend:**
   ```sh
   cd frontend
   npm start
   ```

---

## Troubleshooting

- **Error: `react-scripts: command not found` (frontend)**

  - Run `npm install` in the `frontend` directory.

- **Error: `Cannot find module 'typescript'` (frontend)**

  - Run `npm install typescript --save-dev` in the `frontend` directory.

- **TypeScript error for Alert severity prop (frontend):**

  - If you see an error like:
    ```
    Type 'string' is not assignable to type 'OverridableStringUnion<AlertColor, AlertPropsColorOverrides>'
    ```
    - Make sure to cast the prop: `severity={severity as AlertColor}` in your `GlobalSnackbar.tsx`.

- **Error: `Cannot find module 'express'` (backend)**
  - Run `npm install` in the `backend` directory.
