import mongoose from "mongoose";
const { model } = mongoose;
import Category from "@/models/Category"
import { mongooseConnect } from "@/lib/mongoose"

export default async function handler(req, res){
// check what method is it from the form
  const {method} = req
  await mongooseConnect()

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'))}

  if (method === 'POST') {
    const { name, parentCategory } = req.body;

    const categoryDoc = await Category.create({
      name: name,
      // if there's no parentCategory, it will be null
      parent: parentCategory || null

    });
  
    res.json(categoryDoc);
  }
      
  if (method === 'PUT') {
    const { name, parentCategory, dataId } = req.body;
    const _id = dataId

    const categoryDoc = await Category.updateOne(
      // find the category to edit
      {_id},
      {
        name,
        parent: parentCategory
    })
    res.json(categoryDoc)
  }
}