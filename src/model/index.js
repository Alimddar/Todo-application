import { sequelize } from "../config/database.js";
import { User } from "./users.js";
import { Task } from "./tasks.js";

// Relations
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

export const syncModels = async () => {
  await sequelize.sync({ alter: true });
  return "All models were synchronized successfully.";
};
