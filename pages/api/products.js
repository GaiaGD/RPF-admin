import mongoose from "mongoose";
const { model } = mongoose;
import Product from '@/models/Product'
import { mongooseConnect } from "@/lib/mongoose"

export default async function handler(req, res) {
    const {method} = req
    await mongooseConnect()

    // this retrieves the products
    if (method === 'GET') {
      if(req.query?.id){
        res.json(await Product.findOne({_id:req.query.id}))
      } else {
        res.json(await Product.find())
      }
    }

    // this pushes the product
    if (method === 'POST'){
      const {name, description, price, images, category} = req.body
      const productDoc = await Product.create({
        name, description, price, images, category
      })
      res.json(productDoc)
    }

    // this update the product 
    if (method === "PUT"){
      const {name, description, price, images, category, _id} = req.body
      await Product.updateOne({_id}, {name, description, price, images, category})
      res.json(true)
    }

    // this deletes the product 
    if (method === "DELETE"){
      if(req.query?.id){
        await Product.deleteOne({_id:req.query?.id})
        res.json(true)
      }
    }

  }
  