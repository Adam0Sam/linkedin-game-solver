const fs = require("fs");
const path = require("path");

const gameName = process.argv[2];

if (!gameName) {
  console.error("Please provide a game name as an argument.");
  process.exit(1);
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const toPascalCase = (s) => s.split("-").map(capitalize).join("");

const pascalCaseGameName = toPascalCase(gameName);

const templatesDir = path.join(__dirname, "templates");
const outputDir = path.join(__dirname, "..", "games", gameName);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const filesToGenerate = [
  { template: "index.js", output: "index.js" },
  {
    template: "{{cmpNamePascalCase}}GameSolver.js",
    output: `${pascalCaseGameName}GameSolver.js`,
  },
  {
    template: "{{cmpNamePascalCase}}GridCell.js",
    output: `${pascalCaseGameName}GridCell.js`,
  },
  {
    template: "{{cmpNamePascalCase}}GridParser.js",
    output: `${pascalCaseGameName}GridParser.js`,
  },
  {
    template: "{{cmpNamePascalCase}}SolutionExecutor.js",
    output: `${pascalCaseGameName}SolutionExecutor.js`,
  },
];

filesToGenerate.forEach((file) => {
  const templatePath = path.join(templatesDir, file.template);
  const outputPath = path.join(outputDir, file.output);

  let content = fs.readFileSync(templatePath, "utf8");
  content = content.replace(/{{cmpNamePascalCase}}/g, pascalCaseGameName);
  content = content.replace(/{{cmpName}}/g, gameName);

  fs.writeFileSync(outputPath, content);
  console.log(`Generated ${outputPath}`);
});

console.log(`Game '${gameName}' generated successfully!`);
