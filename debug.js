const fs = require('fs');
fetch('http://localhost:3000/login')
  .then(res => res.text())
  .then(text => fs.writeFileSync('debug.html', text, 'utf8'));
