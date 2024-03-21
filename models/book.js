import mongoose from "mongoose";
const BookSchema = mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    image:String,
    author:String,
},
{
    timestamps:true
}
)
const BookModel = mongoose.model('book',BookSchema);
export default BookModel;