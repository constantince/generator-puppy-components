'use strict';
const Generator = require('yeoman-generator');
const execa = require('execa');
const pEachSeries = require('p-each-series');
const ora = require('ora');

const excution = async (args) => {
  return pEachSeries(args, async ({cmd, args, cwd}) => {
      return execa(cmd, args, {cwd})
  })
}



module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Please input your comps name',
        default: "syt-components-example-name"
      }, 
      {
        type: 'input',
        name: 'desc',
        message: 'Please input your brief info to your comp',
        default: 'Nothing to say about'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Please input your shunyitong staff number',
        default: 'sz_syitxxx'
      },
      {
        type: "list",
        choices: ["Javascript", "Typescript"],
        name: 'language',
        message: 'Choose your favor language',
        default: 'Javascript'
      }
    ];

    this.answer =  await this.prompt(prompts);
    if(/syt-components-/.test(this.answer.name)) {
      const Name = this.answer.name.match(/syt-components-(.+)$/);
      this.answer.Name = Name[1].replace(/-(\w)/g, function($1,$2) { return $2.toLocaleUpperCase();})
    }

    console.log(this.answer);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(this.answer.language),
      this.destinationPath(this.answer.name),
      this.answer,
      null,
      {
        globOptions: { dot: true }
      }
    );

    this.fs.copyTpl(
      this.templatePath(`Jsons/${this.answer.language}/package.ejs`),
      this.destinationPath(`${this.answer.name}/package.json`),
      this.answer,
    );

    this.fs.copyTpl(
      this.templatePath(`Jsons/${this.answer.language}/package.example.ejs`),
      this.destinationPath(`${this.answer.name}/example/package.json`),
      this.answer,
    );

    this.fs.copy(this.templatePath(".gitignore.ejs"), this.destinationPath(this.answer.name + '/.gitignore'));
}

  async end() {
    const depath = this.destinationPath(this.answer.name);
    const Dependencies = [
      {
        cmd: 'npm',
        args: ['install'],
        cwd: depath
      },
      {
        cmd: 'npm',
        args: ['install'],
        cwd: this.destinationPath(this.answer.name + '/example')
      }
    ]

    const rootP = excution(Dependencies);
    ora.promise(rootP, `Downloading dependencies, please waiting and eating an apple...`);
    await rootP;


   

    console.log("All done...")
  }
};
