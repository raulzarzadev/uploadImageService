const dotenv = require('dotenv')
dotenv.config()
const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'))
    console.log('Eviroment: ', process.env.NODE_ENV)
});