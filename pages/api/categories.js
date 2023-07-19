import mongoose from "mongoose";
const { model } = mongoose;
import Category from "@/models/Category"
import { mongooseConnect } from "@/lib/mongoose"

export default async function handler(req, res){
// check what method is it from the form
   const {method} = req
   await mongooseConnect()

   if (method === 'GET') {
        res.json(await Category.find())
    }

    if (method === 'POST'){
        const {name} = req.body
        const categoryDoc = await Category.create({name})
        res.json(categoryDoc)
    }

}