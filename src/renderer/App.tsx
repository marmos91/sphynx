import React from 'react';
import styled from 'styled-components';

import {TestList} from './components/TestList';

export const Title = styled.h1``;

export function App()
{

    return (<>
        <Title>Sphynx</Title>
        <TestList />
    </>);
}
