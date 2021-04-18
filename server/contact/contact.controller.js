import express from 'express';
import contactService from './contact.service.js';

const router = express.Router();

// Routes
router.post('/send', send)

function send(req, res, next) {
    contactService.send(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect'}))
    .catch(console.error);
}

export default router;