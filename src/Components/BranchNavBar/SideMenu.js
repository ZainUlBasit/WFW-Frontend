import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBarData from "./SideBarData"
import { Link } from 'react-router-dom'



const SideMenu = () => {
  return (
    <div className='relative w-[100%] flex flex-col items-center justify-start m-[0px] p-[0px] bg-white list-none'>
        {
            SideBarData.map(item =>
                <li key={item.key} className="w-[100%] flex flex-col items-center justify-center text-center cursor-pointer font-bold h-[14vh] list-none">
                    <Link 
                        to={item.path} 
                        className="flex flex-col justify-center items-center text-[#5A4AE3] w-full hover:bg-[#5A4AE3] hover:text-[white] h-[14vh]"
                    >
                        <FontAwesomeIcon 
                            icon={item.icon} 
                            style={{fontSize : "30px", paddingBottom: "3px"}} 
                        />
                        {item.title}
                    </Link>
                </li>
            )
        }
    </div>
  )
}

export default SideMenu