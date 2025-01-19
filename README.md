# Keep Clone Application

Welcome to the **Keep Clone**, a dynamic and feature-rich notes management platform built with a Laravel backend and a React.js frontend. This application offers a seamless and interactive user experience with advanced note-taking capabilities.

## Features

### Notes Management
- **Drag and Drop**: Reorder note cards with a user-friendly drag-and-drop interface.
- **Pin and Archive**: Pin important notes or archive them for future reference.
- **Customizations**:
  - Add background colors or SVG designs to notes.
  - Upload images to enrich your notes.
  - Assign multiple labels to organize notes effectively.
- **Advanced Actions**:
  - Copy existing notes.
  - Select multiple notes to perform batch actions such as pinning, archiving, adding labels, or changing backgrounds.

### Search and Filters (Coming Soon)
- **Search Functionality**: Find notes by background color, labels, image, content, or title.
- **Label-Specific Views**: View all notes associated with a specific label.

### Modals and Management
- **Edit Notes**: Open a modal to edit notes when clicking the edit icon or the note-card.
- **Trash Management (Coming Soon)**:
  - Notes moved to the trash are automatically deleted after 7 days.

### Label Management
- **Custom Labels**: Create, edit, and manage your own labels.
- **Default Labels**: Default labels are available to all users.

### Authentication
- **Sign-In and Sign-Out**: Secure user authentication with sign-in and sign-out functionality.
- **Forgot Password**: Users can reset their passwords using a secure email-based reset process.

### Sharing and Collaboration (Coming Soon)
- **Share Notes**: Share your notes with other users for collaboration.

### Technologies Used
- **Frontend**:
  - `react-hook-form`: Simplifies form handling.
  - `react-hot-toast`: Provides intuitive toast notifications.
  - `react-redux`: Manages state efficiently.
  - `react-router-dom`: Enables seamless routing.
  - `tailwind CSS`: Implements a responsive and aesthetically pleasing design.
  - `dnd-kit-sortable`: Implements a drag and drop sortable notes.
  - `Masonry Layout`: Ensures a responsive and visually appealing notes grid.

## Installation

### Prerequisites
- Ensure you have the following installed:
  - PHP 8.1 or later
  - Composer
  - Node.js and npm
  - MySQL or another database of your choice

### Backend Setup (Laravel)
1. Clone the repository:
   ```bash
   git clone
   cd keep_clone
   ```

2. Install Laravel dependencies:
   ```bash
   composer install
   ```

3. Set up the `.env` file:
   ```env
   APP_NAME=LaravelReactNotes
   APP_ENV=local
   APP_KEY=base64:your_laravel_app_key
   APP_DEBUG=true
   APP_URL=http://localhost

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. Run migrations:
   ```bash
   php artisan migrate
   ```

5. Start the Laravel server:
   ```bash
   php artisan serve
   ```

### Frontend Setup (React.js)
1. Install React dependencies:
   ```bash
   npm install
   ```

2. Start the React development server:
   ```bash
   npm run dev
   ```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.
