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
        slug: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // its save on db long text
        desc: {
            type: DataTypes.TEXT,
            allowNull: true
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
            type: DataTypes.ENUM("first", "second", "thired"),
            defaultValue: "four",
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        deletedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },{
        paranoid: true
    })

    return Task;
}