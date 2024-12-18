interface buttonprops{
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: React.ElementType,
    lastIcon?: any,
    type?:string,
    onClick?:()=>void
}

const ButtonVariants = {
    "primary": "bg-[#645CB8]",
    "secondary": "bg-[#D7D9E5]"
}

const sizeVariants = {
    "sm": "px-2 text-sm",
    "md": "px-4 text-base",
    "lg": "px-8 text-xl"
}

const defaultButton = "rounded-md py-2"

export const Button = (props: buttonprops)=>{
    return (
        <button type="submit" onClick={props.onClick} className={`flex items-center ${ButtonVariants[props.variant]} ${sizeVariants[props.size]}  ${defaultButton}`}
        >
        {props.startIcon ? <div className="mr-2">{<props.startIcon />}</div>:null} 
            {props.text}</button>
    )
}