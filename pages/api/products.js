// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongoose from "mongoose";
const { model } = mongoose;
import Product from '@/models/Product'
import { mongooseConnect } from "@/lib/mongoose"

export default async function handler(req, res) {
    console.log(req)
    const {method} = req
    await mongooseConnect()

    if (method === 'POST'){
      console.log(req.body)
      const {name, description, price} = req.body
      const productDoc = await Product.create({
        name, description, price,
      })
      res.json(productDoc)
    }
  }
  