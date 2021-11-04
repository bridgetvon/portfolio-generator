const fs = require('fs');


//create a promise object 
//promise object has the keyword new acts like a container that allows us to run code that will be pending at some point 
//inside the promise we provide a function that accepts two functions as parameters 
//we use the same file as app.js but contextulize it to a promise and accepting html files content as parameter 
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if theres an error, reject the promise and send the error to the promises catch method 
            if (err) {
                reject(err); 
                //return out of the function here to make sure the promise doesnt accidentally execute the resolve function as well 
                return; 
            }
            //if everything went well, resolve the promise and send successful data to the .then method 
            resolve({
                ok: true, 
                message: 'file created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('.src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
        
            resolve({
                ok: true,
                message: 'Stylesheet created!'
            });

        });
    });
};

//export from here and import into app.js
//we are exporting the object of two functions 
//this is shorthand property name it understand writefile as writefile: writefile isntead of both property name and value 
//add these to file you want to import with a require 
module.exports = { writeFile, copyFile};

//the refactored code is here 
// promptUser()
//     .then(promptProject)
//     .then(portfolioData => {
//         const pageHTML = generatePage(portfolioData);

//         fs.writeFile('./dist/index.html');
//         },
//         console.log('Page created! Check out index.html in this directory to see it!'));
        
//         fs.copyFile('./src/style.css', './dist/style.css', err => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             console.log('style sheet copied successfully!');
//         });
    //refactor fs functionality to use promises instead of callback functions  
