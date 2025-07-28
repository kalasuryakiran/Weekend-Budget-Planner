# Weekend Budget Planner

A comprehensive full-stack web application for planning weekend activities within your budget. Get AI-powered recommendations for movies, transport, and dining based on your group composition and budget constraints.

## 🚀 Quick Start

### For Replit (Online)
1. Fork this repl
2. Add your Google Gemini API key to Replit Secrets as `GEMINI_API_KEY`
3. Click Run - the app will be available at your repl URL

### For Local Development (VS Code)
1. Download/clone this repository
2. Open in VS Code
3. Install dependencies: `npm install`
4. Create `.env` file with your API key (see `.env.example`)
5. Start development server: `npm run dev`
6. Open http://localhost:5000

## 📋 Features

- **Smart Budget Planning**: Input your total budget and group size
- **Group-Aware Recommendations**: Different suggestions for mixed groups, boys-only, or girls-only
- **Real-time Cost Calculation**: See total costs and remaining budget instantly
- **AI-Powered Suggestions**: Personalized movie, transport, and restaurant recommendations
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **AI**: Google Gemini API
- **UI Components**: Shadcn/ui + Radix UI
- **Build Tool**: Vite
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod validation

## 📝 How to Use

1. **Set Your Budget**: Enter your total weekend budget in INR
2. **Group Details**: Specify number of people and optional gender breakdown
3. **Generate Plan**: Click "Generate Budget Plan" for AI recommendations
4. **Review Suggestions**: See personalized movie, transport, and food options
5. **Check Budget**: View total costs and remaining budget

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

Get your free Gemini API key at [Google AI Studio](https://aistudio.google.com/app/apikey)

## 📁 Project Structure

```
├── client/src/          # React frontend application
│   ├── components/ui/   # Reusable UI components
│   ├── pages/          # Page components
│   └── lib/            # Utilities and query client
├── server/             # Express backend
│   ├── routes.ts       # API endpoints
│   └── storage.ts      # Data storage interface
├── shared/             # Shared TypeScript types
└── package.json        # Dependencies and scripts
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.