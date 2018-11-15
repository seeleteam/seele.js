# Publish

When you change the project, maybe you should publish it.

## Update files

### package.json/package-lock.json : `version`

Change the file version.

```md
  ...
  "name": "seele.js",
  "version": "1.6.0",
  ...
```

### package.js : `version:`

Change the file version.

```md
  ...
  name: 'wangff:seelejs',
  version: '0.1.0',
  ...
```

### README.md : edit version information

```md
### NPM

`npm install seele.js@1.6.0`

### Meteor

`wangff:seelejs@0.1.0` Or `meteor add wangff:seelejs@0.1.0`
```

### browserify/seele_browserify.js : regenerate

Regenerate the file.

```js
browserify -r ./src/seele.js:seele.js > ./browserify/seele_browserify.js
browserify -r ./src/utils.js:seele-util.js > ./browserify/seele-util.js
```

> Check the file encoding, if it is not UTF-8, change it to UTF-8.

Change the file version.

## npm

npm publish(seelejs,seele.js)(seelejs,seele.js)

## meteor

meteor publish(wangff,seelejs)