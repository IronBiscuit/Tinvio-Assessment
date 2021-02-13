//Imports
const express = require('express'); 
const app = express();
const fetch = require("node-fetch");
const port = 3000;

// Statics
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrapJS', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/scss'));

//Enable ejs
app.set('views', './views')
app.set('view engine', 'ejs');

//Async function to obtain data
async function getData() {
    let jsonData;
    try {
        var response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        jsonData = await response.json();
        return jsonData;
    } catch (e) {
        console.error(e);
        return null;
    }
}

app.get("", (req, res) => {
fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
        .then(output => {
            var indexData = output;
            var name = indexData.name;
            var phone = indexData.phone;
            var website = indexData.website;
            var email = indexData.email;
            var addressStreet = indexData.address.street;
            var addressSuite = indexData.address.suite;
            var addressCity = indexData.address.city;
            var addressZipcode = indexData.address.zipcode;
            res.render('index', { 
                name: name,
                phone: phone,
                website: website,
                email: email,
                addressStreet: addressStreet,
                addressCity: addressCity,
                addressSuit: addressSuite,
                addressZipcode: addressZipcode
            });
        })
})

// Listen on port 3000
app.listen(port, () => console.info('Listening on port ' + port))

