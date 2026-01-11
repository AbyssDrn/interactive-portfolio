const fs = require('fs')
const path = require('path');

// We skip these folders so the output isn't huge
const IGNORE = ['node_modules', '.git', 'dist'];

function printTree(dir, prefix = '') {
    // Read all items in the directory
    const items = fs.readdirSync(dir);

    // Filter out ignored folders
    const filteredItems = items.filter(item => !IGNORE.includes(item));

    filteredItems.forEach((file, index) => {
        const isLast = index === filteredItems.length - 1;
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        // Print the tree branch
        console.log(`${prefix}${isLast ? '└── ' : '├── '}${file}`);

        // If it's a folder, dive inside (Recursion!)
        if (stats.isDirectory()) {
            printTree(filePath, prefix + (isLast ? '    ' : '│   '));
        }
    });
}

console.log(`\n📂 Project Structure: ${path.basename(__dirname)}\n`);
printTree(__dirname);
console.log('\n✅ Structure Scan Complete.\n');