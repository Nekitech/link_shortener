import {connectDB} from "../connectDB.js";
import { UniqueCharOTP} from 'unique-string-generator';

class Link {

    nameTable = "links";
    getAllLinks = async () => {
        const {rows: data} = await connectDB.query(`select * from ${this.nameTable}`);
        return data
    }

    addLink = async ({link}) => {
       const {rows: return_data} = await connectDB.query(`INSERT INTO ${this.nameTable} 
                        (url, short_url) values ($1, $2) RETURNING *`, [link, 'http://localhost:3000/' + UniqueCharOTP(4)]);
       return return_data
    }

    matchLink = async ({link}) => {
        const {rows: data} = await connectDB.query(`SELECT * FROM ${this.nameTable} WHERE short_url = $1`, [link]);
        return data
    }
}

export const LinkController = new Link();