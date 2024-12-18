interface Modalprops{
    title: string,
    children: React.ReactNode,
    onClose?:()=> void;
}

const Popup = (props: Modalprops)=>{
    return (
    <div className="fixed top-0 left-0 flex justify-center bg-black bg-opacity-50 w-full h-full items-center">
        <div className="bg-gray-100 shadow-lg w-96 p-6 ">
            <div className="absolute right-0 top-0"><p >X</p></div>
            <h1 className="font-bold text-lg">{props.title}</h1>
            {props.children}
            
        </div>
    </div>
    );
}

export default Popup;