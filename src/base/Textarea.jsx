import styled from 'styled-components';

const Textarea = styled.textarea`
    margin: 0;
    line-height: 1.5;
    max-height: 80vh;
    overflow: auto;
    width: 800px;
    height: 500px;
    border-radius: 0.25rem;
    resize: vertical;
    padding: 4px;
    border: 1px solid #dee2e6;
    font-family: monospace;
`;

export default Textarea;
