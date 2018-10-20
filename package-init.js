/* jshint ignore:start */


// Browser environment
if(typeof window !== 'undefined') {
    SeeleWebProvider = (typeof window.SeeleWebProvider !== 'undefined') ? window.SeeleWebProvider : require('seele.js');
}


// Node environment
if(typeof global !== 'undefined') {
    SeeleWebProvider = (typeof global.SeeleWebProvider !== 'undefined') ? global.SeeleWebProvider : require('seele.js');
}

/* jshint ignore:end */
