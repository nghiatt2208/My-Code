import express from "express";
import {products} from "../models/product.js";
import Joi from "joi";

const checkValidate = Joi.object({
  name: Joi.string().required().empty().messages({
    "any.required": "Tên không được để trống",
    "string.empty":"Tên không đúng định dạng"
  }),
  image: Joi.string().required().empty().messages({
    "any.required": "Ảnh không được để trống",
    "string.empty":"Ảnh không đúng định dạng"
  }),
  price: Joi.number().required().min(500).messages({
    "any.required": "Giá không được để trống",
    "number.min":"Giá không nhỏ hơn 500"
  })
});


const router = express.Router();
router.post('/products' ,async (req,res)=>{
  const {name,image,price} = req.body
  const {error} = checkValidate.validate({name,image,price})
  if (error) {
    console.log(error.message);
    res.send({status:false,message:error.message})
  } else {
    const product = await new products(req.body).save()
    res.send({status:true,data:product})
  }
})
router.get('/products', async (req,res)=>{
  const respone = await products.find();
  res.send(respone);
})
router.put('/products/:id', async (req,res)=>{
  const id = req.params.id;
  const body = req.body;
  const respone = await products.findOneAndUpdate({_id:id},body,{new:true});
  res.send(respone);
})
router.delete('/products/:id', async (req,res)=>{
  const id = req.params.id;
  const respone = await products.findOneAndDelete({_id:id});
  res.send(respone);
})
export default router;
