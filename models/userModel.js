const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isDoctor:{
      type:Boolean,
      default:false
    },
    isAdmin:{
        type:Boolean,
      default:false
    },
    seenNotifications:{
        type:Array,
        default:[]
    },
    unseenNotifications:{
        type:Array,
        default:[]
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:true
});
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;