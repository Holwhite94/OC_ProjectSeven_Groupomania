// import sequelize
const { Sequelize, DataTypes } = require('sequelize');

// connect to postgresql database 
const sequelize = new Sequelize('Groupomania', 'postgres', 'P3anut23!', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
  });
  
// Post model
const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // create unique id
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,  // true for optional image
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    creator: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
}, 
{ tableName: 'Posts',});

// Comment model

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // create unique id
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    creator: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{ tableName: 'Comments',});

// User model
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


// Associations
Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

Post.belongsTo(User, { foreignKey: 'creator', as: 'postCreator' });
User.hasMany(Post, { foreignKey: 'creator', as: 'userPosts' });

Comment.belongsTo(User, { foreignKey: 'creator', as: 'commentCreator' });
User.hasMany(Comment, { foreignKey: 'creator', as: 'userComments' });


// Sync models
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Models synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });

module.exports = { Post, Comment, User };
