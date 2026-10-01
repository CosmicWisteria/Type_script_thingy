console.log("Hello world!");
import fastify from "fastify";
import { postDb } from "./post.js";
const app = fastify();
app.get("/", () => {
    return { message: "Hello world!" };
});
// Read
app.get("/posts", async () => {
    return postDb.posts;
});
app.get("/posts/:id", (request, reply) => {
    const id = Number(request.params.id);
    console.log(id);
    if (isNaN(id)) {
        reply.code(400).send({ status: "error", message: "ID must be a number" });
        return;
    }
    const post = postDb.posts.find(p => p.id === id);
    if (!post) {
        reply.code(404).send({ status: "error", message: "Post not found" });
        return;
    }
    return post;
});
app.post("/posts", (request, reply) => {
    const id = postDb.nextId++;
    const post = {
        id: id,
        content: request.body.content,
        title: request.body.title,
        likes: 0
    };
    //aid to the db
    postDb.posts.push(post);
    reply.code(200).send({ status: "ok", message: "Post created" });
});
// Update
app.patch("/posts/:id", (request, reply) => {
    const id = Number(request.params.id);
    const post = postDb.posts.find(p => p.id === id);
    if (!post) {
        reply.code(404).send({ status: "error", message: "Post not found" });
        return;
    }
    if (request.body.title)
        post.title = request.body.title;
    if (request.body.content)
        post.content = request.body.content;
    reply.code(200).send({ status: "ok", message: "Post updated" });
});
// Delete
app.delete("/posts/id", (request, reply) => {
    const id = Number(request.params.id);
    const postIdx = postDb.posts.findIndex(p => p.id === id);
    if (!postIdx) {
        reply.code(404).send({ status: "error", message: "Post not found" });
        return;
    }
    //delete postDb.posts[postIdx];
    postDb.posts.splice(postIdx, 1);
    reply.code(200).send({ status: "ok", message: "Post deleted" });
});
app.listen({ port: 3000 }, (err, addr) => {
    if (err)
        err.message;
    if (err)
        throw err;
    console.log("Listening on", addr);
});
function only_example() {
    console.log("Don't copy");
}
//# sourceMappingURL=index.js.map