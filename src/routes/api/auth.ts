import { Router } from "express";
const router = Router()

router.get('/', (req, res) => res.send('auth'));

export default {
    name: 'auth',
    v: 'v1',
    router
};