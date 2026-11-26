const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Like = sequelize.define("Like",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            }
        },
        videoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "videos",
                key: "id",
            }
        },
    },
    {
        tableName: "likes",
        timestamps: true,
        indexes: [  // Garante q um usuário só pode curtir uma vez um video
            {
                fields: ['user_id', 'video_id'],
                unique: true,
                name: 'idx_unique_like'
            }
        ]
    }
);

module.exports = Like;