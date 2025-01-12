import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const sequelizeOptions: SequelizeOptions = {
  username: POSTGRES_USER || 'postgres',
  host: POSTGRES_HOST || 'postgres',
  database: POSTGRES_DB || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  port: Number(POSTGRES_PORT) || 5432,
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

export const createClientAndConnect = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('  ➜ 🎸 Connected to the');
  } catch (e) {
    console.error(e);
  }
};
