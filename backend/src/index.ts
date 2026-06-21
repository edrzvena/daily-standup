import app from './app';
import { env } from './config/env';

app.listen(env.port, () => {
  console.log(`Server jalan di http://localhost:${env.port}`);
  console.log(`Environment: ${env.nodeEnv}`);
});