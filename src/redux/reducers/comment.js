const initialState = [
  { 
    commentId : 1,
    boardId :1,
    userEamil : "hjseong1222@naver.com",
    text : "반갑습니다"
  }
]

let commentId = 2;

function comments (state = initialState, action) {
  switch (action.type) {
    case "ADD_COMMENT":
      const newComment = {...action.payload, commentId: commentId}
      commentId++;
      return state.concat(newComment)
    default:
      return state;
  }
}

export const addComment = (comment) => ({type: "ADD_COMMENT", payload: comment})

export default comments;