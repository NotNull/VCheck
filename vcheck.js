(function(){
	
	var root = this;
	
	var VERSION = '0001';
	
	var v = VCheck = root.VCheck = root.v = function(value, params){
		
		if(_){//Check if Underscore is available
			
			if(_.isArray(params) || _.isObject(params)){
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
									launchValue(value, true, vEvent);
									
							}
							else if(e.which == 2){
								var vEvent;
								
								if((isset(events['middle'])))
									vEvent = events['middle'];	
								else if(isset(events['2']))
									vEvent = events['2'];
								
								if(_.isFunction(vEvent))
									launchValue(value, true, vEvent);
							}
						}
					});
					
				}
				break;
				case 'keyevent':
				{
					
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
