module.exports = (sequelize , DataTypes) => {
    const Booking = sequelize.define("booking", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        place: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        clientName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clientPhone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clientEmail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clientAddress: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        desc: {
            type: DataTypes.TEXT,
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

    return Booking;
}