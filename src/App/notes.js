import React from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage';
import styled, {css} from 'styled-components';

const MyButton = styled.div`
	color: green;
	${props => props.primary && css`
		color: palevioletred;
	`}
`

const TomatoButton = styled(MyButton)`
	color: tomato;
	border-color: tomato;
`;


function App() {
  return (
		<div>
			<WelcomeMessage/>
			<MyButton>Hello </MyButton>
			<MyButton primary>Hello </MyButton>
			<TomatoButton primary>Hello </TomatoButton>
		</div>
  );
}

export default App;
