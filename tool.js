#! /usr/bin/env node
const {engine} = require('./lib/ai');
const chalk = require('chalk');
const { Command } = require('commander');
const { writeToFile } = require('./writetofile');
const code = new Command();

code
.version("1.0.1")
.description("tool for searching stuff thorough the cli itself")

code
.command("prompt <prompt>")
.alias("p")
.description("Generates a response for the given text")
.option("-c,--copy <out>","Copy the Response to a file")
.action(async (prompt,opt) =>{
    try{
        console.log(chalk.blue("Fetching..."))
        const data = await engine.main(prompt)
        console.log(chalk.rgb(65,255,0).bold(data));

        if(!!opt.copy){
            writeToFile(data,opt.copy)
        }
    }
    catch(e){
        console.log(chalk.rgb(212, 0, 0).italic("Something Went Wrong"));
    }
    
})

code.parse(process.argv);