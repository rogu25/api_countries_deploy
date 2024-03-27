const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dificultad: {
      type: DataTypes.ENUM,
      values: ['1','2','3','4','5']
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    temporada: {
      type: DataTypes.ENUM,
      values: ['verano','otono','invierno','primavera']
    },
  }, {
    timestamps: false
  });
};
