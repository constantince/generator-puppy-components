'use strict';
const Generator = require('yeoman-generator');

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
    )
}

  install() {
    process.chdir(this.answer.name);
    this.installDependencies();
  }

  end() {
    process.chdir(this.destinationPath( this.answer.name + '/example/'));
    this.installDependencies();
  }
};
