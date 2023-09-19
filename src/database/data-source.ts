import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "alcidesbezerra",
  password: "alcidesbezerra123",
  database: "api-softex",
});
