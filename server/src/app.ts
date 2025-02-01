import express, {  Express, Request, Response } from 'express';
import cors from 'cors';
const app: Express = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('my server');
});
export default app;