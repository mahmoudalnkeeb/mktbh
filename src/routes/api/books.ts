import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => res.send('books'))

export default {
  name: 'books',
  v: 'v1',
  router,
}
