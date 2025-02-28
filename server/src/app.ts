import helmet from 'helmet';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import lusca from 'lusca';
import session from 'express-session';
import userRoute from './routes/users.route';
import { CustomReq } from './interfaces/express';

dotenv.config();

const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

const corsOption = {
  origin: ['http://localhost:3000', 'https://halalbondhon-server.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Session management
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  }),
);

// CSRF protection middleware
const csrfProtection = lusca.csrf({
  cookie: {
    name: '_csrf',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    },
  },
});

app.use(limiter);
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(csrfProtection);

// Helmet configuration for XSS protection
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    xssFilter: true,
  })
);

app.use('/api', userRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('my server');
});

app.get('/csrf-token', (req: Request, res: Response) => {
  res.json({ csrfToken: (req as CustomReq).csrfToken() });
});

export default app;
