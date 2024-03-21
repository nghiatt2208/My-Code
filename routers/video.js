import express from 'express';
import VideoModel from '../models/video.js';
import Joi from 'joi';

const videoRouter = express.Router();
const VideoJoiObject = Joi.object({
  title:Joi.string().required().empty().min(10).messages({
    "any.required":"Ten khong duoc de trong",
    "string.empty":"Ten khong duoc de trong",
    "string.min":"Ten khong nho hon 10"
  }),
  author:Joi.string().required().empty().messages({
    "any.required":"Tac gia khong duoc de trong",
    "string.empty":"Tac gia khong duoc de trong",
  }),
  url:Joi.string().required().messages({
    "any.required":"URL khong duoc de trong",
    "string.empty":"URL khong duoc de trong",
  }),
  duration:Joi.number().required().empty().min(10).messages({
    "any.required":"Thoi gian video khong duoc de trong",
    "number.empty":"Thoi gian video khong duoc de trong",
    "number.min":"Thoi gian qua ngan"
  }),
})

videoRouter.post('/videos' ,(req,res,next)=>{
  const body = req.body;
  const {error} = VideoJoiObject.validate({
    title:body.title,
    author:body.author,
    url:body.url,
    duration: body.duration
  })
  if (error) {
    res.send(error.message)
  } else {
    next();
  }
},async (req,res)=>{
    try {
      const body = req.body;
      const video = new VideoModel(body);
      const respone = await video.save();
      res.send(respone);
    } catch (error) {
      res.send(error)
    }
  })
  
export default videoRouter;