let express=require("express");
let router=express.Router();
let{getallpost,getonepost,postaddpost,deleteonepost,patcheditpost}=require("../controller/post")

router.get("/",getallpost);

router.post("/",postaddpost);

router.get("/:postId",getonepost);

router.delete("/:postId",deleteonepost);

router.patch("/:postId",patcheditpost);

module.exports=router