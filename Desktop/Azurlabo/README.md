# Azurlabo - Dental Equipment E-commerce

A modern e-commerce platform specialized in dental equipment, built with Node.js, Express, and Stripe integration.

## Features

- Product browsing and shopping cart functionality
- Secure payment processing with Stripe
- Responsive design for all devices
- User-friendly interface

## Technologies Used

- Node.js
- Express.js
- EJS templating
- Stripe Payment Integration
- Bootstrap for styling

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Start the server:
```bash
npm start
```

## Payment Integration

The application uses Stripe for payment processing. A simplified test implementation is available in `test-payment.js`.

## Security

- Environment variables are used for sensitive data
- Payment processing is handled securely through Stripe
- Session management for user data

## License

ISC
