# Profile Explorer Application

A React-based web application that allows users to view and manage profiles with interactive map integration. This application provides functionality for managing user profiles and visualizing their geographic locations.

## Features

### Profile Management
- **View Profiles**: Browse through a collection of user profiles with essential information
- **Admin Panel**: Add, edit, and delete profiles through an administrative interface
- **Search & Filter**: Find profiles by name or location using the search functionality

### Interactive Mapping
- **Location Visualization**: View the geographic location of each profile on an interactive map
- **Error Handling**: Graceful handling of invalid coordinates or map loading issues
- **Loading Indicators**: Visual feedback while maps are loading

### User Experience
- **Responsive Design**: Mobile-friendly interface that adapts to different screen sizes
- **Profile Details**: Detailed view of each profile with comprehensive information
- **Dynamic Authentication**: User registration and login system for secure access

## Technologies Used

- **React**: Frontend library for building the user interface
- **Material-UI**: Component library for consistent styling
- **Google Maps API**: Map integration for location visualization
- **Local Storage**: For persisting user data between sessions
- **Axios**: For fetching profile data from external APIs

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Public Access
- Browse profiles on the home page
- Search for profiles by name or location
- View detailed profile information and locations

### Administrator Access
1. Register a new account or log in with existing credentials
2. Navigate to the Admin Panel
3. Add new profiles with name, contact information, and location coordinates
4. Edit existing profiles to update information
5. Delete profiles that are no longer needed

## Data Structure

Each profile contains the following information:
- First Name and Last Name
- Email and Phone (optional)
- Profile Image
- Location details (city, state)
- Geographic coordinates for map display
- Additional details like birthdate, university, etc. (when available)

## Contributors

- [Your Name] - Project Lead

## License

This project is licensed under the MIT License - see the LICENSE file for details.
