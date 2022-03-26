// ********************************** Bài học hướng dẫn chia Route cho page component
/** React-router-dom
 * Routing là gì
 *      - Rounting là cơ chế trong single page application giúp ta chuyển đổi qua lại giữa các component
 *      - Cơ chế routing là dùng để phân các component theo những cái đường dẫn để người dùng có thể đi vào nhiều page khác nhau của một App
 *      - Dùng Browser router từ React-router-dom để bao toàn bộ ứng dụng của chúng ta
 *      - Muốn ẩn cái page nào thì dùng route khi người dùng gõ đúng cái tên thì hiện cái page đó lên.
 *
 */
// Ví dụ trang web có 3 trang đó là trang chủ, trang chi tiết, trang sản phẩm

// *********************************************** Các component được load trên Route sẽ có thêm 3 thuộc tính props
/**
 * 3 Thuộc tính props đó chính là
 *      + history
 *      + match
 *      + location
 *
 *
 *  - Props history là gì
 *      + Giúp ta có thể di chuyển qua lại giữa các route. Bằng nhiều phương thức khác nhau như push hay goBack. Ngoài ra nó còn hỗ trợ ta lấy các giá trị tham số thông qua thuộc tính search
 *      + Lấy ví dụ để link qua 1 trang sau khi cần xử lý 1 cái gì đó, ta không dùng thẻ NavLink được vì khi bấm vào thẻ NavLink react sẽ tự động chuyển hướng đến liên kết route đó mà không thể chèn thêm bất kì xử lý gì
 *
 *      - Thì phương thức history sẽ cung cấp cho chúng ta một vài phương thức như : goBack, push, replace
 *          + Thì muốn đăng nhập xong qua một trang chỉ định thì dùng thuộc tính là push hoặc replace
 *
 *
 *
 *  - Props match là gì
 *      + Đối tượng Match cung cấp cho chúng ta một số thuộc tính hỗ trợ: path hiện tại, tham số được truyền qua url...(công việc chính là lấy tham số tại cái đường dẫn)
 *      + Ở đây chúng ta sẽ sử dụng thuộc tính params để thực hiện chức năng xem chi tiết khóa học
 *      + Thì props này được ứng dụng vào show chi tiết các phim ra ngoài
 *      + Thong thường thì trên trang Detail ko có nút click vào tại vì nó phải kèm theo id thì id thường sẽ đính kèm theo những cái item
 *
 *  - Props location là gì
 *      - Location cũng cung cấp cho chúng ta những thuộc tính như các thuộc tính đằng trước như là : hash, pathName, search, state
 *
 *
 *  - Props Redirect là gì
 *      - Component Redirect được cung cấp bởi react-router-dom hỗ trợ ta điều hướng từ path này sang path khác
 *      - Khi nội dung component gặp đối tượng component <Redirect/> thì sẽ chuyển hướng về path tương ứng.
 *      - Cái này thường hay gắn vào điều kiện if else khi mà ta Render ra
 *
 *
 *  - Props Promt là gì
 *      - Component  Promt cho phép người dùng xác định trạng thái cho phép người rời khỏi trang hay không. Nói chung là nó cảnh báo chúng ta là có muốn chuyển trang khác hay không
 *      -
 *      - Thuộc tính:
 *          + when: trả về giá trị true hộp thoại hiển thị lên ngược lại false không hiển thị
 *          + Message: hộp thoại chứa nội dung hiển thị
 *
 */

// *********************************************************** Sẽ tìm hiểu về phần kiến thức mới là dispatch cái action là function
/**
 * 1. Khi ta dispatch 1 action nhưng ta cần xử lý 1 công việc nào đó rồi mới đưa dữ liệu đó lên reducer thì ta sử dụng function
 * 2. Hoặc khi ta dispatch 1 action nhưng muốn kèm theo gọi logic các action khác. Ví dụ: dispatch chức năng thêm sinh viên đồng thời gọi lại logic của action get sinh viên thì ta sẽ dùng đến dispatch function
 *    + Redux không hỗ trợ chúng ta dispatch cái action trả về là một cái function
 *
 * - Redux thunk giúp chúng ta xử lý trước khi đưa nó lên Reducer
 */

// ************************************************************ Không nên dùng Jquery cho React
