/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express, { Request, Response, NextFunction, Application } from 'express';
import dutyRoutes from './routes/dutyRoutes';
import bodyParser from 'body-parser';

const app: Application = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

interface HttpException extends Error {
    status?: number;
}
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Ocurrió un error inesperado.';
    res.status(status).json({ message });
});
app.use(dutyRoutes);

export default app;
