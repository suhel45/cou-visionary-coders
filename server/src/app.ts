import helmet from 'helmet';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './routes/users.route';
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api/v1', userRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('my server');
});
export default app;
