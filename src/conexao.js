const { Pool }  = require('pg');

const pool = new Pool (

    {
        host:"isabelle.db.elephantsql.com" ,
        port: 5432,
        user: "icdadpje",
        password: "d03Nay9V-WSE9EcWBbCopbjRBooRnhfS",
        database: "icdadpje"
      }
) 
 
    
    
    module.exports = pool;