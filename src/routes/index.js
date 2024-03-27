const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routeCountry = require('./Country.js')
const routeActivity  = require('./Activity.js');
const router = Router();  

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries__', routeCountry);
router.use('/activity__', routeActivity);

module.exports = router;
