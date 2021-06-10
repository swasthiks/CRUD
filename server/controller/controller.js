const { response } = require('express');
var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

//retrieve and return all users/single use
exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"NOT FOUND USER WITH ID"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"ERROR RETRIEVAL OF USER WITH ID"+id})
        })
    }else{
Userdb.find()
.then(user=>{
    res.send(user);
}).catch(err=>{
    res.status(500).send({message:err.message||"Error occured whille retrival of information"});
})
}}
//Update a new identified user by id
exports.update=(req,res)=>{
if(!req.body){
    return res
    .status(400)
    .send({message:"Data to update cannot be empty"})
}
const id=req.params.id;
Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
.then(data=>{
    if(!data){
        res.status(404).send({message:"Cannot Update user ${id}.May be User Not Found!"})
    }
    else{
        res.send(data)

    }
})
.catch(err=>{
    res.status(500).send({message:"ERROR UPDATE USER INFORMATION"})
})
}
//Detete user with id
exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"CANNOT DELETE WITH ${id}.MAY BE ID IS WRONG"})
        }else{
            res.send({
                message:"User was deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
        message:"COULD NOT DELETE USER WITH ID ="+id
    });
});
}