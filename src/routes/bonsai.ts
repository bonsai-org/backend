import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    trees: [
      { id: '1', name: 'a' },
      { id: '2', name: 'b' },
      { id: '3', name: 'c' },
    ],
  });
});

router.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Create a bonsai profile (requires authentication).',
    path: '/api/bonsai/',
    verb: 'POST',
  });
});

router.put('/:id', (req: Request, res: Response) => {
  res.json({
    message: 'Update a bonsai profile (requires authentication).',
    path: '/api/bonsai/:id',
    verb: 'PUT',
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.json({
    message: 'Delete a bonsai profile (requires authentication).',
    path: '/api/bonsai/:id',
    verb: 'DELETE',
  });
});

export default router;
