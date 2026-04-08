import React from "react";
import { Link } from "react-router-dom";

export const policyContent: Record<string, React.ReactNode> = {
    "about-us": (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="mb-3">Beans News is an independent digital news platform.</p>
                <p className="mb-3">The platform publishes reliable news and analysis across multiple categories. We focus on delivering accurate, fact-checked, and timely journalism.</p>
                <p>Stay updated with our coverage on <Link to="/india-news" className="text-primary hover:underline font-medium">India News</Link>, <Link to="/world-news" className="text-primary hover:underline font-medium">World News</Link>, <Link to="/business-news" className="text-primary hover:underline font-medium">Business News</Link>, <Link to="/finance-news" className="text-primary hover:underline font-medium">Finance News</Link>, <Link to="/sports-news" className="text-primary hover:underline font-medium">Sports News</Link>, and <Link to="/health-wellness" className="text-primary hover:underline font-medium">Health and Wellness News</Link>.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Delivering accurate journalism</li>
                    <li>Promoting responsible news reporting</li>
                    <li>Providing accessible and transparent news coverage</li>
                    <li>Reducing misinformation in digital media</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">What We Cover</h2>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div className="border p-4 rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg mb-2 text-primary">India News</h3>
                        <p className="text-sm text-muted-foreground">Coverage of national developments, policies, economy, and society.</p>
                    </div>
                    <div className="border p-4 rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg mb-2 text-primary">World News</h3>
                        <p className="text-sm text-muted-foreground">International events, global politics, and international relations.</p>
                    </div>
                    <div className="border p-4 rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg mb-2 text-primary">Business News</h3>
                        <p className="text-sm text-muted-foreground">Corporate developments, startups, market trends, and entrepreneurship.</p>
                    </div>
                    <div className="border p-4 rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg mb-2 text-primary">Finance News</h3>
                        <p className="text-sm text-muted-foreground">Financial markets, investment trends, banking sector, and economic policy.</p>
                    </div>
                    <div className="border p-4 rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg mb-2 text-primary">Sports News</h3>
                        <p className="text-sm text-muted-foreground">Major sporting events, tournaments, player performance and updates.</p>
                    </div>
                    <div className="border p-4 rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg mb-2 text-primary">Health and Wellness News</h3>
                        <p className="text-sm text-muted-foreground">Medical research, public health updates, and wellness insights.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Editorial Team</h2>
                <p className="mb-2">The Beans News Editorial Team manages publishing and verification.</p>
                <p className="mb-2">Our editors review all content before publication.</p>
                <p>Articles follow strict editorial standards for accuracy and credibility.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Commitment to Accuracy</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Fact-checking process</li>
                    <li>Source verification</li>
                    <li>Editorial review</li>
                    <li>Updates and corrections where necessary</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Transparency</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Clear separation of editorial content and advertising</li>
                    <li>Ethical reporting standards</li>
                    <li>Editorial independence</li>
                </ul>
            </section>

            <section className="bg-muted p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p>Email: <a href="mailto:thebeansnews@gmail.com" className="text-primary hover:underline font-medium">thebeansnews@gmail.com</a></p>
                <p className="mt-2">For more details, visit our <Link to="/contact-us" className="text-primary hover:underline font-medium">Contact Us page</Link>.</p>
            </section>
        </div>
    ),
    "contact-us": (
        <div className="space-y-8">
            <section>
                <p className="text-lg">We welcome our readers to contact Beans News for editorial inquiries, news tips, corrections, and partnership discussions.</p>
            </section>

            <section className="bg-muted p-6 rounded-2xl border">
                <h2 className="text-2xl font-bold mb-2">General Contact</h2>
                <p>Email: <a href="mailto:thebeansnews@gmail.com" className="text-primary hover:underline font-medium text-lg">thebeansnews@gmail.com</a></p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Editorial Enquiries</h2>
                <p className="mb-3">Contact our editorial team regarding:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Article corrections</li>
                    <li>Fact verification</li>
                    <li>Reporting feedback</li>
                </ul>
                <p>Email: <a href="mailto:thebeansnews@gmail.com" className="text-primary hover:underline font-medium">thebeansnews@gmail.com</a></p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>
                <p className="mb-3">Please let us know if you find any issues on our website:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Inaccurate information</li>
                    <li>Copyright concerns</li>
                    <li>Broken links</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Follow Beans News</h2>
                <p>Connect with us on Twitter: <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">@BeansNews</a></p>
            </section>
        </div>
    ),
    "privacy-policy": (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
                <p>Beans News respects and protects user privacy.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
                <p>Types of information collected:</p>
                <ul>
                    <li>Personal information (email communication)</li>
                    <li>Log files</li>
                    <li>Device information</li>
                    <li>Cookies</li>
                    <li>Analytics data</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Information</h2>
                <p>Information is used to:</p>
                <ul>
                    <li>Improve website experience</li>
                    <li>Analyze site traffic</li>
                    <li>Enhance content quality</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">4. Cookies</h2>
                <p>Cookies may be used for:</p>
                <ul>
                    <li>Website functionality</li>
                    <li>Analytics</li>
                    <li>Advertising services including Google AdSense</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">5. Third Party Advertising</h2>
                <p>Advertising partners may use cookies and tracking technologies.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Protection</h2>
                <p>We take security measures to protect information.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Information</h2>
                <p>Beans News does not knowingly collect data from children under 13.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">8. User Consent</h2>
                <p>Users agree to the privacy policy when using the website.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Information</h2>
                <p>Email: <a href="mailto:thebeansnews@gmail.com" className="text-primary hover:underline">thebeansnews@gmail.com</a></p>
            </section>
        </div>
    ),
    "disclaimer": (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">1. General Information</h2>
                <p>Content published on Beans News is for informational purposes.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">2. Accuracy of Information</h2>
                <p>Beans News strives for accuracy but does not guarantee completeness of information.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">3. External Links</h2>
                <p>Beans News may include links to external websites and is not responsible for their content.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">4. Professional Advice</h2>
                <p>Content should not be considered:</p>
                <ul>
                    <li>Financial advice</li>
                    <li>Medical advice</li>
                    <li>Legal advice</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">5. Consent</h2>
                <p>Users agree to this disclaimer by using the website.</p>
            </section>
        </div>
    ),
    "editorial-policy": (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Editorial Mission</h2>
                <p>Provide accurate and responsible journalism.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">2. Editorial Independence</h2>
                <p>Editorial decisions are independent from advertisers and sponsors.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">3. Fact Checking</h2>
                <p>Content undergoes:</p>
                <ul>
                    <li>Source verification</li>
                    <li>Editorial review</li>
                    <li>Accuracy checks</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">4. Corrections Policy</h2>
                <p>Errors are corrected promptly and transparently.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">5. Ethical Standards</h2>
                <p>Editorial content follows professional journalism standards.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">6. Sponsored Content</h2>
                <p>Sponsored or promotional content is clearly labeled.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">7. AI Assisted Research</h2>
                <p>Technology tools may assist research but human editors review all published content.</p>
            </section>
        </div>
    ),
    "terms-and-conditions": (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>Using the website indicates agreement with these terms.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">2. Intellectual Property</h2>
                <p>All content on Beans News belongs to Beans News unless stated otherwise.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">3. Use of Website</h2>
                <p>Users must not:</p>
                <ul>
                    <li>Copy articles without permission</li>
                    <li>Misuse website content</li>
                    <li>Distribute copyrighted material</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
                <p>Beans News is not liable for losses resulting from use of website content.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">5. Changes to Terms</h2>
                <p>Terms may be updated periodically.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Information</h2>
                <p>Email: <a href="mailto:thebeansnews@gmail.com" className="text-primary hover:underline">thebeansnews@gmail.com</a></p>
            </section>
        </div>
    ),
    "write-for-us": (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-lg">Beans News welcomes journalists, writers, and contributors to submit articles.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Topics Accepted</h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <li className="bg-muted p-4 rounded-xl text-center font-medium border">India News</li>
                    <li className="bg-muted p-4 rounded-xl text-center font-medium border">World News</li>
                    <li className="bg-muted p-4 rounded-xl text-center font-medium border">Business News</li>
                    <li className="bg-muted p-4 rounded-xl text-center font-medium border">Finance News</li>
                    <li className="bg-muted p-4 rounded-xl text-center font-medium border">Sports News</li>
                    <li className="bg-muted p-4 rounded-xl text-center font-medium border">Health and Wellness News</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Submission Guidelines</h2>
                <p className="mb-3">Articles must:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Be original</li>
                    <li>Contain accurate information</li>
                    <li>Include credible sources</li>
                    <li>Be minimum 800 words</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Editorial Review Process</h2>
                <p className="p-4 bg-primary/5 border border-primary/20 rounded-xl">All submissions are reviewed by the Beans News Editorial Team before publication.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Submit</h2>
                <div className="bg-muted p-6 rounded-2xl border">
                    <p className="mb-2">Send article submissions to:</p>
                    <p className="text-xl mb-4"><a href="mailto:thebeansnews@gmail.com" className="font-bold text-primary hover:underline">thebeansnews@gmail.com</a></p>
                    <p><strong>Subject line:</strong> Guest Article Submission – Beans News</p>
                </div>
            </section>
        </div>
    ),
};
