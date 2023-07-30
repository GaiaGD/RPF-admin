import mongoose from "mongoose";
const { model } = mongoose;
import Category from "@/models/Category"
import { mongooseConnect } from "@/lib/mongoose"
import {isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res){
// check what method is it from the form
  const {method} = req
  await mongooseConnect()

  await isAdminRequest(req, res)

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'))}

  // adding category
  if (method === 'POST') {
    const { name, parentCategory, properties } = req.body;

    const categoryDoc = await Category.create({
      name: name,
      // if there's no parentCategory, it will be null
      parent: parentCategory || undefined,
      properties: properties,

    });
  
    res.json(categoryDoc);
  }

  // updating category
  if (method === 'PUT') {
    const { name, parentCategory, properties, _id } = req.body;
    // const _id = dataId

    const categoryDoc = await Category.updateOne(
      // find the category to edit
      {_id},
      {
        name,
        parent: parentCategory || undefined,
        properties
    })
    res.json(categoryDoc)
  }

  // deleting category - the method delete doesn't accept a body, so we transferred the id from the url, with a req.query
  if (method === 'DELETE') {
    const {_id} = req.query
    await Category.deleteOne({_id})
    res.json('ok')
  }

}