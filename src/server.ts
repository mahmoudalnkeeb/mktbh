import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import cors from 'cors';
import vars from './configs/env';
import router from './routes/router';
import path from 'path';

const app: Express = express();
const port: number = vars.port as number;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: vars.origins }));
app.use(
  morgan('common', {
    stream: fs.createWriteStream(
      path.resolve(path.join(__dirname, 'logs/requests.log')),
      { flags: 'a' },
    ),
  }),
);
app.use(morgan('dev'));
app.use(router);

app.use((req: Request, res: Response) =>
  res.status(404).json({ success: false, message: 'Not Found' }),
);

const server = app.listen(port, () =>
  console.log(`app running on port ${port}`),
);

// add it to seprate file
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

export default app;
