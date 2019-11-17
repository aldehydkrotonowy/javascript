(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
	function Ajax() {
		_classCallCheck(this, Ajax);
	}

	_createClass(Ajax, [{
		key: 'message',
		value: function message(m) {
			if (document.getElementById('loginFeild')) {
				var parent = document.getElementById('loginForm');
				var child = document.getElementById('loginFeild');
				parent.removeChild(child);
			}
			if (m == 'OK_GO') {
				console.log("ok_go");
				//window.location = "./views/appMainPage.html";
			} else {
				//dynamic div for incorrect login/password message
				var infoDiv = document.createElement('div');
				infoDiv.setAttribute('id', 'loginFeild');
				infoDiv.innerHTML = "login or password incorrect";
				document.getElementById('loginForm').appendChild(infoDiv);
			}
		}
	}, {
		key: 'something',
		value: function something() {
			console.log('something');
		}
	}, {
		key: 'post',
		value: function post(url, data) {
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			xhr.open('POST', url);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					Ajax.something();
				}
			};
			xhr.send(data);
			return xhr;
		}
	}]);

	return Ajax;
}();

exports.default = Ajax;

},{}],2:[function(require,module,exports){
"use strict";

var _login = require("./login");

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _login2.default)();

},{"./login":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

"use strict";

function init() {
  document.getElementById('loginButton').addEventListener('click', send);
}

function prepare_data() {
  var login = document.getElementById('textinput').value;
  var passw = document.getElementById('password').value;

  //TODO sprawdzić czy inputy nie są puste bo przenosi na stronę główną
  var loignMessage = {};
  loignMessage.login = login;
  loignMessage.password = passw;
  var message_json = JSON.stringify(loignMessage);
  return message_json;
}

function send() {
  var ajax = new _ajax2.default();
  var data = prepare_data();
  console.log(data);
  var url = "./php/login.php";
  console.log(url);
  ajax.post(url, data);
  console.log("lalla");
}

exports.default = init;

},{"./ajax":1}]},{},[2]);
