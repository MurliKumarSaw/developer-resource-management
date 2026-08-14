# Developer Resource Management System

A web application for managing developers, projects, resource allocation, and project assignments.

The system is designed to help resource managers understand developer availability, project assignments, allocation capacity, skills, and pending assignment requests from a centralized application.

---

## Features

### Dashboard

* Overview of developers and projects
* Resource allocation information
* Assignment status overview
* Quick access to important resource-management information

### Developer Management

* View all developers
* View developer details
* Track developer skills
* Track team membership
* View project assignments

### Project Management

* View available projects
* View project details
* Associate projects with clients
* Track developers assigned to projects

### Assignment Management

* Assign developers to projects
* Track allocation percentage
* Track assignment start and end dates
* Track assignment status

Supported assignment statuses:

* `PENDING`
* `ACCEPTED`
* `DECLINED`

### Notifications

Pending assignments are displayed as notifications.

The pending notification count is displayed in:

* Header notification bell
* Sidebar notification menu

Users can:

* Accept an assignment
* Decline an assignment

When an assignment is accepted or declined, the notification count updates automatically.

### Responsive UI

The application is designed to work across:

* Desktop
* Tablet
* Mobile

The sidebar becomes a mobile navigation drawer on smaller screens.

---

# Tech Stack

## Frontend

* React
* JavaScript
* Vite
* React Router
* Redux
* Tailwind CSS
* Lucide React

## Backend

* Node.js
* Express

## Database

* Neo4j / CognoDB
* Cypher

> The backend and database components are included as part of the graph-based resource management architecture.

---

# Project Architecture

The application follows a frontend/backend/database architecture.

```text
┌─────────────────────────────┐
│          React UI           │
│                             │
│ Dashboard                   │
│ Developers                  │
│ Projects                    │
│ Assignments                 │
│ Notifications               │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        Redux State          │
│                             │
│ Assignment State            │
│ UI State                    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Node / Express        │
│                             │
│ API Layer                   │
│ Business Logic              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Neo4j / CognoDB       │
│                             │
│ Developers                  │
│ Skills                      │
│ Teams                       │
│ Projects                    │
│ Clients                     │
│ Assignments                 │
└─────────────────────────────┘
```

---

# Project Structure

```text
developer-resource-management/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   └── layout/
│   │       ├── common/
│   │       │   ├── Avatar.jsx
│   │       │   ├── Badge.jsx
│   │       │   └── Card.jsx
│   │       │
│   │       ├── AppLayout.jsx
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   │
│   ├── data/
│   │   ├── developers.js
│   │   ├── skills.js
│   │   ├── teams.js
│   │   ├── clients.js
│   │   ├── projects.js
│   │   └── assignments.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Developers.jsx
│   │   ├── DeveloperDetails.jsx
│   │   ├── Projects.jsx
│   │   ├── Assignments.jsx
│   │   └── Notifications.jsx
│   │
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   │       └── assignmentsSlice.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── eslint.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

> Update this structure if additional backend or database folders are added.

---

# Data Model

The application manages several related entities.

```text
Developer
   │
   ├── HAS_SKILL ───────► Skill
   │
   ├── MEMBER_OF ───────► Team
   │
   └── ASSIGNED_TO ─────► Project
                              │
                              └── BELONGS_TO ─────► Client
```

## Developer

Represents a developer/resource in the organization.

Example attributes:

```text
id
name
role
email
team
skills
```

## Skill

Represents a technical skill possessed by a developer.

Examples:

```text
React
JavaScript
Node.js
Python
Java
SQL
```

## Team

Represents the team to which a developer belongs.

## Project

Represents a project requiring developer resources.

Example attributes:

```text
id
name
clientId
status
```

## Client

Represents the client associated with a project.

## Assignment

Represents the relationship between a developer and a project.

Example attributes:

```text
id
developerId
projectId
allocation
startDate
endDate
status
```

---

# Graph Data Model

A graph database is useful for this application because resource management involves many relationships between developers, skills, teams, projects, clients, and assignments.

The primary graph entities are:

```text
(:Developer)
(:Skill)
(:Team)
(:Project)
(:Client)
```

Relationships can be represented as:

```text
(:Developer)-[:HAS_SKILL]->(:Skill)

(:Developer)-[:MEMBER_OF]->(:Team)

(:Developer)-[:ASSIGNED_TO]->(:Project)

(:Project)-[:BELONGS_TO]->(:Client)
```

Assignment information can be represented through relationships or assignment nodes depending on the final database implementation.

---

# Example Resource Management Queries

The graph model allows the application to answer questions such as:

### Find developers with a specific skill

```cypher
MATCH (d:Developer)-[:HAS_SKILL]->(s:Skill)
WHERE s.name = "React"
RETURN d
```

### Find projects assigned to a developer

```cypher
MATCH (d:Developer)-[:ASSIGNED_TO]->(p:Project)
WHERE d.id = $developerId
RETURN p
```

### Find developers assigned to a project

```cypher
MATCH (d:Developer)-[:ASSIGNED_TO]->(p:Project)
WHERE p.id = $projectId
RETURN d
```

### Find developers who are not currently assigned

```cypher
MATCH (d:Developer)
WHERE NOT (d)-[:ASSIGNED_TO]->(:Project)
RETURN d
```

> These queries should be updated to match the exact graph model and relationship structure used in the final implementation.

---

# Redux State Management

Redux is used to maintain centralized application state.

The assignment state contains the current assignment records.

The notification system derives pending notifications from assignments whose status is:

```text
PENDING
```

For example:

```text
Assignment
    │
    ├── PENDING
    │      │
    │      └── Notification displayed
    │
    └── ACCEPTED / DECLINED
           │
           └── Notification removed
```

## Updating Assignment Status

When a user accepts an assignment:

```text
PENDING
   ↓
ACCEPTED
```

When a user declines an assignment:

```text
PENDING
   ↓
DECLINED
```

The Redux state updates and subscribed components automatically re-render.

This keeps the following UI elements synchronized:

* Notification page
* Header notification count
* Sidebar notification count
* Assignment status

---

# Routing

The application uses React Router for navigation.

Current routes include:

```text
/dashboard
/developers
/projects
/assignments
/notifications
/logout
```

The application uses a shared layout containing:

```text
Sidebar
Header
Main Content
```

Nested routes are rendered through React Router's `Outlet`.

---

# Installation and Setup

## Prerequisites

Make sure the following are installed:

* Node.js 20+
* npm
* Git
* Neo4j / CognoDB access if using the database locally

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

Navigate into the project:

```bash
cd developer-resource-management
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Environment Variables

Create a `.env` file in the project root if environment variables are required.

Example frontend configuration:

```env
VITE_API_URL=http://localhost:5000
```

For the backend/database:

```env
NEO4J_URI=<your-neo4j-uri>
NEO4J_USERNAME=<your-neo4j-username>
NEO4J_PASSWORD=<your-neo4j-password>
```

Never commit passwords, API keys, or other secrets to GitHub.

The `.env` file should be included in `.gitignore`.

---

# Running the Application

## Start the Frontend

Run:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

Open that URL in a browser.

---

## Start the Backend

If the backend is maintained in a separate directory:

```bash
cd server
npm install
npm run dev
```

Return to the project root when needed:

```bash
cd ..
```

> Update these commands if your backend uses a different folder or script.

---

# Database Setup

If Neo4j/CognoDB is being used locally:

1. Start the database.
2. Configure the database connection variables.
3. Run the database initialization/seed process.
4. Start the backend.
5. Start the frontend.

Example:

```bash
npm run seed
```

> Only use this command if a `seed` script exists in `package.json`.

---

# Available Scripts

## Frontend

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates the production build.

### Preview

```bash
npm run preview
```

Runs a local preview of the production build.

### Lint

```bash
npm run lint
```

Runs ESLint against the project.

---

# Application Flow

A typical resource management flow is:

```text
Manager
   │
   ▼
Dashboard
   │
   ├── View Developers
   │
   ├── View Projects
   │
   └── View Assignments
            │
            ▼
      Pending Assignment
            │
       ┌────┴────┐
       ▼         ▼
    Accept     Decline
       │         │
       ▼         ▼
   ACCEPTED   DECLINED
```

---

# Notification Flow

The notification system uses assignment status to determine whether a notification should be displayed.

```text
Redux Assignments
       │
       ▼
Filter status === "PENDING"
       │
       ▼
Pending Assignments
       │
       ├───────────────┐
       ▼               ▼
Header Count      Sidebar Count
       │
       ▼
Notifications Page
```

For example, if there are five pending assignments:

```text
Pending assignments = 5
```

the application displays:

```text
Header Bell: 5
Sidebar Notifications: 5
Notifications Page: 5 items
```

After accepting one assignment:

```text
Pending assignments = 4
```

and the UI updates automatically.

---

# Responsive Design

The UI uses Tailwind CSS responsive utilities.

On larger screens:

```text
┌──────────┬─────────────────────────────┐
│ Sidebar  │ Header                      │
│          ├─────────────────────────────┤
│          │ Main Content                 │
│          │                             │
└──────────┴─────────────────────────────┘
```

On smaller screens:

```text
┌─────────────────────────────┐
│ ☰ Header                    │
├─────────────────────────────┤
│                             │
│ Main Content                │
│                             │
└─────────────────────────────┘
```

The sidebar can be opened using the mobile menu button and closed using the close button or overlay.

---

# Reusable Components

The project uses reusable UI components to reduce duplication.

Examples include:

* `Card`
* `Badge`
* `Avatar`
* `Header`
* `Sidebar`
* `AppLayout`

These components provide consistent styling and behavior throughout the application.

---

# Design Decisions

## Redux for Assignment State

Assignment status affects multiple parts of the application.

For example, changing an assignment from `PENDING` to `ACCEPTED` affects:

* Notifications
* Header count
* Sidebar count
* Assignment status

Keeping this state in Redux allows all subscribed components to remain synchronized.

## React Router for Navigation

React Router provides client-side navigation between the major sections of the application without requiring full page reloads.

## Tailwind CSS

Tailwind CSS is used for:

* Responsive layouts
* Spacing
* Typography
* Colors
* States
* Component styling

## Graph Database

A graph database is appropriate because developers, skills, teams, projects, clients, and assignments have many-to-many relationships.

This makes relationship-based queries an important part of the application.

---

# Testing the Application

After starting the application, verify the following:

### Dashboard

* Dashboard loads successfully.
* Resource information is displayed.

### Developers

* Developer list loads.
* Developer details can be opened.

### Projects

* Project list loads.
* Project information is displayed.

### Assignments

* Assignments are displayed.
* Allocation percentages are shown.
* Assignment status is displayed.

### Notifications

* Pending assignments appear.
* Header notification count matches the number of pending assignments.
* Sidebar notification count matches the number of pending assignments.
* Accepting an assignment removes it from pending notifications.
* Declining an assignment removes it from pending notifications.

### Responsive Layout

* Sidebar works on desktop.
* Hamburger menu works on mobile.
* Sidebar overlay closes correctly.
* Header remains usable on smaller screens.

---

# Security

Sensitive information should not be committed to the repository.

The following should remain outside Git:

```text
.env
node_modules/
dist/
```

Database credentials and API keys should be stored in environment variables.

---

# Future Improvements

Potential improvements include:

* Authentication
* Role-based access control
* Resource availability calculations
* Advanced developer filtering
* Project capacity forecasting
* Assignment history
* Search functionality
* Advanced dashboard analytics
* Automated notification delivery
* Persistent notification state
* Production deployment
* Automated tests
* CI/CD pipeline

---

# Demo

### Hosted Application

`<Add deployed application URL here>`

### GitHub Repository

`<Add GitHub repository URL here>`

### Screen Recording

`<Add screen recording URL here>`

---

# Author

**Murli Kumar Saw**

Developer Resource Management System created as part of a technical assignment.

---

# License

This project was created for technical evaluation and demonstration purposes.
