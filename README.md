# Travel Checklist

Travel Checklist is a simple full-stack web application designed to help users organize the items they need for their trips.

The application features a dynamic checklist, persistent storage using MySQL, and a small interactive companion bot that reacts to the checklist.

Built with vanilla JavaScript, Node.js, Express, and MySQL.

## Features

- **Dynamic Checklist:** Add new items and display them immediately in the interface.
- **Persistent Storage:** Save and retrieve checklist items through a REST API connected to MySQL.
- **Interactive Bot:** A rule-based companion that keeps track of checklist items and displays contextual or playful messages.
- **Automatic Bot Messages:** The bot periodically interacts with the user and can also be triggered by clicking its avatar.
- **Modular Frontend:** Separate JavaScript modules for application logic, API configuration, and bot behavior.

## Tech Stack

| Layer    | Technologies                         |
| -------- | ------------------------------------ |
| Frontend | HTML5, CSS3, JavaScript (ES Modules) |
| Backend  | Node.js, Express.js                  |
| Database | MySQL                                |
| Other    | dotenv, CORS, mysql2                 |

## Project Structure

```text
travel_checklist/
├── database/                 # Database setup
│   └── schema.sql            # MySQL database schema
│
├── public/                   # Frontend
│   ├── css/                  # Stylesheets
│   ├── js/
│   │   ├── bot.js            # Interactive bot logic
│   │   ├── config.js         # API endpoint configuration
│   │   └── script.js         # Application logic and DOM interactions
│   └── index.html            # Main HTML page
│
├── server/                   # Backend
│   ├── models/
│   │   ├── database.js       # MySQL connection pool
│   │   └── itemsModel.js     # Database operations
│   ├── routes/
│   │   └── items.js          # API routes
│   ├── .env.example          # Environment variable template
│   ├── app.js                # Express application entry point
│   ├── package.json          # Dependencies and scripts
│   └── package-lock.json     # Dependency lockfile
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/travel_checklist.git
cd travel_checklist
```

**2. Install backend dependencies**

```bash
cd server
npm install
```

**3. Set up the database**

Create the MySQL database and its required tables by executing the SQL script located at:

```text
database/schema.sql
```

For example, from the project root, using the MySQL command-line client:

```bash
mysql -u root -p < database/schema.sql
```

This will initialize the `my_application` database and its `ITEMS` table, provided the SQL script includes the database creation statement.

**4. Configure environment variables**

Create a `.env` file inside the `server/` directory using `.env.example` as a reference.

The following environment variables are required:

```dotenv
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=my_application
```

Replace the placeholder values with your local MySQL credentials.

**5. Start the application**

From the `server/` directory, run:

```bash
node app.js
```

The Express server will start on port `3000`, serving both the frontend and the REST API.

**6. Open the application**

Open your browser and navigate to:

http://localhost:3000

The application should now be accessible locally.

## Architecture

The application follows a simple client-server architecture:

- **Frontend:** Built with vanilla JavaScript, HTML, and CSS. Handles user interactions, dynamically updates the checklist, communicates with the backend through HTTP requests, and manages the companion bot.
- **Backend:** Built with Node.js and Express.js. Serves the frontend's static files, exposes REST API endpoints, and processes requests.
- **Database:** Uses MySQL to persist checklist items. Database access is handled through a connection pool provided by `mysql2`.

The backend is organized into routes and models to separate API request handling from database operations.

The frontend uses JavaScript ES Modules to separate application logic, API configuration, and bot behavior.

### Companion Bot

The application includes a small rule-based bot implemented as a JavaScript class.

The bot maintains an in-memory list of checklist items and generates messages based on its current state. It can interact with users automatically at randomized intervals or respond when its avatar is clicked.

The bot runs entirely on the client side and does not require any external AI services.

## Environment Variables

Sensitive configuration values, such as database credentials, are stored in a `.env` file and loaded using `dotenv`.

The `.env` file is excluded from version control through `.gitignore`.

A `.env.example` file is provided to document the required configuration without exposing sensitive information.

## About

This project was developed as a personal learning experience, exploring full-stack web development, REST API integration, database persistence, and interactive frontend functionality.
