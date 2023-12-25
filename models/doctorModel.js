const mongoose = require('mongoose')
const { Schema } = mongoose;

const doctorSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    specialization:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    feePerConsultation:{
        type:Number,
        required:true
    },
    timings:{
        type:Array,
        required:true
    },
    status:{
        type: String,
        default:"Pending"
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:true
});
const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;