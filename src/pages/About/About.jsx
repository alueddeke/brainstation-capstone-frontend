import "./About.scss";
function About() {
  return (
    <div className="content-wrapper">
      <main className="about">
        <div className="about__top">
          <h1 className="about__header">
            "Summarize yourself and how you differ from your two competitors in
            two paragraphs..."
          </h1>

          <div className="about__summaries">
            <section className="about__summary">
              <div className="about__summary-top">
                <h4>ChatGpt:</h4>
              </div>
              <div className="about__summary-body">
                <p className="about__summary-text">
                  ChatGPT, developed by OpenAI, is a leading conversational AI
                  model trained extensively on diverse internet text, enabling
                  it to generate highly contextually appropriate and human-like
                  responses. It excels in engaging in providing personalized and
                  relevant responses across a broad spectrum of topics.
                </p>
                <p className="about__summary-text">
                  In contrast, Google's Project Gemini concentrates on building
                  a more diverse and inclusive dataset for training language
                  models, with a primary goal of mitigating biases and ensuring
                  representation across various demographics and languages.
                  Unlike the quantitative measure of perplexity, which evaluates
                  model performance purely on numerical grounds, ChatGPT and
                  Gemini prioritize qualitative aspects of natural language
                  understanding and generation, aiming to produce responses that
                  are not only accurate but also reflective of the nuances
                  inherent in human communication.
                </p>
              </div>
            </section>
            <section className="about__summary">
              <div className="about__summary-top">
                <h4>Google Gemini:</h4>
              </div>
              <div className="about__summary-body">
                <p className="about__summary-text">
                  Google Gemini is a large language model (LLM) similar to
                  OpenAI's ChatGPT and Perplexity AI. All three can answer your
                  questions, generate different creative text formats, and
                  translate languages. However, there are some key differences.
                </p>
                <p className="about__summary-text">
                  One advantage Gemini boasts is its access to real-time
                  information. Unlike ChatGPT, whose free version has a data
                  cut-off date, Gemini can incorporate current events and
                  knowledge into its responses. Additionally, benchmarks suggest
                  Gemini outperforms both ChatGPT and Perplexity in factual
                  tasks and reasoning. While ChatGPT excels in creative writing
                  and Perplexity offers a unique source-citation feature, Gemini
                  shines in accuracy and up-to-date knowledge.
                </p>
              </div>
            </section>
            <section className="about__summary">
              <div className="about__summary-top">
                <h4>Perplexity:</h4>
              </div>
              <div className="about__summary-body">
                <p className="about__summary-text">
                  Perplexity is an AI search assistant that aims to provide
                  instant and accurate responses by retrieving information from
                  the web, differentiating itself from competitors like Gemini
                  and ChatGPT in terms of speed. While those services can take
                  several seconds, Perplexity claims to deliver instant
                  responses.
                </p>
                <p className="about__summary-text">
                  A key distinction is Perplexity's ability to effectively
                  summarize videos and long articles. ChatGPT acknowledged it
                  cannot directly access videos, but Perplexity can summarize
                  content from various sources like web articles and PDFs,
                  providing concise, well-formatted summaries. This makes
                  Perplexity a versatile tool for quickly digesting different
                  types of content.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
