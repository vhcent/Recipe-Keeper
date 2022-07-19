const http = require('https') //import https moduke

const options = {
    hostname: 'j9lw0ponza.execute-api.us-west-2.amazonaws.com',
    path: '/test/recipes/?id=4',
    method: 'PATCH',
    body: {
        notes: 'THESE ARE NOTES.',
    }
  };

/*
const options = {
    hostname: 'j9lw0ponza.execute-api.us-west-2.amazonaws.com',
    path: '/test/endpoint/?all=true&id=17&userid=1',
    method: 'GET',
};
*/


// Sending the request
const req = http.request(options, (res) => {
//const req = http.request(url, (res) => {
    let data = ''

    res.on('data', (chunk) => {
        data += chunk;
    });

    // Ending the response 
    res.on('end', () => {
        console.log('Body:', JSON.parse(data))
    });

}).on("error", (err) => {
    console.log("Error: ", err)
})

req.end()

//8d51cf1e41ad42fcb9c2699fbba2cfbd