// sessionStorage.removeItem('email');
// sessionStorage.removeItem('username');
// sessionStorage.removeItem('user_role');
// sessionStorage.removeItem('sheikh_id');
// sessionStorage.removeItem('admin_iid');
// sessionStorage.removeItem('admin_name');
// components/Logout.js
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Logout() {
  toast.error('Logout Successful')
  sessionStorage.clear()
  window.location.href = '/login'
}

export default Logout

// window.location.href = '/login'
