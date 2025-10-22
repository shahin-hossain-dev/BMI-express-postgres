import dotenv from 'dotenv';

dotenv.config();

interface TConfig {
  port: number;
  nodeEnv: string;
  saltRound: number;
}

const config: TConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  saltRound: Number(process.env.SALT_ROUND) || 10,
};

export default config;
