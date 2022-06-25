const mongoose =  require('mongoose')


const dataSchema = new mongoose.Schema({
    description : {type:String, required:true},
    // username: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true
    // }
},
{
    versionKey : false,
    timestamps: true ,
})

module.exports =  mongoose.model('data', dataSchema)