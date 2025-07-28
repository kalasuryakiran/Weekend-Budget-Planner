# Weekend Budget Planner

## Overview

This is a Weekend Budget Planner web application built with React and Express.js. The application helps users plan their weekend budget for movies, transport, and restaurant food with a default budget of 1000 INR. It integrates with Google's Gemini AI to generate personalized budget plans based on user inputs.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using functional components and hooks
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Font**: Inter font family for clean, modern typography
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Session Storage**: In-memory storage with extensible interface for future database integration
- **API Integration**: Google Gemini AI for budget plan generation
- **Development**: Hot reload with Vite middleware integration

### Data Storage
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Centralized schema definition in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations
- **Current Implementation**: In-memory storage with interface ready for PostgreSQL integration

## Key Components

### Frontend Components
1. **Home Page** (`/client/src/pages/home.tsx`): Main budget planning interface
   - Budget input (default 1000 INR)
   - Number of people selector
   - Generate Plan button with loading states
   - Budget summary display with color-coded remaining budget
   - Categorized plan display (Movies, Transport, Food)

2. **UI Components** (`/client/src/components/ui/`): Comprehensive set of reusable components
   - Form controls (Input, Button, Select, etc.)
   - Layout components (Card, Dialog, Sheet, etc.)
   - Feedback components (Toast, Alert, Loading states)
   - All components follow consistent design system with rounded corners

### Backend Components
1. **Routes** (`/server/routes.ts`): API endpoint definitions (currently minimal)
2. **Storage Interface** (`/server/storage.ts`): Extensible storage abstraction
3. **Vite Integration** (`/server/vite.ts`): Development server with HMR support

### Shared Components
1. **Schema** (`/shared/schema.ts`): Database schema definitions with Zod validation
2. **Types**: TypeScript interfaces shared between frontend and backend

## Data Flow

### Budget Planning Flow
1. User inputs budget amount and number of people
2. Frontend validates inputs and shows loading state
3. Application calls Google Gemini API with structured prompt
4. AI generates JSON response with movies, transport, and food suggestions
5. Frontend calculates total costs and remaining budget
6. Results displayed in categorized sections with visual feedback

### API Integration Pattern
- Frontend uses TanStack Query for API state management
- Centralized API request handling in `/client/src/lib/queryClient.ts`
- Error handling with toast notifications
- Loading states with spinner animations

## External Dependencies

### Core Dependencies
- **Google Gemini AI**: Budget plan generation using `@google/genai`
- **Neon Database**: PostgreSQL hosting with `@neondatabase/serverless`
- **Radix UI**: Headless component primitives for accessibility
- **TanStack Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database operations

### Development Dependencies
- **TypeScript**: Full type safety across the stack
- **Vite**: Fast build tool with HMR
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Fast JavaScript bundling for production

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `/dist/public`
2. **Backend**: ESBuild bundles Express server to `/dist/index.js`
3. **Database**: Drizzle migrations applied via `npm run db:push`

### Environment Configuration
- **Development**: `npm run dev` starts Express server with Vite middleware
- **Production**: `npm run build` then `npm start` serves static files and API
- **Database**: Requires `DATABASE_URL` environment variable

### Production Considerations
- Express serves static files from `/dist/public` in production
- API routes prefixed with `/api` to avoid conflicts
- Error handling middleware for graceful failure responses
- Session storage ready for Redis or database persistence

### Replit Integration
- Configured for Replit environment with development banner
- Cartographer plugin for enhanced debugging
- Runtime error overlay for development feedback
