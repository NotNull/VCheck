(function(){
	
	var root = this;
	
	var VERSION = '0001';
	
	var VCheck = root.VCheck = function(value, params){
		
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
				break;
			
		}
				
		launchValue(value, bool, callback);
		
		return bool;
	}

	
}).apply(this);
