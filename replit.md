# Overview

LearnFlow is a modern web application serving as a book landing page that showcases an innovative learning methodology book. The application features a sophisticated Apple-inspired glassmorphism design with liquid glass effects, presenting content across multiple sections including hero, about, features, testimonials, author information, purchase options, FAQ, and contact forms. Built with React and Express, it provides both a compelling marketing frontend and a functional backend for handling contact form submissions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using React with TypeScript, utilizing a component-based architecture with modern UI patterns:

- **Component Structure**: Modular section-based components (HeroSection, AboutSection, FeaturesSection, etc.) that compose the main landing page
- **Styling System**: Tailwind CSS with custom glassmorphism effects, following Apple's design language with liquid glass aesthetics
- **UI Components**: Shadcn/ui component library providing consistent, accessible UI elements
- **State Management**: React Query for server state management and form handling
- **Routing**: Wouter for lightweight client-side routing
- **Animation**: Framer Motion for smooth scroll animations and interactive effects

## Backend Architecture

The backend follows a simple Express.js REST API pattern:

- **Server Framework**: Express.js with TypeScript for type safety
- **Storage Layer**: Pluggable storage interface with in-memory implementation (MemStorage class)
- **API Design**: RESTful endpoints for contact form submissions and data retrieval
- **Middleware**: Request logging, JSON parsing, and error handling middleware

## Data Storage Solutions

The application uses a flexible storage abstraction:

- **Storage Interface**: IStorage interface defining methods for user and contact management
- **Current Implementation**: In-memory storage using Map data structures
- **Database Schema**: Drizzle ORM schema definitions for PostgreSQL with contacts and users tables
- **Future Extensibility**: Ready for PostgreSQL integration via Neon Database (configuration present)

## Authentication and Authorization

Currently minimal authentication infrastructure:

- **User Schema**: Basic user model with username/password fields defined in shared schema
- **Contact Forms**: Open submission without authentication requirements
- **Admin Endpoints**: Contact retrieval endpoints exist but lack authentication protection

## Design System

The application implements a sophisticated glassmorphism design system:

- **Visual Theme**: Apple-inspired liquid glass effects with transparency and blur
- **Color Palette**: White, silver, and light blue/mint accents with CSS custom properties
- **Typography**: Inter font family with San Francisco fallbacks
- **Components**: Glass-effect cards, buttons, and panels with subtle shadows and animations
- **Responsive Design**: Mobile-first approach with complete responsive coverage

## Development Workflow

The application is configured for modern development practices:

- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Quality**: ESNext modules with strict TypeScript configuration
- **Development Tools**: Hot module replacement, runtime error overlays, and development banners

# External Dependencies

## Core Framework Dependencies

- **Frontend**: React 18 with TypeScript, Vite build system
- **Backend**: Express.js with TypeScript support
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for runtime type validation and schema creation

## UI and Styling

- **Component Library**: Radix UI primitives via Shadcn/ui
- **Styling**: Tailwind CSS with PostCSS processing
- **Animations**: Framer Motion for complex animations and transitions
- **Icons**: Lucide React for consistent iconography

## Data Management

- **State Management**: TanStack React Query for server state
- **Forms**: React Hook Form with Hookform Resolvers
- **Date Handling**: date-fns for date manipulation utilities

## Database and Deployment

- **Database Provider**: Neon Database (PostgreSQL-compatible serverless)
- **Database Toolkit**: Drizzle Kit for migrations and schema management
- **Session Storage**: Connect-pg-simple for PostgreSQL session storage

## Development Tools

- **Runtime**: tsx for TypeScript execution in development
- **Build Tools**: esbuild for server-side bundling
- **Code Quality**: ESLint and TypeScript compiler for code validation
- **Development Experience**: Replit-specific plugins for enhanced development workflow