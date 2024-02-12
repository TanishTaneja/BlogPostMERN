const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    postContent: {
        type: String
    },
    imageLink: {
        type: String
    },
    user: { type: mongoose.Types.ObjectId, ref: 'UserDb' }

})

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'BlogPost' }]
})

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const UserDb = mongoose.model('UserDb', userSchema);

module.exports = {
    BlogPost,
    UserDb
}
