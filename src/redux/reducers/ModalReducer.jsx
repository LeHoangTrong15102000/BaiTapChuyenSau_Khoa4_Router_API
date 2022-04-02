// State mặc định chihs là nội dung mặc định của modal
import React from 'react'

const stateDefault = {

    // State này sẽ đóng là một component , tham số là một component và sẽ truyền nó vào component khác đó là component modal -> và sinh ra component mới logic của modal
    /**
     * => props.component
     * let modalComponent = function (props) {
     *      return  <div>
     *             <title />
     *             <props.component />
     * </div>
     * }
     * 
     * 
     * // Component nhận vào một component và sinh ra một component mới (sinh ra component mới là component logic của modal và component nhận vào) thì đó gọi là HOC
     * // Component bọc một cái component và component tham số truyền vào -> để sinh ra component chứa logic của modal và chứa nội dung của tham số đó chính là component truyền vào(props component truyền vào)
     */
    Component: <p>Nội dung mặc định</p>,// Mỗi lần nhấn nút thì nó sẽ dispatch lên đây, thì thằng Modal nó sẽ load lại 
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = stateDefault, action) => {// export Default thì đặt tên gì cũng được
  switch (action.type) {

case 'OPEN_FORM': {
    // Cập nhật lại cái form ứng với nút nhấn vào form đó là gì
    state.Component = action.Component

    // Cập nhật lại cái state
    return {...state}
}

  default:
    return state
  }
}
