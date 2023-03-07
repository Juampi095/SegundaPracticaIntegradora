import { Schema,model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productColletcion='products';

const productSchema= new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    code:{type:String,required:true},
    price:{type:Number,required:true},
    status:{type:Boolean, default: true, index:true},
    stock:{type:Number,required:true},
    category:{type:String,required:true, index:true},
    thumbnais:{type:Array}
})

productSchema.plugin(mongoosePaginate);

export const productModel=model(productColletcion,productSchema);