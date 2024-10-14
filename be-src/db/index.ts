import * as Sequelize from "sequelize"
import { loadKeys } from "../controllers/keysController"

// inicializacion de la DB
const DB_ENDPOINT_MOCK = loadKeys().databases.elephant.DB_ENDPOINT_MOCK;

export const db = new Sequelize.Sequelize(DB_ENDPOINT_MOCK)
