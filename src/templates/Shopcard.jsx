import star from "../icons/star.svg"
import star_fill from "../icons/star_fill.svg"
import star_half from "../icons/star-half_2.svg"
import star_empty from "../icons/star.svg";
import { useNavigate } from "react-router-dom"

export default function Shopcard(props) {
    const history = useNavigate();

    const handleClick = () => {
        const { docid } = props.productData; // Extracting only the docid
        history("/shop_2", { state: { docid: docid } }); // Sending only the docid to /shop_2
    };

    return (
        <button onClick={handleClick} className="flex flex-col justify-start items-center w-full sm:w-52 h-auto sm:h-72 hover:bg-red-100 hover:shadow-md hover:shadow-black/50 active:bg-red-200 p-4">
            
            <img className="w-11/12 max-w-xs h-auto bg-white shadow-md shadow-black/50 border border-gray-700/50"  src={props.productData.thumbnailUrl} alt="" />
            
            <div className="flex gap-x-2 mt-2">
            {[...Array(5)].map((_, index) => {
                  if (index < Math.floor(props.productData.rating)) {
                    return <img key={index} className="w-5 h-5" src={star_fill} alt="" />;
                  } else if (index === Math.floor(props.productData.rating) && props.productData.rating % 1 !== 0) {
                    return <img key={index} className="w-5 h-5" src={star_half} alt="" />;
                  } else {
                    return <img key={index} className="w-5 h-5" src={star_empty} alt="" />;
                  }
                })}
            </div>

            <h1 className="ffont-Roboto font-normal text-sm sm:text-base mt-2">{props.productData.name}</h1>
            <h2 className="font-Roboto text-orange-900 font-normal text-sm sm:text-base">₱{props.productData.price}</h2>

        </button>
    )
}
