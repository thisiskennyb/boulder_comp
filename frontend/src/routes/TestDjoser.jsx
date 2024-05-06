import { useParams } from "react-router-dom"
import whiteBoulder from "../assets/boulderWhite.png";


export default function TestDjoser() {

    let {uid} = useParams()
    let {token} = useParams()

    let imageUrl = ''

    console.log(uid, token)

    return (
        <div className="align-middle border-1">
        <h1 className="mt-9 border-1 text-xl align-middle">you suck</h1>
        <p>laskjdhflkasjdhflkajsdhfasdfasdf</p>
        <div class="flex justify-center items-center h-screen">
    <div class="relative w-36 h-36 border border-gray-300 rounded-full overflow-hidden">
        <img src={imageUrl ? imageUrl : whiteBoulder} alt="N/A" class="w-full h-full object-cover"></img>
        <div class="absolute bottom-3 right-3">
            <div class="w-8 h-8 bg-black rounded-full flex justify-center items-center cursor-pointer">
                <div class="text-white text-lg font-bold">+</div>
            </div>
        </div>
    </div>
</div>

        </div>
    )
}