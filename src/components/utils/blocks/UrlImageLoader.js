import ImageLoader from "./ImageLoader";
import styled from "styled-components";
import {COLORS as c} from "../../utils/styles/colors";

const EmptyImg = styled.div`
  width: ${props => `${props.w}px`};
  height: ${props => `${props.w}px`};

  border-radius: ${props => props.round};
  background-color: ${c.light_gray};
`;

function UrlImageLoader({w = 84, round = '8px', imgUrl}) {
    if (imgUrl === '' || imgUrl === undefined || imgUrl === null) {
        return (
            <EmptyImg w={w} round={round}/>
        );
    }
    return (
        <ImageLoader w={w} round={round} src={imgUrl}/>
    );
}

export default UrlImageLoader;