import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function loginUser(e: React.FormEvent) {
        e.preventDefault();
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (!data.token) {
                return alert('Invalid email or password');
                
            }
            localStorage.setItem('data', JSON.stringify(data));
            localStorage.setItem('token', data.token); 
            window.location.href = '/'
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            window.location.href = '/';
        }
    }, []);

    return (
        <article className="w-100% h-[100vh] flex items-center justify-center bg-black text-white text-center">
            <div className="content content w-150 h-120 bg-white text-black rounded-2xl">
                <section className="title text-4xl font-sans font-bold text-center mt-20">SignIn</section>
                <section className="form">
                    <form className="flex flex-col items-center justify-center mt-10" onSubmit={loginUser}>
                        <input type="email" placeholder="Email" className="w-80 h-12 mb-4 p-2 border border-gray-300 rounded-2xl"  onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" className="w-80 h-12 mb-4 p-2 border border-gray-300 rounded-2xl" onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit" className="w-80 h-12 bg-blue-900 text-white rounded-2xl hover:bg-blue-700 ease duration-300">Login</button>
                    </form>
                </section>
                <Link to="/register" className="flex items-center w-80 mx-auto gap-2 mt-7">Doesn't have an account? <span className="font-bold text-2xl hover:text-blue-950 duration-200">Register</span></Link>
            </div>
        </article>
    )
}

export default Login