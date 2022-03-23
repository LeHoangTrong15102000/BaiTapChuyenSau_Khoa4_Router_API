import React, {useState} from 'react'

const Login = (props) => {
    // giá trị ban đầu của userLogin là userName: '', passWord: ''
    const [userLogin, setUserLogin] = useState({userName: '', passWord: ''})


    // Định nghĩa hàm handleChange
    const handleChange = (event) => {
        let {value , name} = event.target   
        // Mỗi lần thay đổi mình sẽ sétUserLogin lại cho nó
        setUserLogin({
            ...userLogin,
            [name]: value
        })
    }
  return (
    <form className="container">
        <h3 className="display-4 text-info">Login</h3>
        <div className="form-group">
            <p>UserName</p>
            <input className="form-control" name="userName" onChange={handleChange} />
        </div>

        <div className="form-group">
            <p>PassWord</p>
            <input className="form-control" name="passWord"  onChange={handleChange} />
        </div>

        <div className="form-group">
            <button className="btn btn-success">Đăng nhập</button>
        </div>
    </form>
  )
}

export default Login