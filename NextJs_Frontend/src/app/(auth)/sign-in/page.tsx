'use client';
import FooterLink from '@/components/forms/FooterLink';
import InputField from '@/components/forms/InputField';
import { useForm } from 'react-hook-form';

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onBlur',
	});
	const onSubmit = async (data: SignInFormData) => {
		try {
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<h1 className='form-title'>
				Welcome back! Please sign in to your account.
			</h1>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<InputField
					register={register}
					name='email'
					label='Email'
					type='email'
					placeholder='linh@gmail.com'
					error={errors.email}
					validation={{
						required: 'Email is required',
						pattern: /^\S+@\S+$/i,
						message: 'Invalid email address',
					}}
				/>
				<InputField
					register={register}
					placeholder='Including special characters'
					name='password'
					label='Password'
					type='password'
					error={errors.password}
					validation={{
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters',
						},
					}}
				/>
				<button
					type='submit'
					disabled={isSubmitting}
					className='yellow-btn w-full mt-5'>
					{isSubmitting ? 'Signing In...' : 'Sign In'}
				</button>
				<FooterLink text="Don't have an account?" linkText='Create an account' href='/sign-up' />
			</form>
		</>
	);
};

export default SignIn;
