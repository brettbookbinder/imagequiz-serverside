const client = require('./db/index.js')
const express = require('express')
const server = express()
const port = process.env.PORT || 3001
const cors = require('cors')

server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.get('/quizzes', async (req, res) => {
  try {
    const response = await client.query(
      `
      SELECT * FROM quizzes
      JOIN questions ON quizzes."questionid" = questions.id;
      `
      )
      console.log(response.rows)
      res.send(response.rows)
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
})

server.get('/quiz/:id', async (req, res) => {
  const quizid = req.params.id
  console.log(quizid)
  try {
    const response = await client.query(
      `
      SELECT * FROM quizzes
      JOIN questions ON quizzes."questionid" = questions.id
      JOIN flowers ON questions."flowerid" = flowers.id
      WHERE quizzes.quiznumber = $1;
      `, [quizid]
      )
      console.log(response.rows)
      res.send(response.rows)
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
})

server.post('/customer', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const response = await client.query(
      `
      SELECT * FROM customers
      WHERE name = $1;
      `, [name]
      )
      console.log(response.rows)
      if(response.rows.length === 0){
        //make new user
        console.log('user does not exist, making new user');
        const response = await client.query(
          `
          INSERT INTO customers (name, email, password)
          VALUES($1, $2, $3)
          RETURNING *;
          `, [name, email, password]
          )
          console.log(response.rows)
          res.send(response.rows[0])
      }
      else{
        //existing user
        console.log("user exists")
        res.send(response.rows[0])
      }

  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
})

server.post('/score', async(req, res) => {
  const quizid = req.body.quizid;
  const customerid = req.body.customerid;
  const score = req.body.score;

  try {
    const response = await client.query(
      `
      INSERT INTO scores (customerid, quizid, score)
      VALUES($1,$2,$3)
      RETURNING *;
      `, [customerid, quizid, score]
      )
      console.log(response.rows)
      res.send(response.rows[0])
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
})

server.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
  await client.connect()
})
