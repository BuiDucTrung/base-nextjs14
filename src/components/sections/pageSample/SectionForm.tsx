import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegisterForm } from '@/lib/schema';
import { Checkbox, DatePicker, DatePickerProps, Input, Select } from 'antd';
import TextErrorForm from '@/components/common/TextErrorForm';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface IRegisterForm {
	email: string;
	password: string;
	date: string;
	friend: string;
}
function SectionForm(props: any) {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const handleChange: any = (date: any, dateString: any) => {
		console.log('data', date);
		console.log('dateString', dateString);
	};
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm<IRegisterForm>({
		defaultValues: {
			email: '',
			password: '',
			date: '',
			friend: 'lucy',
		},
		mode: 'all',
		resolver: yupResolver(schemaRegisterForm),
	});

	const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
		console.log('data', data);
	};
	return (
		<div className="SectionForm w-full px-[1rem]">
			<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
				<div className="flex mx-[-1rem] flex-wrap">
					<div className="w-[50%] px-[1rem]">
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<div className="relative">
									<Input
										{...field}
										placeholder="Email address"
										className="py-[16.5px] px-[14px] text-[17px] rounded-[10px] border-[#3c3c4399] "
									/>
									{/* <label className="text">Email address</label> */}
								</div>
							)}
						/>
						<TextErrorForm text={errors?.email?.message} />
					</div>

					<div className="w-[50%] px-[1rem]">
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<div className="relative">
									<Input
										{...field}
										placeholder="Password"
										className="py-[16.5px] pl-[14px] pr-[40px] text-[17px] rounded-[10px] border-[#3c3c4399] "
										type={passwordVisible ? 'text' : 'password'}
									/>
									<div
										className="absolute right-[14px] top-[50%] translate-y-[-50%] cursor-pointer text-black"
										onClick={() => setPasswordVisible((pre) => !pre)}
									>
										{passwordVisible ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
									</div>
								</div>
							)}
						/>
						<TextErrorForm text={errors?.password?.message} />
					</div>

					<div className="w-[50%] px-[1rem]">
						<Controller
							name="date"
							control={control}
							render={({ field: { onChange: onChangeField, ...rest } }) => (
								<div className="relative">
									<DatePicker
										onChange={(date, dateString) => {
											handleChange(date, dateString);
											onChangeField(date, dateString);
										}}
										{...rest}
									/>
								</div>
							)}
						/>
						<TextErrorForm text={errors?.date?.message} />
					</div>

					<div className="w-[50%] px-[1rem]">
						<Controller
							name="friend"
							control={control}
							render={({ field }) => (
								<div className="relative">
									<Select
										defaultValue="lucy"
										style={{ width: 120 }}
										options={[
											{ value: 'jack', label: 'Jack' },
											{ value: 'lucy', label: 'Lucy' },
											{ value: 'Yiminghe', label: 'yiminghe' },
											{ value: 'disabled', label: 'Disabled', disabled: true },
										]}
                                        {...field}
									/>
								</div>
							)}
						/>
						<TextErrorForm text={errors?.date?.message} />
					</div>
				</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default SectionForm;
