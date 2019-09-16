import React from 'react';
import styled from 'styled-components'
import {DeletableTile} from '../Shared/Tile';

export const CoinHeaderGridStyled = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

export const CoinSymbol = styled.div`
	justify-self: right;
`

const DeleteIcon = styled.div`
	justify-self: right;
	display:none;
	${DeletableTile}:hover & {
		display: block;
		color: red;
	}
`
// when we hover over the parent DeletableTile class container 
//... do the hover effect that is described in "& {}" after ":hover"
//with & representing this styled div


export default function({name, symbol, topSection}) {
	return <CoinHeaderGridStyled>
		<div>{name}</div>
		{topSection ? (
			<DeleteIcon>X</DeleteIcon>
		) :
		<CoinSymbol>{symbol}</CoinSymbol>
		}
	</CoinHeaderGridStyled>
}