const express = require('express');
const bcrypt = require ('bcrypt');
const userModel = require ('../Model/UserModel');
const { request } = require('express');

const router = express.Router();
//register user&password
router.post('/register', (req, res) =>{
    const body= req.body;
    const password = req.body.password;
    
    const passwordEncrypt =bcrypt.hashSync(password, 8);

    const user ={
        username: body.username,
        password: passwordEncrypt
    }

    userModel.create(user).then(()=>{
        res.send('user registered successfully')
    }).catch(()=>{
        res.status(400).send('unable to create user')
    })
})

router.post('/login', (req, res)=>{
    userModel.findOne({username: req.body.username}).then((userData)=>{
        if (userData){
            const checkPassword = bcrypt.compareSync(req.body.password, userData.password)//send back bool
            if (checkPassword){
               const sessionUser = req.session.user ={
                    username: userData.username,
                    id: userData._id
                }
                res.send(sessionUser)
            }else {
                res.status(401).send('password does not match our record, please try again!')
            }
        
        }else{
            res.status(404).send('invalid username!')
            return;

        }
    })
    
})

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.send('User has logged out')
    })
})

//when client logged in client can change password:
router.patch('/updatepassword', (req, res)=>{
   
    const passwordEncrypt = bcrypt.hashSync(req.body.password, 8)

    const user ={
        username: req.body.username,
        password: passwordEncrypt
    }

    userModel.findOneAndUpdate(req.session.user._id, user, {new: true}).then((data)=>{
        console.log(data);
        res.send('password has been successfully updated!')

    })

})

module.exports = router 