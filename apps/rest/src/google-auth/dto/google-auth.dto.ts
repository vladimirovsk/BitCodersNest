import { User } from '../../users/user.model';

export class GoogleAuthDto {
	accessTokenCookie: string;
	refreshTokenCookie: string;
	user: User;
}