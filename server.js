const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

const app = express();

//db connection
require("./mongo");

//model import
require("./model/post");

//middleware
app.use(bodyparser.json());



const post = mongoose.model("post");


//get data
app.get('/posts', async (req, res) => {

    try{
        const posts = await post.find({});
        res.send(posts);
    }catch(error){
        res.status(500)
    }
})


//get data indivisually
app.get("/posts/:postID", async (req, res)=> {

    try{
        const posts = await post.find({_id : req.params.postID});
        res.send(posts)
    } catch(error) {
        res.send(500);
    }
})


//edit data
app.put("/posts/:postID", async (req, res)=> {

    try{
        const posts = await post.findByIdAndUpdate({
            _id : req.params.postID
        }, req.body, {
            new: true
        })

        res.send(posts);

    } catch(error){

        res.send(500)
    }

})


//delete data
app.delete("/posts/:postID", async (req, res)=> {

    try{
        const posts = await post.findByIdAndRemove({
            _id : req.params.postID
        })
        res.send(posts);

    } catch(error){

        res.send(500)
    }

})





//post data
app.post("/posts", async (req, res)=>{

    try{
        const Post = new post();
        Post.title = req.body.title;
        Post.content = req.body.content;
        await Post.save();
        res.send(Post)

    } catch(error){
        res.status(500)
    }

})

app.listen(3333, ()=>{ console.log('server is running') })