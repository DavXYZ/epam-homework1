/*
### Task 1: Basic File Operations
**Instructions**:
1. Write a script that creates a new text file called `example.txt` and writes the string "Hello, World!" into it.
2. Modify the script to append "This is Node.js FS module." to the same file.
3. Read the contents of `example.txt` and print them to the console.
 */

// const fs = require('fs');

// const msg = "Hello, World!";
// const msg2 = "\nThis is Node.js FS module.";

// try {
//   fs.writeFileSync("example.txt", msg);
//   console.log("File was created!");
//   console.log("------------------------------------------");
//   fs.appendFileSync("example.txt", msg2);
//   console.log("The message was added to the file!");
//   console.log("------------------------------------------");
//   const data = fs.readFileSync('example.txt', "utf-8");
//   console.log("File read successfully!");
//   console.log("------------------------------------------");
//   console.log(data);
// } catch (err) {
//   console.error('Error:', err);
// }

/*
### Task 2: File and Directory Management
**Instructions**:
1. Write a script that creates a directory called `testDir`.
2. Inside `testDir`, create a new file called `testFile.txt` and write some text into it.
3. Rename `testFile.txt` to `renamedFile.txt`.
4. Delete `renamedFile.txt` and then delete `testDir`.
*/

// const fs = require('fs');

// try {
//   fs.mkdirSync("testDir",{recursive:true});
//   fs.writeFileSync("testDir/testFile.txt","Hi EPAM");
//   fs.renameSync("testDir/testFile.txt","testDir/renamedFile.txt");
//   fs.unlinkSync("testDir/renamedFile.txt");
//   fs.rmdirSync("testDir");
// } catch (error) {
//   console.error(error);
// }

/*
### Task 3: Synchronous vs. Asynchronous Operations
**Instructions**:
1. Write two scripts:
   - One that uses synchronous methods (`fs.readFileSync`, `fs.writeFileSync`) to read from and write to a file.
   - Another that uses asynchronous methods (`fs.readFile`, `fs.writeFile`) to achieve the same functionality.
2. Compare the scripts and note the differences in their execution.
*/

// const fs = require("fs");

// //Synchronous

// try {
//   fs.writeFileSync("sync.txt", "hello world");
//   console.log("Sync Write");

//   const data = fs.readFileSync("sync.txt", "utf-8");
//   console.log("Sync Read");
//   console.log(data);
//   console.log("-----------------------------");
// } catch (error) {
//   console.error(error);
// }

// //Asynchronous

// fs.writeFile("async.txt", "hello world", (error) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("Async Write");
//   }
// });
// fs.readFile("async.txt", "utf-8", (error,data) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("Async Read");
//     console.log(data);
//     console.log("------------------------");
//   }
// });

/*
###Deferences
Synchronous Script execution is blocked when the code starts read and write operations.
Asynchronous Script execution is non-blocking.
***Errors
Sync use try/catch , but in async we can use callbacks like this 
    (err) => {
      if(err){
      console.error(error);
      }
  }
      we can use async/await .
*/

/*
### Task 4: JSON File Handling
**Instructions**:
1. Create a JSON file called `data.json` with some sample data (e.g., a list of users with names and ages).
2. Write a script to read the JSON file and parse its contents into a JavaScript object.
3. Add a new user to the object and write the updated object back to the JSON file. 
// */
// const fs = require('fs');

// const readJson = (path, cb) => {
//   fs.readFile(path, 'utf-8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return cb(err, null);
//     }
//     try {
//       const jsonData = JSON.parse(data);
//       cb(null, jsonData);
//     } catch (err) {
//       console.error(err);
//       cb(err, null);
//     }
//   });
// };

// const writeJson = (path, data, cb) => {
//   const jsonData = JSON.stringify(data, null, 2);
//   fs.writeFile(path, jsonData, (err) => {
//     if (err) {
//       console.error(err);
//       return cb(err);
//     }
//     cb(null);
//   });
// };

// const appendJson = (path, newData, cb) => {
//   readJson(path, (err, data) => {
//     if (err) {
//       return cb(err);
//     }
//     data.push(newData);
//     writeJson(path, data, cb);
//   });
// };

// const newUser = {
//   name: 'Հայկ',
//   age: 28
// };

// readJson('data.json', (err, dataUsers) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Current users:", dataUsers);

//   appendJson('data.json', newUser, (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     readJson('data.json', (err, updatedDataUsers) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log("Updated users:", updatedDataUsers);
//     });
//   });
// });

/*
### Task 5: File Watching
**Instructions**:
1. Write a script that watches a directory called `watchDir` for changes.
2. Whenever a file is added, modified, or deleted in `watchDir`, log the event to the console.
*/
// const fs = require('fs');

// function watchDirectory(directory) {
//   if (!fs.existsSync(directory)) {
//     console.error(`Directory "${directory}" doesn\`t found.`);
//     return;
//   }
//   console.log(`Watching for changes in directory: ${directory}`);
//   let debounceTimeouts = {};
//   const debounceTime = 500;
//   const handleEvent = (eventType, filename) => {
//     if (filename) {
//       const filePath = `${directory}/${filename}`;

//       if (eventType === 'rename') {
//         fs.access(filePath, fs.constants.F_OK, (err) => {
//           if (err) {
//             console.log(`File Deleted: ${filename}`);
//           } else {
//             console.log(`File Added: ${filename}`);
//           }
//         });
//       }
//       else if (eventType === 'change') {
//         if (debounceTimeouts[filename]) {
//           clearTimeout(debounceTimeouts[filename]);
//         }

//         debounceTimeouts[filename] = setTimeout(() => {
//           console.log(`File Changed: ${filename}`);
//           delete debounceTimeouts[filename];
//         }, debounceTime);
//       }
//        else {
//         console.log(`Event Type: ${eventType}`);
//       }
//     } else {
//       console.log('Filename not provided');
//     }
//   };

//   try {
//     const watcher = fs.watch(directory, (eventType, filename) => {
//       handleEvent(eventType, filename);
//     });

//     watcher.on('error', (err) => {
//       console.error(`Watcher error: ${err.message}`);
//     });
//   } catch (err) {
//     console.error(`Failed to set up watcher: ${err.message}`);
//   }
// }

// watchDirectory('watchDir');

/*
### Task 6: Error Handling
**Instructions**:
1. Write a script that attempts to read a file that does not exist.
2. Implement error handling to gracefully handle the error and print an appropriate message to the console.
*/

// const fs = require('fs');

// const filePath = "example.txt";

// fs.readFile(filePath, 'utf-8' , (err,data) => {
//   if(err){
//     console.error(err);
//   }
//   else{
//   console.log(data);
// }
// });

/*
### Task 7: Recursive Directory Operations
**Instructions**:
1. Create a script that recursively lists all files and directories within a given directory.
2. Write another script that copies the contents of one directory to another, preserving the directory structure.
*/

////1

// const fs = require('fs');
// function listFiles(dir, indentTabs = '') {
//   fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
//     if (err) {
//       console.error(`Error reading directory ${dir}: ${err.message}`);
//       return;
//     }
//     // console.log("              ",entries);

//     entries.forEach(entry => {
//       const fullPath = dir + '/' + entry.name;
//       if (entry.isDirectory()) {
//         console.log(`${indentTabs}Directory: ${entry.name}`);
//         listFiles(fullPath, indentTabs + '  ');
//       } else {
//         console.log(`${indentTabs}File: ${entry.name}`);
//       }
//     });
//   });
// }
// //write your path
// const rootDir = '';
// listFiles(rootDir);

////2

// const srcPath = "Dir1";
// const destPath = "Dir2";

// const fs = require("fs");

// function copyDirect(srcPath, destPath, callback) {
//   fs.readdir(srcPath, { withFileTypes: true }, (err, entries) => {
//     if (err) {
//       console.error(err);
//       callback(err);
//       return;
//     }

//     fs.mkdir(destPath, { recursive: true }, (err) => {
//       if (err) {
//         console.error(err);
//         callback(err);
//         return;
//       }
//       let entriesLen = entries.length
//       if (entriesLen === 0) {
//         callback();
//         return;
//       }
//       entries.forEach(entry => {
//         const srcFullPath = srcPath+"/"+entry.name;
//         const destFullPath = destPath+"/"+entry.name;

//         if (entry.isDirectory()) {
//           copyDirect(srcFullPath, destFullPath, (err) => {
//             if (err) {
//               callback(err);
//               return;
//             }
//             if (--entriesLen === 0) {
//               callback();
//               return;
//             }
//           });
//         }
//         else{
//           fs.copyFile(srcFullPath, destFullPath, (err) => {
//             if (err) {
//               console.error(`Error copying file ${srcPath} to ${destPath}: ${err.message}`);
//               callback(err);
//               return;
//             }
//             if (--entriesLen === 0) {
//               callback();
//             }
//           });
//         }
//       })
//     });
//   });
// }

// copyDirect(srcPath, destPath, (err) => {
//   if (err) {
//     console.error('Copy operation failed.');
//   } else {
//     console.log('Copy operation completed successfully.');
//   }
// });

/* 
### Task 8: Permissions and Metadata
**Instructions**:
1. Write a script that reads and prints the metadata (e.g., size, creation date) of a given file.
2. Modify the script to change the permissions of the file to read-only.
*/

// const path = "example.txt";

// const fs = require("fs");
// const fileMetaData = (filePath) => {
//   fs.stat(path, (err, stats) => {
//     if (err) {
//       console.error(err);
//       return;
//     } else {
//       const formatDate = (date) => {
//         return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//           2,
//           "0"
//         )}-${String(date.getDate()).padStart(2, "0")} ${String(
//           date.getHours()
//         ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
//           2,
//           "0"
//         )}:${String(date.getSeconds()).padStart(2, "0")}`;
//       };

//       console.log(`File: ${filePath}`);
//       console.log(`Size: ${stats.size} bytes`);
//       console.log(`Created: ${formatDate(new Date(stats.birthtime))}`);
//       console.log(`Modified: ${formatDate(new Date(stats.mtime))}`);
//       console.log(`Last Accessed: ${formatDate(new Date(stats.atime))}`);
//       console.log(`Device: ${stats.dev}`);
//       console.log(`Inode: ${stats.ino}`);
//       console.log(`Mode: ${stats.mode.toString(8)}`);
//       console.log(`Number of Links: ${stats.nlink}`);
//       console.log(`Owner UID: ${stats.uid}`);
//       console.log(`Owner GID: ${stats.gid}`);
//       console.log(`Special Device Identifier: ${stats.rdev}`);
//       console.log(`Creation Time (ms): ${stats.ctimeMs}`);
//       console.log(`Modification Time (ms): ${stats.mtimeMs}`);
//       console.log(`Last Access Time (ms): ${stats.atimeMs}`);
//       console.log(`Is File: ${stats.isFile()}`);
//       console.log(`Is Directory: ${stats.isDirectory()}`);
//       console.log(`Is Symbolic Link: ${stats.isSymbolicLink()}`);
//     }
//   });
// };

// function setFileReadOnly(filePath) {
//   fs.chmod(filePath, 0o444, (err) => {
//     // 0o444 - read-only permissions
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(`Permissions of ${filePath} changed to read-only.`);
//   });
// }

// fileMetaData(path);
// setFileReadOnly(path);
