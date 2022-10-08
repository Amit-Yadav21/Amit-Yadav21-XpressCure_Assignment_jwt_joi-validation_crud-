const knex = require('knex')({
    client: "mysql",
    connection : {
        host : "localhost",
        user : "root",
        database : "XpressCure_Assignment",
        password : "Amit@123"
    }
})

knex.schema.createTable("Employee_data", t=>{
    t.increments("Employee_ID"),
    t.string("Name").notNullable()
    t.string("Email").unique().notNullable()
    t.string("Address").notNullable()
    t.string("Phone_Number").unique().notNullable()
}).then(()=>{
    console.log("table created...........");
}).catch(()=>{
    console.log('table create allready...');
})

module.exports = knex
