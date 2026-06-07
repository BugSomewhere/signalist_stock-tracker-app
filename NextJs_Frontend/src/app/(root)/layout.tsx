import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Header from '@/components/header';

export default function RootGroupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='min-h-screen text-gray-400'>
			<Header />
			<div className='container py-10'>{children}</div>
		</main>
	);
}
