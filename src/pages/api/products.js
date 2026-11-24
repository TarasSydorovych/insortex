import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";
import { languages } from "../../app/i18n/settings";

const translatedFields = ["name", "shortDescription", "longDescription", "seotitle", "seodescriptions", "seoText"];
const otherFields = ["images", "characteristics", "videoUrl", "model3dFile", "category"];

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Метод ${method} не дозволений`);
      break;
  }
}

async function handleGetRequest(req, res) {
  try {
    const { categoryId } = req.query;
    if (categoryId) {
      const products = await Product.find({ category: categoryId });
      res.status(200).json(products);
    } else {
      const products = await Product.find();
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні товарів", error });
  }
}

async function handlePostRequest(req, res) {
  try {
    const {
      name,
      shortDescription,
      longDescription,
      seotitle,
      seodescriptions,
      seoText,
      images,
      characteristics,
      videoUrl,
      model3dFile,
      category,
    } = req.body;

    const product = new Product({
      name,
      shortDescription,
      longDescription,
      seotitle, // Додаємо поля SEO Title
      seodescriptions, // Додаємо поля SEO Опис
      seoText,
      images,
      characteristics,
      videoUrl,
      model3dFile,
      category,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error while creating product:", error);
    res.status(500).json({ message: "Помилка при створенні товару", error });
  }
}

async function handlePutRequest(req, res) {
  try {
    const { id } = req.query;
    const body = req.body ?? {};
    const changes = {};
    for (const field of translatedFields) {
      for (const lang of languages) {
        const value = body[field]?.[lang];
        if (value !== undefined) changes[`${field}.${lang}`] = value;
      }
    }
    for (const field of otherFields) {
      if (body[field] !== undefined) changes[field] = body[field];
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Товар не знайдено" });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Помилка при оновленні товару", error });
  }
}

async function handleDeleteRequest(req, res) {
  try {
    const { id } = req.query;
    await Product.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Помилка при видаленні товару", error });
  }
}
