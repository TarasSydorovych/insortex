import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    ua: { type: String, required: true },
    en: { type: String, required: true },
    ru: { type: String, required: true },
    pl: { type: String, required: true },
  },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: [{ type: Object }],
  shorttitle: {
    ua: { type: String },
    en: { type: String },
    ru: { type: String },
    pl: { type: String },
  },
  longdesc: {
    ua: { type: String },
    en: { type: String },
    ru: { type: String },
    pl: { type: String },
  },
  seotitle: {
    ua: { type: String },
    en: { type: String },
    ru: { type: String },
    pl: { type: String },
  },
  ceodescriptions: {
    ua: { type: String },
    en: { type: String },
    ru: { type: String },
    pl: { type: String },
  },
  image: { type: String },
});

export const Category = models?.Category || model("Category", CategorySchema);
