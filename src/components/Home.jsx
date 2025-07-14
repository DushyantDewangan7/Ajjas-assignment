import React, { useState } from "react";

const Home = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Matt",
      time: "Today at 5:42PM",
      text: "How artistic!",
      avatar: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
      votes: 0,
      replies: [
        {
          id: 101,
          name: "User 101",
          time: "Today at 5:43PM",
          text: "Hey, I am fine, wau?",
          avatar: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
          votes: 0,
          replies: [
            {
              id: 102,
              name: "User 102",
              time: "Today at 5:44PM",
              text: "Hello, I am food, How are you?",
              avatar: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
              votes: 0,
              replies: [
                {
                  id: 103,
                  name: "User 103",
                  time: "Today at 5:45PM",
                  text: "Life sucks man!",
                  avatar: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
                  votes: 0,
                  replies: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Elliot Fu",
      time: "Yesterday at 12:30AM",
      text: "This has been very useful for my research. Thanks as well!",
      avatar: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
      votes: 0,
      replies: [
        {
          id: 201,
          name: "Jenny Hess",
          time: "Just now",
          text: "Elliot you are always so right :)",
          avatar: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
          votes: 0,
          replies: []
        }
      ]
    }
  ]);
  //use to store list of all components
  // comment can have nested replies
  const [newComment, setNewComment] = useState("");
  //this store what usertype into add comment 
  const [replyingTo, setReplyingTo] = useState(null); //  reply target ID
  // it store the id of the comment
  const [replyText, setReplyText] = useState("");

  //this run when user submit comment form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: Date.now(),
      name: "New User",
      time: "Just now",
      text: newComment,
      avatar: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
      votes: 0,
      replies: [],
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  // recursively adding comments
  const addReplyRecursive = (items, commentId, replyObj) => {
    return items.map((item) => {
      if (item.id === commentId) {
        return { ...item, replies: [...item.replies, replyObj] };
      } else if (item.replies.length > 0) {
        return { ...item, replies: addReplyRecursive(item.replies, commentId, replyObj) };
      }
      return item;
    });
  };
  //when user submit a reply create a new object
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() === "") return;

    const newReply = {
      id: Date.now(),
      name: "New Replier",
      time: "Just now",
      text: replyText,
      avatar: "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
      votes: 0,
      replies: [],
    };

    setComments((prev) => addReplyRecursive(prev, replyingTo, newReply));
    setReplyText("");
    setReplyingTo(null);
  };

  //deleting comment or reply by id
  const handleDeleteComment = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmed) return;

    const deleteRecursive = (items) =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          replies: deleteRecursive(item.replies || []),
        }));

    setComments(deleteRecursive(comments));
  };
  // these functions use ro upvote and down vote
  const handleUpvote = (id) => {
    const voteRecursive = (items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, votes: item.votes + 1 }
          : { ...item, replies: voteRecursive(item.replies || []) }
      );

    setComments(voteRecursive(comments));
  };

  const handleDownvote = (id) => {
    const voteRecursive = (items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, votes: item.votes - 1 }
          : { ...item, replies: voteRecursive(item.replies || []) }
      );

    setComments(voteRecursive(comments));
  };

  // Recursive rendering of comments and replies
  const renderComments = (items, level = 0) => {
    return items.map((comment) => (
      <div key={comment.id} className={`ml-${level * 4} mt-4 border-l-2 pl-4`}>
        <div className="flex gap-4 mb-2">
          <img
            src={comment.avatar}
            alt={comment.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <div className="text-sm font-bold">{comment.name}</div>
                <div className="text-xs text-gray-500 mb-1">{comment.time}</div>
              </div>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-500 text-xs hover:underline"
              >
                Delete
              </button>
            </div>

            <p className="mb-2">{comment.text}</p>
            <div className="flex gap-3 items-center text-sm text-blue-600">
              <button
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
                className="hover:underline"
              >
                Reply
              </button>
              <button
                onClick={() => handleUpvote(comment.id)}
                className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
              >
                ⬆
              </button>
              <button
                onClick={() => handleDownvote(comment.id)}
                className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
              >
                ⬇
              </button>
              <span className="ml-2 text-black">Votes: {comment.votes}</span>
            </div>

            {replyingTo === comment.id && (
              <form onSubmit={handleReplySubmit} className="mt-2">
                <textarea
                  rows="2"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Add Reply
                </button>
              </form>
            )}
          </div>
        </div>

        {comment.replies && comment.replies.length > 0 &&
          renderComments(comment.replies, level + 1)}
      </div>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="mt-8 bg-white shadow-md rounded p-6">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Comments</h3>

        {renderComments(comments)}

        {/* comment form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            rows="3"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
