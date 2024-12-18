interface TagProps
{
    title: string
}

function Tags(props:TagProps)
{
    return (
        <div className="bg-blue-100 rounded-full px-2 text-xs w-auto mt-6 inline-block mr-4">
        <h1 className="text-blue-800">{props.title}</h1>
    </div>
    )
}

export default Tags;