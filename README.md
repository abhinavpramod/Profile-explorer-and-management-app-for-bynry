# Profile Explorer and Management Application

A React-based web application for exploring and managing user profiles with interactive map visualization. Users can view profiles, see their geographic locations on maps, and administrators can manage profile data.

## Features

### Profile Management
- **Profile Browsing**: View a collection of profile cards with user information
- **Detailed Profile View**: Access comprehensive information about each profile
- **Admin Panel**: Add, edit, and delete profiles (accessible to admin users only)
- **Search Functionality**: Find profiles by name, email, or company

### Interactive Map Features
- **Individual Location Maps**: View the specific location of each profile
- **World Map View**: See all profile locations on a global map
- **Location Details**: View additional geographic information about profile locations

### User Experience
- **Responsive Design**: Works on various screen sizes and devices
- **Authentication System**: Register and login functionality with role-based access
- **Local Storage**: Profile and user data persistence between sessions

## Technical Implementation

- **Frontend Framework**: React (Create React App)
- **UI Components**: Material-UI (MUI)
- **Routing**: React Router for navigation between pages
- **Map Integration**: Google Maps iframe implementation
- **State Management**: React's useState and useEffect hooks
- **Data Storage**: localStorage for profile and user data persistence
- **Authentication**: Simple localStorage-based authentication system

## Project Structure

```
src/
├── components/         # UI components
│   ├── AdminPanel.jsx  # Admin dashboard for profile management
│   ├── Card.jsx        # Profile card component
│   ├── CardWrapper.jsx # Container for profile cards
│   ├── Detail.jsx      # Detailed profile view
│   ├── Login.jsx       # User login form
│   ├── Map.jsx         # Individual profile map component
│   ├── Navbar.jsx      # Navigation bar component
│   ├── Signup.jsx      # User registration form
│   └── WorldMap.jsx    # Global map view for all profiles
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/abhinavpramod/Profile-explorer-and-management-app-for-bynry.git
   ```

2. Navigate to the project directory:
   ```
   cd Profile-explorer-and-management-app-for-bynry
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage Guide

### Public User Access
- Browse profile cards on the home page
- Search for profiles using the search bar
- Click on a profile card to view detailed information

### Authenticated User Access
- Register a new account or log in with existing credentials
- Access the world map view to see all profile locations
- View detailed profile information including maps

### Administrator Access
- Log in with admin credentials
- Access the Admin Panel from the navbar
- Add new profiles with personal, contact, and location information
- Edit existing profiles to update their information
- Delete profiles from the system
- Reset to default profile data when needed

## Data Structure

Each profile contains:
- Personal info (name, bio, image)
- Contact details (email, phone)
- Company information
- Address and geographic coordinates
- Additional details (skills, education, languages, hobbies)

## Potential Improvements

- Backend integration with a real API instead of localStorage
- State management using Context API or Redux
- TypeScript implementation for type safety
- Environment configuration for different deployment stages
- Improved security for authentication system
- Responsive design enhancements for mobile users
- Real map API integration instead of iframes

## License

This project is licensed under the MIT License - see the LICENSE file for details.
