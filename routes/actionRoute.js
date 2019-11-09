const express = require("express");
const db = require("../data/helpers/actionModel");

const router = express.Router();

router.get('/actions/:id', verifyActionID, (req, res) => {
    res.send(req.action);
    res.status(200)
});

router.post('/actions', verifyHeader, (req,res) => {
    action = {
        project_id: req.headers.project_id,
        description: req.headers.description,
        notes: req.headers.notes
    }

    db.insert(action)
    .then((newAction) => {
        res.send(newAction)
        res.status(200)
    })
    .catch((err) => {
        res.send("internal server err").status(500)
    })
})

router.put('/actions/:id', verifyHeader, verifyActionID, (req,res) => {
    action = {
        project_id: req.headers.project_id,
        description: req.headers.description,
        notes: req.headers.notes,
        completed: req.headers.completed
    }

    db.update(req.params.id, action)
    .then((updatedAction) => {
        res.send(updatedAction)
        res.status(200)
    })
    .catch((err) => {
        res.send("internal server err")
        res.status(500)
    })
})

router.delete("/actions/:id", verifyActionID, (req, res) => {
    db.remove(req.params.id)
    .then((removed) => {
        res.send("removed item")
        res.status(200)
    })
    .catch((err) => {
        res.status(500)
        res.send("internal server error")
    })
})


//custom middleware
function verifyActionID (req,res,next) {
    db.get(req.params.id)
    .catch((err) => {
        res.send("internal server error").status(500);
    })
    .then((action) => {
        if(action == null){
            res.send("no action")
            res.status(404);
        }
        else{
            req.action = action
            next()
        }
    })
}

function verifyHeader(req,res,next){
    if(req.headers.project_id == null || req.headers.description == null || req.headers.notes == null){
        res.status(400)
        res.send("Missing required values")
    }
    next()
}

module.exports = router;