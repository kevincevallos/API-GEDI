;

module.exports = {
    development: {
        migrations: { tableName: 'knex_migrations'},
        seeds: { tableName: './seeds' },
        client: 'pg',
        connection: {
                        host: 'localhost', 
                        port :'5432',
                        user: 'uxteqgfeiclzfw', 
                        password: 'b67ce2a53f4d49babe9dba76df45b6d6c4ef13d1bae9ac6a8335c4902b100d4b', 
                        database: 'dfsj6rb0gu2t1j'
                    }   
    },
    production: {
        migrations: { tableName: 'knex_migrations'},
        seeds: { tableName: './seeds' },
        client: 'pg',
        connection: {
                        host: 'localhost',
                        port :'5432', 
                        user: 'uxteqgfeiclzfw', 
                        password: 'b67ce2a53f4d49babe9dba76df45b6d6c4ef13d1bae9ac6a8335c4902b100d4b', 
                        database: 'dfsj6rb0gu2t1j'
                    }   
    }

    
}
