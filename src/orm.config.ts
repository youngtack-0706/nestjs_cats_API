import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function ormConfig(): TypeOrmModuleOptions{
    const commonConf = {
        SYNCHRONIZE: false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
        // MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        // CLI: {
        //     migrationsDir: 'src/migrations',
        // },
        // MIGRATIONS_RUN: false,
      };

    const ormConf: TypeOrmModuleOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'qlslfn1234',
        database: 'nestjs',
        entities: commonConf.ENTITIES,
        synchronize: commonConf.SYNCHRONIZE,
        logging: true,
        // migrations: commonConf.MIGRATIONS,
        // cli: commonConf.CLI,
        // migrationsRun: commonConf.MIGRATIONS_RUN,
    }

    return ormConf
}

export {ormConfig}