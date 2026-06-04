import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='relative min-h-screen grid lg:grid-cols-2'>
			{/* Left panel - branding */}
			<div className='hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary/20 via-background to-background border-r border-border relative overflow-hidden'>
				{/* Background decoration */}
				<div className='absolute inset-0 pointer-events-none'>
					<div className='absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl' />
					<div className='absolute bottom-1/4 right-0 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl' />
				</div>

				<Link
					href='/'
					className='flex items-center gap-2 relative z-10'>
					<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
						<Zap className='h-4 w-4 text-white' />
					</div>
					<span className='text-xl font-bold'>NextApp</span>
				</Link>

				<div className='space-y-4 relative z-10'>
					<blockquote className='text-2xl font-medium leading-relaxed text-foreground/90'>
						"Nền tảng tốt nhất để xây dựng ứng dụng web hiện đại
						nhanh chóng và hiệu quả."
					</blockquote>
					<div className='flex items-center gap-3'>
						<div className='h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold'>
							T
						</div>
						<div>
							<p className='font-semibold'>Trần Minh Tuấn</p>
							<p className='text-sm text-muted-foreground'>
								Senior Developer @ TechVN
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Right panel - form */}
			<div className='flex items-center justify-center p-8'>
				<div className='w-full max-w-md'>
					{/* Mobile logo */}
					<div className='flex lg:hidden justify-center mb-8'>
						<Link href='/' className='flex items-center gap-2'>
							<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
								<Zap className='h-4 w-4 text-white' />
							</div>
							<span className='text-xl font-bold'>NextApp</span>
						</Link>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
