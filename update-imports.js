const fs = require('fs');
const path = require('path');

// 指定需要遍历的目录
const directory = './typegoose/src'

// 正则表达式，用于匹配和修改 import 语句
const importRegex = /import\s+([\w*\s{},]*)\s+from\s+['"]([^'"]+)['"]/g;

// 递归遍历指定目录下的所有 TypeScript 文件
function updateImports(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      updateImports(filePath); // 对于目录，递归遍历
    } else if (file.isFile() && filePath.endsWith('.ts')) {
      updateFile(filePath); // 对于文件，更新导入语句
    }
  });
}

// 读取文件并更新 import 语句
function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  content = content.replace(importRegex, (match, imports, from) => {
    // 跳过 node_modules 中的导入和已经包含 .js 扩展名的导入
    if (!from.startsWith('.') || from.endsWith('.js')) {
      return match;
    }
    updated = true;
    return `import ${imports} from '${from}.js'`;
  });

  // 如果文件被修改，则写回文件系统
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
}

updateImports(directory);
