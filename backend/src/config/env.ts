import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['ANTHROPIC_API_KEY'] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY as string,
  allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
};
