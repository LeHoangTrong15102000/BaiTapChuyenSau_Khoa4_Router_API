// Viết những thay đổi của loadingPage vào đây
const stateDefault = {
    isLoading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = stateDefault, action) => {
  switch (action.type) {

    case 'DISPLAY_LOADING': {
        // Khi chưa xử lý API thì cho nó hiện thị ra
        state.isLoading = true;
        return {...state}
    }   

    case 'HIDE_LOADING': {
        // Khi xử lý xong thì cho nó là false -> tắt nó đi
        state.isLoading= false
        return {...state}
    }

  default:
    return state
  }
}
