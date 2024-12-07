import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI;

export default { mongoUri };
