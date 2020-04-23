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
