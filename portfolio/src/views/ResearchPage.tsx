export default function ResearchPage() {
  return (
    <article className="research-journey page-shell" aria-labelledby="journey-title">
      <header className="home-heading">
        <p className="research-label">Research · A personal statement</p>
        <h1 id="journey-title">My Journey into Research</h1>
        <p>From engineering intelligent systems to asking what makes them trustworthy.</p>
        <div className="research-byline"><span>By Silas Osunba</span><a href="https://scholar.google.com/citations?user=akIRrWwAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar ↗</a></div>
      </header>

      <div className="research-prose">
        <p>I came to research through engineering. Studying Electronic &amp; Computer Engineering at Lagos State University gave me a way to connect ideas to things I could build, measure, and test. Over time, I became increasingly interested in the assumptions behind those things: why a method works, where it stops working, and how we can tell the difference.</p>
        <p>That curiosity now shapes my direction in <strong>trustworthy AI</strong>. I want to understand how we can build intelligent systems whose behaviour people can examine, whose limitations we can communicate honestly, and whose use remains accountable to the people affected by them.</p>

        <h2>Learning how to ask a research question</h2>
        <p>My formal research journey began in my third year at Lagos State University, under the guidance of Dr. M.A. Adedoyin in the Department of Electronic &amp; Computer Engineering. That introduction brought me into the discipline of research: reading previous work, defining a problem carefully, testing an approach, and documenting the reasoning behind it.</p>
        <p>I value that foundation because a result needs a clear account of how it was reached. What data did we use? What did we compare against? Which choices influenced the outcome? These are questions I want to keep asking as my work develops.</p>

        <h2>Finding a direction through applied work</h2>
        <p>My experience has taken me through machine learning for medical diagnostics, oil spill detection, and the prediction of rain-induced attenuation in satellite communications. These applications connect learning algorithms to problems with practical consequences. They also give me different ways to think about reliability: the conditions a model was evaluated under, the resources available to run it, and the decisions its output might inform.</p>
        <p>My undergraduate thesis focused on modeling rain-induced attenuation at Ka-band. At Engineering.fit() Research Lab, I worked on CNN-based oil spill detection and model optimization for edge devices. Alongside that research, building software has kept me interested in what happens when an experiment becomes part of a system that people use.</p>
        <p>These experiences give my interest in trustworthy AI a practical starting point. I want my research to address the questions that remain when a model moves beyond a controlled evaluation and into an unfamiliar situation.</p>

        <h2>The questions I want to pursue</h2>
        <p>I am particularly interested in <strong>robustness, uncertainty, interpretability, and human oversight</strong>. How does a model behave when its inputs differ from its training data? Can its confidence help a person judge when to rely on an answer? How can we examine the evidence behind a prediction? When should a system defer to a human?</p>
        <p>As I explore large language models and agentic AI, I also want to study how these questions apply to systems that take actions. I am interested in evaluating their decisions, setting meaningful limits on their authority, and designing points where people can review or intervene.</p>
        <p>This is the direction I want to develop through further research. I want to turn these broad interests into precise questions, choose methods that fit those questions, and evaluate the resulting systems with care.</p>

        <h2>Who the work should reach</h2>
        <p>My interest in responsible AI is closely connected to education and access. Through tutoring, student leadership, and co-founding Inspire The Student Initiative, I have made sharing knowledge part of my work. I want to carry that commitment into research through clear writing, reproducible experiments, and tools that others can learn from and question.</p>
        <p>I care especially about how people and communities across Africa can participate in shaping AI. Local needs, available resources, and the people using a system should help define the research problem from the beginning.</p>
        <p>I am still developing my research identity. The direction is clear to me: I want to help make intelligent systems more reliable, understandable, and accountable, while widening the opportunity for people to use them responsibly. That is what I mean when I say I am building at the ethical and responsible layer of super intelligence.</p>
      </div>

      {/* ResearchSlideshow and its image assets are retained for future use. */}
    </article>
  );
}
