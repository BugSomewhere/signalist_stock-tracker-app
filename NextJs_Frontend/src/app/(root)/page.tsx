import { HeroSection } from '@/components/sections/hero';
import { FeaturesSection } from '@/components/sections/features';
import { CtaSection } from '@/components/sections/cta';

export default function Homepage() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<CtaSection />
		</>
	);
}
