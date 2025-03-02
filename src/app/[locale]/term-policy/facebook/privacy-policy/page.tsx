import React from 'react';
// term-policy/facebook/privacy-policy
const PrivacyPolicy = () => {
	return (
		<div className="bg-gray-900 container mx-auto mt-20 max-w-3xl rounded-lg p-8 text-white shadow-lg">
			<h1 className="my-5 text-center text-2xl font-bold">Privacy Policy</h1>
			<p className="text-gray-300 mb-4">Effective date: November 07, 2023</p>
			<section>
				<h2 className="my-3 text-xl font-semibold">1. Introduction</h2>
				<p className="text-gray-200 mb-3">
					Our app uses Facebook Login for authentication. By using our app, you agree to comply with
					Facebook&apos;s Platform Terms and our privacy practices.
				</p>
			</section>
			<section>
				<h2 className="my-3 text-xl font-semibold">2. Data We Collect</h2>
				<p className="text-gray-200 mb-3">
					We collect the information you share with us via Facebook Login, with your explicit consent. This
					may include your public profile and email address.
				</p>
			</section>
			<section>
				<h2 className="my-3 text-xl font-semibold">3. How We Use Your Data</h2>
				<p className="text-gray-200 mb-3">
					Your data is used to personalize your experience within our app. We do not share your information
					with third parties without your consent.
				</p>
			</section>
			<section>
				<h2 className="my-3 text-xl font-semibold">4. Your Rights</h2>
				<p className="text-gray-200 mb-3">
					You have the right to access, update, or delete your information at any time through the app
					settings.
				</p>
			</section>
			<section>
				<h2 className="my-3 text-xl font-semibold">5. Security</h2>
				<p className="text-gray-200 mb-3">
					We are committed to ensuring the security of your data with appropriate technical measures.
				</p>
			</section>
			<section>
				<h2 className="my-3 text-xl font-semibold">6. Changes to This Policy</h2>
				<p className="text-gray-200 mb-3">
					We may update our privacy policy from time to time. We will notify you of any changes by posting the
					new policy on this page.
				</p>
			</section>
			<section>
				<h2 className="my-3 text-xl font-semibold">7. Contact Us</h2>
				<p className="text-gray-200 mb-3">
					If you have any questions about this privacy policy, you can contact us at: hello@wearetopgroup.com.
				</p>
			</section>
		</div>
	);
};

export default PrivacyPolicy;
