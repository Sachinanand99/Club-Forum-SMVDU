const Comment = require("../models/comment");

module.exports.createComment = async (req, res) => {
    const newComment = new Comment();
    newComment.comment = req.body.comment;
    newComment.author = req.user._id;
    await newComment.save();
    req.flash("success", "Comment added!");
    res.redirect(`/clubs/${req.params.id}/listings/${req.params.id2}`);
}