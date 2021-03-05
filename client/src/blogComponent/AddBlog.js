import React, {useState } from  "react"


export const AddBlog =(props)=>{
console.log(props)
    const [blog, setBlog]=useState({
        title:'',
        content:'',
        categoryId: {
            _id:'600ce7b95da6e4706a14d25d',
            tag:'Pet'
        },
 
    })


    const handleChange =(e)=>{
        console.log('e.target:', e.target);
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
        <div>
           <h2>whats your mind for today?</h2> 
           <form onSubmit={handleSubmit}>
           <div>
            <input name ="title" type ="text" value={blog.title} placeholder="Type title here" onChange={handleChange}></input>
           </div>
           <div>
           <input name ="content" type ="text" value={blog.content} placeholder="Type content here" onChange={handleChange}></input>
           </div>
           <div>
               <label htmlFor="blogType">Blog categories</label>
               <select name="categoryId" id="categories" value={blog.categoryId} onChange={handleChange}>

               {props.categories.map((el, index)=>(
                   <option key={index} value={el._id}>{el.tag}</option>
               ))
               }
               </select>
           </div>
           <div>
               <button type="submit" id ="createblog">submit</button>
               <button type="submit" id ="return-to-home">Home</button>
           </div>
           </form>
       </div>
    )
}