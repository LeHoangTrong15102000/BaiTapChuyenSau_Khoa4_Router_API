// chứa các component nâng cao trong trang web của chúng ta
// HOC - Higher Order Component
/**
 * Higher order component(HOC) là một kĩ thuật nâng cáo trong react được sử dụng trong việc sử dụng lại các components. HOCS không là một phần trong React Api. Một cách cụ thể, một higher-order component là một hàm và nó nhận đối số là một component và trả về một component mới
 * - Higher order component là một pattern tuyệt vời và nó được chứng minh trong nhiều thư viện react ví dụ như Redux(Thư viện được sử dụng để quản lí state) hay React-DnD(là một thư viện về drag và drop, nó khá khó hiểu cho người mới bắt đầu).
 */

// *********************************************************** HOC qua modal-Popup
// học qua ví dụ
/**
 * Quản lí nội dung thay đổi , ở giữa không phải là một cái object một cái mảng nữa mà là một modal
 * Thì cái nội dung của mính chính là phần thay đổi
 * // Thường trong công ty người ta thường thích tái sử dụng ở dạng copy hơn là định nghĩa HOC cho project
 *
 *
 * - Do
 *      + Nhấn vào nút đăng nhập thì sẽ hiển thị ra form đăng nhập
 *      + Nhấn vào nút đăng ký thì sẽ hiển thị ra form đăng ký
 *
 *  HOC -> kiến trúc tái sử dụng lại cái logic nào đó về mặt giao diện
 * // Việc tái sử dụng lại logic cấu trúc -> thì phải nghĩ ngay đến High Order Component
 *
 * // Nếu sau này viết về nội dung kéo thả (nội dung kéo thả bên trong là khác nhau ) thì nghĩ ngay đến việc sử dụng HOC
 */

// ************************************************************ HOC qua ví dụ slide down-content
// Có thể ứng dụng cho trang đăng kí những cái high order component như animation trượt
// Sử dụng dưới dạng thẻ  thì phải sử dụng function , còn bình thường thì phải binding nó ra 
/**
 * Nơi định nghĩa nếu chỉ là JSX thì chỉ cần binding ra là được
 * Còn nơi định nghĩa là một function thì phải trả về một JSX   
 */

// ********************************************************** Ứng dụng template React
