// import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "orm_age.db",
//   logging: console.log,
//   logQueryParameters: true,
// });

// export const initDatabase = async () => {
//   await sequelize.drop(); // Clears tables before sync
//   await sequelize.sync();

//   //seed the data base
//   await sequelize.query(`
//         INSERT INTO Calculations 
//             (id, age, years, nextage, createdAt, updatedAt) VALUES
//                 (1, 35, 5, 40, date(), date()), 
//                 (2, 35, 10, 45, date(), date())`);

//     await sequelize.query(`
//         INSERT INTO People (id, name, createdAt, updatedAt) VALUES
//             (1, 'Alice', date(), date()), (2, "Bob", date(), date())`);

//     await sequelize.query(`
//         INSERT INTO ResultModels
//                 (calculationId, personId, createdAt, updatedAt) VALUES
//             (1, 1, date(), date()), (2, 2, date(), date()), 
//             (2, 1, date(), date());`);
// };
