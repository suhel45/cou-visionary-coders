import helmet from 'helmet';
import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import csurf from 'csurf';
import userRoute from './routes/users.route';

const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

const corsOption = {
  origin: ['http://localhost:3000','https://halalbondhon-server.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

//CSRF protection middleware
const csrfProtection = csurf({ cookie: true });

app.use(limiter);
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(csrfProtection);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  }),
);

app.use('/api', userRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('my server');
});

app.get('/csrf-token', (req: Request, res: Response) => {
  res.json({ csrfToken: req.csrfToken() });
});

export default app;
