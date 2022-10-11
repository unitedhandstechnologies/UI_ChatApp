const response = (fn) => async (req, res) => {
  try {
    const data = await fn(req, res);
    res.status(200).send({
      success: true,
      code: 200,
      message: 'done',
      data,
    });
  } catch (err) {
    return error(res, err);
  }
};

const error = (res, err) => {
  try {
    let code =
      typeof err === 'object'
        ? err.hasOwnProperty('code')
          ? err.code
          : 500
        : 403;
    let message =
      typeof err === 'object'
        ? err.hasOwnProperty('message')
          ? err.message
          : err
        : err;
    res.status(code).json({
      success: false,
      error_message: message,
      code: code,
      data: [],
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports =  response;