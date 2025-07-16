import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem('data')) {
            navigate('/login');
        }
    }, [navigate]);

    function registerUser(e: React.FormEvent) {
        e.preventDefault();
        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data.user);

            navigate('/login');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <article className="w-100% h-[100vh] flex items-center justify-center bg-black text-white text-center">
            <div className="content w-150 h-140 bg-white text-black rounded-2xl">
                <section className="title text-4xl font-sans font-bold text-center mt-20">SignIn</section>
                <section className="form">
                    <form className="flex flex-col items-center justify-center mt-10" onSubmit={registerUser}>
                        <input type="text" placeholder="Username" className="w-80 h-12 mb-4 p-2 border border-gray-300 rounded-2xl" value={name} onChange={e => setName(e.target.value)} />
                        <input type="email" placeholder="Email" className="w-80 h-12 mb-4 p-2 border border-gray-300 rounded-2xl" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="w-80 h-12 mb-4 p-2 border border-gray-300 rounded-2xl" value={password} onChange={e => setPassword(e.target.value)} />
                        <button type="submit" className="w-80 h-12 bg-blue-900 text-white rounded-2xl hover:bg-blue-700 ease duration-300">Register</button>
                    </form>
                </section>
                <Link to="/login" className="flex items-center w-70 mx-auto gap-2 mt-7">Already have an account? <span className="font-bold text-2xl hover:text-blue-950 duration-200">Login</span></Link>
            </div>
        </article>
    )
}

export default Register