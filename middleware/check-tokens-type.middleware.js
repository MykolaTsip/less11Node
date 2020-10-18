const jwt = require('jsonwebtoken')

const {ErrorHandle, ErrorStatusEnum, ErrorEnum} = require('../errors')
const  {constants, token_conf} =require('../configs')
const {oauthService} = require('../services')

module.exports = (tokenType) => async (req, res, next) => {
    try {
        let secretWord = '';
        let keyName = ''


        switch (tokenType) {
            case 'access':
                secretWord = token_conf.ACCESS_SECRET_KEY;
                keyName = 'access_token'
                break;
            case 'refresh':
                secretWord = token_conf.REFRESH_SECRET_KEY;
                keyName = 'refresh_token'
                break;
            default:
                return next(new ErrorHandle('Token !!!!!', 401));
        }

        const token = req.get(constants.AUTHORIZATION);

        if (!token) {
            return next(new ErrorHandle('Token is now valid', 401));
        }

        jwt.verify(token, secretWord, err => {
            if (err) {
                return next(new ErrorHandle('Token is now valid', 401));
            }
        });

        let tokenWithUser = await oauthService.getByParams({[keyName]: token});

        req.user = tokenWithUser.User
        next()
    }
    catch (e) {
        next(e)
    }
}
