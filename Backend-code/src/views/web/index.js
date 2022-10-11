import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'components/common';
import { Main, Buttons, Content } from './Styled';
const Web = () => {
	return (
		<Main>
			<Content>
				<Image url={'/assets/img/rotatingLogo.png'} />
				<Buttons>
					<Link
						to={'/admin/login'}
						className='mr-3 btn-shadow btn-multiple-state  btn btn-primary btn-lg'
					>
						Login
					</Link>
					<Link
						to={'/admin/signup'}
						className='btn-shadow btn-multiple-state  btn btn-primary btn-lg btn-signup'
					>
						Sign up
					</Link>
				</Buttons>
			</Content>
		</Main>
	);
};

export default Web;
