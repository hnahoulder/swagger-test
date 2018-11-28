const express = require('express');
const bodyParser = require('body-parser');
// const expressOasGenerator = require('express-oas-generator');
const port = 3002;

const phones = require('./data');
console.log(phones);

let app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.set('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// expressOasGenerator.init(app, {}); // to overwrite generated specification's values use second argument.
const options = {
    swaggerDefinition: {
        info: {
            title: 'REST - Swagger',
            version: '1.0.0',
            description: 'REST API with Swagger doc',
            contact: {
                email: 'contact@danielpecos.com'
            }
        },
        tags: [
            {
                name: 'phones',
                description: 'Phones API'
            }
        ],
        schemes: ['http'],
        host: 'localhost:3002',
        basePath: '/api'
    },
    apis: ['./router/index.js']
};

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJSDoc(options);

app.get('/json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const indexRouter = require('./router/index');
app.use('/api',indexRouter);






app.listen(port, () => {
    console.log(`Listen to port ${port} ....`);
});