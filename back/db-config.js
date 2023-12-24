
// connecting to the database using sequelize https://sequelize.org/docs/v6/getting-started/
// const pg = require('pg');




const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Groupomania', 'postgres', 'P3anut23!', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false
}); 

// testing connection


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
}

// Execute the test connection function
testConnection();

module.exports = sequelize;