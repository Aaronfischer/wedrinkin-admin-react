import express from 'express';
import authenticate from '../middlewares/authenticate';
import Drink from '../models/Drink';
import parseErrors from '../utils/parseErrors';

const router = express.Router();
router.use(authenticate);

router.get('/', (req, res) => {
  Drink.find().then(drinks => {
    // console.log('drinks', drinks);
    return res.json({ drinks });
  });
});

router.get('/:id', (req, res) => {
  // console.log('req.body', req.body);
  // console.log('req.params', req.params.id);
  Drink.findById(req.params.id).then(drinks => {
    // console.log('drinks', drinks);
    return res.json({ drinks });
  });
});

router.post('/', (req, res) => {
  Drink.create({ ...req.body.drink })
    .then(drinks => res.json({ drinks }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.patch('/:id', (req, res) => {
  // console.log('req.body', req.body);
  // console.log('req.params', req.params.id);
  Drink.findByIdAndUpdate(req.params.id, { $set: req.body.drink }, { new: true }, (err, drinks) => {
    if (err) {
      return res.status(500).json(err);
    }
    // console.log('drinks', drinks);
    return res.json({ drinks });
  });
});

router.delete('/:id', (req, res) => {
  // console.log('req.body', req.body);
  // console.log('req.params', req.params.id);
  Drink.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json();
  });
});

router.get('/search', (req, res) => {
  res.json({
    drinks: [
      {
        id: '1',
        name: 'Melon Patch',
        img: 'icon-icon-set-tall-mixed-drink',
        quote: 'I love Melon',
        temp: ['70', '80', '90', '100'],
        wind: undefined,
        time: ['morning', 'noon'],
        city: undefined,
        country: undefined,
        region: undefined,
        ingredients: [
          {
            item: 'melon liqueur',
            amount: '1 oz'
          },
          {
            item: 'triple sec',
            amount: '1/2 oz'
          },
          {
            item: 'vodka',
            amount: '1/2 oz'
          },
          {
            item: 'club soda',
            amount: '4 1/2 oz'
          }
        ],
        instructions:
          'Stir the melon liqueur, triple sec and vodka together in a highball glass filled with ice cubes. Fill with club soda, garnish with a slice of orange, and serve.'
      },
      {
        id: '2',
        name: 'Bellini',
        img: 'flaticon-champagne-2',
        quote: 'I love Bellini',
        temp: ['60', '70', '80', '90', '100'],
        wind: undefined,
        time: ['morning', 'noon', 'happyhour', 'night'],
        city: undefined,
        country: undefined,
        region: undefined,
        ingredients: [
          {
            item: 'pureed peach',
            amount: '1 ripe'
          },
          {
            item: 'Champagne',
            amount: '6 oz'
          }
        ],
        instructions:
          'Pour peach puree into glass and slowly add champagne. Stir gently. Garnish with a peach slice.'
      }
    ]
  });
});

export default router;
