# Recipe App

A modern recipe web application built with React, Firebase, and Ant Design. This app allows users to browse, search, and view recipes, and includes a protected admin panel for managing recipes and cuisines.

## Features

- 🏠 Beautiful landing page with category banners and featured sections
- 🔍 Search and filter recipes by category
- 📋 View detailed recipe pages
- 📊 Visual charts for cuisines, meals, and difficulty
- 👤 User authentication with Firebase (email/password)
- 🔒 Protected admin panel for managing recipes and cuisines
- 📱 Responsive design for mobile and desktop

## Admin Panel

- Accessible only at `/log-in/admin` after authentication
- Only pre-approved admin users (see below) can log in
- Admins can add, edit, and delete recipes and cuisines
- All admin routes and navigation are protected

## Authentication

- Uses Firebase Authentication (email/password)
- Only users with credentials in `src/utils/adminUsers.js` can access the admin panel
- If you try to access `/log-in/admin` without authentication, you will be redirected to `/log-in` and prompted to log in
- After logging out, admin routes become inaccessible until you log in again

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-app.git
   cd recipe-app/my-app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up Firebase:
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
   - Enable Email/Password authentication
   - Add your Firebase config to `src/firebase.js`
   - Add your admin users in the Firebase Authentication console and in `src/utils/adminUsers.js`

### Running the App

```bash
npm start
# or
yarn start
```

The app will run at [http://localhost:3000](http://localhost:3000)

## File Structure

```
my-app/
  src/
    components/      # Reusable UI components
    pages/           # Page components (Home, Admin, etc.)
    styles/          # CSS files
    utils/           # Utility files (adminUsers.js, etc.)
    firebase.js      # Firebase config and initialization
    App.js           # Main app and routing
```

## Admin Users

- Admin credentials are hardcoded in `src/utils/adminUsers.js` for demo/testing purposes.
- You must also create these users in your Firebase Authentication console.
- Example:
  ```js
  export const adminUsers = [
    { email: "admin1@example.com", password: "AdminPass1" },
    { email: "admin2@example.com", password: "AdminPass2" },
    { email: "admin3@example.com", password: "AdminPass3" },
  ];
  ```

## Security Notes

- All admin routes are protected by both Firebase Auth and a hardcoded admin list.
- Direct navigation to admin routes without authentication is blocked.
- After logout, admin routes are inaccessible until you log in again.

## License

MIT
