
//this is the backend Basic api with CRUD operations // No cache yet //
//make a get request to get contacts
const express = require('express')
var morgan = require('morgan')
var cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
//crear token
//primer argument es el nombre, segundo req res function
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':content :method :url :status :response-time ms - :res[content-length]'))




let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateIdRandom = () =>{
  return Math.floor(Math.random() * 529438.839)
}

app.get('/', (request, response) => {
  response.send('<h1>Contacts</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`<p>This phonebook has ${persons.length} people</p><p>${new Date()}</p>`)
})

// get by ID
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id) //Cast a number para resolver bug en vez de usar ==
  const person = persons.find(person => person.id === id)

  //Error handling
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

//Delete by ID
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

//create a post request for adding a contact to adress api/persons, use Math random for id

app.post('/api/persons', (request, response) => {

  const body = request.body
  let nameDuplicate = persons.filter(person => person.name === body.name)

  //Error handling
  if(!body.name){
    return response.status(400).json({
      error: "Name should not be blank."
    })
  }else if(!body.number){
    return response.status(400).json({
      error: "Number should not be blank"
    })
  }else if(nameDuplicate.length > 0){
    return response.status(400).json({
      error: "Name already exists"
    })
  }
  const contact = {
    //mejorar ID pero mongo las hace auto
    id: generateIdRandom(),
    name: body.name,
    number: body.number
  }
  
  persons = persons.concat(contact)
  response.json(contact)
})

//Middleware para error posteriores
const unknownEndpoint = (request, response) =>{
  response.status(404).send({error: 'Unknown endpoint'})
}

app.use(unknownEndpoint)

//varible port para deploy
const PORT = process.env.PORT || 3011
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
