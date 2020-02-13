const prompt = require('inquirer').createPromptModule()
const fs = require('fs')
const axios = require('axios')

const questions = [
    'What is the title of the project?',
    'Short description of the project:',
    'Table of Contents:',
    'Installation',
    'Usage',
    'License',
    'Contributing',
    'Tests',
    'What is your GitHub username?'
]


function init() {
 
    prompt([
        {
            type: 'input',
            name: 'title',
            message: questions[0]
        },
        {
            type: 'input',
            name: 'description',
            message: questions[1]
        },
        {
            type: 'input',
            name: 'toc',
            message: questions[2]
        },
        {
            type: 'input',
            name: 'install',
            message: questions[3]
        },
        {
            type: 'input',
            name: 'usage',
            message: questions[4]
        },
        {
            type: 'input',
            name: 'license',
            message: questions[5]
        },
        {
            type: 'input',
            name: 'contributing',
            message: questions[6]
        },
        {
            type: 'input',
            name: 'tests',
            message: questions[7]
        },
        {
            type: 'input',
            name: 'username',
            message: questions[8]
        }
    ])
    .then (response => {

        let input = {
            username:     response.username,
            title:        response.title,
            description:  response.description,
            toc:          response.toc,
            install:      response.toc,
            usage:        response.usage,
            license:      response.license,
            contributing: response.contributing,
            tests:        response.tests,
            questions:    response.questions,
        }
       
        axios.get(`https://api.github.com/users/${input.username}`)
        .then(gitUser => {

            let userInfo = {
                img_url: gitUser.data.url,
            }

            const readMeContent = (input) => {
                txt = `
                ## ${input.title}

                ## Description
                ${input.description}

                ## Table Of Contents
                ${input.toc}

                ## Install
                ${input.install}

                ## Usage
                ${input.usage}

                ## License
                ${input.license}

                ## Contributing
                ${input.contributing}

                ## Tests
                ${input.tests}

                ## Questions
                ${input.username}
                <img src='${userInfo.img_url}' alt='git hub profile img'>
                `

                fs.writeFile('README.md', txt, e => e ? console.log(e) : null)
            }

            readMeContent(input)
        })
        .catch( e => console.error(e))
    })
}
init()
