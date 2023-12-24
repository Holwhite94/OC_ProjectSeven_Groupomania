// model for user ( userId, firstName, secondName, email, password)
// https://sequelize.org/docs/v6/core-concepts/model-basics/

// const databaseConfig = require('../db-config');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Groupomania', 'postgres', 'P3anut23!', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
  });


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secondName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// After being defined, we can access our model with sequelize.models.User / console.log(User === sequelize.models.User);

module.exports = User;

// sync model with table

User.sync({ alter: true }).then((data) => {
    console.log("Table synced successfully")
}).catch((error) => {
    console.log("Error syncing table!")
    console.log(error)
})