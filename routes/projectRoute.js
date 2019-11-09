const express = require("express");
const db = require("../data/helpers/projectModel");

const router = express.Router();

router.get('/projects/:id', verifyID, (req, res) => {
    res.send(req.project);
    res.status(200)
});

router.get('/projects/:id/actions', verifyID, (req,res) => {
    db.getProjectActions(req.params.id)
    .then((actions) => {
        res.send(actions)
        res.status(200)
    })
    .catch((err) => {
        res.send("internal server err")
        res.status(500)
    })
})

router.post('/projects', verifyHeader, (req, res) => {
    let project = {
        name: req.headers.name,
        description: req.headers.description
    }
    db.insert(project)
        .catch((err) => {
            res.send("internal server error").status(500)
        })
        .then((project) => {
            res.send(project);
            res.status(200)
        })

})

router.put('/projects/:id', verifyHeader, verifyID, (req, res) => {
    let project = {
        name: req.headers.name,
        description: req.headers.description,
        completed: req.headers.completed
    }

    db.update(req.params.id, project)
        .catch((err) => {
            res.status(500)
            res.send("internal server err")
        })
        .then((project) => {
            res.status(200);
            res.send(project)
        })
})

router.delete('/projects/:id', verifyID, (req, res) => {
    db.remove(req.project.id)
        .catch((err) => {
            res.send("internal server error");
            res.status(500)
        })
        .then((deleted) => {
            res.send("project deleted");
            res.status(200);
        })
})

//custom middleware
function verifyID(req, res, next) {
    db.get(req.params.id)
        .catch((err) => {
            res.send("internal server error").status(500);
        })
        .then((project) => {
            if (project == null) {
                res.send("no project")
                res.status(404);
            }
            else {
                req.project = project
                next()
            }
        })
}

function verifyHeader(req, res, next) {
    if (req.headers.name == null || req.headers.description == null) {
        res.status(400)
        res.send("Missing required values")
    }
    else {
        next()
    }
}

module.exports = router;