
const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Op, Sequelize } =  require("sequelize");

const { Country, Activity } = require("../db.js");
// const { getCountries } = require("../controllers/Controllers.js");
// const { getTypes} = require("../controllers/types.js");
// const { validatorUUIDV4 } = require("../controllers/validator.js");

router.get("/", async (req, res, next) => {

  try {
    const contries = await axios.get("https://restcountries.com/v3/all");

    const saveCountries = contries.data.map((c) => {
      return {
        id: c.cca3,
        name: c.name.common,
        imagen: c.flags[1],
        continente: c.continents,
        capital: c.capital ? c.capital : "desconocido",
        subregion: c.subregion ? c.subregion : "desconocido",
        area: c.area,
        poblacion: c.population
      }
    });

    const countries = await Country.findAll();

    if (!countries.length) {
      await Country.bulkCreate(saveCountries);
    }
    res.json(countries);

  } catch (error) {
    next(error)
  }

});

router.get("/name", async (req, res, next) => {

  try {
    const  {name}  = req.query;

    const findCountryForName = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: name
        }
      },
      include: {
        model: Activity
      }
    });
    
    if (findCountryForName === null || !findCountryForName.length) {
      res.json({ mensaje: "Nombre de País no encontrado...!!!" });
    } else {
      res.json(findCountryForName);
    }

  } catch (error) {
    next(error)
  }

});


router.get("/:idPais", async (req, res, next) => {

  try {
    const { idPais } = req.params;

    const findCountryOfId = await Country.findByPk(idPais, {
      include: {
        model: Activity,
        through: {
          attributes: []
        },
        attributes: ["id", "name", "dificultad", "duracion", "temporada"]
      }
    });

    if (findCountryOfId === null) {
      res.json({ mensaje: "Codigo de País no encontrado...!!!" });
    } else {
      res.json(findCountryOfId);
    }

  } catch (error) {
    next(error)
  }

});


module.exports = router;  