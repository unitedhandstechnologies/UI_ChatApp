import styled from 'styled-components';

export const InputDiv = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 15px;
	background: #e9e9e9;
	height: 45px;
	border: 2px solid;
	border-color: ${({ isError }) => (isError ? 'red' : '#e9e9e9')} !important;
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	.vl {
		border-right: 1.2px solid #ff5900;
		height: 25px;
	}
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		width: 61px;
		& img {
			height: 14px;
			width: 18px;
		}
	}
	.icon:after {
		height: 50%;
	}
	& input {
		width: 98%;
		padding: 10px;
		outline: none !important;
		background: #e9e9e9;
		border-radius: 50px;
		border: none;
		color: black;
		height: ${({ isError }) => (isError ? '42px' : '45px')} !important;
	}
	& input::-ms-input-placeholder {
		color: black;
		font-size: 14px;
	}
	& input:-ms-input-placeholder {
		color: black;
		font-size: 14px;
	}
	& input::placeholder {
		color: black;
		font-size: 14px;
	}
	& .error {
		color: red;
	}
`;
