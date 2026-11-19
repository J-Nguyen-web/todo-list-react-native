# To-Do List

A lightweight, responsive, category-based task management application built with **HTML, CSS, and vanilla JavaScript**. The app allows users to organize tasks into predefined or custom categories, track completion, and reorder tasks using drag-and-drop interactions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

## Project Overview

The To-Do List is a browser-based application for organizing everyday tasks. Tasks are separated into categories so users can switch between different areas of their activities without mixing their task lists.

The application starts with three predefined categories:

- **Daily** — everyday tasks
- **Work** — work-related tasks
- **Shopping** — shopping lists and errands

Users can also create and delete their own categories. Each category has its own task list, and the interface changes its theme according to the selected category.

## Features

### Task Management

- Add tasks to the currently selected category.
- Mark tasks as completed or uncompleted.
- Delete tasks after confirmation.
- Save task changes automatically.
- Keep task lists separate for each category.

### Category Management

- Start with the predefined Daily, Work, and Shopping categories.
- Create custom categories.
- Prevent empty category names and duplicate category names.
- Delete custom categories together with their associated tasks.
- Switch between categories to display the corresponding task list.

### Drag-and-Drop Reordering

- Reorder tasks using the drag handle.
- Support mouse-based HTML drag-and-drop.
- Support touch-based dragging on mobile devices.
- Use a hold gesture to initiate touch dragging.
- Automatically scroll the page when dragging near the top or bottom of the viewport.
- Save the updated task order after dragging.

### User Interface

- Apply a different visual theme to each predefined category.
- Use a separate theme for custom categories.
- Provide category navigation through a sidebar.
- Scroll to the top when selecting a custom category.
- Use confirmation prompts for destructive actions.
- Adapt the layout for desktop and mobile screen sizes.

## Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Application structure and content |
| CSS3 | Layout, responsive styling, themes, and visual effects |
| JavaScript (ES6+) | Application logic and DOM interactions |
| Web Storage API (`localStorage`) | Persist tasks and categories in the browser |
| HTML Drag and Drop API | Mouse-based task reordering |
| Touch Events API | Touch-based task reordering |
| Vibration API | Optional short vibration feedback when touch dragging starts |

The project uses vanilla JavaScript and does not require a framework, package manager, or external runtime dependencies.

## Project Structure

```text
to-do-list/
├── backgrounds/       # Background assets
├── icons/             # Application icons
├── index.html         # Main HTML document
├── manifest.json      # Web app manifest
├── script.js          # Application logic and storage operations
├── to-do-list.css     # Styling, themes, and responsive layout
└── README.md          # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, or Safari).
- Git, if you want to clone the repository.

No additional dependencies or build tools are required.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/J-Nguyen-web/to-do-list.git
   ```

2. Navigate to the project directory:

   ```bash
   cd to-do-list
   ```

3. Open `index.html` in a web browser.

Alternatively, use a local development server, such as the VS Code Live Server extension
....................

A personal task management app built with React Native and Expo, designed to organize daiily tasks with customizable categories, scheduling, and gesture based interactions.

Task management - Create, edit, complete, and delete tasks.
Schedules - Set dates and times for tasks.
Custom categories - Organize tasks using customizable categories, colors, and emoji icons.
Drag-and-drop reordering - Rearrange tasks with gestures and animated transitions.
Local storage - Persist tas and category data using SQLite
Data import/export - Support for transferring task data.

Tech Stack
- React Native & Expo
- JavaScript
- Expo SQLite
- React Navigation
- React native Raanimated
- Expo Haptics

Getting started

npm Install
npx expo start

SQLite
emoji-regex
one card - different styles for different screens
date time picker
customizable categories
import/export data
