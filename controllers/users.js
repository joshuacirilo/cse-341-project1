const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
    const result = await mongodb.getDB().db('project1').collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};


const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDB().db('project1').collection('users').findOne({ _id: userId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};


module.exports = {
    getAll,
    getSingle
};
