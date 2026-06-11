'use client';
import CountrySelectField from '@/components/forms/CountrySelectField';
import FooterLink from '@/components/forms/FooterLink';
import InputField from '@/components/forms/InputField';
import SelectField from '@/components/forms/SelectField';
import {
	INVESTMENT_GOALS,
	PREFERRED_INDUSTRIES,
	RISK_TOLERANCE_OPTIONS,
} from '@/constants';
import { useForm, SubmitHandler } from 'react-hook-form';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		defaultValues: {	
			fullName: '',
			email: '',
			password: '',
			country: 'VN',
			investmentGoals: '',
			riskTolerance: '',
			preferredIndustry: '',
		},
		mode: 'onBlur',
	});

	const onSubmit = async (data: SignUpFormData) => {
		try {
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<h1 className='form-title'>
				Sign Up & personalize your experience
			</h1>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<InputField
					name='fullName'
					label='Full Name'
					placeholder='Trình Hà Lân'
					register={register}
					error={errors.fullName}
					validation={{
						required: 'Full name is required',
						minLength: 2,
					}}
				/>
				<InputField
					name='email'
					label='Email'
					placeholder='Linh@gmail.com'
					register={register}
					error={errors.email}
					validation={{
						required: 'Email is required',
						pattern: /^\S+@\S+$/i,
						message: 'Invalid email address',
					}}
				/>
				<InputField
					name='password'
					label='Password'
					placeholder='Enter a strong password'
					register={register}
					type='password'
					error={errors.password}
					validation={{
						required: 'Password is required',
						minLength: 6,
					}}
				/>
				<CountrySelectField
					control={control}
					name='country'
					label='Country'
					error={errors.country}
					required
				/>

				<SelectField
					name='investmentGoals'
					label='Investment Goals'
					control={control}
					placeholder='Select your investment goals'
					options={INVESTMENT_GOALS}
					error={errors.investmentGoals}
					required
				/>
				<SelectField
					name='riskTolerance'
					label='Risk Tolerance'
					control={control}
					placeholder='Select your risk level'
					options={RISK_TOLERANCE_OPTIONS}
					error={errors.riskTolerance}
					required
				/>
				<SelectField
					name='preferredIndustry'
					label='Preferred Industry'
					control={control}
					placeholder='Select your preferred industry'
					options={PREFERRED_INDUSTRIES}
					error={errors.preferredIndustry}
					required
				/>

				<button
					type='submit'
					disabled={isSubmitting}
					className='yellow-btn w-full mt-5'>
					{isSubmitting
						? 'Creating Account...'
						: 'Start Your Investing Journey'}
				</button>
				<FooterLink text="Already have an account?" linkText='Sign In' href='/sign-in' />
			</form>
		</>
	);
};

export default SignUp;
