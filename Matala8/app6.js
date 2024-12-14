const fs = require("fs");

// Path to the JSON file
const filePath = `${__dirname}/jsons/input.json`;

// Step 1: Read the JSON file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Parse the JSON data into a JavaScript object
    const jsonObject = JSON.parse(data);

    // Step 2: Access the users array and count its length
    if (Array.isArray(jsonObject.users)) {
      const userCount = jsonObject.users.length;
      fs.writeFileSync(
        `${__dirname}/jsons/user_count.txt`,
        `Number of users: ${userCount}`
      );

      // Prepare a string containing user names
      let userNames = "";
      jsonObject.users.forEach((element) => {
        userNames += `${element.name}\n`; // Add each name to the string
      });

      // Step 3: Write the user names to a text file
      fs.writeFile(
        `${__dirname}/jsons/user_names.txt`,
        userNames,
        (writeErr) => {
          if (writeErr) {
            console.error("Error writing file:", writeErr);
          } else {
            console.log("User names written to user_names.txt successfully.");
          }
        }
      );
    } else {
      console.error('The "users" property is not an array.');
    }
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
  }
});
