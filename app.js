//import generate site module 
const {writeFile,copyFile} = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');
// const pageHTML = generatePage(userName, github);


//prompt a question from inquirer per the documentation 
//wrap this inside of a function so it can be invoked on demand 
const promptUser = () => {
   return inquirer.prompt([ 
        {
            type: 'input', 
            name: 'name',
            message: 'What is your name? (Required)',
           //validate they entered correct input. this recieves and argument which is their input
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('please enter a valid github username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About me" section?',
            default: true
        },
        {
            type: 'input', 
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
         }
    ]);
};

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
            message: 'What is the name of your project? (required)',
            validate: githubLink => {
                if (githubLink) {
                    return true;
                } else {
                    console.log('Please enter a valid project name!');
                    return false;
                }
            }
        },
        {
            type: 'input', 
            name: 'description',
            message: 'Provide a description of your project (Required)',
            validate: projectDescription => {
                if (projectDescription) {
                    return true;
                } else {
                    console.log('Please enter a valid project description!');
                    return false;
                }
            }
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
            message: 'Enter the GitHub link to your project. (required)',
            validate: githubLink => {
                if (githubLink) {
                    return true;
                } else {
                    console.log('Please enter a valid GitHub link!');
                    return false;
                }
            }
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
    promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHtml => {
        return writeFile(pageHtml);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });



// //create mock data for testing 
// const mockData = {
//     name: 'Lernantino',
//     github: 'lernantino',
//     confirmAbout: true,
//     about:
//       'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//     projects: [
//       {
//         name: 'Run Buddy',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['HTML', 'CSS'],
//         link: 'https://github.com/lernantino/run-buddy',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskinator',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'HTML', 'CSS'],
//         link: 'https://github.com/lernantino/taskinator',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskmaster Pro',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//         link: 'https://github.com/lernantino/taskmaster-pro',
//         feature: false,
//         confirmAddProject: true
//       },
//       {
//         name: 'Robot Gladiators',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//         languages: ['JavaScript'],
//         link: 'https://github.com/lernantino/robot-gladiators',
//         feature: false,
//         confirmAddProject: false
//       }

//     ]
// };
// const pageHTML = generatePage(mockData);