/**
 * Require.js config
 */
require.config({
	//baseURL : "../",
	paths : {
		"jquery" : "vendor/jquery.js"
	}
});

require(["glitchscape"],function(g){

	g.run();

});