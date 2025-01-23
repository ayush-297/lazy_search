# LazySearch
LazySearch is an AI-powered command line tool designed to simplify and streamline your development experience.

## Installation
To use LazySearch, you need to install it globally using npm. Run the following command in your terminal:
```bash
npm install lazysearch -g
```
## Usage
Once installed, you can use LazySearch by typing `lzs` followed by the command `p` and your prompt in double quotes. For example:
```bash
lzs p "write the boiler plate code for setting up an express server"
```
This will generate the code and print it in your terminal.

## Saving Output to a File
LazySearch also allows you to save the output to a file by using the `-c` flag followed by the filename. For example:
```bash
lzs p "write a boiler plate code for setting up an express server" -c server.js
```
This will create a file named `server.js` and paste the generated code into it.

### Command Syntax
The basic syntax for using LazySearch is:
```bash
lzs p "<prompt>" [-c <filename>]
```
* `lzs`: The command to invoke LazySearch
* `p`: The command to generate code based on the prompt
* `<prompt>`: The prompt to generate code for, enclosed in double quotes
* `-c <filename>`: Optional flag to save the output to a file

## Examples
* Generate a boilerplate Express server: `lzs p "write the boiler plate code for setting up an express server"`
* Generate a boilerplate Express server and save to a file: `lzs p "write a boiler plate code for setting up an express server" -c server.js`

By following these simple steps, you can harness the power of LazySearch to streamline your development workflow and save time.