# Recipe App

A modern, full-featured recipe management web application built with React, Firebase, Redux Toolkit, and Ant Design. This app allows users to browse, search, and filter recipes, while providing an admin dashboard for managing recipes and cuisines, complete with analytics and data visualizations.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This Recipe App is designed for both everyday users and administrators:

- **Users** can browse, search, and filter a wide variety of recipes by cuisine, meal type, and rating. Each recipe includes detailed information such as ingredients, instructions, prep/cook time, difficulty, and nutritional info.
- **Admins** have access to a secure dashboard to manage recipes and cuisines, view analytics, and visualize data through interactive charts.

---

## Features

### For Users

- **Home Page:** Modern landing page with banners, search bar, and featured sections.
- **Browse Recipes:** View all recipes with pagination, filter by meal type, cuisine, and sort by rating.
- **Recipe Details:** See full recipe info, including ingredients, instructions, ratings, reviews, and tags.
- **Search:** Quickly find recipes by name or keyword.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

### For Admins

- **Authentication:** Secure admin login/logout (Firebase Auth).
- **Admin Dashboard:** Overview of total recipes, cuisines, and analytics widgets.
- **Recipe Management:** Add, edit, or delete recipes.
- **Cuisine Management:** Add, edit, or delete cuisines.
- **Data Visualizations:** Interactive charts (pie, bar) for cuisines, meal types, and difficulty levels (using Recharts).

---

## Folder Structure

```
my-app/
  ├── public/                # Static assets and HTML
  ├── src/
  │   ├── assets/            # Images and logos
  │   ├── components/        # Reusable React components (cards, charts, modals, etc.)
  │   ├── pages/             # Main app pages (Home, AllRecipes, AdminPanel, etc.)
  │   ├── services/          # API and data fetching logic (Firebase integration)
  │   ├── store/             # Redux Toolkit slices and sagas for state management
  │   ├── styles/            # CSS modules for styling
  │   ├── utils/             # Utility functions and static data
  │   ├── firebase.js        # Firebase configuration and initialization
  │   └── index.js           # App entry point
  ├── package.json           # Project metadata and dependencies
  └── README.md              # Project documentation
```

---

## Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd recipe-app/my-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Firebase Setup:**

   - The app uses Firebase for authentication and Firestore for data storage. Update `src/firebase.js` with your own Firebase project credentials if deploying your own instance.

4. **Start the development server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

---

## Usage

- **Browse Recipes:** Use the "All Recipes" page to filter, sort, and page through recipes.
- **View Recipe Details:** Click on any recipe card to see full details, including ingredients and instructions.
- **Admin Access:** Log in as an admin to access the dashboard, manage recipes/cuisines, and view analytics.
- **Charts & Analytics:** Admin dashboard displays charts for cuisines, meal types, and recipe difficulty.

---

## Technologies Used

- **Frontend:** React, Ant Design, Styled Components, Recharts
- **State Management:** Redux Toolkit, Redux Saga, Redux Persist
- **Backend/Database:** Firebase Auth, Firestore
- **Other:** Axios, Formik, Yup, React Router, React Icons, React Slick, React Toastify

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.
