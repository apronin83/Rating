var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArtifactSchema = new Schema({
    name: String,
    subartifacts: [{
        name: String,
        notes: [{
            pointName: String,
            pointCount: Number,
            pointDescription: String,
            pointUrl: String
        }],
    }]
});

var Artifact = mongoose.model("Artifact", ArtifactSchema);
module.exports = Artifact;
