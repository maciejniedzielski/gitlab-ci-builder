import styled from "styled-components";
import { Box } from "grommet";
import { AppTheme } from "../context/ThemeContex";

const FormGroup = styled(Box)`
  background: ${(props) =>
    props.theme === AppTheme.LIGHT ? "#f7f7f7" : "#282828"};
  padding: 20px;
  border-radius: 4px;
`;

export default FormGroup;
