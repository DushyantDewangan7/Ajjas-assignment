import React, { useState } from "react";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Matt",
      time: "Today at 5:42PM",
      text: "How artistic!",
      avatar: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
      replies: [],
    },
    {
      id: 2,
      name: "Elliot Fu",
      time: "Yesterday at 12:30AM",
      text: "This has been very useful for my research. Thanks as well!",
      avatar: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
      replies: [
        {
          id: 201,
          name: "Jenny Hess",
          time: "Just now",
          text: "Elliot you are always so right :)",
          avatar: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleClick1 = () => setCounter(counter + 1);
  const handleClick2 = () => setCounter(counter - 1);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: Date.now(),
      name: "New User",
      time: "Just now",
      text: newComment,
      avatar: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
      replies: [],
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    if (replyText.trim() === "") return;
    

    const newReply = {
      id: Date.now(),
      name: "New Replier",
      time: "Just now",
      text: replyText,
      avatar: "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );

    setReplyText("");
    setReplyingTo(null);
  };

  const handleDeleteComment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmed) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Click Here
      </button>

      <div className="mt-8 bg-white shadow-md rounded p-6">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Comments</h3>

        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 mb-6">
            <img
              src={comment.avatar}
              alt={comment.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm font-bold">{comment.name}</div>
                  <div className="text-xs text-gray-500 mb-1">
                    {comment.time}
                  </div>
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
                  onClick={handleClick1}
                  className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
                >
                  ⬆
                </button>
                <button
                  onClick={handleClick2}
                  className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
                >
                  ⬇
                </button>
                <span className="ml-2 text-black">Votes: {counter}</span>
              </div>

              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-6 border-l-2 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3 mb-3">
                      <img
                        src={reply.avatar}
                        alt={reply.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-bold">{reply.name}</div>
                        <div className="text-xs text-gray-500 mb-1">
                          {reply.time}
                        </div>
                        <p className="mb-1">{reply.text}</p>
                        <div className="text-sm text-blue-600 hover:underline">
                          Reply
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {replyingTo === comment.id && (
                <form
                  onSubmit={(e) => handleReplySubmit(e, comment.id)}
                  className="mt-4"
                >
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
        ))}

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
