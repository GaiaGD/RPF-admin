import multiparty from 'multiparty'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'
import mime from 'mime-types'
import { mongooseConnect } from "@/lib/mongoose"
await isAdminRequest(req, res)


const bucketName = 'rockpondfish'

export default async function handler(req, res) {

  await mongooseConnect()
  await isAdminRequest(req, res)

    // we're telling next not to parse our response, but we will parse it
    const form = new multiparty.Form()

    const {fields, files} = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if(err) reject(err)
        resolve({fields, files})
      })
    })
    console.log('length: ', files.file.length)

    const client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
      },
    })

    const links = []

    // adds all the uploads in a loop
    for (const file of files.file){
      const ext = file.originalFilename.split('.').pop()
      const newFileName = Date.now() + "." + ext
      // connect to AWS bucket
      await client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: fs.readFileSync(file.path),
        ACL: 'public-read',
        ContentType : mime.lookup(file.path)
      }))
      const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`
      // adds to the array of links
      links.push(link)
    }
    return res.json({links})
  }


export const config = {
  api: {bodyParser: false}
}