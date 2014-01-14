/**
 * Require.js config
 */
require.config({
	// baseURL : "../js",
	paths : {
		"jquery" : "vendor/jquery.js"
	}
});

require(["glitchscape"],function(g){

	g.run();

});