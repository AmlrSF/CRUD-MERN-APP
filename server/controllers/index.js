//Loads environment variables from .env file
require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const PostModel = require('../schema/schema');

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//getAllPosts
const getAllPosts = async (req, res) => {
    try {
        const data = await PostModel.find({});
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, length: data.length, data: data }));
    } catch (error) {
        res.end(JSON.stringify({ success: false, message: error }));
    }
}

// post post
const postPost = async (req, res) => {
    //http://res.cloudinary.com/dwsb4wnhn/image/upload/v1682267114/xvwffwrptyq572ujwb6p.png
    try {
        const { name, author, description, categories, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        console.log(photoUrl.url);

        const newPost = await PostModel.create({
          name,
          author,
          description,
          categories,
          photo: photoUrl.url,
        });
    
        res.status(200).json({ success: true, data: newPost });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
      }
}

//getAllPosts
const deleteSinglePost = async (req, res) => {
    try {
        let {id} = req.params;
        const task = await PostModel.findOneAndDelete({_id:id})
        if(!task) return res.status(201).json({msg:`no data with id ${id}`})
        res.status(201).json({msg:'success',data:{task}})
    } catch (error) {
        res.status(500).json({msg:'error'});
    }
}

//getAllPosts
const getSinglePost = async (req, res) => {
    try {
        let {id} = req.params;
        const task = await PostModel.findOne({_id:id})
        if(!task) return res.status(201).json({msg:`no data with id ${id}`})
        res.status(201).json({msg:'success',data:{task}})
    } catch (error) {
        res.status(500).json({msg:'error'});
    }
}

//update single post
const UpdateSinglePost = async(req,res)=>{
    try {
        let {name,author,description} = req.body;
        let {id} = req.params;
        console.log(name,description,author);
        const task = await PostModel.findOneAndUpdate({_id:id},{name,author,description});
        if(!task) return res.status(201).json({msg:`no data with id ${id}`})
        res.status(201).json({msg:'success',data:{task}})
    } catch (error) {
        res.status(500).json({msg:'error'});
    }
}

module.exports = {
    getAllPosts,
    getSinglePost,
    deleteSinglePost,
    postPost,
    UpdateSinglePost
}

