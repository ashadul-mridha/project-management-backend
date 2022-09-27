module.exports = (sequelize , DataTypes) => {
    const Meeting = sequelize.define("meeting", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: true
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
        }
    },{
        paranoid: true
    })

    return Meeting;
}