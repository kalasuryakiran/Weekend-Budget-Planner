# Weekend Budget Planner - Local Setup Guide

## Prerequisites

Before running the application on your laptop, ensure you have the following installed:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Git** (for cloning the repository)
   - Download from: https://git-scm.com/

## Installation Steps

### 1. Clone or Download the Project
```bash
# If using Git
git clone <your-repository-url>
cd weekend-budget-planner

# Or download the project files to a folder on your laptop
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add your Google Gemini API key:

```bash
# Create .env file
touch .env

# Add this content to .env file:
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**To get a Gemini API key:**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your .env file

### 4. Build the Application
```bash
npm run build
```

### 5. Start the Application
```bash
# For development (with hot reload)
npm run dev

# For production
npm start
```

### 6. Access the Application
Open your web browser and go to:
```
http://localhost:5000
```

## Folder Structure
```
weekend-budget-planner/
├── client/           # Frontend React application
├── server/           # Backend Express server
├── shared/           # Shared types and schemas
├── package.json      # Dependencies and scripts
├── .env             # Environment variables (create this)
├── vite.config.ts   # Vite configuration
└── README.md        # Project documentation
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run db:push` - Push database schema (if using database)

## Troubleshooting

### Common Issues:

1. **Port 5000 already in use**
   - Stop other applications using port 5000
   - Or change the port in `server/index.ts`

2. **API key not working**
   - Ensure your `.env` file is in the root directory
   - Check that your Gemini API key is valid
   - Restart the server after adding the API key

3. **Dependencies installation fails**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

4. **Build errors**
   - Check Node.js version (should be 18+)
   - Ensure all dependencies are installed

## Production Deployment

For deploying to a server:

1. Set environment variables on your server
2. Run `npm run build`
3. Run `npm start`
4. Configure reverse proxy (nginx/apache) if needed

## Features

- AI-powered budget planning with Google Gemini
- Group composition support (boys/girls)
- Multiple movie showtime suggestions
- Transport and dining recommendations
- Responsive design for all devices
- Real-time budget calculations

## Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all prerequisites are installed
3. Verify your API key is correct
4. Check network connectivity

Enjoy planning your weekend budget!