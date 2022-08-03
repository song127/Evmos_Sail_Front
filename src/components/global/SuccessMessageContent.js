// import {useNavigate} from "react-router-dom";
// import {ToastOptions} from "../../pages/home/short_selling";
// import ConfirmBtn from "./ConfirmBtn";
// import SizeBox from "../utils/blocks/SizeBox";
//
// function SuccessMessageContent({type, link, close}) {
//     const navigator = useNavigate();
//     return (
//         <div className={'f-row a-center j-center'}
//              style={{wordWrap: 'break-word'}}>
//             {ToastOptions[type].content}
//
//             <SizeBox w={20}/>
//             <ConfirmBtn content={ToastOptions[type].name}
//                         onClick={() => {
//                             if (link) {
//                                 navigator(link);
//                             } else {
//                                 close(false);
//                             }
//                         }}/>
//         </div>
//     );
// }
//
// export default SuccessMessageContent;