import helmet from 'helmet';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import userRoute from './routes/users.route';
import csrf from 'csurf';

dotenv.config();
const app = express();

//  Apply Helmet early for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'strict-dynamic'"], // Safer alternative to 'unsafe-inline'
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));

//  Rate Limiting to prevent DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
app.use(limiter);

//  CORS configuration
const corsOption = {
  origin: ['http://localhost:5173', 'https://halalbondhon-client.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-XSRF-TOKEN'], //  Added CSRF header
  credentials: true,
};
app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //  Required before csrfProtection

//  CSRF Protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

//  Secure MongoDB Sanitization
app.use(mongoSanitize());

//  Set Secure CSRF Cookie
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: true, secure: true, sameSite: 'strict' });
  next();
});

//  Routes
app.use('/api', userRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('my server');
});

export default app;
