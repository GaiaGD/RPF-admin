import mongoose from "mongoose";
const { model } = mongoose;
import Category from "@/models/Category"
import { mongooseConnect } from "@/lib/mongoose"

export default async function handler(req, res){
// check what method is it from the form
   const {method} = req
   await mongooseConnect()

   if (method === 'GET') {
        res.json(await Category.find().populate('parent'))
    }

    if (method === 'POST') {
        const { name, parentCategory } = req.body;
        let parentValue = null; // Set the default parent value to null
      
        if (parentCategory !== '') {
          parentValue = parentCategory;
        }
      
        const categoryDoc = await Category.create({
          name,
          parent: parentValue
        });
      
        res.json(categoryDoc);
      }
      

}