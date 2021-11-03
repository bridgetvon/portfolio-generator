const inquirer = require('inquirer');
const fs = require('fs');

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');
// const pageHTML = generatePage(userName, github);

//create an HTML template 

// fs.writeFile('./index.html', generatePage(userName, github), err => {
//     if (err) throw err;
//     console.log('Portfolio complete! check out the index.html');
// });

//prompt a question from inquirer per the documentation 
//wrap this inside of a function so it can be invoked on demand 
const promptUser = () => {
   return inquirer.prompt([ 
        {
            type: 'input', 
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};
    promptUser().then(answers => console.log(answers));

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);
    //put objects into an array property but only the first time, so they do not get cleared 
    //date collection system 
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input', 
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input', 
            name: 'description',
            message: 'Provide a description of your project (Required)'
        },
        {
            type: 'checkbox', 
            name: 'languages',
            message: 'What did you build this program with (check all that apply?',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input', 
            name: 'link',
            message: 'Enter the GitHub link to your project. (required)'
        },
        {
            type: 'confirm', 
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm', 
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },
    ])
    //push the project data into an array 
    .then(projectData => {
        portfolioData.projects.push(projectData);
        //if they want to add more projects return the data so they can if confirm add project is true 
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
            //portfolio data must be included in the else statement so we make sure the object is returned
        } else {
            return portfolioData;
        }
    });
};
// use a promise to chain functions together using the then method/ call the function 

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });