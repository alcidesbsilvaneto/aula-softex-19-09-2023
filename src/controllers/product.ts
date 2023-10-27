import { Request, Response } from "express";

import { Product } from "../entities/product";
import { AppDataSource } from "../database/data-source";

class ProductController {
  async createProduct(req: Request, res: Response) {
    console.log(req.body);
    const { title, price, color, size, user_id } = req.body;

    if (!title) {
      return res.status(400).json({ message: "O campo title é obrigatório" });
    }

    if (!price) {
      return res.status(400).json({ message: "O campo price é obrigatório" });
    }

    if (!color) {
      return res.status(400).json({ message: "O campo color é obrigatório" });
    }

    if (!size) {
      return res.status(400).json({ message: "O campo size é obrigatório" });
    }

    if (!user_id) {
      return res.status(400).json({ message: "O campo user_id é obrigatório" });
    }

    try {
      const product = await AppDataSource.getRepository(Product).save({
        title,
        price,
        color,
        size,
        user_id,
      });

      return res.status(201).json(product);
    } catch (error) {
      console.log(error, "erro ao salvar produto");
      return res.status(500).json(error);
    }
  }

  async listProducts(req: Request, res: Response) {
    try {
      const products = await AppDataSource.getRepository(Product).find({
        relations: ["user"],
      });
      return res.status(200).json(products);
    } catch (error) {
      console.log(error, "erro ao listar produtos");
      return res
        .status(500)
        .json({ message: "Erro ao listar produto, tente novamente" });
    }
  }

  async updateProduct(req: Request, res: Response) {
    const { product_id } = req.params;

    try {
      const product = await AppDataSource.getRepository(Product).findOne({
        where: { id: +product_id },
      });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      if (req.body.price) product.price = req.body.price;
      if (req.body.title) product.title = req.body.title;

      await AppDataSource.getRepository(Product).save(product);

      return res.status(200).send({ ok: true, product });
    } catch (error) {
      console.log(error, "erro ao atualizar produto");
      return res
        .status(500)
        .json({ message: "Erro ao atualizar produto, tente novamente" });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { product_id } = req.params;

    try {
      const product = await AppDataSource.getRepository(Product).findOne({
        where: { id: +product_id },
      });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await AppDataSource.getRepository(Product).softRemove(product);

      return res.status(200).send({ ok: true });
    } catch (error) {
      console.log(error, "erro ao deletar produto");
      return res
        .status(500)
        .json({ message: "Erro ao deletar produto, tente novamente" });
    }
  }
}

export default new ProductController();
