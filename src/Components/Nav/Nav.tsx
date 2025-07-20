import { Link } from "react-router-dom"

function Nav() {
    return (
        <nav className="pt-10 flex justify-between w-[100%] items-center">
            <div className="logo">
                <img src="/images/logo.svg" alt="" className="w-35"/>
            </div>
            <div className="search-bar">
                <input type="text" name="search" id="search" className="w-200 h-10 bg-none border-1 border-white text-white rounded-[24px] outline-none px-5" placeholder="Found answer to your issue"/>
            </div>
            <div className="buttons w-150 flex flex-row-reverse gap-20 font-normal text-xl">
                <Link to="/profile">
                    <img src="/images/profile.svg" alt="" />
                </Link>
                <Link to="/ask-a-question" className="text-white">
                    Ask a question
                </Link>
                <Link to="/tasks" className="text-white">
                    Tasks
                </Link>
            </div>
        </nav>
    )
}

export default Nav