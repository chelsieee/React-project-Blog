const express = require('express');
const CategoryModel = require('../Model/CategoryModel')

const router =express.Router();



router.post ('/new-category', (req, res)=>{
    CategoryModel.create(req.body).then((category)=>{
        console.log(category);
        res.send(`${category} was added`)
    })
} )


router.get('/all', (req, res)=>{
 CategoryModel.find().then((data)=>{
     res.send(data)
 })
})

router.get("/byid/:id", (req, res)=>{
    CategoryModel.findById(req.params.id).then((data)=>{
        res.send(data)

    })
    .catch((err)=>{
    console.log(err)
    res.status(500).send('Unable to query the blog category')
    })
})




module.exports = router