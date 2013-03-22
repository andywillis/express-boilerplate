/*global console:true*/

/**
 * A set of common utilities.
 * Requires jQuery, lodash.
 * 0503013 AJW
 */

;(function(util){
  "use strict";

  /**
   * Builds a new namespace thru iteration when provided with a namespace string.
   * @param  {string}  A period-separated namespace (e.g. Recipe.Meat.Lamb).
   * @return {object}  A namespace object.
   */
  util.namespace = function namespace(namespaceString) {
    var parts = namespaceString.split('.'), parent = window, currentPart = '';
    for (var i = 0, length = parts.length; i < length; i++) {
      currentPart = parts[i];
      parent[currentPart] = parent[currentPart] || {};
      parent = parent[currentPart];
    }
    return parent;
  };

  // Returns a DOM object from id.
  util.get = function get(id) {
    return document.getElementById(id);
  };

  /**
   * Improved typeof function.
   * @param  {x}       The structure to be assessed.
   * @return {string}  The identifier.
   */
  util.toType = function(x) { return ({}).toString.call(x).match(/\s([a-zA-Z]+)/)[1].toLowerCase(); };

  /**
   * Non-jQuery ajax routine
   * @param  {string}   url      Script location.
   * @param  {function} callback On success.
   * @param  {string}   postData Form data.
   */
  util.ajax = function(url, callback, postData) {
    var req = createXMLHTTPObject();
    if (!req) return;
    var method = (postData) ? "POST" : "GET";
    req.open(method,url,true);
    req.setRequestHeader('User-Agent','XMLHTTP/1.0');
    if (postData)
      req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    req.onreadystatechange = function () {
      if (req.readyState != 4) return;
      if (req.status != 200 && req.status != 304) return;
      callback(req);
    };
    if (req.readyState == 4) return;
    req.send(postData);
  };

  var XMLHttpFactories = [
    function () {return new XMLHttpRequest();},
    function () {return new ActiveXObject("Msxml2.XMLHTTP");},
    function () {return new ActiveXObject("Msxml3.XMLHTTP");},
    function () {return new ActiveXObject("Microsoft.XMLHTTP");}
  ];

  function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
      try {
        xmlhttp = XMLHttpFactories[i]();
      }
      catch (e) {
        continue;
      }
      break;
    }
    return xmlhttp;
  }

  /**
   * Object properties that are null are reset to emptyString.
   * @param  {object} obj Object to be checked.
   * @return {object}     Reformatted object.
   */
  util.resetNullProperties = function(obj) {
    for (var prop in obj) {
      if(obj[prop] === null) obj[prop] = '';
    }
    return obj;
  };

  /**
   * Merge two objects.
   * @param  {object} a [description]
   * @param  {object} b [description]
   * @return {object}   [description]
   */
  util.mergeObjects = function(a, b) {
    if (a && b) {
      for (var key in b) {
        a[key] = b[key];
      }
    }
    return a;
  };

  /**
   * Checks whether the browser (not device) supports touch events.
   * @return {boolean} Does the browser support touch events, yes or no.
   */
  util.is_touch_device = function is_touch_device() {
    if ("ontouchstart" in document.documentElement) return true;
    else return false;
  };

}(window.util = window.util || {}));