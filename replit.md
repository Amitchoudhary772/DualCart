# ShopMart E-commerce Platform

## Overview

ShopMart is a modern e-commerce platform that combines both direct product sales and affiliate marketing. The application features a React frontend with a TypeScript Express backend, utilizing PostgreSQL with Drizzle ORM for data management. Users can browse and purchase products from the store's inventory while also discovering deals from affiliate partners. The platform includes authentication via Replit Auth, shopping cart functionality, and an admin panel for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with conditional rendering based on authentication status
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management and API interactions
- **Authentication Flow**: Displays different page sets for authenticated vs unauthenticated users

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with centralized error handling middleware
- **Authentication**: Replit OpenID Connect integration with session-based auth
- **Request Logging**: Custom middleware for API request/response logging
- **File Structure**: Modular separation with dedicated files for routes, storage, database, and authentication

### Database Design
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM with schema-first approach
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Session Storage**: Database-backed sessions using connect-pg-simple
- **Migration Strategy**: Drizzle Kit for schema changes and migrations

### Data Models
- **Users**: Core user profiles with admin role support
- **Products**: Store inventory with categories, pricing, and featured status
- **Affiliate Deals**: External partner promotions with discount tracking
- **Cart Items**: User shopping cart with quantity management
- **Contact Messages**: Customer inquiry system
- **Sessions**: Authentication session persistence

### Authentication & Authorization
- **Provider**: Replit OpenID Connect with automatic user provisioning
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Admin Access**: Role-based access control for administrative functions
- **Security**: HTTP-only cookies with secure flags for production

### API Architecture
- **Product Management**: CRUD operations for store products with featured product endpoints
- **Affiliate System**: Management of external deals with active/inactive status
- **Cart Operations**: Add, update, remove, and clear cart functionality
- **User Management**: Profile retrieval and admin user management
- **Contact System**: Message submission and administrative review

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **WebSocket Support**: Real-time database connections via WebSocket constructor

### Authentication Services
- **Replit Auth**: OpenID Connect provider for user authentication and authorization
- **Session Storage**: PostgreSQL-backed session persistence using connect-pg-simple

### Development Tools
- **Vite**: Frontend build tool with React plugin and runtime error overlay
- **Replit Integration**: Development environment with cartographer plugin for enhanced debugging
- **TypeScript**: Full-stack type safety with shared type definitions

### UI & Styling
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Shadcn/ui**: Pre-built component library built on Radix UI primitives
- **Lucide Icons**: Consistent icon system throughout the application

### Utility Libraries
- **TanStack Query**: Server state management with caching and synchronization
- **Zod**: Runtime type validation for API requests and database operations
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Type-safe CSS class composition for component variants