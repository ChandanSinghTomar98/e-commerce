import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
       trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true,
       
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
       
    },
    brand:{
        type:String,
        enum:["Apple","Samsung","realme"]
    },
    quantity:{
        type:Number,
        required:true
    },
    sold:{
        type:Number,
        default:0,
        select:false
    },
    images:{
        type:Array
    },
    color:{
        type:String,
        enum:["Black","Brown","Red"]
    },
    ratings:[
        {
            star:Number,
            postedby:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ]
},{
    timestamps:true
});

//Export the model
export default mongoose.model('Product', productSchema);