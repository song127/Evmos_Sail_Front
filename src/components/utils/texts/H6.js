import styled from "styled-components";
import {COLORS as c} from "../../../styles/colors";

const Container = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: ${props => props.align};

  color: ${props => props.color};
`;

function H5({color = c.black, align = 'center', ...props}) {
    return (<Container color={color} align={align}>
        {props.children}
    </Container>);
}

export default H5;