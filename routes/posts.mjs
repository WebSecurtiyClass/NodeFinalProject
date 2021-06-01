import express from 'express'
import postServiceMjs from '../services/postService.mjs';

const postService = postServiceMjs;
const routerPosts = express.Router()


routerPosts.get("/api/posts", (req, res) => {
    let query;
    if (req.query.post) {
        query = {$text: {$search: req.query.post}}
    }
    else if (req.query.type) {
        query = {type: req.query.type}
    }
    console.log({$text: {$search: req.query.post}});
    postService.getPosts(query).then(result => {
        res.send(result);
    });
});

routerPosts.get("/api/posts/:id", (req, res) => {
    postService.getPosts(req.params.id).then(result => res.send(result)); 
});

routerPosts.post("/api/post", (req, res) => {
    const post = {
     ...req.body,
        user: req.session.userId,
    };
    postService.createPost(post).then(() => {
        res.redirect("/");
    });
});

routerPosts.patch("/api/post", (req, res) => {
    postService.updatePost(req.query.id, req.body).then(() => {
        res.redirect("/");
    });
});

routerPosts.delete("/api/post", (req, res) => {
    //Either req.query or req.params
    postService.deletePost(req.query.id).then(() => {
        res.redirect("/");
    });
});

export default routerPosts;