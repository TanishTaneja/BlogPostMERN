const{ BlogPost, UserDb}=require("../model/blogpost")
const bcrypt=require("bcrypt")
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

module.exports.postLogin=async (req,res)=>{
    const{email,password}=req.body;
    let user=await UserDb.findOne({ email });
    if(user){
        let passwordMatch=bcrypt.compareSync(password, user.password);
        if(passwordMatch){
            req.session.userId=user.id;
            res.status(200).json({
                login:true
            })
        }
        else{
            res.status(403).json({  
                invalidpassword:true
            })
        }
    }else{
        res.status(403).json({
            notregistered:true
        })
    }
}

module.exports.postRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const oldUser = await UserDb.findOne({ email });

        if (!oldUser) {
            const hashed_password=await bcrypt.hash(password,10);
            const newUser = new UserDb({
                username,
                email,
                password: hashed_password,
            });

            await newUser.save();
            res.status(201).json({
                message: "New user added",
            });
        } else {
            res.status(400).json({
                login: true,
                message: "A user with this email already exists",
            });
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


module.exports.requireLogin=(req,res,next)=>{
    if(!req.session.userId){
        res.redirect("/login");
    }else{
        next();
    }
}