(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxService = function () {
  function AjaxService(url, data, collback) {
    _classCallCheck(this, AjaxService);

    this.url = url || '';
    this.data = data || '';
    this.collback = collback || '';
  }

  _createClass(AjaxService, [{
    key: 'post',
    value: function post() {
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open('POST', this.url);
      xhr.setRequestHeader("Content-Type", "application/json");
      var self = this;
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          self.collback(xhr.responseText);
        }
      };
      xhr.send(this.data);
      return xhr;
    }
  }, {
    key: 'setUrl',
    set: function set(url) {
      this.url = url;
    }
  }, {
    key: 'setData',
    set: function set(data) {
      this.data = data;
    }
  }, {
    key: 'setCollback',
    set: function set(collback) {
      this.collback = collback;
    }
  }]);

  return AjaxService;
}();

exports.default = AjaxService;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readInputFields = readInputFields;
exports.arrayToObject = arrayToObject;
exports.objectToJSON = objectToJSON;
function readInputFields(array_with_id) {
  var values = [];
  if (array_with_id instanceof Array) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = array_with_id[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;

        values.push(id);
        var value = document.getElementById(id).value;
        values.push(value);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return values;
}
function arrayToObject(array) {
  var object = array.reduce(function (result, element, index) {
    var key = void 0,
        value = void 0;
    if (index % 2 == 0) {
      result[element] = array[index + 1];
    }
    return result;
  }, {});
  return object;
}
function objectToJSON(object) {
  return JSON.stringify(object);
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./common');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateAccount = function () {
  function CreateAccount(_ref) {
    var ajaxservice = _ref.ajaxservice;

    _classCallCheck(this, CreateAccount);

    this.ajaxservice = ajaxservice;
    this.id = ['i_name', 'i_surname', 'i_age', 'i_email', 'i_login', 'i_password', 'i_passwordConfirm'];
    this.formOK = false;
  }

  _createClass(CreateAccount, [{
    key: 'init',
    value: function init() {
      document.getElementById('b_createAcc').addEventListener('click', this.resetForm.bind(this));
      document.getElementById('i_name').addEventListener('keyup', this.nameValidation.bind(this));
      document.getElementById('i_surname').addEventListener('keyup', this.surnameValidation.bind(this));
      document.getElementById('i_age').addEventListener('keyup', this.ageValidation.bind(this));
      document.getElementById('i_email').addEventListener('keyup', this.emailValidation.bind(this));
      document.getElementById('i_login').addEventListener('keyup', this.loginValidation.bind(this));
      document.getElementById('i_password').addEventListener('keyup', this.passwordValidation.bind(this));
      document.getElementById('i_passwordConfirm').addEventListener('keyup', this.passwordConfirmValidation.bind(this));
      document.getElementById('createAccButt').addEventListener('click', this.send.bind(this));
    }
  }, {
    key: 'resetForm',
    value: function resetForm() {
      document.getElementById('i_password').value = "";
      document.getElementById('i_passwordConfirm').value = "";
      document.getElementById('s_confirmPassword-WarningGlyph').setAttribute('class', '');
      document.getElementById('form-group-password').setAttribute('class', 'form-group');
      document.getElementById('form-group-confirmPassword').setAttribute('class', 'form-group');
      this.removeWarning('passwordConfirm_infoText');
      this.removeGlyphicon('confirmPassword');
    }
  }, {
    key: 'nameValidation',
    value: function nameValidation() {
      var userNameIn = document.getElementById('i_name');
      //if in the name input string is empty
      if (userNameIn.value != '' && (userNameIn.value.length < 2 || userNameIn.value.length > 20)) {
        this.removeWarning('name_infoText');
        this.addWarning('name_infoText', 'Name must be between 2 and 20 characters', 'info-error');
        this.removeGlyphicon('name');
        this.formOK = false;
      } else if (userNameIn.value == '') {
        this.removeWarning('name_infoText');
        this.addWarning('name_infoText', 'Enter your name!', 'info-error');
        this.removeGlyphicon('name');
        this.formOK = false;
      } else {
        this.removeWarning('name_infoText');
        this.addGlyphicon('name', 'ok', 'has-success');
        this.formOK = true;
      }
    }
  }, {
    key: 'surnameValidation',
    value: function surnameValidation() {
      var userNameIn = document.getElementById('i_surname');
      //if in the name input string is empty
      if (userNameIn.value != '' && (userNameIn.value.length < 2 || userNameIn.value.length > 20)) {
        this.removeWarning('surname_infoText');
        this.addWarning('surname_infoText', 'Name must be between 2 and 20 characters', 'info-error');
        this.removeGlyphicon('surname');
        this.formOK = false;
      } else if (userNameIn.value == '') {
        this.removeWarning('name_infoText');
        this.addWarning('surname_infoText', 'Enter your name!', 'info-error');
        this.removeGlyphicon('surname');
        this.formOK = false;
      } else {
        this.removeWarning('surname_infoText');
        this.addGlyphicon('surname', 'ok', 'has-success');
        this.formOK = true;
      }
    }
  }, {
    key: 'ageValidation',
    value: function ageValidation() {
      var userAgeIn = document.getElementById('i_age');
      var ageAsNumber = Number(userAgeIn.value);
      //if in the age input string is empty
      if (userAgeIn.value == '') {
        //remove warnings if exist, if not exist notching happens
        this.removeWarning('age_infoText');
        this.addWarning('age_infoText', 'Enter your age!', 'info-error');
        this.removeGlyphicon('age');
      }
      if (userAgeIn.value != '') {
        if (isNaN(ageAsNumber)) {
          this.removeWarning('age_infoText');
          this.addWarning('age_infoText', 'Age must be a number!', 'info-error');
          this.removeGlyphicon('age');
          this.formOK = false;
        } else if (ageAsNumber > 99 || ageAsNumber < 5) {
          this.removeWarning('age_infoText');
          this.addWarning('age_infoText', 'Enter correct age!', 'info-error');
          this.removeGlyphicon('age');
          this.formOK = false;
        } else {
          this.removeWarning('age_infoText');
          this.addGlyphicon('age', 'ok', 'has-success');
          this.formOK = true;
        }
      }
    }
  }, {
    key: 'emailValidation',
    value: function emailValidation() {
      var userEmailIn = document.getElementById('i_email');
      //if in the email input string is empty
      var emailRegExpPattern = /^[^\.][\S]+\w@(((\w){1,15}\.\w{2,3})|((\w{1,20}\.){1,4}\w{2,3}))$/;
      var result = emailRegExpPattern.test(userEmailIn.value);
      if (!result) {
        this.removeWarning('email_infoText');
        this.addWarning('email_infoText', 'Enter correct email', 'info-error');
        this.removeGlyphicon('email');
        this.formOK = false;
      } else if (userEmailIn.value == '') {
        this.removeWarning('email_infoText');
        this.addWarning('email_infoText', 'Enter your email!', 'info-error');
        this.removeGlyphicon('email');
        this.formOK = false;
      } else {
        this.removeWarning('email_infoText');
        this.addGlyphicon('email', 'ok', 'has-success');
        this.formOK = true;
      }
    }
  }, {
    key: 'loginValidation',
    value: function loginValidation() {
      var userLoginIn = document.getElementById('i_login');
      //if in the login input string is empty
      var loginRegExpPattern = /^[\w\.\+-]{3,20}$/;
      var result = loginRegExpPattern.test(userLoginIn.value);
      if (!result) {
        this.removeWarning('login_infoText');
        this.addWarning('login_infoText', 'Enter 3 to 20 characters [a-z A-Z 0-9 . - +]', 'info-error');
        this.removeGlyphicon('login');
        this.formOK = false;
      } else {
        this.removeWarning('login_infoText');
        this.addGlyphicon('login', 'ok', 'has-success');
        this.formOK = true;
      }
    }
  }, {
    key: 'passwordValidation',
    value: function passwordValidation() {
      //userPassword is a name of password input HTML element 
      var userPasswIn = document.getElementById('i_password');
      var passwordRegExpPattern = /^[\w\.\+\-\!\@\#\$\%\^\&\*\(\)\{\}\[\]]{8,20}$/;
      var result = passwordRegExpPattern.test(userPasswIn.value);
      if (!result) {
        this.removeWarning('password_infoText');
        this.addWarning('password_infoText', 'Enter 8 to 20 characters', 'info-error');
        this.removeGlyphicon('password');
        this.formOK = false;
      } else if (userPasswIn.value == '') {
        this.removeWarning('password_infoText');
        this.addWarning('password_infoText', 'Enter your password!', 'info-error');
        this.removeGlyphicon('password');
        this.formOK = false;
      } else {
        this.removeWarning('password_infoText');
        this.addGlyphicon('password', 'ok', 'has-success');
        this.formOK = true;
      }
    }
  }, {
    key: 'passwordConfirmValidation',
    value: function passwordConfirmValidation() {
      var userPasswIn = document.getElementById('i_password');
      var userPasswConfirmIn = document.getElementById('i_passwordConfirm');
      if (userPasswIn.value == userPasswConfirmIn.value) {
        if (userPasswIn.value != '' && userPasswConfirmIn.value != '') {
          this.removeWarning('passwordConfirm_infoText');
          this.addWarning('passwordConfirm_infoText', 'passwords the same', 'info-ok');
          this.addGlyphicon('confirmPassword', 'ok', 'has-success');
          this.formOK = true;
        } else if (userPasswIn.value == '' && userPasswConfirmIn.value == '') {
          this.removeWarning('passwordConfirm_infoText');
          this.removeGlyphicon('confirmPassword');
          this.formOK = false;
        }
      } else {
        this.removeWarning('passwordConfirm_infoText');
        this.addWarning('passwordConfirm_infoText', 'passwords not the same', 'info-error');
        this.removeGlyphicon('confirmPassword');
        this.addGlyphicon('confirmPassword', 'remove', 'has-error');
        this.formOK = false;
      }
    }
  }, {
    key: 'addListenerMulti',
    value: function addListenerMulti(el, s, fn) {
      s.split(' ').forEach(function (e) {
        return el.addEventListener(e, fn, false);
      });
    }
  }, {
    key: 'addWarning',
    value: function addWarning(el_id, messageText, cssClass) {
      var infoDiv = document.getElementById(el_id);

      if (cssClass != null && cssClass != '') {
        infoDiv.setAttribute('class', 'col-md-6 input-group ' + cssClass);
      }

      if (messageText != null && messageText != '') {
        infoDiv.innerHTML = messageText;
      }
    }
  }, {
    key: 'removeWarning',
    value: function removeWarning(el_id) {
      var el = document.getElementById(el_id);
      if (el) {
        el.setAttribute('class', 'col-md-6 input-group');
        el.innerHTML = '';
      }
    }
  }, {
    key: 'addGlyphicon',
    value: function addGlyphicon(fieldLabel, glyphName, formClass) {
      // fieldLabel : label of input field 'name', 'age' etc.
      // glyphName : ok, remove; gives glyphicon-ok, glyphicon-remove etc
      // formClass : bootstrap class = has-error or has-succes 
      var glyphSpanElementID = 's_' + fieldLabel + '-WarningGlyph';
      var glyphSpanElement = document.getElementById(glyphSpanElementID);
      glyphSpanElement.setAttribute('class', 'glyphicon glyphicon-' + glyphName + ' form-control-feedback');
      var formGroupElement = document.getElementById('form-group-' + fieldLabel);
      formGroupElement.setAttribute('class', 'form-group ' + formClass + ' has-feedback');
    }
  }, {
    key: 'removeGlyphicon',
    value: function removeGlyphicon(fieldLabel) {
      var glyphSpanElementID = 's_' + fieldLabel + '-WarningGlyph';
      var glyphSpanElement = document.getElementById(glyphSpanElementID);
      glyphSpanElement.setAttribute('class', '');
      var formGroupElement = document.getElementById('form-group-' + fieldLabel);
      formGroupElement.setAttribute('class', 'form-group');
    }
  }, {
    key: 'collect_data',
    value: function collect_data(array_with_id) {
      return (0, _common.objectToJSON)((0, _common.arrayToObject)((0, _common.readInputFields)(array_with_id)));
    }
  }, {
    key: 'send',
    value: function send() {
      if (this.formOK) {
        this.ajaxservice.setUrl = './php/createAccount.php';
        this.ajaxservice.setData = this.collect_data(this.id);
        console.log(this.collect_data(this.id));
        this.ajaxservice.setCollback = this.redirect;
        this.ajaxservice.post();
      }
    }
  }, {
    key: 'redirect',
    value: function redirect(response) {
      if (response == 'newUserAdded') {
        //return 'redirection';
        console.log('Ok ' + response);
        window.location = "./views/app.html";
      } else {
        console.log('else ' + response);
        // if (!document.getElementById('loginFeild')){
        //   //dynamic div for incorrect login/password message
        //   var infoDiv = document.createElement('div');
        //   infoDiv.setAttribute('id', 'loginFeild');
        //   infoDiv.innerHTML = "login or password incorrect";
        //   document.getElementById('loginForm').appendChild(infoDiv);
      }
    }
  }]);

  return CreateAccount;
}();

exports.default = CreateAccount;

},{"./common":2}],4:[function(require,module,exports){
'use strict';

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _createAccount = require('./createAccount');

var _createAccount2 = _interopRequireDefault(_createAccount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajaxservice = new _ajax2.default();
var createAccount = new _createAccount2.default({ ajaxservice: ajaxservice });
var loginService = new _login2.default({ ajaxservice: ajaxservice }); //{} without this ajax == undefined
loginService.init();
createAccount.init();

},{"./ajax":1,"./createAccount":3,"./login":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./common');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

"use strict";

var LoginService = function () {
  function LoginService(_ref) {
    var ajaxservice = _ref.ajaxservice;

    _classCallCheck(this, LoginService);

    this.ajaxservice = ajaxservice;
    this.id = ['username', 'password'];
  }

  _createClass(LoginService, [{
    key: 'init',
    value: function init() {
      document.getElementById('loginButton').addEventListener('click', this.send.bind(this));
    }
  }, {
    key: 'send',
    value: function send() {
      this.ajaxservice.setUrl = './php/login.php';
      this.ajaxservice.setData = this.collect_data(this.id);
      this.ajaxservice.setCollback = this.redirect;
      this.ajaxservice.post();
    }
    //TODO clean infoDiv when user start typing again
    //move this to new function;

  }, {
    key: 'redirect',
    value: function redirect(response) {
      var infoDiv = document.getElementById("loginFeild");
      if (infoDiv) {
        infoDiv.innerHTML = "";
      }
      if (response == 'OK_GO') {
        //return 'redirection';
        //console.log('Ok ' + response);
        window.location = "./views/app.html";
      } else {
        console.log('else ' + response);
        if (infoDiv) {
          infoDiv.innerHTML = "login or password incorrect";
        }
      }
    }
  }, {
    key: 'collect_data',
    value: function collect_data(array_with_id) {
      return (0, _common.objectToJSON)((0, _common.arrayToObject)((0, _common.readInputFields)(array_with_id)));
    }
  }]);

  return LoginService;
}();

exports.default = LoginService;

},{"./common":2}]},{},[4]);
