import { Sequelize } from 'sequelize';

const db = new Sequelize('red_social', 'charlie', 'charlie', {
    host: 'localhost',
    dialect: 'mysql'
})
export default db;