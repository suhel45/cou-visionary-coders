import express, {  Express, Request, Response } from 'express';
const app: Express = express();
app.disable('x-powered-by');

app.get('/', (req: Request, res: Response) => {
  res.send('my server');
});
export default app;