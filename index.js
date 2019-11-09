// code away!
const server = require("./server.js")
require('dotenv').config(); // add this line as the first thing to run1

let port = process.env.PORT || 5000;


server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
})
