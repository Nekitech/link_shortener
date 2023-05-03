import Pool from 'pg'

export const connectDB = new Pool.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shortener_links',
    password: '347389',
    port: 5432,
})
