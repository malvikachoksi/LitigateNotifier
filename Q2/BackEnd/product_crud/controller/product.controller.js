const Product = require('../models/product');

exports.addproduct = async (req, res) => {
//     console.log(req.files);
// let images=[];
//     for (let i = 0; i < req.files.length; i++) {
//         images.push(req.files[i].filename)
        
//     }

console.log(req.body);
    const { name, price, qty } = req.body;
    if (name && price && qty) {
        const product = new Product({
            name: name,
            qty: qty,
            price: price,
            image:images
        })

        product.save(product).then((result) => {
            if (result) {
                res.status(200).send({
                    status: true,
                    message: "product added successfully",
                    data: {}
                })
            }
        }).catch((err) => {
            res.send({
                status: false,
                message: "something went wrong",
                data: {}
            })
        });
    }

    else {
        res.send({
            status: false,
            message: "missing parameters",
            data: {}
        })
    }
}

exports.editproduct = async (req, res) => {
    console.log(req.body);
    const {id, name, price, qty } = req.body;
    if (id&&name && price && qty) {
       Product.findByIdAndUpdate(id,{name:name,price:price,qty:qty},{new:true}).then((result) => {
            if (result) {
                res.status(200).send({
                    status: true,
                    message: "product update successfully",
                    data: result
                })
            }
        }).catch((err) => {
            console.log(err);
            res.send({
                status: false,
                message: "something went wrong",
                data: {}
            })
        });
    }

    else {
        res.send({
            status: false,
            message: "missing parameters",
            data: {}
        })
    }
}

exports.deleteproduct = async (req, res) => {
    
       Product.findByIdAndDelete(req.query.id).then((result) => {
            if (result) {
                res.status(200).send({
                    status: true,
                    message: "product deleted successfully",
                    data: result
                })
            }
        }).catch((err) => {
            console.log(err);
            res.send({
                status: false,
                message: "something went wrong",
                data: {}
            })
        });
   
}

exports.getproducts = async (req, res) => {
        

        Product.find({}).then((result) => {
            if (result) {
                // res.render('home',{
                //     data:result
                // })
                res.send({data:result})
            }
        }).catch((err) => {
            res.send({
                status: false,
                message: "something went wrong",
                data: {}
            })
        });
    
}

exports.getproduct = async (req, res) => {
        console.log('hello');
console.log(req.query.id);
    Product.findById(req.query.id).then((result) => {
        if (result) {
            res.render('Edit',{
                data:result
            })
        }
    }).catch((err) => {
        res.send({
            status: false,
            message: "something went wrong",
            data: {}
        })
    });

}

