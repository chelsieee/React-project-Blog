const express = require("express");
const { find } = require("../Model/BlogModel");
const BlogModel = require("../Model/BlogModel");
const UserModel = require("../Model/UserModel");

const router = express.Router();

router.get("/all", (req, res) => {
  BlogModel.find()
    .populate("categoryId", "tag")
    .populate("authorId", "username")
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send("Unable to query Blogs!");
    });
});

router.get("/byid/:id", (req, res) => {
  BlogModel.findById(req.params.id)
    .populate("categoryId", "tag")
    .populate("authorId", "username")
    .then((blog) => {
      res.send(blog);
    })
    .catch(() => {
      res.status(500).send("Unable to query the blog!");
    });
});

router.get("/bytitle/:title", (req, res) => {
  BlogModel.find({ title: req.params.title })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send("Unable to query the blog!");
    });
});

router.post("/new-blog", (req, res) => {
  console.log(req.body);
  let blogStructure = {
    title: req.body.title,
    content: req.body.content,
    categoryId: req.body.categoryId,
    authorId: req.session.user.id,
  };
  BlogModel.create(blogStructure)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Unable to create blog!");
    });
});

router.patch("/update/:id", (req, res) => {
  let id = req.params.id;
  const update = req.body;
  BlogModel.findById(id).then((blog) => {
    console.log(blog);
    console.log(req.session.user);
    if (blog.authorId == req.session.user.id) {
      BlogModel.findByIdAndUpdate(id, update, {
        new: true,
        upsert: true,
      }).then((data) => res.send(`${data} updated succesfully`));
    } else {
      res.status(403).send("Unauthorised author, unable to change blog!");
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  console.log(id)
  console.log(req.session.user);
  BlogModel.findById(id).then((blogRecord)=>{

    console.log('authorId',blogRecord.authorId._id)
    console.log('sessionid', req.session.user.id)
    if(blogRecord && blogRecord.authorId == req.session.user.id){
      BlogModel.findByIdAndDelete(id)
        .then(() => {
          res.send("data has been deleted succesfully");
        })
    
        .catch((err) => {
          console.log(err);
          res.status(400).send("unable to delete data");
        });

    }else{
      res.status(403).send('unauthorised')
    }
  })
});

module.exports = router;
