import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { join } from "path";

function createConnection() {}

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "eshop.sqlite",
    // entities: [join('src', 'entity/*.{ts}')],
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
});

// AppDataSource.initialize();

export default AppDataSource;
