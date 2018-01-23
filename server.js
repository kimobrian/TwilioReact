require("dotenv").config();
var path = require("path");
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var express = require("express");
var webpack = require("webpack");
var faker = require("faker");

var app = express();
if(process.env.NODE_ENV === "DEV") { // Configuration for development environment
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpackConfig = require("./webpack.config.js");
    const webpackCompiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(webpackCompiler));
    app.use(express.static(path.join(__dirname, "app")));
} else if(process.env.NODE_ENV === "PROD") { // Configuration for production environment
    app.use(express.static(path.join(__dirname, "dist")));
}


/*
Generate an Access Token for a chat application user - it generates a random
username for the client requesting a token, and takes a device ID as a query
parameter.
*/
app.get("/token", function(request, response) {
    var identity = faker.name.findName();

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token
    token.identity = identity;

    //grant the access token Twilio Video capabilities
    var grant = new VideoGrant();
    // grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Express server listening on *:" + port);
});
