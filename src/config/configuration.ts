// src/config/configuration.ts

export default () => ({
  // 1. Paramètres de l'application
  // port: parseInt(process.env.PORT, 10) || 3000,
  port: parseInt(process.env.PORT ?? '3000', 10),
  
  // 2. Paramètres de la base de données
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DATABASE_USER || 'nestuser', // Adaptez ces valeurs
    password: process.env.DATABASE_PASSWORD || 'nestpassword', // Adaptez ces valeurs
    database: process.env.DATABASE_NAME || 'blog_api_db',
    
    // Pour l'exercice, nous gardons la synchronisation et le logging depuis le .env
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    logging: process.env.DATABASE_LOGGING === 'true',
  },

  // 3. Paramètres de sécurité (JWT)
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-key-a-changer-en-prod', // TRÈS IMPORTANT: à changer
    expiresIn: process.env.JWT_EXPIRATION_TIME || '60m', // 60 minutes
  },
});