/**
 * Deleted task sẽ truyền thông qua URL,
 */

// useEffect thì nó có 3 trạng thái ko có tham số thứ 2 có tham số thứ 2 là mảng rỗng, có tham số thứ 2 là mảng có giá trị thay đổi sau mỗi lần render
/**
 *      - tham số thứ 2 không có : thì được thực thi sau mỗi lần render
 *      - tham số thứ 2 là mảng rỗng: thì chạy 1 lần duy nhất tương ứng với didMount, nếu có return trả về cái gì đó thì nó sẽ thực hiện cuối cùng thay cho willUnmount
 *      - tham số thứ 2 là mảng có giá trị thay đổi, tương ứng với DidUpdate trong lifecycle
 */

// ********************************************************** Bài hôm sau thực hiện todoList với Redux

// ************************************************************ Tuy nhiên để dispatch một cái function (xử lý 1 cái gì đó trước sau đó mới dispatch lên Reducer) nó thuộc về kiến thức cho nên ta sẽ tìm hiểu về kiến thức này

// ************************************************************** Ở video sau sẽ học về câu lệnh async await và try catch
/**
 * Tóm lại có 2 loại action
 *    + Action thực thi ngay làm thay đổi Reducer
 *    + Action phải thực hiện xử lý rồi mới gọi action 1 thực thi (async action) -> những action thường hay gọi API vì là action bất đồng bộ (vì kết quả trả về có thể là thành công hay thất bại nên sẽ là mất thời gian)
 *        - Đối với action async thi cần phải cài đặt thư viện Redux Thunk
 *
 *  - thì ở ES6 người ta cho chúng ta sử dụng cú pháp async await (deplay lại rồi mới thực thi)
 *      + Ưu điểm của async await là nó sẽ deplay lại và đảm code của chúng ta chạy đúng trình tự
 *      + Nhược điểm của nó là sẽ làm chương trình của chúng ta chạy chậm hơn
 */
