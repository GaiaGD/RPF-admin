// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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
      const {name, description, price} = req.body
      const productDoc = await Product.create({
        name, description, price,
      })
      res.json(productDoc)
    }

    // this update the product 
    if (method === "PUT"){
      const {name, description, price, _id} = req.body
      await Product.updateOne({_id}, {name, description, price})
      res.json(true)
    }

  }
  