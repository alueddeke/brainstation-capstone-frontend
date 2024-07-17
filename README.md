# Capstone Gist Application Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
   - [Home Component](#home-component)
   - [Library Sidebar](#library-sidebar)
   - [Edit Functionality](#edit-functionality)
   - [Authentication](#authentication)
   - [Server Integration](#server-integration)
3. [Tools and Dependencies](#tools-and-dependencies)
4. [Getting Started](#getting-started)
5. [Development Scripts](#development-scripts)
6. [Deployment](#deployment)

## Introduction

Capstone Gist is a React-based web application that integrates various AI models to provide users with summarized information on any given topic. Users can interact with different AI models, save responses, and manage their data through an intuitive UI. The application uses Firebase for authentication and Firestore for database management.

## Features

### Home Component

The `Home` component is the central hub of the application. It integrates user authentication, library management, and AI interactions.

#### Functionalities:

- **User Authentication**: Uses Firebase to manage user sessions and access control.
- **Library Management**: Fetches and displays user-specific library items from Firestore.
- **AI Interaction**: Allows users to input topics and select different AI models to generate responses.

### Library Sidebar

The `Library` component provides a sidebar for navigating and managing saved responses.

#### Functionalities:

- **Collapsible Design**: Users can expand or collapse the sidebar for better screen utilization.
- **Interactive List**: Displays saved responses with options to edit, delete, or view details.

### Edit Functionality

The editing feature is managed through `EditForm`, `UpdateResponse`, and `UpdateEditForm` components.

#### Functionalities:

- **In-Place Editing**: Allows users to edit topics and individual points within their saved responses.
- **Dynamic Updates**: Changes are immediately reflected in the UI and saved to Firestore.

### Authentication

Authentication is managed using Firebase OAuth and context API.

#### Functionalities:

- **Multiple Auth Methods**: Supports email/password and Google logins.
- **Context Management**: Uses React Context to provide authentication state across the application.

### Server Integration

The server handles AI interactions and is built with Node.js and Express.

#### Functionalities:

- **AI Model Integration**: Communicates with OpenAI, Google Generative AI, and Perplexity AI to generate content.
- **Error Handling**: Provides robust error handling to manage API failures gracefully.

## Tools and Dependencies

The application uses several key tools and dependencies:

- **React**: For building the user interface.
- **Firebase**: For authentication and Firestore database.
- **Express**: For server-side operations.
- **Axios**: For making HTTP requests.
- **Sass**: For styling components.
- **OpenAI, Google Generative AI, Perplexity AI**: For AI content generation.
- **UUID**: For generating unique identifiers.
- **Vite**: For development and build processes.

## Getting Started

To get started with the application, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd capstone-gist
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:

   ```plaintext
   PORT=3000
   GPT_KEY=your-openai-api-key
   GEMINI_KEY=your-google-generative-ai-key
   PERPLEXITY_KEY=your-perplexity-ai-key
   ```

4. **Start the development server**:
   ```bash
   cd frontend
   npm run dev
   ```
5. **Start the API server**:
   ```bash
   cd backend
   npm start
   ```

## Development Scripts

- **`npm run dev`**: Starts the development server using Vite.
- **`npm run build`**: Builds the application for production.
- **`npm run lint`**: Runs ESLint to check for code quality issues.
- **`npm run preview`**: Previews the production build locally.

## Deployment

To deploy the application, follow the build and deployment process suitable for your hosting environment. Ensure that the environment variables are correctly set in your production environment.
