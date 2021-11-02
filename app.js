const fs = require('fs');
const generatePage = require('./src/page-template.js');
const profileDataArgs = process.argv.slice(2);
const [userName , github] = profileDataArgs;

//User input 
// const printProfileData = profileDataArr => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

//   // Is the same as this...
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);

//create an HTML template 

fs.writeFile('./index.html', generatePage(userName, github), err => {
    if (err) throw err;
    console.log('Portfolio complete! check out the index.html');
});