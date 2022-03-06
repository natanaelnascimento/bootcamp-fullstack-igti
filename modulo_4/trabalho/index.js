import express from 'express';
import accountsRouter from './routes/accounts.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/accounts', accountsRouter);

const connectMongoose = async (callback) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        if (callback) callback();
    } catch (error) {
        console.log('Erro ao conectar com o banco de dados: ' + e);
    }
}

const init = (callback) => {
    connectMongoose(() => console.log('Connected to Atlas MongoDB database.'));
    app.listen(process.env.SERVER_PORT, () => console.log('Server started.'));
}

init();