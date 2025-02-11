const app = require('./app');
const { log } = require('./utils/utils');

const PORT = process.env.PORT || 379;


// Command to run the server in dev mode -> npm run dev
app.listen(PORT, ()=>{
    log(`Listening on PORT Number: ${PORT}`)
})