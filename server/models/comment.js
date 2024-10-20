const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Comments extends Model {}

Comments.init (
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blogPosts',
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'Comments',
        tableName: 'comments',
        timestamps: true,
    }
);



module.exports = Comments;