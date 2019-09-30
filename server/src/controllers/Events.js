const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'coc-vjti',
	api_key: '552242973352355',
	api_secret: process.env.CLOUDINARY_SECRET
});
const Event = require('../models/Event')

module.exports = {
	async getEvents(_req, res) {
		const events = await Event.find();
		res.json(events);
	},
	async getEventById(req, res) {
		const eventId = req.params.id;
		const event = await Event.findById(eventId);
		res.json(event);
	},
	async uploadEvent(req, res) {
		try {

			// const eventname = req.body.eventName
			const file = req.file;
			const image = cloudinary.v2.uploader.upload(file.path);
			req.body.image = {
				url: image.secure_url,
				public_id: image.public_id
			};
			// const filename = eventname + '-' + req.body.date.substr(0,3) + path.extname(req.file.originalname).toLowerCase()

			// req.body.imagePath = path.join(__dirname,'../images/events/',filename)

			const event = await Event.create(req.body);
			res.json({
				"id": event._id
			});
		} catch (err) {
			res.status(400).send({
				err: err
			})
		}
	},
	async updateEvent(req, res) {
		const eventId = req.params.id;
		const event = Event.findById(eventId);
		res.json({
			"id": event._id
		});
	},
	async deleteEvent(_req, res) {
		const eventId = req.params.id;
		const event = Event.findById(eventId);
		await event.remove();
		res.status(204);
	},
}