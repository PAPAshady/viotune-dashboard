# 🎵 VioTune Dashboard

A modern content management system built for **VioTune**, a music streaming platform.

The dashboard provides administrators with a centralized interface for managing songs, artists, albums, playlists, genres, users, and platform analytics. It includes role-based authorization, media uploads, advanced data tables, and a comprehensive analytics system built without relying on third-party analytics services.

> **Live Demo:** https://viotune-dashboard.netlify.app

---

## ✨ Overview

VioTune Dashboard was built to solve the same problems that production content management systems solve every day.

Instead of focusing only on a consumer-facing application, this project manages the entire platform through a dedicated administrative interface, allowing administrators to create, update, organize and monitor platform content efficiently.

A read-only **Guest** role is available so recruiters and visitors can explore the application without registration or modifying any data.

---

# 🚀 Features

### Content Management

* Complete CRUD operations
* Songs management
* Artists management
* Albums management
* Playlists management
* Genres management
* User management

---

### Advanced Tables

* Global search
* Server-side filtering
* Sorting
* Pagination
* Row selection
* Bulk delete operations

Built using **TanStack Table** with reusable table components.

---

### Authentication & Authorization

* Protected application
* Supabase Authentication
* Role-based access control
* Admin permissions
* Read-only Guest mode for recruiters

Guests can freely explore the dashboard while all mutation operations remain restricted.

---

### File Upload System

Supports uploading and managing:

* Song audio files
* Album covers
* Artist images
* Playlist covers

The upload workflow includes:

* Validation
* Preview states
* Existing file handling
* New file replacement logic

---

### Analytics Dashboard

Custom analytics built directly on top of the application data.

Includes:

* Total Users
* Total Admins
* Total Songs
* Total Artists
* Total Albums
* Total Playlists
* Total Genres

Charts and insights:

* Plays Over Time
* New Users Over Time
* Recent Activity
* Top Played Songs
* Top Played Playlists
* Top Songs
* Top Albums
* Average Plays Per Song
* Total Songs Per Album
* Genres With Most Songs
* Genre With Most Albums
* Genres Without Songs
* Active Users
* Banned Users

---

# 🛠 Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* shadcn/ui

### State Management & Data Fetching

* TanStack Query

### Data Tables

* TanStack Table

### Forms & Validation

* React Hook Form
* Zod

### Backend

* Supabase

  * Authentication
  * Database
  * Storage

---

# 🏗 Architecture Highlights

This project focuses heavily on reusable and scalable frontend architecture.

## Reusable Data Management

A generic table system powers multiple resources while supporting:

* searching
* filtering
* pagination
* row selection
* bulk actions

without duplicating business logic.

---

## Server State Management

TanStack Query is used to provide:

* request caching
* automatic refetching
* optimistic UI updates
* loading states
* error handling

keeping the application responsive while reducing unnecessary network requests.

---

## Form System

Complex forms are built using React Hook Form and Zod to provide:

* schema validation
* reusable components
* type-safe form handling
* media upload validation
* improved developer experience

---

## Media Upload Workflow

One of the more challenging parts of the project was implementing a flexible upload system that correctly handles:

* existing uploaded files
* new selected files
* previews
* validation
* replacement logic

while keeping the user experience intuitive.

---

# 🔒 Security

The entire dashboard is protected behind authentication.

Role-based authorization ensures:

| Role  | Permissions                     |
| ----- | ------------------------------- |
| Admin | Full access (CRUD + management) |
| Guest | Read-only access                |

The Guest role exists specifically so recruiters and visitors can explore the application without creating an account while preventing any data mutations.

---

# 💡 What This Project Demonstrates

This project demonstrates experience building production-style internal tools rather than simple portfolio applications.

It includes:

* Complex CRUD workflows
* Authentication & Authorization
* File storage integration
* Advanced data tables
* Analytics dashboards
* Form architecture
* Server state management
* Reusable component design
* Modern React ecosystem patterns

---

# 📁 Project Structure

```
src/
├── components/
├── pages/
├── layouts/
├── features/
├── hooks/
├── services/
├── schemas/
├── utils/
└── types/
```

(The exact structure may differ as the project evolves.)

---

# 🎯 Why I Built This

After building the VioTune music streaming application, I wanted to understand what happens behind the scenes of real products.

Instead of relying on an existing CMS, I designed and implemented a custom administrative dashboard from scratch.

Working on this project deepened my understanding of:

* scalable React architecture
* role-based systems
* media management
* reusable data-driven components
* analytics implementation
* production dashboard workflows

The result is a complete content management system that powers the VioTune platform from the administrative side.

---

# 📷 Screenshots

> Dashboard Overview

*Add screenshot*

> Songs Management

*Add screenshot*

> Analytics

*Add screenshot*

> User Management

*Add screenshot*

---

# 👨‍💻 Author

**Nima Zamani**

Frontend Developer specializing in React and modern frontend ecosystems with experience building complete end-to-end web applications and production-style administrative dashboards.
