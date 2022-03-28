import dotenv from 'dotenv';
dotenv.config();

const database = {
  url: process.env.MONGODB_URL as string,
}

export {
  database
}