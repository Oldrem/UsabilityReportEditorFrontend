import { useSelector } from 'react-redux'
import '../styles/profile.css'

const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth)

    return (
        <div>
            <span>
                Welcome <strong>{userInfo?.username}!</strong> 
            </span>
        </div>
    )
}
export default ProfileScreen