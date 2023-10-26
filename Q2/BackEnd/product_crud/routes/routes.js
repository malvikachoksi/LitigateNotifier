const express = require('express');
const router = express.Router();
const userController=require('../controller/user.controller');
const productController = require('../controller/product.controller');
const {verifyToken}=require('../controller/user.controller');
const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname);
    }
})

const upload=multer({storage:storage})



router.get('/signup', (req, res) => {
    res.render('index');
});

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/signin', (req, res) => {
    res.render('login');
});


router.get('/product', (req, res) => {
    res.render('product');
});


router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
// router.post('/product',verifyToken,upload.array('files',5),productController.addproduct);
router.post('/product',productController.addproduct);

router.post('/edit-product',productController.editproduct);
router.get('/delete-product',productController.deleteproduct);


router.get('/get-products',productController.getproducts);
router.get('/get-product',productController.getproduct);





module.exports = router;