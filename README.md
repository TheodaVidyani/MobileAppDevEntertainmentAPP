# Art Gallery App - Masterpieces at Your Fingertips 🎨🌐

This app brings a stunning collection of artwork from around the world to your device. Users can explore famous masterpieces, view artist details, and search for art by themes, periods, or artists. The app also includes a user authentication system, enabling users to register and log in for a personalized experience.

## Table of Contents 📚
- [Project Description](#project-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [User Authentication](#user-authentication)
- [Navigation](#navigation)

## Project Description 📝

The Art Gallery App is a user-friendly platform to explore, learn, and appreciate art. It fetches data from a publicly available API to display detailed information about various artworks, including titles, artists, and images. The app is designed to inspire art lovers and collectors alike by offering easy access to the art world.

### Features:
- Search and explore a wide range of artworks by keyword or artist 🎨.
- User authentication system with registration and login forms 🔑.
- Interactive UI with detailed artwork cards featuring titles, artists, and images 🖼.
- Floating button to track the number of times a user clicks on an item in the list 🖱️.
- State management using Context API for seamless user experience 🔄.

## Features 🚀

### User Authentication 🔒
- **Registration**: Allows users to sign up with a username and password.
- **Login**: Users can log in with their credentials to access the home page.
- Form validations are implemented for both registration and login forms using hooks.

### Art Collection 🖼
- Fetches artwork data from the public API, `https://collectionapi.metmuseum.org/`.
- Displays detailed information for each artwork, including title, artist, and an image.
- Supports fallback placeholders for artworks without images.

### Floating Button 🦸
- A floating button at the bottom of the screen shows the count of user clicks on items in the list.
- State management for the click count is implemented using Context API or a similar state management solution.

### Navigation 🧭
- Simple navigation using `react-navigation` or `expo-router`.
- After successful login, users are directed to the home page where their username is displayed in the top bar.

## Installation ⚙️

Follow these steps to run the app locally:

1. Clone the repository:

   git clone https://github.com/TheodaVidyani/MobileAppDevEntertainmentAPP.git

2. Navigate to the project directory

3. Install Dependencies

4. Start the development server
npx expo start

## Usage 🔄

Open the app and log in using your credentials.

Explore the art collection by searching for keywords or selecting from the curated list.

Click on an artwork to view its details, including the title, artist name, and image.

Track your interactions with the floating button displaying the click count.

Use the navigation bar to explore different sections of the app.

## Technologies Used 💡

Frontend: React Native, Context API, Expo

Backend: Public Art API (, Metropolitan Museum of Art API)

State Management: Context API

Navigation: React Navigation

## User Authentication 🔐

The app includes a simple yet secure authentication system:

Registration: Users can sign up with a username and password.

Login: Authenticated users can log in to access personalized features.

Passwords are securely managed using hashing or similar techniques.

## Navigation 🛏️

The app offers intuitive navigation:

Home Page: Displays a curated list of popular artworks.

Search: Users can search for specific artworks or artists.

Profile: Allows users to view their activity and preferences.