import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
	display: grid;
	grid-template-columns: 180px auto 100px 100px;
`
//auto takes up remaining space between the 180px and the 100px

export default function() {
	return <Bar>
		<div> CryptoDash </div>
		<div/>
		<div> Dashboard </div>
		<div> Settings </div>
	</Bar>
}