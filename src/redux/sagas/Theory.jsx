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
 *      + Call(): Thực hiện hàm gọi api ->trả về promise và blocking(sẽ không thực hiện những thằng sau nếu mà nó chưa hoàn tất)
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

// *****************************************************
/**
 * Trong Saga thì nó sẽ có một số phương thức theo dõi action
 * Dùng saga kết nối với API lấy 1 vài thứ cần thiết về`
 */

// ******************************************************* takeEvery takeLatest
/**
 * Cung cấp cho chúng ta phương thức delay() để trì hoãn action được thực thi
 * TakeLastest sẽ lấy cái dispatch cuối cùng mà chúng ta dispatch lên reducer
 *
 * Bây giờ sẽ dùng cái action này để lấy taskList từ APi về và hiển thị lên giao diện thì sẽ làm như thế nào
 * Trong Redux Saga cung cấp cho chúng ta thêm thằng call() để thực hiện gọi API từ serve về
 */
// Phải thực hành đi thưc hành lại thì chúng ta mới có thể nhớ được

// ***************************************************** Tổ chức lại saga cho hợp lí với các nghiệp vụ của hệ thống
// Actions thường và actions saga sẽ phân file riêng và đặt tên riêng
/**
 * Hướng dẫn tối ưu thêm nữa, và những cái tham số set cứng, những tham số do backEnd qua định thì thông thường những thông số do backEnd quy định để config hệ thống
 * Chúng ta không đặt chung ở actions của saga, lỡ mà thằng backEnd nó thay đổi domain
 * Thì ở đây chung ta sẽ tạo ra 1 file là constans trong folder utils đặt tên là DOMAIN(quẳn lí những tham số của hệ thống) trong constants sẽ quản lí những tham số dùng chung
 */
/**
 * Trong folder service quản lí nhứng cái API, folder service là nơi tương tác với backEnd
 * Thay vì set cứng hàm gọi API bên trong action của saga thì chúng ta sẽ viêt nó thành cái hàm ở folder service để gọi nó qua lại action của saga
 */

// ***************************************************** Thực hiện chức năng loading cho web của chúng ta
/**
 * Khi chúng ta lấy data về thì nó mới bắt đầu hiển thị
 * Tạo cho nó 1 cái state để quản lí trạng thái của nó
 *
 * Study:
 *  + Khi bắt đầu lấy data về thì nó mới hiển thị , khi data load về xong thì nó sẽ tắt đi
 *  + Dùng redux saga để quản lí trạng thái loading của dữ liệu LoadingComponent
 *  + Trước khi nó vào saga thì nó phải tải dữ liệu từ phía backEnd về
 *      - Dùng put() để dispatch cái loading
 */

// ********************************************************* Thực hiện các tính năng thêm task và chỉnh sửa task trong Redux saga.
/**
 * + actions addTask:
 *    -
 * + actions
 */

// ********************************************** Nên đi từ file service kết nối với APi rồi đi vào các file của saga để xử lý
// Sau  đó đưa vào rootSaga
