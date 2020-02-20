# About this project
This project is created to establish the environment to develop `three.js` locally. This uses `Browserify` to bundle up `main.js` with `three.js`. 
 
## Installation

Run and install followings:
```bash
#install browserify
npm install --global browserify
#install Beefy
npm install -g beefy
#install three.js
npm install three --save
```

## Bundle up JS files
Running the followings, Beefy will bundle up `main.js` and its dependency (`three.js`) and deploy it to the web server.

```bash
beefy main.js --live
```

## Memo
[The official site of Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Import-via-modules) listed two bundling tools: `Webpack` and `Browserify`. If you are not familiar with both, I highly recommend you use `Browserify` since its setup requires only a few lines of commands and information is more simple and organized. 

## Reference
- [Get start with Brooserify](https://scotch.io/tutorials/getting-started-with-browserify)
- [Three.js](https://scotch.io/tutorials/getting-started-with-browserify)
- [Three.js Tutorial](https://discoverthreejs.com/)