// import styled from 'styled-components';
// import {COLORS as c} from "../../styles/colors";
// import {ContentLoaded} from "../utils/actions/ContentLoaded";
// import {ReactComponent as Check} from "../../assets/icons/icon-toast-check.svg";
// import {ReactComponent as Warning} from "../../assets/icons/icon-warning.svg";
// import SizeBox from "../utils/blocks/SizeBox";
//
// const Container = styled.div`
//   position: fixed;
//   z-index: 1300;
//
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//
//   width: 100%;
//   height: max-content;
//
//   left: 0;
//   top: 120px;
// `;
//
// const BackBoard = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: start;
//   justify-content: start;
//
//   width: 540px;
//   height: max-content;
//   border: 1px solid ${props => props.color};
//   border-radius: 16px;
//   background-color: ${props => props.back};
//   padding: 16px;
//   box-sizing: border-box;
//
//   color: ${p => p.color};
//
//   animation: ${ContentLoaded} 0.6s;
//   animation-fill-mode: forwards;
// `;
//
// export const MESSAGE_TYPES = {
//     ERROR: 0,
//     COMPLETE: 1,
//     NOTICE: 2,
// }
//
// const messageBorderColors = [
//     c.red,
//     c.green,
//     c.blue_3,
// ];
//
// const messageBackColors = [
//     '#FFF8F8', // ERROR
//     '#FCFFFB', // COMPLETE
//     'rgba(68, 61, 246, 0.02)', // NOTICE
// ];
//
// function ToastMessage({
//                           type = MESSAGE_TYPES.COMPLETE,
//                           ...props
//                       }) {
//     return (
//         <Container {...props}>
//             <BackBoard color={messageBorderColors[type]}
//                        back={messageBackColors[type]}>
//                 {type === MESSAGE_TYPES.COMPLETE ? <SizeBox w={20}><Check/></SizeBox> : null}
//                 {type === MESSAGE_TYPES.ERROR ? <Warning/> : null}
//                 <SizeBox w={15}/>
//                 <div className={'f-row a-center j-start'}>
//                     {props.children}
//                 </div>
//             </BackBoard>
//         </Container>
//     );
// }
//
// export default ToastMessage;