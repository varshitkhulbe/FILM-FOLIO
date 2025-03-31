import { Link, useNavigate } from "react-router-dom";
import notfound from "/404.gif"
const Notfound = () => {
    const navigate = useNavigate();
  return (
    <div className='absolute top-0 left-0 h-screen w-screen bg-black flex items-center justify-center'>
        <Link
        onClick={() => navigate(-1)}
        className="absolute top-[5%] right-[5%] text-3xl text-white hover:text-[#6556CD] ri-close-fill"
      ></Link>
        <img className='h-[100%] object-cover' src={notfound}></img>
        </div>
  )
}

export default Notfound;