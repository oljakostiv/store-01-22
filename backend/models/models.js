const { INTEGER, STRING } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user',{
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: STRING, unique: true },
    password: { type: STRING },
    role: { type: STRING, defaultValue: "USER" }
});

const Basket = sequelize.define('basket', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
});

const BasketDevice = sequelize.define('basket_device', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
});

const Device = sequelize.define('device', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false},
    price: {type: INTEGER, allowNull: false},
    rating: {type: INTEGER, defaultValue: 0},
    img: {type: STRING, allowNull: false},
});

const Rating = sequelize.define('rating', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: INTEGER, allowNull: false},
});

const DeviceInfo = sequelize.define('device_info', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: STRING, allowNull: false},
    description: {type: STRING, allowNull: false},
});

const Type = sequelize.define('type', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false},
});

const Brand = sequelize.define('brand', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false},
});

const TypeBrand = sequelize.define('type_brand', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true}
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Device.hasMany(BasketDevice);
// Device.hasOne(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Rating,
    DeviceInfo,
    Type,
    Brand,
    TypeBrand
}
