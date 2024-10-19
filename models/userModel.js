import mongoose from "mongoose"; // Erase if already required
import bcrypt from "bcrypt"
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
       
    },
    lastname:{
        type:String,
        required:true,
      
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    cart:{
        type:Array,
        default:[]
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    address:[{
         type: mongoose.Schema.Types.ObjectId,
         ref:"Address"
    }],
    wishlist:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    refreshToken:{
        type:String,
    }
    
},{
    timestamps:true
});
userSchema.pre("save",async function(next){

    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);

})

userSchema.methods.isPasswordMatch=async function(enteredpassword){
 return await bcrypt.compare(enteredpassword,this.password)
}
//Export the model
export default mongoose.model('User', userSchema);