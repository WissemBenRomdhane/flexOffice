const { MongoClient } = require('mongodb');

async function main(){

    const uri = "mongodb+srv://wissem:Wissemjerbi1.@cluster0.5htiyub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const client = new MongoClient();

    try{
        await client.connect(uri, function(err, db){
            if(err) throw Error;
            db.createCollection("users", function(err, result){
                if(err) throw Error;
                console.log("Collection is created!");
                db.close();
            })
        });
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}

main().catch(console.error);
