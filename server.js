const express = require('express');

const knex = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with knex</h3>');
});

server.get('/accounts', (req, res) => {
    knex('accounts').then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.status(500).json({error:"failed to get posts"});
    })
    });
    
    server.get('/:id', (req, res) => {
        knex.select('*').from('accounts').where('id','=',req.params.id).first().then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            res.status(500).json({error:"failed to get post"});
        })
    });
    
    server.post('/accounts', (req, res) => {
        knex.insert(req.body).into('accounts').then(obj => {
            res.status(200).json(obj)
        })
        .catch(err => {
            res.status(500).json({error:"failed to insert post"});
        })
    });
    
    server.put('/:id', (req, res) => {
        const id = req.params.id;
        const update = req.body;
        knex('accounts').where({id:id}).update(update).then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            res.status(500).json({error:"failed to update post"});
        })
    });
    
    server.delete('/:id', (req, res) => {
        const id = req.params.id;
        knex('accounts').where({id:id}).del().then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({error:"failed to update post"});
        })
    });


module.exports = server;