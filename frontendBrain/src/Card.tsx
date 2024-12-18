import Tags from "./Tags"


interface Cardprops
{
    title: string,
    type: "Youtube" | "Twitter" | undefined | null,
    link: string
}
const [Twitterlink, setTwitterLink] = ("https://twitter.com/username/status/807811447862468608")

export const Card = (props:Cardprops)=>
{

    return (
        <div className="bg-white w-72 p-4 rounded-xl h-fit">
            <h1 className="mb-8 font-bold">Productivity Tips</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum magnam 
                qui illo laboriosam, magni eveniet maiores voluptatibus</p>

            {props.type==="Youtube" && <iframe className="rounded-xl shadow-lg max-w-full p-2 h-auto" width="100%" height="315" src="https://www.youtube.com/embed/KYEPvfPqmdE?si=zzf0KIzrbFLM5Rmf"
                  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
                   clipboard-write; encrypted-media; gyroscope;
                   picture-in-picture; web-share"
                 referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}   

            {props.type === "Twitter" &&   <blockquote className="twitter-tweet">
  <a href="https://twitter.com/idrgafwhatever/status/1868906626985738318"></a> 
</blockquote>}

            <Tags title="#productivty"></Tags>
            <Tags title="#music"></Tags>
            <Tags title="#art"></Tags>
            <Tags title="#twitter"></Tags>
        </div>
    );
}

export default Card;