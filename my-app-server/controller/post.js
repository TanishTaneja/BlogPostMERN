const{ BlogPost, UserDb}=require("../model/blogpost")

module.exports.getallpost=async (req,res)=>{
    let data=await BlogPost.find();
    res.status(201).json(data)
}

module.exports.getonepost=async (req,res)=>{
    try{
        let postId=req.params.postId;
        let requestedPost=await BlogPost.findById(postId);
        res.status(200).json(requestedPost);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.postaddpost=async (req, res) => {
    try{
        const{title,subtitle,postContent,imgLink}=req.body;
        const newPost=new BlogPost({
            title,
            subtitle,
            postContent,
            imgLink
        })
        await newPost.save();
        res.status(201).json({
            message:"new post added"
        })
    }
    catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }
}

module.exports.deleteonepost=async (req,res)=>{
    try{
            let postId=req.params.postId;
            await BlogPost.deleteOne(
                {
                    _id: postId
                }
                );
                res.status(200).json({success:"Deleted successfully"})
            }
        catch(err){
            console.log(err);
            res.status(500).json({error:"Failed to delete the post"});
        }
}

module.exports.patcheditpost=async(req,res)=>{
    try{
        let postId=req.params.postId;
        const {title,
            subtitle,
            postContent,
            imgLink} = req.body;
        await BlogPost.updateOne({_id: postId}, {
            $set: {
                title,
                subtitle,
                postContent,
                imgLink
            }
        })
        res.status(200).json({
            message: "Updated form"
        })
    }
    catch(err){
        console.log(err);
    }
}

const users=[];
module.exports.getLogin=(req,res)=>{
    res.render('login');
}

module.exports.postLogin=(req,res)=>{
    // const{username,password}=req.body;
    

    // if(user){
    //     req.session.userId=user.id;
    //     res.redirect('/');
    // }else{
    //     res.redirect('/login');
    // }
}

module.exports.getRegister=(req,res)=>{
    res.render('register');
}

module.exports.postRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const oldUser = await UserDb.findOne({ email });

        if (!oldUser) {
            const newUser = new UserDb({
                username,
                email,
                password,
            });

            await newUser.save();
            res.status(201).json({
                message: "New user added",
            });
        } else {
            res.redirect("/login")
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports.logout=(req,res)=>{
    req.session.destroy(err=>{
        res.redirect('/');
    })
}

module.exports.getHome=(req,res)=>{
    res.send("welcome to our website");
}

module.exports.requireLogin=(req,res,next)=>{
    if(!req.session.userId){
        res.redirect("/login");
    }else{
        next();
    }
}