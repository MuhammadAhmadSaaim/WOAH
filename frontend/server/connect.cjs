const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db);

    try {
        await client.connect();

        const database = client.db("WOAH");
        //These lines of code are to test if connection with Database is established or not
        //const collections = await database.listCollections().toArray();
        //collections.forEach((collection) => console.log(collection.name));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();
