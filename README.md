VCheck
======

Key/Value Event Callback helper that checks the passed Value type and based on the type, to launch passed functions. 

VCheck is a very light-weight helper function that does only one thing, but does it well.

Requirements: Underscore.js (Used for datatype checking)

Example usage:

var unknownType = "I am a string";

VCheck(unknownType, {
  'function': function(value){
    console.log('I am a function!');
  },
  number: function(value){
    console.log('I am a number!');
  },
  string: function(value){
    console.log('I am a string!');
  }
});


The datatype that matches the passed variable launches the passed callback if the datatype equals true. 

You can also pass extra parameters to launch a callback based on matching or not.

var unknownType = "I am a string";

VCheck(unknownType, {
  'function': function(value){
    console.log('I am a function!');
  },
  number: {
    'true': function(value){
      console.log('I am a number!');
    },
    'false': function(value){
      console.log('I am not a number!');    
    }
  },
  string: function(value){
    console.log('I am a string!');
  }
});

By default, if a datatype returns true, it does not check against any other passed params that come after. But, you can set it to do so.

var unknownType = 9001;

VCheck(unknownType, {
  'function': function(value){
    console.log('I am a function!');
  },
  number: function(value){
    if(value > 9000)
      console.log("I'm over 9000!");
      
  }, 
  finite: function(value){
    if(value > 9000)
      console.log("I'm over 9000!");
      
  }, 
  string: function(value){
    console.log('I am a string!');
  }
});

