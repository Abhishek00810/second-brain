function Signup()
{
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <form className="flex flex-col bg-white p-8 rounded">
            <h1 className="mb-6 text-center">Signup</h1>
            <input className= "rounded outline-none mb-6 border-gray-300 px-2 border-2" placeholder="Enter your email"></input>
            <input className="rounded outline-none mb-6 border-gray-300 px-2 border-2" placeholder="Enter your password"></input>
            <button className="bg-[#645CB8] text-white rounded">Signup</button>
            </form>
    </div>
    );
}

export default Signup;