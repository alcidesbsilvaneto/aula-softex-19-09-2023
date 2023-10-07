import express from "express";
import {
  atualizarUsuario,
  cadastrarUsuario,
  deletarUsuario,
  listarUsuarios,
} from "./controllers/user";


import ProductController from "./controllers/product";

const app = express();

app.use(express.json());

// Rotas usuarios
app.post("/users", cadastrarUsuario);
app.get("/users", listarUsuarios);
app.patch("/users/:user_id", atualizarUsuario);
app.delete("/users/:user_id", deletarUsuario);

// Rotas produtos
app.post("/products", ProductController.createProduct)
app.get('/products', ProductController.listProducts)


export default app;
