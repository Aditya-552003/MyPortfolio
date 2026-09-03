import fs from 'fs';
import path from 'path';
import https from 'https';

const logoDir = path.resolve('public/logo');
if (!fs.existsSync(logoDir)) {
  fs.mkdirSync(logoDir, { recursive: true });
}

const logoUrls = {
  'scikitlearn.svg': 'https://cdn.simpleicons.org/scikitlearn',
  'tensorflow.svg': 'https://cdn.simpleicons.org/tensorflow',
  'keras.svg': 'https://cdn.simpleicons.org/keras',
  'langchain.svg': 'https://cdn.simpleicons.org/langchain',
  'javascript.svg': 'https://cdn.simpleicons.org/javascript',
  'typescript.svg': 'https://cdn.simpleicons.org/typescript',
  'pandas.svg': 'https://cdn.simpleicons.org/pandas',
  'numpy.svg': 'https://cdn.simpleicons.org/numpy',
  'mysql.svg': 'https://cdn.simpleicons.org/mysql',
  'cursor.svg': 'https://cdn.simpleicons.org/cursor',
  'claude.svg': 'https://cdn.simpleicons.org/anthropic',
  'chatgpt.svg': 'https://cdn.simpleicons.org/openai',
  'gemini.svg': 'https://cdn.simpleicons.org/googlegemini',
  'git.svg': 'https://cdn.simpleicons.org/git',
  'githubactions.svg': 'https://cdn.simpleicons.org/githubactions',
  'docker.svg': 'https://cdn.simpleicons.org/docker',
  'vercel.svg': 'https://cdn.simpleicons.org/vercel',
  'render.svg': 'https://cdn.simpleicons.org/render',
  'npm.svg': 'https://cdn.simpleicons.org/npm',
  'nodejs.svg': 'https://cdn.simpleicons.org/nodedotjs',
  'vscode.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'jupyter.svg': 'https://cdn.simpleicons.org/jupyter',
  'googlecolab.svg': 'https://cdn.simpleicons.org/googlecolab',
  'kaggle.svg': 'https://cdn.simpleicons.org/kaggle',
};

function download(filename, url) {
  return new Promise((resolve, reject) => {
    const dest = path.join(logoDir, filename);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      }
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading official logos...');
  for (const [filename, url] of Object.entries(logoUrls)) {
    try {
      await download(filename, url);
      console.log(`Saved ${filename}`);
    } catch (err) {
      console.error(`Failed ${filename}:`, err);
    }
  }
  console.log('Done!');
}

run();
