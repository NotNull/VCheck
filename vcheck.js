(function(){
	
	var root = this;
	
	var VERSION = '0001';
	
	//Create local variables of libraries
	var _ = root._;
	var $ = root.jQuery || root.$;
	
	var __value; //current passed value
	var instance; 
	
	var v = VCheck = root.v = root.VCheck = function(value, params){
	
		__value = value;
		
		this.__value = __value;
		
		instance = this;
		
		if(isArray(params, false) || isObject(params, false)){
			params = convertKeysToLowerCase(params);
							
			var isTypeSensitive = params['typeSensitive'];
			
			if(isset(isTypeSensitive)){
									
				if(isNumber(isTypeSensitive, false)){//if Bit
					
					if(isTypeSensitive == 0)
						isTypeSensitive = false;
					else
						isTypeSensitive = true;
				}
			}
			
			for(var key in params){
				if(key.toString().toLowerCase() != 'typesensitive'){
					var vEvent = params[key];
					
					var isTrue = checkKey(key, value, vEvent);
					
					if(isTypeSensitive == true && isTrue == true)
						break;
				}
				
			}
			
		}
		
		return {
			isObject: isObject,
			isFunction: isFunction,
			isArray: isArray,
			isEmpty: isEmpty,
			isNumber: isNumber,
			isFinite: isFinite,
			isElement: isElement,
			isArguments: isArguments,
			isString: isString,
			isBoolean: isBoolean,
			isDate: isDate,
			isRegExp: isRegExp,
			isNaN: isNaN,
			isNull: isNull,
			isUndefined: isUndefined,
			isMouseEvent: isMouseEvent,
			isKeyEvent: isKeyEvent,
			checkType: checkType,
			isTypeOf: isTypeOf,
			isset: isset,
			getVersion: getVersion,
			getValue: getValue,
			getKeyChars: getKeyChars		
		}
			
				
	}
	
	root.VCheck.VERSION = VERSION;
	
	/************   Functions ***************/
	
	var KeyChars = {
		8: 'backspace',
		9: 'tab',
		13: 'enter',
		16: 'shift',
		17: 'ctrl',
		18: 'alt',
		19: 'pause',
		20: 'caps',
		27: 'escape',
		33: 'pageup',
		34: 'pagedown',
		35: 'end',
		36: 'home',
		37: 'leftarrow',
		38: 'uparrow',
		39: 'rightarrow',
		40: 'downarrow',
		45: 'insert',
		46: 'delete',
		48: '0',
		49: '1',
		50: '2',
		51: '3',
		52: '4',
		53: '5',
		54: '6',
		55: '7',
		56: '8',
		57: '9',
		65: 'a',
		66: 'b',
		67: 'c',
		68: 'd',
		69: 'e',
		70: 'f',
		71: 'g',
		72: 'h',
		73: 'i',
		74: 'j',
		75: 'k',
		76: 'l',
		77: 'm',
		78: 'n',
		79: 'o',
		80: 'p',
		81: 'q',
		82: 'r',
		83: 's',
		84: 't',
		85: 'u',
		86: 'v',
		87: 'w',
		88: 'x',
		89: 'y',
		90: 'z',
		91: 'leftwindowkey',
		92: 'rightwindowkey',
		93: 'selectkey',
		96: 'numpad0',
		97: 'numpad1',
		98: 'numpad2',
		99: 'numpad3',
		100: 'numpad4',
		101: 'numpad5',
		102: 'numpad6',
		103: 'numpad7',
		104: 'numpad8',
		105: 'numpad9',
		106: 'multiply',
		107: 'add',
		109: 'subtract',
		110: 'decimalpoint',
		111: 'divide',
		112: 'f1',
		113: 'f2',
		114: 'f3',
		115: 'f4',
		116: 'f5',
		117: 'f6',
		118: 'f7',
		119: 'f8',
		120: 'f9',
		121: 'f10',
		122: 'f11',
		123: 'f12',
		144: 'numlock',
		145: 'scrolllock',
		186: 'semicolon',
		187: 'equalsign',
		188: 'comma',
		189: 'dash',
		190: 'period',
		191: 'forwardslash',
		192: 'graveaccent',
		219: 'openbracket',
		220: 'backslash',
		221: 'closebracket',
		222: 'singlequote'
		
	}
	
	var convertKeysToLowerCase = function(obj){
		var newObj = {};
		
		for(var key in obj){
			var newKey = key.toString().toLowerCase();
			
			if(_.isArray(obj[key]) || _.isObject(obj[key]) && _.isFunction(obj[key]) == false){
				newObj[newKey] = convertKeysToLowerCase(obj[key]);
			}else{
				newObj[newKey] = obj[key];
			}
		}
		
		return newObj;
	}
	
	var getVersion(){
		return isntance.VERSION;
	}
	
	var getValue(){
		return instance.__value;
	}
	
	var getKeyChars(){
		return KeyChars;
	}
	
	/** Functions to check types
	** Defaults to Underscore.js if present
	**/
	
	//Simple datatype function checker. Returns in string format
	function checkType(v){
		if(v === null) 
			return 'null';
		
		if(typeof v === 'undefined')
			return 'undefined';
		
		return Object.prototype.toString.call(v).match(/\s(.+?)\]/)[1].toLowerCase();	
	}
	
	var isTypeOf(v, t){
	
		if(isString(t, false)){
			if(!isset(v))
				v = __value;

			if(!isset(_))
				return t.toLowerCase() == checkType(v);
			else
				return _isTypeOf(v, t);
		}
	}
	
	var _isTypeOf = function(v, t){
				
		var bool = false;
		
		t = t.toLowerCase();
		
		switch(t){
			case 'empty':
				{
					bool = _.isEmpty(v);
				}
				break;
			case 'element':
				{
					bool = _.isElement(v);
				}
				break;
			case 'array':
				{
					bool = _.isArray(v);					
				}
				break;
			case 'object':
				{
					bool = _.isObject(v);					
				}
				break;
			case 'arguments':
				{
					bool = _.isArguments(v);					
				}
				break;
			case 'function':
				{
					bool = _.isFunction(v);					
				}
				break;
			case 'number':
				{
					bool = _.isNumber(v);
				}
				break;
			case 'string':
				{
					bool = _.isString(v);					
				}
				break;
			case 'finite':
				{
					bool = _.isFinite(v);					
				}
				break;
			case 'boolean':
				{
					bool = _.isBoolean(v);					
				}
				break;
			case 'date':
				{
					bool = _.isDate(v);					
				}
				break;
			case 'nan':
				{
					bool = _.isNaN(v);					
				}
				break;
			case 'null':
				{
					bool = _.isNull(v);					
				}
				break;
			case 'undefined':
				{
					bool = _.isUndefined(v);					
				}
			case 'mouseevent':
				{
					bool = isMouseEvent(v);
				}
				break;
			case 'keyevent':
				{
					bool = isKeyEvent(v);
				}
				break;
		}
			
		return bool;
	}
	
	function isEmpty(v){	
		if(!isset(_)){
			if(checkType(v) == 'string'){
				if(v.trim() == '')
					return true;
				else
					return false;
			}
			
			if(checkType(v) == 'array'){
				if(v.count == 0)
					return true;
				else
					return false;
			}
			
			if(checkType(v) == 'object'){
				if(v.__count__ == 0)
					return true;
				else
					return false;
			}
		}
		else{
			return _.isEmpty(v);
		}		
	}
	
	var isType = function(is, v, c){
				
		if(isset(c)){
			if(c === false){
				return is;
			}
			else{
				launchValue(v, is, c);
			}
		}
		
		if(!isset(v))
			return is;
			
		return instance;//For chaining
	}
	
	var isFunction = function(v, c){
		return isType(isTypeOf(v, 'function'), v, c);
	}
		
	var isElement = function(v, c){
		return isType(isTypeOf(v, 'element'), v, c);
	}
	
	var isArray = function(v, c){
		return isType(isTypeOf(v, 'array'), v, c);
	}
	
	var isObject = function(v, c){
		return isType(isTypeOf(v, 'object'), v, c);
	}
	
	var isArguments = function(v, c){
		return isType(isTypeOf(v, 'arguments'), v, c);
	}
	
	var isString = function(v, c){
		return isType(isTypeOf(v, 'string'), v, c);
	}
	
	var isNumber = function(v, c){
		return isType(isTypeOf(v, 'number'), v, c);
	}
	
	var isFinite = function(v, c){
		return isType(isTypeOf(v, 'finite'), v, c);
	}
	
	var isBoolean = function(v, c){
		return isType(isTypeOf(v, 'boolean'), v, c);
	}
	
	var isDate = function(v, c){
		return isType(isTypeOf(v, 'date'), v, c);
	}
	
	var isRegExp = function(v, c){
		return isType(isTypeOf(v, 'regexp'), v, c);
	}
	
	var isNaN = function(v, c){
		return isType(isTypeOf(v, 'nan'), v, c);
	}
	
	var isNull = function(v, c){
		return isType(isTypeOf(v, 'null'), v, c);
	}
	
	var isUndefined = function(v, c){
		return isType(isTypeOf(v, 'undefined'), v, c);
	}

	var isMouseEvent = function(v, c){
		
		var e = v;
		var is = false;
		
		var eName = e.__proto__.constructor.name;
		
		if(isset(e['originalEvent']))//if jQuery event
			eName = e['originalEvent'].__proto__.constructor.name;
		
		if(isset(eName)){
			if(eName.toString().toLowerCase() == 'mouseevent')
				is = true;
		}
		
		return isType(is, v, c);
	}
	
	var isKeyEvent = function(value){
		
		var e = value;
		
		var is = false;
		
		var eName = e.__proto__.constructor.name;
		
		if(isset(e['originalEvent']))//if jQuery event
			eName = e['originalEvent'].__proto__.constructor.name;
		
		if(isset(eName)){
			var type = eName.toString().toLowerCase();
			if(type == 'keyup' || type == 'keydown')
				is = true;
		}
		
		is = false;
	
		return isType(is, v, c);	
	}

	var isset = function(value){
		
		if(value == undefined || value == null)
			return false;
		
		if(isString(value, false)){
			if(value.trim() == '')
				return false;
		}
		
		return true;
	}
	
	var launchValue = function(value, bool, vEvent){
		
		if(isset(value) && isset(vEvent)){
			if(isObject(vEvent, false) && isFunction(vEvent, false) == false){
				if(isset(vEvent['false']) && bool == false){
					var fun = vEvent['false'];
					
					if(isFunction(fun, false))
						fun(value);
				}
				else if(isset(vEvent['true']) && bool == true){
					var fun = vEvent['true'];
					
					if(isFunction(fun, valse))
						fun(value);
				}
			}
			else if(isFunction(vEvent, false) && bool == true){
				vEvent(value);
			}
		}
	}
	
	var bindEvent = function(element, type, handler) {
		
		if(isElement(element, false) == true && isString(type, false) == true && isFunction(handler, false) == true){	
			if(isset($) == false){
			    if (element.addEventListener) {
			        element.addEventListener(type, handler, false);
			    } else {
			        element.attachEvent('on'+type, handler);
			    }
			}else{
				$(element).bind(type, handler);
			}
		}
	}
	
	var unbindEvent = function(element, type){
		
		if(isset($) == false){
		    if (element.addEventListener) {
		        element.removeEventListener(type, arguments.callee, false);
		    } else {
		        element.removeEvent('on'+type);
		    }			
		}else{
			$(element).unbind(type);
		}
		    
	}	
	
	var checkKey = function(key, value, callback){
		
		key = key.toString().toLowerCase();
		
		var bool = isTypeOf(value, key);
		
		if(isElement(value, false)){
			
			switch (key){
				case 'mouseevent':
				{
					var events = callback;//assumes object has event callbacks
					
					var contextMenu;
					
					if(isset(events['right']) || isset(events['3'])){
						value.oncontextmenu = function(e){
							if(events['contextMenu'] == false)
								e.preventDefault();
							
							var vEvent;
							
							if((isset(events['right'])))
								vEvent = events['right'];	
							else if(isset(events['3']))
								vEvent = events['3'];
							
							if(isFunction(vEvent, false)){
								launchValue(value, true, vEvent);
							}	
						}
					}else if(events['contextMenu'] == false){
						value.oncontextmenu = function(e){
							if(events['contextMenu'] == false)
								e.preventDefault();
						}
					}
					
					bindEvent(value, 'click', function(e){
						if(events['preventDefault'] == true)
							e.preventDefault();
						
						if(isFunction(events)){
							launchValue(e, true, events);//Pass the Event instead of the element
						}
						else{
							if(e.which == 1){
								var vEvent;
								
								if((isset(events['left'])))
									vEvent = events['left'];	
								else if(isset(events['1']))
									vEvent = events['1'];
								
								if(isFunction(vEvent, false))
									launchValue(e, true, vEvent);
									
							}
							else if(e.which == 2){
								var vEvent;
								
								if((isset(events['middle'])))
									vEvent = events['middle'];	
								else if(isset(events['2']))
									vEvent = events['2'];
								
								if(isFunction(vEvent, false))
									launchValue(e, true, vEvent);
							}
						}
					});
					
				}
				break;
				case 'keydown':
				{
					var kEvents = callback;
					
					bindEvent(value, 'keydown', function(e){
						if(isFunction(kEvents, false)){
							launchValue(e, true, kEvents);
						}
						else{
							var which = e.which;
							var key = KeyChars[which];
							
							
							if(isset(kEvents[which])){
								launchValue(e, true, kEvents[which]);
							}
							else if(isset(kEvents[key])){
								launchValue(e, true, kEvents[key]);								
							}
						}
					});
				}
				break;
				case 'keyup':
				{
					var kEvents = callback;
					
					bindEvent(value, 'keyup', function(e){
						if(isFunction(kEvents, false)){
							launchValue(e, true, kEvents);
						}
						else{
							var which = e.which;
							var key = KeyChars[which];
							
							if(isset(kEvents[which])){
								launchValue(e, true, kEvents[which]);
							}
							else if(isset(kEvents[key])){
								launchValue(e, true, kEvents[key]);								
							}
						}
					});
				}
				break;
				
			}
		}
		else{
			launchValue(value, bool, callback);			
		}
		
		return bool;
	}

	
}).apply(this);