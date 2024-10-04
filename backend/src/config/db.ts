import { Sequelize } from "sequelize";

const sequelize = new Sequelize("assessment_4", "root", "Password123#@!", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;