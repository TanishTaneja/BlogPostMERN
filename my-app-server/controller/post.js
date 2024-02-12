const { BlogPost, UserDb } = require("../model/blogpost")

module.exports.getallpost = async (req, res) => {
    try {
        let data = await BlogPost.find().populate("user", "username email")
        if (data.user === null) {
            data.user = "Deleted User"
        }
        console.log(data.user)
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}

module.exports.getonepost = async (req, res) => {
    try {
        let postId = req.params.postId;
        let requestedPost = await BlogPost.findById(postId).populate("user", "username imageLink");
        res.status(200).json(requestedPost);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.postaddpost = async (req, res) => {
    try {
        const { title, subtitle, postContent, imageLink } = req.body;
        const newPost = new BlogPost({
            title,
            subtitle,
            postContent,
            imageLink,
            user: req.user.id
        })
        await newPost.save();
        res.status(201).json({
            message: "new post added"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports.deleteonepost = async (req, res) => {
    try {
        let postId = req.params.postId;
        await BlogPost.deleteOne(
            {
                _id: postId
            }
        );
        res.status(200).json({ success: "Deleted successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete the post" });
    }
}

module.exports.patcheditpost = async (req, res) => {
    try {
        let postId = req.params.postId;
        const { title,
            subtitle,
            postContent,
            imageLink,
        } = req.body;
        await BlogPost.updateOne({ _id: postId }, {
            $set: {
                title,
                subtitle,
                postContent,
                imageLink
            }
        })
        res.status(200).json({
            message: "Updated form"
        })
    }
    catch (err) {
        console.log(err);
    }
}



