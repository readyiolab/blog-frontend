import React from "react";

const faqItems = [
  {
    question: "What is Beans News?",
    answer: "Beans News is a platform that shares startup, AI, and digital growth insights to help founders and creators grow faster."
  },
  {
    question: "How does Beans News help startups?",
    answer: "It provides strategies, tools, and real-world case studies to help startups navigate growth, funding, and marketing challenges."
  },
  {
    question: "Is Beans News global?",
    answer: "Yes, even though Beans News is based in India, our content is designed for a global audience including the US, UK, and other international markets."
  }
];

const FAQSection = () => {
  return (
    <section className="mt-16 rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm">
      <div className="mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">Questions & Answers</p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
      </div>
      
      <div className="mx-auto max-w-3xl space-y-8">
        {faqItems.map((item, index) => (
          <div key={index} className="group">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {item.question}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
            {index < faqItems.length - 1 && <div className="mt-8 border-b border-border/50" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
