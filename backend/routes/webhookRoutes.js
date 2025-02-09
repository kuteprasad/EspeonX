import express from 'express';
import bodyParser from 'body-parser';
import { handleWebhook } from '../controllers/webhookController.js';

const router = express.Router();

router.post('/webhooks', bodyParser.raw({ type: 'application/json' }), handleWebhook);

export default router;
