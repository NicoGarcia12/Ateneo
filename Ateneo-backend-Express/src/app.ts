import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import router from './routes';

dotenv.config();

const app = express();
const { URL_BASE } = process.env;

// Middlewares
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));

// Configuración de CORS
app.use(
    cors({
        origin: URL_BASE,
        credentials: true
    })
);

// Rutas
app.use('/', router);

// Middleware para manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`Error ${status}: ${message}`);
    res.status(status).json({
        status,
        message
    });
});

export default app;
