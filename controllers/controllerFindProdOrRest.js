const pool = require('../pool');

class controllerFindProdOrRest {

    async findProductOrRestaurante(req,res){
        try{
            var nome =  req.params.name+ '%'
            console.log(nome)

            var find = await pool.query('SELECT * FROM establishment join dish on establishment.id_establishment=dish.fk_establishment_id_establishment WHERE dish.name_dish LIKE $1 or establishment.name_estab LIKE $1', [nome])
            console.log(find)
            return res.status(200).json(find["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }
    async ListOrProductRestaurante(req, res) {       
        try {
            var find = await pool.query('SELECT * FROM public.establishment INNER JOIN adress_est ON establishment.fk_adress_est_id_adress_est=adress_est.id_adress_est;');
            return res.status(200).json(find["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
   

}

module.exports = new controllerFindProdOrRest();


    
    
       
