/**
 *  Your code ⬇️
 */

const express = require('express');
const port = 3000;

const app = express();


const disneyMovies = require('./disney.json');

app.listen(port, () => {
    console.log('it works');
})

app.get('/characters', (req, res) => {
    console.log('Request query: ', req.query)
    const name = req.query.name;
    console.log('name', name)
    if(name) {
        const result = disneyMovies.filter((character) => {
            return character.name.includes(name)
        })
        return res.json((
            result
            ))
        }
        res.json(disneyMovies)
    })
    
    app.get('/characters/:_id', (req, res) => {
        const {_id} = req.params
        const myUniqueCharacter = disneyMovies.find((character) => {
        return character._id === Number(_id)
    })
    return res.json(myUniqueCharacter)
})

app.use(express.json())

app.post('/characters', (req, res) => {
    const {name, films} = req.body
    const _id = disneyMovies.length + 1
    const characterToCreate = {
        name,
        films,
        _id,
      }
      disneyMovies.push(characterToCreate)
      res.json({
        createdCharacter: characterToCreate
      })
})




