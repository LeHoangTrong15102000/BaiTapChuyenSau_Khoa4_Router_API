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
 */
