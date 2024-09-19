const express = require('express');
// Nos ayuda a la interpretación de los datos que llegan por POST, PUT y PATCH
const bodyParser = require('body-parser');
// Nos ayuda a resolver las métricas con la información que nos ofrece, nos sirve para dev y en producción hay que tener cuidado con los datos sensibles
const morgan = require('morgan');
const routes = require('./routes/index.ts');
const { URL_BASE } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
// Establecemos cabeceras de acceso CORS
app.use((req: any, res: { header: (arg0: string, arg1: string) => void }, next: () => void) => {
    res.header('Access-Control-Allow-Origin', `${URL_BASE}`);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cookie');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});

app.use('/', routes);
// Middleware para manejar errores
app.use(
    (
        err: { status: number; message: any },
        req: any,
        res: {
            status: (arg0: any) => {
                (): any;
                new (): any;
                send: { (arg0: any): void; new (): any };
            };
        },
        next: any
    ) => {
        const status = err.status || 500;
        const message = err.message || err;
        console.error(err);
        res.status(status).send(message);
    }
);

export default app;
