import helmet from 'helmet';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import userRoute from './routes/users.route';
//import csrf from 'csurf';
dotenv.config();
// Remember , its need fix for sonarcube
const app = express();
//const csrfProtection = csrf({ cookie: true });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

const corsOption = {
  origin: ['http://localhost:5173', 'https://halalbondhon-client.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept','Authorization','credentials'],
  credentials: true,
};

//app.use(csrfProtection);
app.use(limiter);
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());

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
  }),
);

// app.use((req, res, next) => {
//   res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false, secure: true, sameSite: 'strict' });
//   next();
// });

app.use('/api', userRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('my server');
});

export default app;
