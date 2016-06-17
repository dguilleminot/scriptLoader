# ScriptLoader

Simple scripts loader with dependencies. Write only in javascript.

  - load scripts' url array with AJAX
  - then wrap it before the body's end tag

```sh
ScriptLoader({
          depScript : [urls array], // dependencies scripts
          script    : [urls array], // others scripts
          });
```

### Example :
```sh
new ScriptLoader({
          depScript : ["https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js","https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"],
          script    : ["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js", "app.js"],
        }).init();
```

or

```sh
var scriptPack = new ScriptLoader({
          depScript : ["https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js","https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"],
          script    : ["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js", "app.js"],
        });

scriptPack.init();
```
