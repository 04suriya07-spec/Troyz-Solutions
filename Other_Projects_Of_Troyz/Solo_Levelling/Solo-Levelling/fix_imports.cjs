const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const replacements = [
    { from: /engines\/EventEngine/g, to: 'engines/event/EventEngine' },
    { from: /engines\/RuleEngine/g, to: 'engines/rules/RuleEngine' },
    { from: /engines\/SkillEngine/g, to: 'engines/skills/SkillEngine' },
    { from: /engines\/WorldEngine/g, to: 'engines/world/WorldEngine' },
    { from: /engines\/AIBrain/g, to: 'engines/ai/AIBrain' }
  ];

  replacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
