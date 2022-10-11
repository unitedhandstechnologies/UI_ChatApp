import styled from 'styled-components';

export const Main = styled.div`
	background: url('/assets/img/background_image.png');
	min-height: 100vh;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	& img {
		height: 700px;
		width: auto;
	}
`;
export const Content = styled.div`
	display: flex;
	flex-direction: column;
`;
export const Buttons = styled.div`
	text-align: center;
	text-transform: uppercase;
	margin-bottom: 12px;
	& .btn {
		width: 250px;
	}
	& .btn-signup {
		background-color: #0a2632;
		border-color: #0a2632;
	}
`;
