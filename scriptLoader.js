(function(){
  "use-strict";

    this.ScriptLoader = function(){

      this.awaiting = [];
      this.depScript = [];
      this.loaded = false;
      this.scriptWaiting = [];
      this.script = [];

      var defaults = {
        awaiting : [],
        depScript : [],
        loaded : false,
        scriptWaiting : [],
        script : [],
      }

      // if options extend
      if (arguments[0] && typeof arguments[0] === "object") {
        this.options = extendDefaults(defaults, arguments[0]);
      }
    };// end constructor

    function extendDefaults(source, properties) {
      var property;
      for (property in properties) {
        if (properties.hasOwnProperty(property)) {
          source[property] = properties[property];
        }
      }
      return source;
    }

  ScriptLoader.prototype.init = init;
  ScriptLoader.prototype.initScript = initScript;
  ScriptLoader.prototype.getScript = getScript;
  ScriptLoader.prototype.success = successScript;
  ScriptLoader.prototype.load = ajax;
  ScriptLoader.prototype.fail = failScript;

  // ------------------------
  // init function - left get this started
  function init() {
    var self = this.options;
    if(self.depScript) this.initScript(self.depScript);
    if(self.script) this.initScript(self.script);
  }

  // ------------
  // middleware init
  function initScript(array){
    var self = this;
    array.forEach(function(el, index){
      self.getScript(el, index);
    });
  }

  function getScript(el, index){
    var el = el,
    typeOf = typeof el,
    index = (index == undefined) ? 0 : index,
    url = (typeOf === "object") ? el[index] : el;
    this.load(url);
  }
  // end middleware init
  // ------------
  // end init function
  // ------------------------


  // ------------------------
  // load function
  function ajax(url){
    var xmlhttp = new XMLHttpRequest(),
        self = this;

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
         if(xmlhttp.status == 200){
          self.success(xmlhttp);
         } else {
          self.fail();
         }
      }
    }
  }
  // ------------
  // middleware load
  function failScript(){
    var errorMsg = "A problem occurs : "+ this.responseURL + " was not loaded";
    console.log(errorMsg);
  }
  // end middleware load
  // ------------
  // end load function
  // ------------------------


  // ------------------------
  // core function
  function successScript(xmlhttp){
    var self = this.options;
    switch(true){

      case self.depScript.indexOf(xmlhttp.responseURL) > -1 :
          var aw = self.awaiting;
          aw.push(xmlhttp.response);

          if( self.depScript.length == aw.length){
            addScript(aw.join("\n"));
            self.loaded = true;

            if(self.scriptWaiting.length > 0){
              addScript(self.scriptWaiting.join("\n"));
              self.scriptWaiting = [];
            }
          }
          return; // end case

      case self.loaded :
            addScript(xmlhttp.response);
            return;

      default :
          self.scriptWaiting.push(xmlhttp.response);
          return;
      }
    }

    // ------------
    // core middleware
    function addScript(el){
        var script = document.createElement("script");
        script.innerHTML = el;
        document.body.appendChild(script);
    }
    // end core middleware
    // ------------
    // end core function
    // ------------------------
})();
