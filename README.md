# Amiku WebPack Basic Usage Example

[中文文档入口](中文文档.md)

```
This example shows WebPack basic usage.

==================
development and build release version
Development Version：$ npm run dev
Build Release Version：$ npm run release
==================

Feature:
Support Single Page;
Support ES6 via Babel;
Use SASS as CSS language;
Build image files(copy into destination directory with those files larger then 10k size, and insert into pages with those files smaller then 10k size);
Output CSS built into JavaScript files;

```

### download

Download this repository or git clone https://github.com/amiku/Amiku-WebPack.git

> $ git clone https://github.com/amiku/Amiku-WebPack.git
>

### npm install

Refer to the commands below and install dependencies package

```
$ npm install
```

### Development Environment

Refer to the commands below, then open browser and visit http://localhost:8080

```
$ npm run dev

```
### Build Release Files

Refer to the commands below, then find built files in destination directory

```
$ npm run release
```


### Snapshot
![](snapshot.png)

### Directory Structure
"src" is the source directory, "dist" is the build destination directory.

<pre>
│  .babelrc
│  .eslintrc
│  package-lock.json
│  package.json
│  README.md
│  snapshot.png
│  webpack.config.development.js
│  webpack.config.production.js
│  中文文档.md
│  
├─dist
│  │  index.html
│  │  
│  ├─img
│  │      
│  └─js
│          
└─src
    │  favicon.ico
    │  
    └─cn.amiku
        │  index.tmpl.html
        │  
        ├─img
        │      img-css-bg.png
        │      img-js-import.gif
        │      
        ├─js
        │      Index.js
        │      IndexComponent.js
        │      
        └─scss
                baseConfig.scss
                Index.scss
                IndexComponent.scss
                
</pre>