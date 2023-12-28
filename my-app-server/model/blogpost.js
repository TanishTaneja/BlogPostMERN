const { default: mongoose } = require("mongoose");

const blogPostSchema=new mongoose.Schema({
    title:{
        type:String
    },
    subtitle:{
        type:String
    },
    postContent:{
        type:String
    },
    imgLink:{
        type:String
    }
})

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports=BlogPost