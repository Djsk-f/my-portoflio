import About from "@/components/about";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <div className="container">
      <div className="home">
        <div className="presentation">
          <div className="presentation__text">
            <h2 className="presentation__text--name">Fidele Loffou</h2>
            <div className="presentation__text--title"> Developpeur Web <span> Full-Stack </span></div>
            <p className="presentation__text--description">
              Je suis un développeur web passionné par la création d'applications
              web modernes et réactives. J'ai une solide expérience dans le
              développement front-end et back-end, et je suis toujours à la recherche
              de nouveaux défis.
            </p>
          </div>
          <div className="presentation__image">
            <img
              src="/assets/images/fidele.jpg"
              alt="Fidele Loffou"
            />
          </div>
        </div>
      </div>

      {/* export components */}

      <About />
      <Skills />
    </div>
  );
}
