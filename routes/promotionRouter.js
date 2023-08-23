const express = require('express');
const Promotion = require('../models/promotion.js');
const promotionRouter = express.Router();


promotionRouter.route('/')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(async (req, res) => {
        const promotions = await Promotion.find();
        res.send(promotions);
        res.end();
    })
    .post(async (req, res, next) => {
        await Promotion.create(req.body)
        .then(promotions => {
            console.log('Promotion Created ', promotions);
            res.json(promotions);
        })
        .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete(async (req, res) => {
        await Promotion.deleteMany();
        res.end('Deleting all promotions');
    });


promotionRouter.route('/:promotionId')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(async (req, res) => {
        await Promotion.findById(req.params.promotionId);
        res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
    })
    .put(async (req, res) => {
        const filter = { id: req.params.promotionId };
        const update = {
            name: req.body.name,
            image: req.body.image,
            featured: req.body.featured,
            cost: req.body.cost,
            description: req.body.description
        };
        await Promotion.findOneAndUpdate(filter, update, {new: true});
        console.log(filter, update);
        res.write(`Updating the promotion ${req.params.promotionId}\n`);
        res.end(`Will update the promotion: ${req.body.name} \n\twith the cost: ${req.body.cost} \n\twith description: ${req.body.description}`);
    })
    .delete(async (req, res) => {
        await Promotion.findByIdAndDelete(req.params.promotionId);
        res.end(`Deleting promotion ${req.params.promotionId}`);
    });


module.exports = promotionRouter;
