const { Pool } = require('pg')

const { Router } = require('express');

const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '12345678',
    database: 'postgres'
})


class userController {

    async findUsers(req, res) {       
        try {

            var User = await pool.query('SELECT *FROM person');
            return res.status(200).json(User);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findOneUser(req,res){
        try{
            var id = parseInt(req.params.id)
            var User = await pool.query('SELECT * FROM person WHERE id_person = $1', [id])
            console.log(User)
            return res.status(200).json(User);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }
    async delUser(req,res){
        try{
            var id = parseInt(req.params.id)
            var User = await pool.query('DELETE FROM person WHERE id_person = $1', [id])
            return res.status(200).json(User);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async addUser(req,res){
        try{
            const { first_name, last_name , email, password, adress } = req.body
            var User= await pool.query('INSERT INTO person(first_name,last_name,email, password, adress) VALUES ($1, $2, $3, $4, $5)', [first_name,last_name, email,password,adress]);
            return res.status(200).json(User);
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    
    }    


}



module.exports = new userController();