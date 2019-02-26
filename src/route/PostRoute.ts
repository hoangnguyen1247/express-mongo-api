import * as express from "express";

import { PostController } from "../controller/PostController";

/**
 * /posts: Post management
 */
export function PostRouter(diContainer) {

    const router = express.Router();
    const postController = new PostController(diContainer);

    router.route("/")
        .get(postController.findMany)
        .post(postController.insert);

    router.route("/categories")
        .get(postController.findManyCategories)
        .post(postController.insertCategory);
    router.route("/categories/:id")
        .get(postController.findOneCategoryById)
        .put(postController.updateCategory)
        .delete(postController.deleteCategory);

    router.route("/search-and-filter")
        .get(postController.searchAndFilter);
    router.route("/count-by-category-id")
        .get(postController.countByCategoryId);

    router.route("/find-by-user-id/:userId")
        .get(postController.findByUserId);

    router.route("/update-status-by-category-id")
        .put(postController.updateStatusByCategoryId);

    router.route("/:id")
        .get(postController.findOneById)
        .put(postController.update)
        .delete(postController.delete);

    return router;
}
