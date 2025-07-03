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

## Review and Update Files
You can ask LazySearch to review a file using AI:

```bash
lzs rev yourFile.js
```
Add the -u flag to update the file automatically:

```bash
lzs rev yourFile.js -u
```

##  Terminal Session Recording & Debugging
 Record a Full Session (Linux/macOS only)

 ```bash
 lzs rec-start -f session.log
 ```

 Record a Single Command (All Platforms)

```bash
lzs record-run "node index.js" -f session.log
```
This works on Windows, Linux, and macOS.

## Debug Your Session
Analyze the recorded terminal log using AI:
```bash
lzs debug session.log
```
LazySearch will identify errors and suggest fixes based on the contents of the file.


### Command Syntax
The basic syntax for using LazySearch is:
```bash
lzs p "<prompt>" [-c <filename>]        # Generate code
lzs rev <filename> [-u]                 # Review code and optionally update
lzs rec-start -f <filename>             # Record full terminal session (Linux/macOS)
lzs record-run "<cmd>" -f <filename>    # Record output of a single command (all platforms)
lzs debug <filename>                    # Analyze and get AI suggestions for a log
```

## Examples
```bash
lzs p "generate a react component" -c MyComponent.js
lzs rec-start -f errors.log              # (Linux/macOS)
lzs record-run "npm run dev" -f dev.log # (Cross-platform)
lzs debug dev.log
```

By following these steps, you can harness the power of LazySearch to streamline your development workflow, catch bugs faster, and get AI-driven assistance right in your terminal.

