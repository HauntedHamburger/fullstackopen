const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3001

const generateId = () => {
    const maxId = persons.length > 0 
        ? Math.floor(Math.random()) 
        : 0
    return maxId + 1
}

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Home
app.get('/', (req, res) => {
    res.send('<p>Ayo</p>')
})

// All People
app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    
    if (person) {
        res.json(person)
    } else {
        res.status(404).send(`Whoops, person with id ${id} does not exist.`)
    }
})

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br><br> ${Date()}`)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    body.id = generateId()
    persons = persons.concat(body)
    res.status(201).send(persons)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})