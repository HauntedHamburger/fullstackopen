const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3001

// Basic usage
app.use(morgan('combined'))

// Custom token definition
morgan.token('user-agent', (req, res) => {
    return req.headers['user-agent']
})

// Express Json-Parser
// >> Takes raw data from 'request object'
// >> Parses into JS object
// >> Assigns it to 'request object' as new property body
app.use(express.json())

// Morgan string format
app.use(morgan(':method :url :status :response-time'))

// Randomizer
const generateRandom = () => {
    return Math.floor(Math.random() * 100) + 1
}

// ID Creator
const generateId = () => {
    const maxId = persons.length > 0 
        ? Math.max(...persons.map(p => Number(p.id)))
        : 0
    return String(maxId + generateRandom())
}

// Hardcoded Dataset
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


// --------------------------------------------------------- //
//                          ROUTES                           //
// --------------------------------------------------------- //

// Home
app.get('/', (req, res) => {
    res.send('<p>Ayo</p>')
})

// All People
app.get('/api/persons', (req, res) => {
    res.send(persons)
})

// Get Single Person
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    
    if (person) {
        res.json(person)
    } else {
        res.status(404).send(`Whoops, person with id ${id} does not exist.`)
    }
})

// Get Info
app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br><br> ${Date()}`)
})

// Add Person
app.post('/api/persons', (req, res) => {
    const body = req.body
    body.id = generateId()

    if (!body.name) {
        return res.status(400).json({
            error: 'missing a name'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'missing a number'
        })
    }

    const existingName = persons.find(p => p.name === body.name)
    if (existingName) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    persons = persons.concat(body)
    res.status(201).send(persons)
})

// Delete Person
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

// Undefined Route Catcher
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpount' })
}

app.use(unknownEndpoint)


// --------------------------------------------------------- //
//                       LISTENER                            //
// --------------------------------------------------------- //

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})