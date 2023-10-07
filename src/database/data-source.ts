import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Product } from "../entities/product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "alcidesbezerra",
  password: "alcidesbezerra123",
  database: "api-softex",
  entities: [User, Product],
  synchronize: true,
});
