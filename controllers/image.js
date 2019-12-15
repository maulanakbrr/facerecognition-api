const Clarifai = require('clarifai'); 

const app = new Clarifai.App({
    apiKey: '88ae5b9e879a4c5fb264525721e026f4'
});

const handleApiCall = (req,res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => res.json(data))
      .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req,res,db) => {
    const { id } = req.body;
    
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries))
        .catch(err => console.log('fail change entries'))
}

module.exports = {
    handleApiCall: handleApiCall,
    handleImage: handleImage
}