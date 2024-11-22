const Comment = require("../models/comment");

module.exports.createComment = async (req, res) => {
  const newComment = new Comment();
  newComment.comment = req.body.comment;
  newComment.author = req.user._id;
  newComment.listingId = req.params.id2;
  await newComment.save();
  req.flash("success", "Comment added!");
  res.redirect(`/clubs/${req.params.id}/listings/${req.params.id2}`);
};

module.exports.replyComment = async (req, res) => {
  try {
      const comment = await Comment.findById(req.params.id3);
    const newReply = new Comment({ comment: req.body.reply, author: req.user._id });
    comment.replies.push(newReply);
    await newReply.save();
      await comment.save();
  req.flash("success", "Comment added!");
  res.redirect(`/clubs/${req.params.id}/listings/${req.params.id2}`);
  } catch (err) {
    console.error(err);
  }
};
