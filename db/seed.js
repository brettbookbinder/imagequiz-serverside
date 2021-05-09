let flowers = [
    {
        name: "Acacia",
        picture: "https://habahram.blob.core.windows.net/flowers/acacia.jpg"
    },
    {
        name: "Alyssum",
        picture: "https://habahram.blob.core.windows.net/flowers/alyssum.jpg"
    },
    {
        name: "Amaryllis",
        picture: "https://habahram.blob.core.windows.net/flowers/amaryllis.jpg"
    },
    {
        name: "Aster",
        picture: "https://habahram.blob.core.windows.net/flowers/aster.jpg"
    },
    {
        name: "Azalea",
        picture: "https://habahram.blob.core.windows.net/flowers/azalea.jpg"
    },
    {
        name: "Begonia",
        picture: "https://habahram.blob.core.windows.net/flowers/begonia.jpg"
    },
    {
        name: "Buttercup",
        picture: "https://habahram.blob.core.windows.net/flowers/buttercup.jpg"
    },
    {
        name: "Calluna",
        picture: "https://habahram.blob.core.windows.net/flowers/calluna.jpg"
    },
    {
        name: "Camellia",
        picture: "https://habahram.blob.core.windows.net/flowers/camellia.jpg"
    },
    {
        name: "Cardinal",
        picture: "https://habahram.blob.core.windows.net/flowers/cardinal.jpg"
    },
    {
        name: "Carnation",
        picture: "https://habahram.blob.core.windows.net/flowers/carnation.jpg"
    },
    {
        name: "Clover",
        picture: "https://habahram.blob.core.windows.net/flowers/clover.jpg"
    },
    {
        name: "Crown Imperial",
        picture: "https://habahram.blob.core.windows.net/flowers/crownimperial.jpg"
    },
    {
        name: "Daffodil",
        picture: "https://habahram.blob.core.windows.net/flowers/daffodil.jpg"
    },
    {
        name: "Dahlia",
        picture: "https://habahram.blob.core.windows.net/flowers/dahlia.jpg"
    },
    {
        name: "Daisy",
        picture: "https://habahram.blob.core.windows.net/flowers/daisy.jpg"
    },
    {
        name: "Gladiolus",
        picture: "https://habahram.blob.core.windows.net/flowers/gladiolus.jpg"
    },
    {
        name: "Lantana",
        picture: "https://habahram.blob.core.windows.net/flowers/lantana.jpg"
    },
    {
        name: "Lily",
        picture: "https://habahram.blob.core.windows.net/flowers/lily.jpg"
    },
    {
        name: "Lotus",
        picture: "https://habahram.blob.core.windows.net/flowers/lotus.jpg"
    },
    {
        name: "Marigold",
        picture: "https://habahram.blob.core.windows.net/flowers/Marigold.jpg"
    },
    {
        name: "Orchid",
        picture: "https://habahram.blob.core.windows.net/flowers/orchid.jpg"
    },
    {
        name: "Primrose",
        picture: "https://habahram.blob.core.windows.net/flowers/primrose.jpg"
    },
    {
        name: "Sunflower",
        picture: "https://habahram.blob.core.windows.net/flowers/sunflower.jpg"
    },
    {
        name: "Tickseed",
        picture: "https://habahram.blob.core.windows.net/flowers/tickseed.jpg"
    },
    {
        name: "Tulip",
        picture: "https://habahram.blob.core.windows.net/flowers/tulip.jpg"
    },
    {
        name: "Zinnia",
        picture: "https://habahram.blob.core.windows.net/flowers/zinnia.jpg"
    }
];

//choices looks like: "answer1 answer2 answer3"
const client = require('./index')
async function createTables() {
    try {
        await client.connect()
        const response = await client.query(
            `
            CREATE TABLE flowers(
                id SERIAL PRIMARY KEY,
                name varchar(255) UNIQUE,
                picture varchar(255)
            );
            CREATE TABLE questions(
                id SERIAL PRIMARY KEY,
                "flowerid" INTEGER,
                FOREIGN KEY ("flowerid") REFERENCES flowers (id), 
                choices varchar(255),
                answer varchar(255)
            );
            CREATE TABLE quizzes(
                id SERIAL PRIMARY KEY,
                quiznumber INTEGER,
                "questionid" INTEGER,
                FOREIGN KEY ("questionid") REFERENCES questions (id)
            );
            CREATE TABLE customers(
                id SERIAL PRIMARY KEY,
                name varchar(255) UNIQUE,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL
            );
            CREATE TABLE scores(
                id SERIAL PRIMARY KEY,
                "customerid" INTEGER,
                FOREIGN KEY ("customerid") REFERENCES customers (id), 
                "quizid" INTEGER,
                FOREIGN KEY ("quizid") REFERENCES quizzes (id), 
                score INTEGER
            );
            
            `

        )
    } catch (error) {
        console.log(error)
    }
}
createFlowers().then(function(){
    console.log("success!")
})

async function createFlowers(){
    try {
        await client.connect()
        for (let index = 0; index < flowers.length; index++) {
            const element = flowers[index];
            const response = await client.query(
                `
                INSERT INTO flowers (name, picture)
                VALUES
                    ($1, $2);
                
                `, [element.name, element.picture]
            )
        }


    } catch (error) {
        console.log(error)
    }
}