const express = require('express')
const app = express()
const PORT = 8383
let data = {
    name: 'Halil'
}




//Tip bir website endpointleri html tarafına yollanır görülebilirdir

app.get('/',(req,res) => {

    res.send(`
        <body sty>
            <p>${JSON.stringify(data)}</p> 
        </body>        
    `)
})

app.get('/dashboard',(req,res) => {

    res.send('<h1>Dashboard</h1>')
})


//Tip 2 website endpointleri API ile kullanılır görülebilir değildir
//CRUD  - create-post read-get update and delete 


app.get('/api/data',(req,res) => {
    console.log('This one for data')
    res.send(data)
})


app.listen(PORT, () => console.log('Server has started on :8383'))