import { Router } from 'express';
import { create, getAll, getById, update } from './controller';

const router = new Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);

// router.get('/',
//   token({ required: true }),
//   query(),
//   index)

// router.get('/:id',
//   token({ required: true }),
//   show)

// router.put('/:id',
//   token({ required: true }),
//   body({ amount, participents }),
//   update)

// router.delete('/:id',
//   token({ required: true }),
//   destroy)

export default router;
