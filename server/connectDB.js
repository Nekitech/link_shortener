import Pool from 'pg'

export const connectDB = new Pool.Pool({
    user: process.env.DBUSER || 'postgres',
    host: process.env.DBHOST || 'localhost',
    database:  process.env.DBUSER  || 'shortener_links',
    password: process.env.DBPASS || '347389',
    port: 5432,
})
