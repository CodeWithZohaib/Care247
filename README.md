Care247 - Customer Search Application
Overview

This project is a configuration-driven customer search application built with React, TypeScript, Tailwind CSS, and shadcn/ui.
It allows users to search for customers and view results in a list or table. The UI is designed so that all fields and columns are generated from configuration objects instead of being hardcoded.
Adding a new field or changing an existing one requires updating only the configuration file, not the component logic.

Tech Stack

React with TypeScript

Tailwind CSS

shadcn/ui components

JSON Server (for mock API)

Features

Configuration-based form and table rendering

Search by First Name, Last Name, and Date of Birth

Responsive, minimal, and accessible interface

Loading and error handling

Mock API with sample customer data

Configuration Approach

The application uses a configuration file to define search fields and result columns.
For example, each field has its own label, type, and order defined in a configuration object.

Example:

const searchConfig = {
  fields: {
    firstName: { uiType: 'input', label: 'First Name', renderOrder: 1 },
    lastName: { uiType: 'input', label: 'Last Name', renderOrder: 2 },
    dateOfBirth: { uiType: 'date', label: 'Date of Birth', renderOrder: 3 },
  },
};


To add a new field, such as middleName, simply add it to this configuration object — no component code changes are required.

Setup Instructions

Clone the repository:

git clone https://github.com/CodeWithZohaib/Care247.git
cd care247


Install dependencies:

npm install


Start the mock API server:

npx json-server --watch db.json --port 3001


Run the development server:

npm run dev


The app will be available at http://localhost:5173 (or whichever port Vite assigns).

Folder Structure
src/
  components/
  config/
    searchConfig.ts
  pages/
  types/
  App.tsx
db.json

Trade-offs and Decisions

Focused on a flexible and maintainable configuration structure rather than complex UI.

Used TypeScript for stronger typing and cleaner code.

Kept the UI simple and responsive with shadcn/ui and Tailwind.

Avoided overengineering; aimed for clarity and scalability.

Time Spent

Approximately 2 days, including setup, development, and documentation.

Author

Zohaib
Frontend Developer
GitHub: https://github.com/CodeWithZohaib/