const Feed = require('rss-to-json');
const MongoClient = require('mongodb');
const assert = require('assert')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const url = process.env.MONGO_URL;

// store all RSS feeds in an array
let whamRSS = "https://feed.goshortwave.com/podcasts/wet-hot-american-moon-juice-XSIgTGPJa-XSNxHb/rss"
let spooky = "https://pinecast.com/feed/spooky-spouses"
let cantWait = "https://feed.goshortwave.com/podcasts/can-t-hardly-wait-minute-rtJyNsmsjfKqeODv/rss"
let alabaster = "https://pinecast.com/feed/alabasters-haberdashery"

// research how to loop over objects


// run the load script for each podcast


// Use connect method to connect to the Server
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    const db = client.db(process.env.MONGO_DATABASE)
    const collection = db.collection(process.env.MONGO_COLLECTION)

    assert.strictEqual(null, err);   
    console.log("Connected successfully to server");

    // something async needs to go into here
    collection.find({}).toArray( async function(err, docs) {
        try {
            await assert.strictEqual(err, null);
            await console.log("Found the following records");
            await console.log(docs);

            client.close(function() {
                console.log("close connection")
            })
        } catch{
            console.log(err)
        }
        // callback(docs);
      });


})

// // getting title, description, image
// Feed.load(alabaster).then(rss => {
//     let {items, title, description, link, category, image} = rss;
    
//     // use this metadata!
//     let podcastMetaData = {
//         title: rss.title,
//         image: rss.image,
//         description: rss.description.split("\n")[0],
//         scavLink: ""
//     }

//     for (let i = 0; i < items.length; i++) {
//         console.log(podcastMetaData)
//         console.log(rss.items[i].title)
//         console.log(rss.items[i].description.split("\n")[0])
//         console.log(rss.items[i].title.split('\n')[0].slice(0,24))  
//         // combine into one message, make API call
//     }

// });