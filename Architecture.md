
# Lunara Architecture

Lunara is a management application for freelancers, created to centralize clients, projects, tasks, finances, and deadlines in one place.

The idea came from a practical need: improving the organization of freelance work and reducing the time lost when important information is spread across different tools or places. Before starting a freelance project, it is often necessary to check client details, understand deadlines, review tasks, remember the status of each delivery, and track financial information. When all of that is decentralized, productivity drops.

Lunara was developed to solve this problem through an organized, visually clear, and functional experience. It brings together the main areas of a freelancer’s workflow into a single product, allowing users to manage their work with more control and less friction.

## Project Goal

The goal of Lunara is to deliver a complete application for managing freelance work, allowing users to:

* register and manage clients;
* create and track projects;
* organize tasks;
* register income and expenses;
* track deadlines in a calendar;
* view key metrics through the dashboard;
* access their data securely, with authentication and user-based data isolation.

The project was built as a functional product, with real usage flows and technical decisions aligned with a multi-user application. Lunara was not designed as a static screen or only as a visual exercise, but as a usable app with real data persistence, security rules, a web/PWA version, and a desktop version.

## Tech Stack

The application was developed with:

* React;
* TypeScript;
* Vite;
* Tailwind CSS;
* Firebase Authentication;
* Cloud Firestore;
* TanStack Query;
* Tauri for the desktop version.

This stack was chosen to combine development productivity, a good user experience, and integration with real authentication and database services.

React and TypeScript were used to build a component-based interface with stronger type safety. Vite was used because of its speed in development and build processes. Tailwind CSS helped create a responsive and consistent interface. Firebase was used for authentication and data persistence. Tauri was used to package the application as a Windows desktop app.

## General Organization

Lunara was organized around its main entities:

* Clients;
* Projects;
* Tasks;
* Transactions;
* Calendar;
* Dashboard.

Each area has a clear role in the user experience.

Clients represent the people or companies served by the freelancer. Projects group the deliveries connected to those clients. Tasks help track what needs to be done in each workflow. Financial transactions allow users to register income, expenses, and payments. The calendar centralizes important deadlines. The dashboard brings the main data together into a general business overview.

This structure helps users quickly understand the current state of their professional routine.

## Why I Used Firebase

Firebase was chosen both as a learning opportunity and as a practical solution for the project.

One of my goals was to better understand how to work with authentication, databases, and security rules using a real tool. At the same time, Firebase proved to be a strong choice for Lunara because it allows login, sign-up, and data persistence to be configured without requiring a custom API from the beginning.

With Firebase Authentication, I implemented email and password login/sign-up. With Cloud Firestore, the main app data started being stored in a real database.

This brought the project closer to a product-level scenario, because the data is not only local or mocked. It is persisted, queried, updated, and protected by access rules.

## User-Based Data Separation

An essential part of the architecture was making sure each user has their own data.

In an application with login, authenticating the user is not enough. It is also necessary to make sure each person can only access their own information.

The data structure was organized by authenticated user:

```txt
users/{uid}/clients
users/{uid}/projects
users/{uid}/tasks
users/{uid}/transactions
```

The `uid` comes from Firebase Authentication and uniquely identifies each user.

With this structure, clients, projects, tasks, and transactions are separated by account. One user cannot access another user’s dashboard, view someone else’s data, or modify information that does not belong to them.

This was an important decision to treat Lunara as a real multi-user application.

## Interface Decisions

The interface was designed to work well on both desktop and mobile.

Since Lunara organizes several areas of a freelancer’s routine, navigation needed to be clear. On desktop, the application uses a sidebar for quick access to the main sections. On mobile, the menu is adapted to smaller screens, keeping navigation accessible without compromising the interface space.

Adjustments were also made to forms, cards, buttons, modals, and spacing to keep the application comfortable across different screen sizes.

The user experience was treated as a central part of the project, not as a final detail. This became even clearer during real user testing, which helped identify improvements in the usage flow.

## User Testing

After the web version was published, Lunara was shared with real users for an initial experience validation.

This stage helped identify points that are not always clear during individual development, such as flow details, usage questions, behavior on different devices, and small interface adjustments.

The bugs and improvements reported by users were analyzed and fixed as testing progressed. This process helped make the app more consistent.

## Web, PWA, and Desktop Versions

Lunara was published as a web application on Vercel and was also configured as a PWA.

In addition, a desktop version was created with Tauri. The desktop version uses the same front-end as the web app, based on the build generated by Vite, and generates a Windows installer.

With this, the project now has three ways to be used:

* web;
* PWA;
* Windows desktop app.

This decision strengthens the project as a product because it expands its access and distribution options.

## Key Technical Points

During development, some technical points played an important role in consolidating the project:

* authentication with Firebase;
* real data persistence with Firestore;
* user-based data isolation;
* Firestore security rules;
* responsiveness for desktop and mobile;
* deployment on Vercel;
* PWA configuration;
* desktop packaging with Tauri;
* adjustments based on real user feedback.

Lunara is a complete project because it brings together interface, business logic, authentication, database, security, deployment, and desktop distribution in a single application.
