const express = require('express');
const Partner = require('../models/partner.js');

const partnerRouter = express.Router();


partnerRouter.route('/')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(async (req, res) => {
        const partners = await Partner.find();
        res.send(partners);
        res.end('Will send all the partners to you');
    })
    .post(async (req, res) => {
        const newPartner = Partner({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            featured: req.body.featured
        });
        await newPartner.save();
        res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /partners');
    })
    .delete(async (req, res) => {
        await Partner.deleteMany();
        res.end('Deleting all partners');
    });


partnerRouter.route('/:partnerId')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(async (req, res) => {
        const partner = await Partner.findById(req.params.partnerId);
        res.send(partner);
        res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
    })
    .put(async (req, res) => {
        const filter = { id: req.params.partnerId };
        const update = {
            name: req.body.name,
            description: req.body.description
        };
        await Partner.findOneAndUpdate(filter, update);
        res.write(`Updating the partner ${req.params.partnerId}\n`);
        res.end(`Will update the partner: ${req.body.name} \n\twith description: ${req.body.description}`);
    })
    .delete(async (req, res) => {
        await Partner.findOneAndDelete({ id: req.params.partnerId });
        res.write(`Deleting the partner ${req.params.partnerId}\n`);
        res.end(`Will delete the partner: ${req.body.name} \n\twith description: ${req.body.description}`);
    })


module.exports = partnerRouter;
