const jwt = require('jsonwebtoken');
const accessTokenSecret = "thisisasecret!";
const path = require('path');
const basePath = path.dirname(__dirname);



//exports the authentication
module.exports = {
    //authorized

    //only for data 
    authorized(req, res, next) {
        console.log(req.headers);
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, accessTokenSecret, (err) => {
                if (err) {
                    return res.sendStatus(403);
                }

                next();
            });
        } else {
            res.sendStatus(401);
        }
    },

    //only for html pages
    authorizedForpage(req, res, next){
        if (req.cookies.access_token) {
            const token = req.cookies.access_token;

            jwt.verify(token, accessTokenSecret, (err) => {
                if (err) {
                    return res.sendStatus(403);
                }
                next();
            });
        } else {
            res.redirect('login');
        }
    },

    //only for logout
    deleteCookie(req, res, next){
        if(req.cookies.access_token) res.clearCookie("access_token");
        return res.redirect("login");
    }
};

