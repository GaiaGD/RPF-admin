// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongoose from "mongoose";
const { model } = mongoose;
import Product from '@/models/Product'
import { mongooseConnect } from "@/lib/mongoose"

export default async function handler(req, res) {
    console.log(req)
    const {method} = req
    await mongooseConnect()


    if (method === 'GET') {
      res.json( await Product.find())
    }

    
    if (method === 'POST'){
      const {name, description, price} = req.body
      const productDoc = await Product.create({
        name, description, price,
      })
      res.json(productDoc)
    }

  }
  