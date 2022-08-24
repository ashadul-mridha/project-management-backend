module.exports = (sequelize , DataTypes) => {
    const Task = sequelize.define("task", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM("first", "second", "thired","four"),
            defaultValue: "four",
        },
        remain: {
            type: DataTypes.DATE,
            allowNull: true
        },
        // isComplete: {
        //     type: DataTypes.ENUM(true, false),
        //     defaultValue: false,
        // }
    })

    return Task;
}