import mongoose ,{Schema, Document} from "mongoose";

export interface Message extends Document{
    
    content: string;
    createdAt: Date

}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required:true,
        default: Date.now


    }
})

export interface  User extends Document{
     
    Username: string,
    email: string,
    password: string,
    verifycode:string
    verifycodeexpiry:Date
    isAcceptingMessage: boolean;
    message: Message[]


}

const  UserSchema : Schema<User> = new Schema({
    Username:{
        type:String,
        required:[true, "username is required"],

        trim:true,
        unique: true,


    },
      email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
       match: [
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  "Please use a valid email"
]

      },
      password:{
        type:String,
        required:true
      },
      verifycode:{
        type:String,
        required:true
      },
      verifycodeexpiry:{
        type:Date,
        required:true
      },
      isAcceptingMessage :{
        type:Boolean,
        default:true,

      },

      message:[MessageSchema]
    
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)