import express from 'express';
import bodyParser from 'body-parser';
import contact from './contact/contact.controller.js';

const router = express.Router();
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/ping', (req, res, next) => {
    res.status(200).send('pong!');
});

router.use('/contact', contact);

export default router;
