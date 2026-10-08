import React from 'react';
import '../../styles/IdeaSection.css';

/** Bridge out of the hero: continues the "ground to sky" story. */
const IdeaSection: React.FC = () => (
  <section id="idea" className="idea-section" aria-labelledby="idea-title">
    <div className="idea-inner">
      <p className="idea-index">01 / Approach</p>
      <h2 className="idea-title" id="idea-title">
        From idea
        <br />
        to built form.
      </h2>
      <p className="idea-copy">
        Every project begins with understanding the land, the structure, and the people who will
        use the space.
      </p>
    </div>
  </section>
);

export default IdeaSection;
