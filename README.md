# 🪁 YourKite - Full Stack Trading Platform

A comprehensive stock trading platform inspired by Zerodha, built with modern web technologies featuring real-time stock prices, portfolio management, and secure authentication.

## ✨ Features

### 🔐 Authentication & Security
- **Secure User Registration** - Create new trading accounts with email validation
- **Session-based Authentication** - Login/logout with persistent sessions stored in MongoDB
- **Single Session Policy** - Automatic logout when user logs in from another device
- **Protected API Routes** - All trading operations require authentication
- **Secure Password Handling** - Bcrypt encryption with Passport.js integration

### 📊 Trading Operations
- **Real-time Stock Prices** - Live price updates every second for 22 major Indian stocks
- **Market Indices Tracking** - Live NIFTY 50 and SENSEX with percentage changes
- **Instant Order Execution** - Buy/sell orders with immediate portfolio updates
- **Market Simulation** - Realistic price movements with volatility patterns
- **Order History** - Complete transaction records with timestamps

### 💰 Portfolio Management
- **Holdings Tracking** - Current stock positions with average price calculations
- **Fund Management** - Add money to trading account with balance tracking
- **Automatic P&L Calculation** - Real-time profit/loss based on current market prices
- **Position Monitoring** - Track individual stock performance and day changes
- **Portfolio Summary** - Total investment value and available funds display

### 💹 Dashboard Features
- **Live Portfolio Value** - Real-time portfolio worth with market price updates
- **Interactive Trading Interface** - Clean, responsive design for all devices
- **Multi-tab Layout** - Summary, Holdings, Orders, and Funds sections
- **Real-time Data Sync** - Live updates without page refresh
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🛠️ Technology Stack

### Frontend Technologies
- **React.js (v19.1.0)** - Modern UI library with functional components and hooks
- **Vite** - Fast development build tool with hot module replacement
- **Axios** - HTTP client with request/response interceptors for API communication
- **React Router DOM (v7.6.3)** - Client-side routing with protected routes
- **CSS3** - Custom styling with flexbox and responsive design
- **FontAwesome** - Comprehensive icon library for UI elements

### Backend Technologies
- **Node.js** - JavaScript runtime environment for server-side development
- **Express.js** - Web application framework with middleware support
- **MongoDB** - NoSQL database with flexible document structure
- **Mongoose** - Object modeling library with schema validation
- **Passport.js** - Authentication middleware with local strategy
- **Express-session** - Session management with secure cookie handling
- **Connect-mongo** - MongoDB session store for persistent sessions
- **CORS** - Cross-origin resource sharing configuration
- **Node-cache** - In-memory caching for real-time stock data
- **Bcrypt** - Password hashing and salting for security

### Database Architecture
- **MongoDB Atlas** - Cloud-hosted database with automatic scaling
- **User Model** - Authentication, profile data, and session management
- **Holdings Model** - Stock portfolio tracking with user isolation
- **Orders Model** - Complete transaction history with buy/sell records
- **Funds Model** - Account balance and transaction tracking
- **Session Store** - Persistent login sessions with TTL expiration

### Real-time Features
- **Stock Price Simulation** - Live market data updates every 1 second
- **Market Day Simulation** - Day-end price resets every 5 minutes
- **Volatility Modeling** - Realistic price movements with trend patterns
- **Live P&L Updates** - Portfolio value changes in real-time
- **Session Management** - Real-time authentication state tracking

## 🏗️ Project Architecture

```
YourKite/
├── 📁 frontend/              # Landing Page (React + Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── public/              # Static assets and favicon
│   └── package.json         # Frontend dependencies
│
├── 📁 dashboard/             # Trading Dashboard (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx     # Main dashboard container
│   │   │   ├── Summary.jsx  # Portfolio summary with live data
│   │   │   ├── Holdings.jsx # Stock holdings with P&L
│   │   │   ├── Orders.jsx   # Transaction history display
│   │   │   └── Funds.jsx    # Account balance management
│   │   ├── App.jsx          # Dashboard root with global error handling
│   │   └── main.jsx         # Dashboard entry point
│   └── package.json         # Dashboard dependencies
│
└── 📁 backend/               # API Server (Node.js + Express)
    ├── model/
    │   ├── UserModel.js     # User authentication and profile schema
    │   ├── HoldingsModel.js # Stock portfolio schema with user reference
    │   ├── OrdersModel.js   # Trading orders schema with timestamps
    │   └── FundsModel.js    # Account balance and transaction schema
    ├── index.js             # Express server with all API routes
    └── package.json         # Backend dependencies
```

## 🔗 API Endpoints

### Authentication APIs
- `POST /signup` - Create new user account with initial ₹2,000 funds
- `POST /login` - User authentication with session creation and device management
- `POST /logout` - End user session with cleanup
- `GET /check-auth` - Verify authentication status and session validity

### Real-time Market Data APIs
- `GET /api/watchlist` - Fetch live stock prices for 22 Indian stocks with percentage changes
- `GET /api/indices` - Get market indices (NIFTY 50, SENSEX) with real-time updates

### Trading APIs
- `POST /newOrder` - Place buy/sell order with automatic portfolio and fund updates
- `GET /allOrders` - Retrieve user's complete order history with timestamps

### Portfolio Management APIs
- `GET /allHoldings` - Get user's current stock holdings with average prices
- `GET /allPositions` - Fetch current trading positions
- `GET /Funds` - Get account balance with available and used funds
- `POST /addfunds` - Add money to trading account with balance updates

## 📊 Database Schema

### User Model (Passport.js Integration)
```javascript
- name: String (user's full name)
- username: String (unique identifier)
- email: String (unique, validated)
- password: String (bcrypt hashed)
- salt: String (passport local strategy)
- createdAt: Date (auto-generated)
```

### Holdings Model
```javascript
- name: String (stock symbol)
- qty: Number (shares owned)
- avg: Number (average purchase price)
- price: Number (current market price)
- net: String (net percentage change)
- day: String (day percentage change)
- user: ObjectId (reference to User model)
```

### Orders Model
```javascript
- name: String (stock symbol)
- qty: Number (shares traded)
- price: Number (execution price)
- mode: String (BUY/SELL)
- user: ObjectId (reference to User model)
- timestamp: Date (auto-generated)
```

### Funds Model
```javascript
- available: Number (available balance)
- used: Number (invested amount)
- payin: Number (total money added)
- user: ObjectId (reference to User model)
```

## 🌟 Key Technical Achievements

### Real-time Stock Market Simulation
- **22 Indian Stocks** - INFY, TCS, RELIANCE, HDFCBANK, ICICIBANK, SBIN, etc.
- **Market Indices** - NIFTY 50 and SENSEX with live tracking
- **Price Volatility** - Realistic 0.4% stock volatility and 0.02% index volatility
- **Market Sessions** - Simulated trading days with end-of-day price resets
- **Node-cache Integration** - In-memory caching for fast price updates

### Advanced Authentication System
- **Passport.js Local Strategy** - Secure username/password authentication
- **Session Management** - MongoDB session store with 7-day TTL
- **Single Device Policy** - Automatic logout on new device login
- **Session Validation** - Real-time session verification on each request
- **CORS Security** - Proper cross-origin configuration for production

### Automated Trading Logic
- **Portfolio Updates** - Automatic holdings calculation on buy/sell orders
- **Fund Management** - Real-time balance updates with order execution
- **Average Price Calculation** - Weighted average for multiple purchases
- **Position Tracking** - Complete buy/sell position management
- **Data Integrity** - User-specific data isolation with MongoDB references

### Production-Ready Architecture
- **Environment Configuration** - Secure environment variable management
- **Error Handling** - Comprehensive error responses with proper HTTP status codes
- **RESTful Design** - Proper HTTP methods and resource-based URLs
- **Database Optimization** - Efficient queries with user-specific data filtering
- **Security Best Practices** - Session security, CORS configuration, password encryption

## 🎯 Live Stock Data (22 Stocks Tracked)

### Banking & Financial Services
- **HDFCBANK** - HDFC Bank Limited
- **ICICIBANK** - ICICI Bank Limited
- **SBIN** - State Bank of India
- **KOTAKBANK** - Kotak Mahindra Bank
- **BAJFINANCE** - Bajaj Finance Limited
- **AXISBANK** - Axis Bank Limited

### Information Technology
- **INFY** - Infosys Limited
- **TCS** - Tata Consultancy Services
- **WIPRO** - Wipro Limited
- **KPITTECH** - KPIT Technologies

### Oil & Gas / Energy
- **ONGC** - Oil and Natural Gas Corporation
- **RELIANCE** - Reliance Industries
- **TATAPOWER** - Tata Power Company

### Automotive & Manufacturing
- **M&M** - Mahindra & Mahindra
- **MARUTI** - Maruti Suzuki India
- **L&T** - Larsen & Toubro

### Consumer Goods & FMCG
- **HINDUNILVR** - Hindustan Unilever
- **ITC** - ITC Limited
- **ASIANPAINT** - Asian Paints

### Telecommunications & Aerospace
- **BHARTIARTL** - Bharti Airtel
- **HAL** - Hindustan Aeronautics Limited
- **QUICKHEAL** - Quick Heal Technologies

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/yourkite-trading-platform.git
   cd yourkite-trading-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your MongoDB URL and session secret in .env
   npm start
   ```

3. **Dashboard Setup**
   ```bash
   cd ../dashboard
   npm install
   npm run dev
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

### Environment Configuration

Create `.env` file in the backend folder:
```env
MONGO_URL=your_mongodb_atlas_connection_string
SESSION_SECRET=your_secure_session_secret_key_minimum_32_characters
PORT=3000
NODE_ENV=development
```

## 🎯 Key Features Implemented

### User Experience
- **Initial Funding** - New users get ₹2,000 starting balance
- **Real-time Updates** - Stock prices update every second
- **Responsive Design** - Works on all devices and screen sizes
- **Clean Interface** - Intuitive trading dashboard with clear navigation
- **Error Handling** - User-friendly error messages and loading states

### Technical Excellence
- **Session Security** - Secure cookie configuration with httpOnly and sameSite
- **Data Validation** - Input validation and sanitization on all endpoints
- **Performance Optimization** - Efficient database queries and caching
- **Scalable Architecture** - Modular code structure for easy maintenance
- **Production Ready** - Environment-based configuration and CORS setup



## 🙏 Acknowledgments

- Inspired by Zerodha's clean and intuitive trading interface
- Built for educational purposes and portfolio demonstration
- Uses simulated stock data for learning and development
- Indian stock market symbols and realistic price movements

---

⭐ **Star this repository if you found it helpful!**
