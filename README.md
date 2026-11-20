# To-Do List – React Native

A mobile task-management application built with **React Native** and **Expo**. The app allows users to create, organize, update, complete, and delete tasks, with task data stored locally in an SQLite database.

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Features](#2-features)
- [3. Technologies](#3-technologies)
- [4. Project Structure](#4-project-structure)
- [5. Installation and Setup](#5-installation-and-setup)
- [6. Application Architecture](#6-application-architecture)
- [7. Database and Local Storage](#7-database-and-local-storage)
- [8. Task Management](#8-task-management)
- [9. Categories and Filtering](#9-categories-and-filtering)
- [10. Navigation and User Interactions](#10-navigation-and-user-interactions)
- [11. Animations and Gestures](#11-animations-and-gestures)
- [12. Additional Functionality](#12-additional-functionality)
- [13. Conclusion](#13-conclusion)

---

## 1. Project Overview

The To-Do List application is designed to help users manage everyday tasks in one place. It provides functionality for creating and editing tasks, organizing them into categories, changing their completion status, and viewing tasks through different screens.

The application is built with React Native and runs through Expo. It uses **SQLite for local data persistence**, so task and category data is stored on the device rather than relying on a remote backend.

The project focuses on practical mobile-development concepts, including component-based UI development, navigation, asynchronous database operations, reusable services, gestures, and animations.

## 2. Features

### Task Management

- Create new tasks.
- Edit existing tasks.
- Delete tasks.
- Mark tasks as completed or active.
- View all tasks and access task-specific screens.
- Store task information locally between application sessions.

### Categories

- Organize tasks by category.
- Assign a category when creating or editing a task.
- Filter the task list by selecting a category.
- Work with customizable categories.

### Task Details and Scheduling

- Add a task title and description.
- Associate tasks with a date and time where supported by the task form.
- Use a date/time picker when setting scheduling information.

### User Experience

- Bottom-tab and stack-based navigation.
- Different task-card presentations across screens.
- Gesture-based interactions.
- Animations powered by React Native Reanimated.
- Haptic feedback through Expo Haptics.
- Import and export functionality for app data.

## 3. Technologies

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile application framework |
| Expo | Development environment and native module integration |
| JavaScript | Application logic |
| React Navigation | Bottom-tab and stack navigation |
| Expo SQLite | Local relational database |
| React Native Reanimated | Animations and transitions |
| React Native Gesture Handler | Gesture-based interactions |
| Expo Haptics | Haptic feedback |
| Expo Linear Gradient | Gradient-based UI styling |
| Expo DateTimePicker | Native date and time selection |
| React Native Safe Area Context | Safe-area handling |
| React Native Screens | Native screen optimization |
| React Native Element Dropdown | Dropdown selection components |
| Expo Vector Icons | Interface icons |
| Lodash | Utility functions |
| emoji-regex | Emoji-related text handling |

The project uses Expo SDK 57 and React Native 0.86.3 as specified in the current `package.json`.

## 4. Project Structure

The repository separates application source code, static assets, and Expo configuration.

```text
todo-list-react-native/
├── .claude/                 # Project-specific Claude configuration
├── assets/                  # Static application assets
├── src/                     # Application source code
├── App.js                   # Root application component
├── index.js                 # Application entry point
├── app.json                 # Expo configuration
├── babel.config.js           # Babel configuration
├── package.json              # Dependencies and npm scripts
├── package-lock.json         # Locked dependency versions
├── AGENTS.md                 # Repository guidance
└── CLAUDE.md                 # Project-specific instructions
```

The `src` directory contains the application implementation. Database operations, screens, navigation, reusable components, and related logic are kept within the source code rather than being placed in the root configuration files.

## 5. Installation and Setup

### Prerequisites

- Node.js
- npm
- Expo Go or an Android/iOS development environment

### Clone the Repository

```bash
git clone https://github.com/J-Nguyen-web/todo-list-react-native.git
cd todo-list-react-native
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npx expo start
```

The project also provides the following npm scripts:

```bash
npm start
npm run android
npm run ios
npm run web
```

Use the Expo development server to open the application on a compatible device or emulator.

## 6. Application Architecture

The application follows a component-based architecture. Screens compose reusable UI components, while database-related operations are handled asynchronously through SQLite.

The main responsibilities are separated into the following areas:

- **Screens:** Present the different task views and application features.
- **Components:** Provide reusable interface elements.
- **Navigation:** Controls movement between tab screens and stack screens.
- **Database layer:** Initializes the local database and executes SQL operations.
- **Services:** Encapsulate operations such as creating, updating, and deleting records.
- **Assets:** Stores static resources used by the application.

This separation keeps UI rendering independent from the SQL statements used to persist data.

## 7. Database and Local Storage

### SQLite

The application uses **Expo SQLite** with a local database named `todo.db`.

SQLite is a relational database stored on the device. It does not require a remote server or an internet connection for the application's local task-management operations.

The database is used to persist task and category information. Data is read from and written to SQLite through asynchronous database operations.

### Persistence

The application does not depend on AsyncStorage or a hosted database for its task storage. Instead, SQLite provides structured storage and supports operations such as:

- Selecting records for display.
- Inserting new tasks.
- Updating existing task information.
- Changing a task's completion state.
- Deleting records.
- Associating tasks with categories.

Database changes are performed with parameterized SQL queries, keeping values separate from the SQL statement.

## 8. Task Management

Task management implements the main CRUD operations: Create, Read, Update, and Delete.

### Create

When a user creates a task, the application collects the task information and saves a new record in the SQLite database. The task can be associated with a category and other supported task details.

### Read

Task screens retrieve records from SQLite and display them in the appropriate lists. The application can present tasks in different views, including the general task list and category-filtered lists.

### Update

When a task is edited, the application updates the corresponding database record using its unique task ID.

The update operation changes the relevant task fields, such as its title, description, category, and update timestamp.

### Complete and Reopen

A task's completion state is represented in the database using an integer value:

- `0` – active / not completed
- `1` – completed

Toggling the completion state updates the task record in SQLite. This allows the application to distinguish active tasks from completed tasks without deleting either.

### Delete

Deleting a task removes the corresponding record from the local database using its ID.

## 9. Categories and Filtering

Categories provide a way to organize tasks and make larger task lists easier to navigate.

A task can be associated with a category through its category ID. This relationship allows the application to retrieve or filter tasks belonging to a particular category.

The task list supports category-based filtering. Selecting a category card or category option changes which tasks are displayed.

Category filtering is handled through the screen/navigation state and the task data retrieved from SQLite. The selected category determines the subset of tasks shown in the list.

## 10. Navigation and User Interactions

The application uses **React Navigation** with bottom tabs and stack navigation.

- **Bottom-tab navigation** provides access to the main sections of the application.
- **Stack navigation** is used for screens that are opened from another screen, such as task-related screens.
- **Navigation parameters** allow screens to receive values such as a task ID or category ID.

The application also handles tab interactions. For example, selecting a tab can reset or update the active task filter so that the user can return to the unfiltered task list.

## 11. Animations and Gestures

The application uses React Native Reanimated and React Native Gesture Handler to support animated and gesture-based interactions.

- **Reanimated** provides performant animations that run within the React Native animation system.
- **Gesture Handler** provides gesture recognition for interactive elements.
- **Expo Haptics** can provide tactile feedback for supported interactions.

These libraries improve the interaction experience while keeping gesture handling and animation logic separate from database operations.

## 12. Additional Functionality

The application includes additional utilities beyond basic task CRUD:

- **Date and time selection:** Uses a native date/time picker for supported scheduling inputs.
- **Customizable categories:** Allows category information to be managed by the application.
- **Import and export:** Provides functionality for transferring application data.
- **Different task-card styles:** Task cards can be presented differently depending on the screen.
- **Emoji handling:** Uses `emoji-regex` for emoji-related text processing.

## 13. Conclusion

The To-Do List application demonstrates how to build a mobile application with React Native and Expo while keeping data persistence local through SQLite.

It brings together task CRUD operations, category organization and filtering, navigation, native date/time selection, gestures, and animations. The project also demonstrates a separation between interface components and database operations, providing a practical foundation for further React Native development.
