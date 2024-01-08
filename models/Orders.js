const mongoose=require('mongoose')

const {Schema}=mongoose;

const OrderSchema=new Schema({
    email:{
        type: String,
        requried: true,
        unique: true
    },
    order_data:{
        type: Array,
        required: true
    }
})

module.exports=mongoose.model('order', OrderSchema)