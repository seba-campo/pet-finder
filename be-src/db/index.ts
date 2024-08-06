import * as Sequelize from "sequelize"

// inicializacion de la DB
const DB_ENDPOINT = "postgres://gojiawcm:lUiUBKrYb7riA97AdVwxOD0HBbzeJZPi@castor.db.elephantsql.com/gojiawcm"

export const db = new Sequelize.Sequelize(DB_ENDPOINT)
