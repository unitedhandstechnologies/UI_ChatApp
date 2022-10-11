const setLanguage = (Request, Res, next) => {
    Request.lang = 'en';
    global._Lang = 'en';
    return next();
}

module.exports = setLanguage;