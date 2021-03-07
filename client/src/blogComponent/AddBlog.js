import React, {useState } from  "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 275,
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
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export const AddBlog =(props)=>{
console.log(props)
const classes = useStyles();
    const [blog, setBlog]=useState({
        title:'',
        content:'',
        categoryId: {
            _id:'600ce7b95da6e4706a14d25d',
            tag:'Pet'
        },
 
    })

    const handleChange =(e)=>{
        const newBlog ={...blog}
        newBlog[e.target.name] =e.target.value
        setBlog(newBlog)
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log('New blog:', blog)
        props.submit(blog)
    }

    return (
        <Grid  item xs={12} sm={6} md={4}>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Card className={classes.card}>
                  <CardContent>
                    <div>                       
                    <TextField
                        id="standard-full-width"
                        label="Title"
                        style={{ margin: 8 }}
                        placeholder="type your blog title"
                        helperText="what word best describe your day"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={blog.title} 
                        onChange={handleChange}
                        name="title"
                    />
                    <TextField
                    id="standard-full-width"
                    label="Content"
                    style={{ margin: 8 }}
                    placeholder="Put your thought here"
                    value={blog.content}
                    onChange={handleChange}
                    helperText="One sentence to describe your today"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="content"
                    />
                    </div>
                  </CardContent>
                   <CardContent>
                   <FormControl className={classes.formControl}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
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