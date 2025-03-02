import { PASSWORD_PATTERN, PASSWORD_PATTERN_CONTAIN_SEQUENCES } from '@/config/constants';
import * as yup from 'yup';

export const schemaRegisterForm  = yup.object().shape({
	email: yup.string().email('Invalid email format. Please try again.').required('This field is required.'),
	password: yup
		.string()
		.required('This field is required.')
		.matches(
			PASSWORD_PATTERN,
			'Must be 8-40 characters long, including letters and numbers without case sensitivity.'
		)
		.matches(
			PASSWORD_PATTERN_CONTAIN_SEQUENCES,
			'Passwords cannot contain sequences of 3 or more consecutive numbers or characters.'
		),
		date: yup
		.string()
		.required('This field is required.'),
		friend: yup
		.string()
		.required('This field is required.')
});