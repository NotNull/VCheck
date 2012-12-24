(function(){
	
	var root = this;
	
	var VERSION = '0001';
	
	//Create local variables of libraries
	var _ = root._;
	var $ = root.jQuery || root.$;
	
	var v = VCheck = root.VCheck = root.v = function(value, params){
		
		if(_){//Check if Underscore is available
			
			if(_.isArray(params) || _.isObject(params)){
				params = convertKeysToLowerCase(params);
								
				var isTypeSensitive = params['typeSensitive'];
				
				if(isset(isTypeSensitive)){
										
					if(_.isNumber(isTypeSensitive)){//if Bit
						
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
				
		}
		else
			console.warn('Underscore not found');
				
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
	
	var isMouseEvent = function(value){
		
		var e = value;
		
		var eName = e.__proto__.constructor.name;
		
		if(isset(e['originalEvent']))//if jQuery event
			eName = e['originalEvent'].__proto__.constructor.name;
		
		if(isset(eName)){
			if(eName.toString().toLowerCase() == 'mouseevent')
				return true;
		}
		
		return false;
	}

	var isset = function(value){
		
		if(value == undefined || value == null)
			return false;
		
		if(_.isString(value)){
			if(value.trim() == '')
				return false;
		}
		
		return true;
	}
	
	var launchValue = function(value, bool, vEvent){
		
		if(isset(value) && isset(vEvent)){
			if(_.isObject(vEvent) && _.isFunction(vEvent) == false){
				if(isset(vEvent['false']) && bool == false){
					var fun = vEvent['false'];
					
					if(_.isFunction(fun))
						fun(value);
				}
				else if(isset(vEvent['true']) && bool == true){
					var fun = vEvent['true'];
					
					if(_.isFunction(fun))
						fun(value);
				}
			}
			else if(_.isFunction(vEvent) && bool == true){
				vEvent(value);
			}
		}
	}
	
	var checkForEvent = function(element){
		
	}
	
	var bindEvent = function(element, type, handler) {
		
		if(_.isElement(element) == true && _.isString(type) == true && _.isFunction(handler) == true){	
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
		
		var bool = false;
		
		switch(key.toString().toLowerCase()){
			case 'empty':
				{
					bool = _.isEmpty(value);
				}
				break;
			case 'element':
				{
					bool = _.isElement(value);
				}
				break;
			case 'array':
				{
					bool = _.isArray(value);					
				}
				break;
			case 'object':
				{
					bool = _.isObject(value);					
				}
				break;
			case 'arguments':
				{
					bool = _.isArguments(value);					
				}
				break;
			case 'function':
				{
					bool = _.isFunction(value);					
				}
				break;
			case 'number':
				{
					bool = _.isNumber(value);
				}
				break;
			case 'string':
				{
					bool = _.isString(value);					
				}
				break;
			case 'finite':
				{
					bool = _.isFinite(value);					
				}
				break;
			case 'boolean':
				{
					bool = _.isBoolean(value);					
				}
				break;
			case 'date':
				{
					bool = _.isDate(value);					
				}
				break;
			case 'nan':
				{
					bool = _.isNaN(value);					
				}
				break;
			case 'null':
				{
					bool = _.isNull(value);					
				}
				break;
			case 'undefined':
				{
					bool = _.isUndefined(value);					
				}
			case 'mouseevent':
				{
					bool = isMouseEvent(value);
				}
				break;
		}
		
		if(_.isElement(value)){
			
			switch (key.toString().toLowerCase()){
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
							
							if(_.isFunction(vEvent)){
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
						
						if(_.isFunction(events)){
							launchValue(e, true, events);//Pass the Event instead of the element
						}
						else{
							if(e.which == 1){
								var vEvent;
								
								if((isset(events['left'])))
									vEvent = events['left'];	
								else if(isset(events['1']))
									vEvent = events['1'];
								
								if(_.isFunction(vEvent))
									launchValue(e, true, vEvent);
									
							}
							else if(e.which == 2){
								var vEvent;
								
								if((isset(events['middle'])))
									vEvent = events['middle'];	
								else if(isset(events['2']))
									vEvent = events['2'];
								
								if(_.isFunction(vEvent))
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
						if(_.isFunction(kEvents)){
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
						if(_.isFunction(kEvents)){
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
