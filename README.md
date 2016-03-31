# fis-lint-eslint

----

A eslint plugin for fis to validate js file

## eslint版本兼容

- 1.x 兼容 eslint 1.x
- 2.x 兼容 eslint 2.x

## usage

```javascript
npm install -g fis-lint-eslint
```

打开fis-conf.js, 配置fis-lint-eslint

###  fis2
```javascript
//configure plugin
fis.config.set('modules.lint.js', 'eslint');
//configure plugin settings
fis.config.set('settings.lint.eslint', {
    //ignored some files
    //ignored : 'static/libs/**.js',
    ignored : [ 'static/libs/**.js', /jquery\.js$/i ],

    //jshint options
     "parser": "babel-eslint",
      "env": {
        "browser": true,
        "node": true,
        "es6": true
      },
      "globals": {
        "jest": false,
        "describe": false,
        "it": false,
        "expect": false,
        "_": false,
        "$": false,
        "__uri": false,
        "__inline": false,
        "fis": false,
        "__NAPI_SOURCE__": false,
        "createUnitStore": false,
        "StateTypes": false
      },
      "rules": {
        "no-underscore-dangle": 0,
        "no-unused-expressions": 1,
        "eol-last": 1,
        "curly": 1,
        "no-unused-vars": 2,
        "no-use-before-define": 2,
        "no-multi-spaces": 1,
        "no-shadow": 2,
        "dot-notation": 2,
        "no-undef": 2,
        "block-scoped-var": 2,
        "no-empty": 1,
        "quotes": [2, "single", "avoid-escape"]
      }
});
```

### fis3

```javascript
//configure plugin
fis.match('*.js', {
    lint: 'eslint',    
    //ignored some files
    //ignored : 'static/libs/**.js',
    ignored : [ 'static/libs/**.js', /jquery\.js$/i ],

    //jshint options
     "parser": "babel-eslint",
      "env": {
        "browser": true,
        "node": true,
        "es6": true
      },
      "globals": {
        "jest": false,
        "describe": false,
        "it": false,
        "expect": false,
        "_": false,
        "$": false,
        "__uri": false,
        "__inline": false,
        "fis": false,
        "__NAPI_SOURCE__": false,
        "createUnitStore": false,
        "StateTypes": false
      },
      "rules": {
        "no-underscore-dangle": 0,
        "no-unused-expressions": 1,
        "eol-last": 1,
        "curly": 1,
        "no-unused-vars": 2,
        "no-use-before-define": 2,
        "no-multi-spaces": 1,
        "no-shadow": 2,
        "dot-notation": 2,
        "no-undef": 2,
        "block-scoped-var": 2,
        "no-empty": 1,
        "quotes": [2, "single", "avoid-escape"]
      }
});
```

关于eslint更多配置规则请参阅 [这里](http://eslint.org/docs/rules/)
