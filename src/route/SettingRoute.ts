import * as express from "express";

import { SettingController } from "../controller/SettingController";

/**
 * /posts: Post management
 */
export function SettingRouter(diContainer) {

    const router = express.Router();
    const settingController = new SettingController(diContainer);

    router.route("/")
        .get(settingController.findMany)
        .post(settingController.insert);
    router.route("/search")
        .get(settingController.search);

    router.route("/:id")
        .get(settingController.findOneById)
        .put(settingController.update)
        .delete(settingController.delete);

    return router;
}
