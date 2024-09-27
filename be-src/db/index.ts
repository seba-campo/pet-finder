import * as Sequelize from "sequelize"

// inicializacion de la DB
// const DB_ENDPOINT = "postgres://gojiawcm:lUiUBKrYb7riA97AdVwxOD0HBbzeJZPi@castor.db.elephantsql.com/gojiawcm"
const DB_ENDPOINT_MOCK = "postgres://hpjfufwn:ZsJxLicY7pw20xxG3kRFshV2YHPhcpJy@ruby.db.elephantsql.com/hpjfufwn"

export const db = new Sequelize.Sequelize(DB_ENDPOINT_MOCK)
