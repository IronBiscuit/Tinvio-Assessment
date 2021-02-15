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
function fetchJSON(url) {
    return fetch(url)
    .then(response => response.json())
  }

app.get("", (req, res) => {
    const userData = fetchJSON('https://jsonplaceholder.typicode.com/users/1');
    const userPosts = fetchJSON('https://jsonplaceholder.typicode.com/posts?userId=1');
    Promise.all([userData, userPosts]).then((data) => {
        var userData = data[0];
        var postData = data[1];
        
        var name = userData.name;
        var firstName = name.split(' ')[0];
        var phoneFullString = userData.phone;
        var website = userData.website;
        var email = userData.email;
        var addressStreet = userData.address.street;
        var addressSuite = userData.address.suite;
        var addressCity = userData.address.city;
        var addressZipcodeFullString = userData.address.zipcode;
        var companyBsFullString = userData.company.bs;
            
        var phone = phoneFullString.split(' ')[0];
        var addressZipcode = addressZipcodeFullString.split('-')[0];
        var companyBs = companyBsFullString.split(' ');
        for (var i = 0; i < companyBs.length; i++) {
            companyBs[i] = companyBs[i].charAt(0).toUpperCase() + companyBs[i].substring(1);
        }

        for (var i = 0; i < postData.length; i++) {
            postData[i].title = postData[i].title.charAt(0).toUpperCase() + postData[i].title.substring(1);
        }
        
        res.render('index', {
            name: name,
            firstName: firstName,
            phone: phone,
            website: website,
            email: email,
            addressStreet: addressStreet,
            addressCity: addressCity,
            addressSuite: addressSuite,
            addressZipcode: addressZipcode,
            companyBs: companyBs,
            postData: postData
        })
    })
/* fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
        .then(output => {
            var indexData = output;
            var name = indexData.name;
            var firstName = name.split(' ')[0];
            var phoneFullString = indexData.phone;
            var website = indexData.website;
            var email = indexData.email;
            var addressStreet = indexData.address.street;
            var addressSuite = indexData.address.suite;
            var addressCity = indexData.address.city;
            var addressZipcodeFullString = indexData.address.zipcode;
            var companyBsFullString = indexData.company.bs;
            
            var phone = phoneFullString.split(' ')[0];
            var addressZipcode = addressZipcodeFullString.split('-')[0];
            var companyBs = companyBsFullString.split(' ');
            for (var i = 0; i < companyBs.length; i++) {
                companyBs[i] = companyBs[i].charAt(0).toUpperCase() + companyBs[i].substring(1);
            }
            res.render('index', { 
                name: name,
                firstName: firstName,
                phone: phone,
                website: website,
                email: email,
                addressStreet: addressStreet,
                addressCity: addressCity,
                addressSuite: addressSuite,
                addressZipcode: addressZipcode,
                companyBs: companyBs
            });
        }) */
})

// Listen on port 3000
app.listen(port, () => console.info('Listening on port ' + port))

