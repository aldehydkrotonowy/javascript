'user strict'

const errorHandler = (err, req, res, next) => {
    console.log(err)
    res.header('Access-Control-Allow-Origin', '*');
    res.status(401).send(err);
}

export default errorHandler