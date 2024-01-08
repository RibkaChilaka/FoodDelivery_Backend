const mongoose =require('mongoose')

// const mongoURI="mongodb+srv://goFood:goFood123@cluster0.pas4sy1.mongodb.net/goFoodmern?retryWrites=true&w=majority"

const mongoDB=async()=>{
    await mongoose.connect(process.env.MONGO_URL).then(async()=>{
        console.log("connected")
        const fetched_data=await mongoose.connection.db.collection("food_items")
        const data_toArray=await fetched_data.find({}).toArray()
        // console.log(data_toArray)
        const foodCategory=await mongoose.connection.db.collection("foodCategory")
        const cat_toArray=await foodCategory.find({}).toArray()
        if(data_toArray){
            global.food_items=data_toArray
        
            global.food_category=cat_toArray
            
            // console.log(global.food_items)
        }
    }).catch((e)=>{
        console.log('error in connecting mongodb', e)
    })
    
}

module.exports=mongoDB