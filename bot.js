const Feed = require('rss-to-json');
const MongoClient = require('mongodb');
const assert = require('assert')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const url = process.env.MONGO_URL;

// store all RSS feeds as objects with link to scav page

// research how to loop over objects


// run the load script for each podcast


let alabaster = {
    rssFeed: "https://pinecast.com/feed/alabasters-haberdashery",
    scavLink: "https://www.scavengersnetwork.com/alabaster"
}

let wham = {
    rssFeed: "https://feed.goshortwave.com/podcasts/wet-hot-american-moon-juice-XSIgTGPJa-XSNxHb/rss" ,
    scavLink: "https://www.scavengersnetwork.com/whamjuice"
}

let spookypod = {
    rssFeed: "https://pinecast.com/feed/spooky-spouses",
    scavLink: "https://www.scavengersnetwork.com/spookyspouses"
}

let cantWaitPod ={
    rssFeed: "https://feed.goshortwave.com/podcasts/can-t-hardly-wait-minute-rtJyNsmsjfKqeODv/rss",
    scavLink: "https://www.scavengersnetwork.com/jamesanderinminutemovies"
}
  
// Use connect method to connect to the Server
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async function(err, client) {
    const db = client.db(process.env.MONGO_DATABASE)
    const collection = db.collection(process.env.MONGO_COLLECTION)
    try {

    assert.strictEqual(null, err);   
    console.log("Connected successfully to server");

    let podArray = []

    let docs = await Feed.load(cantWait).then( rss => {
        let {items, title, description, link, category, image} = rss;

        let podcastMetaData = {
            name: rss.title,
            imageURL: rss.image,
            // description: rss.description.split("\n")[0],
            scavLink: "https://www.scavengersnetwork.com/jamesanderinminutemovies"
        }

        for (let i = 0; i < items.length; i++) {
            let entryObject = {
                ...podcastMetaData,
                episodeTitle: rss.items[i].title,
                titleShort:  rss.items[i].title.split('\n')[0].slice(0,24),
                episodeDescription:rss.items[i].description.split("\n")[0],
                episodeNumber: i+1
            }
            podArray.push(entryObject)
        }
        return podArray

    });

    // collection.find({}).toArray( async function(err, docs) {
    //     try {
    //         await console.log("Found the following records");
    //         await console.log(docs);
          
    //         client.close(function() {
    //             console.log("close connection")
    //         })
    //     } catch {
    //         console.log(err)
    //     }
        
    //   });

    collection.insertMany(docs)
        .then( async function(result,err) {
            console.log(result)
            client.close(function() {
                console.log("close connection")
            })
        }).catch(
            console.log(err)
    )

    } catch {
        console.log(err)
    }
})