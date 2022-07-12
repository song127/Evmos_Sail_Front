// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import gtag from 'ga-gtag';
// //import ReactGA from "react-ga";
//
// const RouteChangeTraker = () => {
//     const location = useLocation();
//     const [initialized, setInitialized] = useState(false);
//
//     useEffect(()=> {
//         if (gtag) {
//             gtag('config', `${process.env.REACT_APP_GA_TRACKING_ID}`, {
//                 'page_title' : location.pathname + location.search,
//                 'page_path': location.pathname + location.search
//             });
//             //ReactGA.pageview(location.pathname + location.search);
//             console.log(location.pathname + location.search)
//         }
//     }, [gtag, initialized, location]);
//     return null;
// }
//
// export default RouteChangeTraker;