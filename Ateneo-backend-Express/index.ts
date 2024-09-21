import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';

const PORT = process.env['PORT'] || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});