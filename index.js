const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-eu1-8490b6c7-a9f7-4750-aec2-09d288bc080f';

app.get('/', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/cats?properties=name&properties=gender&properties=date_of_birth';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('home', { title: 'Home | Integrating With HubSpot I Practicum', data});

    } catch (error) {
        console.error(error);
    }
});

app.get('/update-cobj', async (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'});
});

app.post('/update-cobj', async (req, res) => {
    const { name, gender, date_of_birth } = req.body;
    const cats = 'https://api.hubspot.com/crm/v3/objects/cats';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json',
    }
    const properties = {
        name,
        gender,
        date_of_birth
    }

    try {
        await axios
            .post(cats, {properties}, {headers})
            .then(() => res.redirect("/"));
    } catch (e) {
        console.error(e);
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));