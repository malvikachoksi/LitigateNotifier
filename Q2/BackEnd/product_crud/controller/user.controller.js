const User = require('../models/User')
const md5 = require('md5');
const jwt = require('jsonwebtoken');
exports.verifyToken=async(req,res,next)=>{
    const token=req.headers.authorization;
    console.log(token);
    var t=token.split(' ');
    console.log(t);
    if(!token)
    {
        res.status(400).send({
            status:false,
            message:"token not provided"
        })  
    }

    jwt.verify(token.split(' ')[1],process.env.SECRET_KEY,(err,decode)=>{
        if(err)
        {
            return res.status(400).send({ 
                success:false,
                message: 'Failed to authenticate token' 
            });
        }
        req.user=decode;
        next();
    })
}


exports.signUp = async (req, res) => {
    console.log(req.body);
    const { name, email, phone_number, password } = req.body;
    if (name && email && phone_number && password) {
        const user = new User({
            name: name,
            email: email,
            phone_number: phone_number,
            password: md5(password)
        })

        user.save(user).then((result) => {
            if (result) {
                

                const token = jwt.sign({ id: result._id, email: result.email }, process.env.SECRET_KEY)
                res.status(200).send({
                    status: true,
                    message: "signup successful",
                    data: {
                        user_id: result._id,
                        token: token
                    }
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

exports.signIn = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (email && password) {


        await User.findOne({ email }).then((result) => {
            // console.log(md5('81dc9bdb52d04dc20036dbd8313ed055'));

            const pwd=md5('123');
                // console.log(md5(pwd))
            if (result) {
                if (result.password == password) {
                    const token = jwt.sign({ id: result._id, email: result.email }, process.env.SECRET_KEY)
                    res.status(200).send({
                        status: true,
                        message: "signin successful",
                        data: {
                            user_id: result._id,
                            token: token
                        }
                    })
                }
            } else {
               return res.send({
                    status: false,
                    message: "your password is wrong",
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