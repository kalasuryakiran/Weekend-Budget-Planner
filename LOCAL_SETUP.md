# Weekend Budget Planner - Local Setup Guide

## Prerequisites
Make sure you have these installed on your computer:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **VS Code** - [Download here](https://code.visualstudio.com/)

## Setup Instructions

### 1. Extract and Open Project
1. Extract the downloaded zip file to your desired location
2. Open VS Code
3. Go to **File → Open Folder** and select the extracted project folder

### 2. Install Dependencies
Open the terminal in VS Code (**Terminal → New Terminal**) and run:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root directory with this content:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
NODE_ENV=development
```

Replace `your_actual_api_key_here` with your Google Gemini API key.

### 4. Get Google Gemini API Key (if you don't have one)
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key and paste it in your `.env` file

### 5. Start the Application
Run the development server:
```bash
npm run dev
```

### 6. Access the Application
- Open your browser and go to **http://localhost:5000**
- You should see the Weekend Budget Planner interface

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check TypeScript

## Project Structure
```
weekend-budget-planner/
├── client/src/          # React frontend
├── server/             # Express backend
├── shared/             # Shared types and schemas
├── package.json        # Dependencies and scripts
└── .env               # Environment variables (create this)
```

## Features
- **Budget Planning**: Input budget and group composition
- **AI Recommendations**: Get personalized movie, transport, and food suggestions
- **Real-time Calculations**: See total costs and remaining budget
- **Group-aware Suggestions**: Different recommendations based on group composition

## Troubleshooting
- **Port 5000 in use**: Change PORT in `.env` to another number like 3000
- **API errors**: Verify your GEMINI_API_KEY is correct in `.env`
- **Build errors**: Delete `node_modules` folder and run `npm install` again