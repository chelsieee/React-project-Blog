import React, { useEffect, useState } from  "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme)=>({
    root: {
      background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
      minWidth: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    formControl: {
      marginBottom: theme.spacing(3),
      marginLeft :theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    form: {
      maxWidth: "50%",
      minHeight: "20vh",
      display: "flex",
      alignItems: "center"
    },
    button: {
      margin: theme.spacing(1),
    },
  })); 

export const EditBlog =(props)=>{
    const classes = useStyles();

    const [blog, setBlog]=useState({
        title:'',
        content:'',
        categoryId:''
    })

    const handleChange =(e)=>{
        console.log('e.target:', e.target);
        const newBlog ={...blog}
        newBlog[e.target.name] =e.target.value
        setBlog(newBlog)
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log('Edited blog:', blog)
        props.submit(blog)
    }

    useEffect(()=>{
        console.log('blog useEffect')
        console.log(props.blog)
        const blogEdit = {...props.blog}
        blogEdit.categoryId =props.blog.categoryId._id
        setBlog(blogEdit)
    },[props.blog])

    // return (
    //     <div>
    //        <h2>change your mind for today?</h2> 
    //        <form onSubmit={handleSubmit}>
    //        <div>
    //         <input name ="title" type ="text" value={blog.title} placeholder="Update title here" onChange={handleChange}></input>
    //        </div>
    //        <div>
    //        <input name ="content" type ="text" value={blog.content} placeholder="Update content here" onChange={handleChange}></input>
    //        </div>
    //        <div>
    //            <label htmlFor="blogType">Blog categories</label>
    //            <select name="categoryId" id="categories" onChange={handleChange} value={blog.categoryId}>
    //            {props.categories.map((el, index)=>(<option key ={index} value ={el._id}>{el.tag}</option>))}
    //            </select>
    //        </div>
    //        <div>
    //            <button type="submit" id ="updateblog">submit</button>             
    //        </div>
    //        </form>
    //    </div>
    // )


    return (
        <Grid  item xs={12} sm={6} md={4} container className={classes.root}
        spacing={0}
        alignItems="center"
        justify="center">
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Card className={classes.card}>
                  <CardContent>
                    <div>                       
                    <TextField
                        id="standard-full-width"
                        label="Title"
                        style={{ margin: 8 }}
                        placeholder="update your blog title"
                        helperText="what word best describe your day"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="title"
                        value={blog.title} 
                        onChange={handleChange}
                    />
                    <TextField
                    id="standard-full-width"
                    label="Content"
                    style={{ margin: 8 }}
                    placeholder="type an updated event"
                    helperText="One thing you have made today"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="content"
                    value={blog.content}
                    onChange={handleChange}
                    />
                    </div>
                  </CardContent>
                   <CardContent>
                   <FormControl className={classes.formControl}>
                    <InputLabel shrink id="category">
                    Category
                    </InputLabel>
                    <Select
                    name="categoryId" 
                    id="categories"
                    labelId="demo-simple-select-placeholder-label-label"
                    value={blog.categoryId}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    >
        
                 {props.categories.map((el, index)=>(
                     
                   <MenuItem key={index} value={el._id}>{el.tag} </MenuItem>
               ))}    
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
             Submit
             </Button>
    
                   </CardContent>
               </Card>
              </form>
            </Grid>
            
    
      );
    
}