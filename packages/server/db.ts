import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const sequelizeOptions: SequelizeOptions = {
  username: POSTGRES_USER || 'postgres',
  host: POSTGRES_HOST || 'localhost',
  database: POSTGRES_DB || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  port: Number(POSTGRES_PORT) || 5432,
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

export async function createClientAndConnect(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('✅ Подключение к базе данных установлено.');

    // Автоматически создаём таблицы, если их нет
    await sequelize.sync({ alter: true });

    console.log('✅ База данных синхронизирована.');
  } catch (e) {
    console.error('❌ Ошибка подключения к базе данных:', e);
  }
}
