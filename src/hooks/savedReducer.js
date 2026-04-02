function savedReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const incoming = action.payload
      if (!incoming || !incoming.code) return state

      const exists = state.some((item) => item.code === incoming.code)
      if (exists) return state

      return [...state, incoming]
    }

    case 'REMOVE': {
      const code = action.payload?.code
      if (!code) return state

      return state.filter((item) => item.code !== code)
    }

    default:
      return state
  }
}

export default savedReducer
