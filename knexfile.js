;

module.exports = {
    development: {
        migrations: { tableName: 'knex_migrations'},
        seeds: { tableName: './seeds' },
        client: 'pg',
        connection: {
                        host: '127.0.0.1', 
                        user: 'postgres', 
                        password: '1234', 
                        database: 'GEDI'
                    }   
    },
    production: {
        migrations: { tableName: 'knex_migrations'},
        seeds: { tableName: './seeds' },
        client: 'pg',
        connection: {
                        host: '127.0.0.1', 
                        user: 'postgres', 
                        password: '1234', 
                        database: 'GEDI'
                    }   
    }

    
}
//Para conectarse con Heroku
/* ;

module.exports = {
    development: {
        migrations: { tableName: 'knex_migrations'},
        seeds: { tableName: './seeds' },
        client: 'pg',
        connection: 'postgres://fsgeznvynosdto:79ecd2dcecd6f34e5df7936b26453c6fc165868dcd36a7fa713fde41521327fa@ec2-18-206-84-251.compute-1.amazonaws.com:5432/dd0paks30un424'   
    },
    production: {
        migrations: { tableName: 'knex_migrations'},
        seeds: { tableName: './seeds' },
        client: 'pg',
        connection: process.env.DATABASE_URL
    }

    
}
 */