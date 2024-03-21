import express from "express";
import BookModel from "../models/book.js";
import Joi from "joi";

const bookRouter = express.Router();
const bookValidate = Joi.object({
    name: Joi.string().required().empty().messages({
        "any.required":"Khong duoc de trong ten",
        "string.empty":"Khong duoc de trong"
    }),
    price: Joi.number().required().empty().messages({
        "any.required":"Khong duoc de trong gia",
        
    }),
    description: Joi.string().required().empty().messages({
        "any.required":"Khong duoc de trong mo ta",
        "string.empty":"Khong duoc de trong"
    }),
    image: Joi.string().required().empty().messages({
        "any.required":"Khong duoc de trong anh",
        "string.empty":"Khong duoc de trong"
    }),
    author: Joi.string().required().empty().messages({
        "any.required":"Khong duoc de trong ten tac gia",
        "string.empty":"Khong duoc de trong"
    })
})
bookRouter.post("/booking", async (req, res) => {
  
    const {name,price,description,image,author} = req.body;
    const {error} = bookValidate.validate({name,price,description,image,author});
    if (error) {
        console.log(error.message);
    res.send({status:false,message:error.message})
    } else {
        const book = new BookModel(req.body).save()
        res.send({status:true,data:book})
    }
   
});
bookRouter.get("/booking",async (req, res) => {
    const id = req.params.id;
    const respone = await BookModel.find();
    res.send(respone);
})
bookRouter.get("/booking/:id",async (req, res) => {
    try {
        const getID = await BookModel.findById(req.params.id);
        
          res.send(getID);
      } catch (error) {
        res.send(error)
      }
})
bookRouter.put("/booking/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respone = await BookModel.findOneAndUpdate({_id:id},body,{new:true});
})
bookRouter.delete("/booking/:id",async (req, res) => {
    const id = req.params.id;
    const respone = await BookModel.findOneAndDelete({_id:id})
    res.send(respone);
})

export default bookRouter;
