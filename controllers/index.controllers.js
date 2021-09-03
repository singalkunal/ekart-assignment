exports.showHome = (req, res) => {
    res.status(200).send({msg: 'Welcome Home', success: true});
}