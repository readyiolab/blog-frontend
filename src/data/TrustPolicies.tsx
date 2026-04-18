import React from "react";
import { Link } from "react-router-dom";

export const policyContent: Record<string, React.ReactNode> = {
  "about-us": (
    <div className="space-y-8">
      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
        <h2 className="text-xl font-bold mb-2 text-primary">At a Glance</h2>
        <p className="text-lg leading-relaxed">
          Beans News is a global digital media platform that shares startup news, AI tools, funding updates, and digital marketing strategies to help founders and creators grow faster.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="mb-4">Beans News is built on one simple idea - share what actually works.</p>
        <p className="mb-4">
          I’m Deepak Singh, founder of Beans News, based in Gurugram, India. I created this platform after testing multiple AI tools, marketing strategies, and business ideas.
        </p>
        <p className="mb-4">
          Most online content sounds good but doesn’t deliver results. I’ve seen tools fail and strategies not work - but I’ve also seen small changes create massive growth.
        </p>
        <p>That’s what Beans News is about.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What We Focus On</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-xl bg-card">
            <h3 className="font-bold text-primary mb-1">AI Tools</h3>
            <p className="text-sm">Tools that actually improve productivity and workflow.</p>
          </div>
          <div className="p-4 border rounded-xl bg-card">
            <h3 className="font-bold text-primary mb-1">Growth Strategies</h3>
            <p className="text-sm">Real-world startup growth tactics that deliver ROI.</p>
          </div>
          <div className="p-4 border rounded-xl bg-card">
            <h3 className="font-bold text-primary mb-1">Funding Insights</h3>
            <p className="text-sm">Transparent updates on venture capital and investments.</p>
          </div>
          <div className="p-4 border rounded-xl bg-card">
            <h3 className="font-bold text-primary mb-1">Digital Marketing</h3>
            <p className="text-sm">Strategies that actually convert in the current market.</p>
          </div>
        </div>
      </section>

      <section className="bg-muted p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Why Trust Us</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Real experience-based content</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Data-backed insights</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>No fake hype</span>
          </li>
        </ul>
      </section>
      
      <p className="text-sm text-muted-foreground italic">
        Even though Beans News is based in India, our content is designed for a global audience including the US, UK, and other markets.
      </p>
    </div>
  ),
  "contact-us": (
    <div className="space-y-8">
      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
        <h2 className="text-xl font-bold mb-2 text-primary">Quick Contact</h2>
        <p className="text-lg">
          You can contact Beans News for business inquiries, guest posting, and collaborations via email.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
        <p className="mb-6">We’d love to hear from you. Reach out to us for:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <li className="p-4 border rounded-xl bg-card">Business inquiries</li>
          <li className="p-4 border rounded-xl bg-card">Guest posts</li>
          <li className="p-4 border rounded-xl bg-card">Partnerships</li>
          <li className="p-4 border rounded-xl bg-card">Feedback</li>
        </ul>

        <div className="space-y-4 bg-muted p-6 rounded-2xl border">
          <p className="flex items-center gap-3">
            <span className="font-bold">📧 Email:</span>
            <a href="mailto:thebeansnews@gmail.com" className="text-primary hover:underline font-medium">thebeansnews@gmail.com</a>
          </p>
          <p className="flex items-center gap-3">
            <span className="font-bold">📍 Location:</span>
            <span>Gurugram, Haryana, India</span>
          </p>
          <p className="text-sm text-muted-foreground mt-4">We usually respond within 24–48 hours.</p>
        </div>
      </section>
    </div>
  ),
  "write-for-us": (
    <div className="space-y-8">
      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
        <h2 className="text-xl font-bold mb-2 text-primary">Contribute</h2>
        <p className="text-lg">
          Beans News accepts guest posts on startups, AI, finance, and digital marketing with a focus on real insights and case studies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Topics We Accept</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-3 border rounded-lg bg-card text-center">AI tools & startups</div>
          <div className="p-3 border rounded-lg bg-card text-center">Funding & finance</div>
          <div className="p-3 border rounded-lg bg-card text-center">Marketing strategies</div>
          <div className="p-3 border rounded-lg bg-card text-center">Startup case studies</div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Submission Guidelines</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Minimum 800 words</li>
          <li>100% original content</li>
          <li>Must include real examples and data</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">What You Get</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Author credit and bio</li>
          <li>High-quality backlink</li>
          <li>Global exposure to founders and creators</li>
        </ul>

        <div className="bg-primary text-primary-foreground p-6 rounded-2xl text-center">
          <p className="mb-2">Ready to contribute?</p>
          <p className="text-xl font-bold">Submit: thebeansnews@gmail.com</p>
        </div>
      </section>
    </div>
  ),
  "privacy-policy": (
    <div className="space-y-8">
      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
        <h2 className="text-xl font-bold mb-2 text-primary">Summary</h2>
        <p className="text-lg">
          Beans News collects limited data like email and cookies to improve user experience and does not sell personal information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Name (if submitted via contact or comments)</li>
          <li>Email address</li>
          <li>Cookies and usage data</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How We Use It</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To improve our content and site performance</li>
          <li>To analyze traffic patterns</li>
          <li>To respond to your queries</li>
        </ul>
      </section>

      <section className="bg-muted p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-2">Ads & Cookies</h2>
        <p>
          We use Google AdSense, which may use cookies to show relevant ads based on your interests.
        </p>
      </section>
    </div>
  ),
  "editorial-policy": (
    <div className="space-y-8">
      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
        <h2 className="text-xl font-bold mb-2 text-primary">Our Standard</h2>
        <p className="text-lg">
          All content on Beans News is verified, original, and focused on real-world usefulness.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Real insights over theoretical fluff</li>
          <li>Clear and simple language for global readers</li>
          <li>No misleading claims or clickbait</li>
        </ul>
      </section>

      <section className="bg-muted p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-2">AI Usage</h2>
        <p className="mb-4">We may use AI tools for research and drafts, but:</p>
        <ul className="list-disc pl-6 space-y-2 font-medium">
          <li>Every article is human-edited</li>
          <li>All facts are human-verified</li>
        </ul>
      </section>
    </div>
  ),
  "disclaimer": (
    <div className="space-y-8">
      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
        <h2 className="text-xl font-bold mb-2 text-primary">Important</h2>
        <p className="text-lg">
          All content on Beans News is for informational purposes only and does not guarantee financial or business results.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">No Guarantees</h2>
        <p className="mb-4 text-lg">We do not guarantee specific outcomes regarding:</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
          <li className="p-4 border rounded-xl bg-card font-bold">Income</li>
          <li className="p-4 border rounded-xl bg-card font-bold">Business Success</li>
          <li className="p-4 border rounded-xl bg-card font-bold">Marketing Results</li>
        </ul>
        <p className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center font-semibold">
          Always do your own research before making financial or business decisions.
        </p>
      </section>
    </div>
  ),
  "terms-and-conditions": (
    <div className="space-y-8">
      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
        <h2 className="text-xl font-bold mb-2 text-primary">Agreement</h2>
        <p className="text-lg">
          By using Beans News, you agree to follow our terms related to content usage and website behavior.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Use of Content</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>No copying or reproduction without explicit permission</li>
          <li>Content is for informational use only</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Liability</h2>
        <p className="p-4 border rounded-xl bg-muted whitespace-pre-wrap">
          We are not responsible for any losses or damages resulting from the use of our content or website.
        </p>
      </section>
    </div>
  ),
};
