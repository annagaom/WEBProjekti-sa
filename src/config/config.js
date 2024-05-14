import dotenv from 'dotenv';

dotenv.config();

const config = {
    SECRET_KEY: process.env.SECRET_KEY,
};

export default config;