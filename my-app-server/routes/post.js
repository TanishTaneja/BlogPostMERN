let express=require("express");
let router=express.Router();
let{getallpost,getonepost,postaddpost,deleteonepost,patcheditpost,postLogin,postRegister,requireLogin,logout}=require("../controller/post")

router
    .route("/")
        .get(requireLogin,getallpost)
        .post(requireLogin,postaddpost);
router.get("/:postId",getonepost);
router.delete("/:postId",deleteonepost);
router.patch("/:postId",patcheditpost);
router.post("/login",postLogin);
router.post("/register",postRegister);
router.get("/logout",logout);

module.exports=router