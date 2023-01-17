module.exports = (sequelize , DataTypes) => {
    const BookingUser = sequelize.define("booking_user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        bookingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
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
        }
    },{
        paranoid: true
    })

    return BookingUser;
}