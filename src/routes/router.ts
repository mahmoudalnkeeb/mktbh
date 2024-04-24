import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const router = Router()

const api_routes = fs.readdirSync(path.resolve(path.join(__dirname, '/api')))

for (const r of api_routes) {
  import(path.resolve(path.join(__dirname, '/api', r))).then((route) => {
    if (route.default.router) {
      console.log(`route ${route?.default?.name} initialized`)
      router.use(
        `/${route?.default?.v}/${route?.default?.name}`,
        route?.default?.router,
      )
    }
  })
}

export default router
