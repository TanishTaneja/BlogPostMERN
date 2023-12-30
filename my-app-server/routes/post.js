let express=require("express");
let router=express.Router();
let{getallpost,getonepost,postaddpost,deleteonepost,patcheditpost,getLogin,postLogin,getRegister,postRegister,getHome,requireLogin,logout}=require("../controller/post")

router
    .route("/")
        .get(getallpost)
        .post(postaddpost);
router.get("/:postId",getonepost);
router.delete("/:postId",deleteonepost);
router.patch("/:postId",patcheditpost);
router.get("/",requireLogin,getHome);
router.get("/login",getLogin);
router.post("/login",postLogin);
router.get("/register",getRegister);
router.post("/register",postRegister);
router.get("/logout",logout);

module.exports=router