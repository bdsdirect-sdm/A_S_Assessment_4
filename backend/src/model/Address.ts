import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

class Address extends Model {}
Address.init({
  company_address: { type: DataTypes.STRING, allowNull: false },
  company_city: { type: DataTypes.STRING, allowNull: false },
  company_state: { type: DataTypes.STRING, allowNull: false },
  company_zip: { type: DataTypes.STRING(6), allowNull: false },
  home_address: { type: DataTypes.STRING, allowNull: false },
  home_city: { type: DataTypes.STRING, allowNull: false },
  home_state: { type: DataTypes.STRING, allowNull: false },
  home_zip: { type: DataTypes.STRING(6), allowNull: false },
  appointment_letter:{ type: DataTypes.STRING, allowNull: true }
}, 
{ sequelize, modelName: 'address' }
);

// Associations
User.hasOne(Address);
Address.belongsTo(User);

export { User, Address };
