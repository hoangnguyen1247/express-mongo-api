import * as express from "express";

import { PostController } from "../controller/PostLogController";

/**
 * /posts: Post management
 */
export function PostLogRouter(diContainer) {

    const router = express.Router();
    const postController = new PostController(diContainer);

    router.route("/")
        .get(postController.findMany)
        .post(postController.insert);

    // router.route("/categories")
    //     .get(postController.findManyCategories)
    //     .post(postController.insertCategory);

    router.route("/:id")
        .get(postController.findOneById)
        .put(postController.update)
        .delete(postController.delete);

    return router;
}
