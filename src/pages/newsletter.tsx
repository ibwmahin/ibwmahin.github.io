import React from "react";

const Newsletter = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-h1 font-extrabold uppercase tracking-tighter text-[hsl(var(--dark))]">
        Newsletter
      </h1>
      <p className="text-[hsl(var(--muted))] leading-relaxed font-medium">
        Subscribe to my newsletter for the latest updates and insights.
      </p>
      {/* Add your newsletter form or content here */}
    </div>
  );
};

export default Newsletter;
