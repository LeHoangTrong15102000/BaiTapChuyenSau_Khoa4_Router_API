// Saga sẽ có 1 nơi quản lý tất cả các action (action là function tương tự redux thunk) gọi là root saga
// Saga rất khó trong việc chia file và quản lí file action
/**
 *  Các thư viện dùng để phản hồi action khi action được dispatch là
 *      + fork: sử dụng cơ chế non-blocking được gọi trên function, thường dùng để gọi các hàm theo dõi action saga
 *      + take: hàm đó sẽ được kích hoạt khi 1 action saga được dispatch(blocking thực thi tuần tự).
 *      + takeEvery:  Tương tự take theo dõi 1 action nào đó thay đổi thì gọi 1 saga nào đó
 *      + takeLastest: thực thi 1 loạt action và kết quả trả về là action cuối
 *      + Yield(): Có nghĩa là chạy tuần tự khi nào trả ra kết quả thì mới thực thi tiếp.
 *      + Select(): Chạy một selector function để lấy data từ state
 *      + All(): Gọi nhiều saga chạy cùng lúc
 */

// *********************************************** Khái niệm về Generator function
/**
 * Generator function là một hàm có thể thoát và sau đó gọi lại lần nữa. Giá trị của biến trong các lần gọi được lưu lại trong các lần gọi tiếp theo. Gọi một Generator function không thực thi các lệnh bên trong hàm ngay lập tức. Thay vào đó, một object iterator được trả về.
 *      + Iterator có 2 thuộc tính
 *          - done: mang giá trị true hoặc false cho biết function generator chạy xong chưa
 *          - next():  trả về các giá trình sau lệnh yield tương ứng
 *              Note: khác với async await iterator function trả về kết quẳ cụ thể sau mỗi lần gọi next, và không phải là một phương thức bất đồng bộ.
 *                   Còn async function là function bất đồng bộ khi gọi phải dùng await để lấy giá trị.
 *                  -> Về ý nghĩa thì generator function cũng giống như async await function dùng để xử lý các hàm bất đồng bộ, khác ở chỗ là ta có thể lấy được nhiều giá trị tuần tự sau từng lần gọi hàm. Thường được dùng để xử lý trong các hàm logic của Redux saga.
 */

// ************************************************ Redux sagas
// Nó sẽ tách ra action bình thường và action sagas(là những action dispatch lên Reducer 1 cái function)
// Thì những action nào liên quan đến function thì được khai báo trong Saga, còn những action bình thường thì được khai báo trong actions bình thường của Redux