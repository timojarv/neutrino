import styled from 'styled-components';

const ActionGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin: ${props => (props.modal ? '1rem -1rem -1rem -1rem' : '1rem auto')};
`;

export default ActionGroup;
