const inquirer = require('inquirer');
const fs = require('fs');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Describe your project',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please give instructions for installation',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Describe how your project can be used',
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'Please outline any contributions guidelines',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please outline test instructions',
        },
        {
            type: 'list',
            name: 'licences',
            message: 'Please select a licence from the list',
            choices: ['GNU GPLv3', 'MIT Licence', 'Unlicence']
        },
        {
            type: 'input',
            name: 'github',
            message: 'Please enter your github username', 
        },
        {
            type: 'input',
            name: 'questions',
            message: 'Please outline the best way for people to contact you for further information',
        },
    ]);
};

function generateBadgeUrl(licences){ 
    return `https://img.shields.io/badge/licence-${encodeURIComponent(licences)}-blue`;
}

function generatreLicenceInfo(licences){
    if (licences === "GNU GPLv3"){
        return "Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights."
    
    };
    if (licences === "MIT Licence"){
        return "A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code."
    };
    if (licences === "Unlicence") {
        return "A license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms and without source code."
    }

}

const generateREADME = ({title, description, installation, usage, contribution, tests, licences, github, questions}) =>
`# ${title} 
## Description
${description}
## Table of Contents
- [Installation](#installation-instructions)
- [Usage Instructions](#usage-instructions)
- [Contribution Guidelines](#contribution-guidelines)
- [Test Instructions](#test-instructions)
- [Licences](#licences)
- [Questions](#questions)
## Installation Instructions
${installation}
## Usage Insturctions
${usage}
## Contribution Guidelines
${contribution}
## Test Instructions
${tests}
## Questions
To find out more information about this repo please visit my github page https://github.com/${github}
Need more info?
${questions}
## Licences 
![Licence](${generateBadgeUrl(licences)})
${generatreLicenceInfo(licences)}
`
const create = () => {
    promptUser()
    .then((answers) => fs.writeFileSync('README1.md', generateREADME(answers)))
    .then(()=> console.log('Successfully wrote to README.md'))
    .catch((err) => console.log(err));
};

create();