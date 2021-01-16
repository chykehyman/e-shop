import express from 'express';

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.json({ message: 'Success' }))
  .post((req, res) => res.json({ message: req.body }));

export default router;
