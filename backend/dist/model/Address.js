"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
class Address extends sequelize_1.Model {
}
exports.Address = Address;
Address.init({
    company_address: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    company_city: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    company_state: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    company_zip: { type: sequelize_1.DataTypes.STRING(6), allowNull: false },
    home_address: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    home_city: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    home_state: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    home_zip: { type: sequelize_1.DataTypes.STRING(6), allowNull: false },
    appointment_letter: { type: sequelize_1.DataTypes.STRING, allowNull: true }
}, { sequelize: db_1.default, modelName: 'address' });
// Associations
User_1.default.hasOne(Address);
Address.belongsTo(User_1.default);
