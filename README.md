# FarmDirect Marketplace

FarmDirect Marketplace is a platform that connects farmers with potential buyers. Farmers can register, log in, and upload products (with image upload support), while buyers can browse products and send inquiries. The API is built using Node.js, Express, and TypeScript, with JWT authentication and robust middleware for security and validation.

## Features

- **User Authentication:**
  - Registration and login for farmers and buyers.
  - JWT-based authentication.
- **Role-Based Access:**
  - Products can only be created by farmers.
- **Product Management:**
  - Create, update, and browse products.
  - File upload support for product images using Multer.
- **Inquiry System:**
  - Buyers can send inquiries on products.
- **Security:**
  - HTTP headers protection using Helmet.
  - CORS configuration with production restrictions.
  - Rate limiting middleware to prevent abuse.
- **API Documentation:**
  - Swagger documentation is generated and available at `/api-docs`.

## Technologies & Libraries

- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT, bcrypt for password hashing
- **File Upload:** Multer
- **Logging & Middleware:** Morgan, Helmet, CORS, express-rate-limit
- **API Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)

## Project Structure

```
/src
  /config          - Application configuration (e.g., DB, Swagger setup)
  /controllers     - Route controllers (auth, product, inquiry, etc.)
  /middlewares     - Custom middleware (e.g., auth, role check, file upload)
  /models          - Mongoose models (User, Product, Inquiry)
  /routes          - API endpoint definitions
  /types           - Custom type definitions (e.g., AuthenticatedRequest)
  /utils           - Utility functions (e.g., response formatting)
uploads             - Folder for uploaded images
tsconfig.json       - TypeScript configuration
index.ts            - Application entry point
README.md           - This file
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB instance (local or remote)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/farmdirect-marketplace.git
   cd farmdirect-marketplace/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Create a `.env` file in the root of the server directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/farmdirect
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

4. Create an `uploads/` folder in the project root to store product images.

### Running the Project

Start the development server with:

```bash
npm run dev
```

The server will start on port 3000 (or whatever you set in your `.env` file).

## API Documentation

The API documentation is automatically generated using Swagger. Once the server is running, navigate to:

```
http://localhost:3000/api-docs
```

This documentation covers all endpoints, including authentication routes, product management, and inquiry handling.

## Endpoints Overview

### Authentication
- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Log in an existing user.

### Products
- **POST /api/products:** Create a new product (restricted to users with the farmer role). Supports image file upload.
- **GET /api/products:** Retrieve a list of all products.

### Inquiries
- **POST /api/inquiries:** Create a new inquiry for a specific product.
- **GET /api/inquiries/:productId:** Retrieve inquiries for a given product.

## Middleware & Security

- **authMiddleware:** Verifies JWT tokens and attaches the authenticated user's ID to `req.user`.
- **requireFarmerRole:** Checks that the authenticated user has the role `"farmer"` before allowing product creation.
- **upload:** Uses Multer to handle file uploads for images.
- **helmet & cors:** Improve API security by setting HTTP headers and restricting CORS origins in production.
- **express-rate-limit:** Prevent abusive requests with global rate limiting.

## Testing

Critical flows are covered by tests (using frameworks like Jest and Supertest). To run tests:

```bash
npm run test
```

*Note:* You can add more tests as needed to cover registration, login, product creation, and inquiry flows.

## Future Improvements

- Enhanced validation for inputs across every endpoint.
- Email notifications for inquiries.
- Improved error logging with winston or pino.
- Further separation of business logic into service layers.