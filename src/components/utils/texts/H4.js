import styled from "styled-components";
import {COLORS as c} from "../../../styles/colors";

const Container = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  text-align: ${props => props.align};

  color: ${props => props.color};
`;

function H4({color = c.black, align = 'center', ...props}) {
    return (<Container color={color} align={align}>
        {props.children}
    </Container>);
}

export default H4;