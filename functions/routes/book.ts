import express, { Router } from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.get('/get/books', controller.getAllBooks);
router.post('/create/book', controller.createBook);

export default router;
