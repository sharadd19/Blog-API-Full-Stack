import { useNavigate } from "react-router-dom"
import styles from "../SignUp/SignUp.module.css"
export default function SignUp() {
const navigate = useNavigate();
    return (
        <>
        <h1>Create your account!</h1>
        <button className={styles.back} onClick={() => navigate(-1)}>
      Go Back
    </button>
        </>
    )
}

