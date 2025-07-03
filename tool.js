#! /usr/bin/env node
const {engine} = require('./lib/ai');
const chalk = require('chalk');
const { Command } = require('commander');
const { writeToFile } = require('./writetofile');
const { readFromFile } = require('./readFromFile');
const { spawn } = require("child_process");
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

code
.command("review <filename>")
.alias("rev")
.description("Review the code in the file by the AI and getting the response")
.option("-u,--update","Update the code in the file with the response")
.action(async (filename,opt) =>{
    
    try{
        console.log(chalk.blue("reading..."))
        const data = readFromFile(filename);
        const prompt_string = data + "Make corrections to the code and add relevant comments for explaing any corrections as well as the code itself. Do not return anything other than code. Not even a single sentence which is not code should be returned"; ;
        const response = await engine.main(prompt_string);
        console.log(chalk.rgb(53, 2, 190).bold(response));

        if(!!opt.update){
            writeToFile(response,filename)
        }
    }
    catch(e){
        console.log(chalk.rgb(212, 0, 0).italic("Something Went Wrong"));
    }
    
})

code
.command("rec-start")
.description("Start recording terminal session using 'script' (Linux/macOS only)")
.option("-f, --file <filename>", "Log file name", "session.log")
.action((opt) => {
    const os = require("os");
    const { spawn } = require("child_process");
    const logFile = opt.file;
    const platform = os.platform();

    if (platform === "win32") {
        console.log(chalk.red("❌ 'rec-start' is not supported on Windows."));
        console.log(chalk.yellow("💡 Use shell redirection instead:"));
        console.log(chalk.cyan(`your-command > session.log 2>&1`));
        console.log(chalk.yellow("Or use:"));
        console.log(chalk.cyan(`lzs record-run "your-command" -f session.log`));
        return;
    }

    console.log(chalk.green(`Starting terminal recording to '${logFile}' using 'script'...`));
    const scriptProc = spawn("script", ["-f", logFile], {
        stdio: "inherit"
    });

    scriptProc.on("error", (err) => {
        console.log(chalk.red("❌ Failed to start 'script'. Make sure it's installed on your system."));
    });
});

code
.command("record-run <cmd>")
.description("Run a command and record its output to a file (cross-platform)")
.option("-f, --file <filename>", "Log file name", "session.log")
.action((cmd, opt) => {
    const fs = require("fs");
    const { spawn } = require("child_process");
    const path = require("path");
    const chalk = require("chalk");

    const logFile = path.resolve(process.cwd(), opt.file);
    const outStream = fs.createWriteStream(logFile, { flags: "a" });

    const parts = cmd.split(" ");
    const proc = spawn(parts[0], parts.slice(1), {
        shell: true
    });

    console.log(chalk.green(`Recording output of '${cmd}' to '${logFile}'`));

    proc.stdout.on("data", (data) => {
        process.stdout.write(data);
        outStream.write(data);
    });

    proc.stderr.on("data", (data) => {
        process.stderr.write(data);
        outStream.write(data);
    });

    proc.on("close", (code) => {
        console.log(chalk.yellow(`\nCommand exited with code ${code}`));
        outStream.end();
    });

    proc.on("error", (err) => {
        console.log(chalk.red(`\nFailed to run the command: ${err.message}`));
        outStream.end();
    });
});



code
.command("debug <filename>")
.alias("dbg")
.description("Analyze terminal log file and get suggestions from AI")
.action(async (filename) => {
    try {
        console.log(chalk.blue("Analyzing logs..."));
        const data = readFromFile(filename);
        const prompt = `I ran into the following terminal session. Please analyze and explain the errors, and suggest a fix:\n\n${data}`;
        const response = await engine.main(prompt);
        console.log(chalk.rgb(255, 165, 0).bold(response));
    } catch (e) {
        console.log(chalk.red("Error reading or processing log file."));
    }
});

code.parse(process.argv);