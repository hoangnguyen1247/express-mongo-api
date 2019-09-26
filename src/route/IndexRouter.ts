import * as express from "express";

export function IndexRouter(diContainer) {
    const router = express.Router();

    router.route("/").get(function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

    return router;
}
