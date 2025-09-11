import React, { useEffect, useState } from "react";
import "@/../public/assets/scss/layouts/_skills.scss";

const allSkills = [
  { name: "React", icon: "/assets/icons/reactjs.svg" },
  { name: "Next.js", icon: "/assets/icons/nextjs.svg" },
  { name: "Angular", icon: "/assets/icons/angular.svg" },
  { name: "HTML5", icon: "/assets/icons/html.svg" },
  { name: "CSS3", icon: "/assets/icons/css.svg" },
  { name: "TypeScript", icon: "/assets/icons/typescript.svg" },
  { name: "Bootstrap", icon: "/assets/icons/bootstrap.svg" },
  { name: "Redux", icon: "/assets/icons/redux.svg" },
  { name: "Node.js", icon: "/assets/icons/nodejs.svg" },
  { name: "Express.js", icon: "/assets/icons/express.svg" },
  { name: "NestJS", icon: "/assets/icons/nestjs.svg" },
  { name: "PHP", icon: "/assets/icons/php.svg" },
  { name: "MongoDB", icon: "/assets/icons/mongodb.svg" },
  { name: "MySQL", icon: "/assets/icons/mysql.svg" },
];

export default function Skills() {
  const [isHovered, setIsHovered] = useState(false);
  const [skillsWithAnimation, setSkillsWithAnimation] = useState<Array<{
    name: string;
    icon: string;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    // Créer une liste avec des paramètres d'animation aléatoires pour chaque skill
    const animatedSkills = allSkills.map((skill) => ({
      ...skill,
      animationDelay: Math.random() * 2, // Délai aléatoire entre 0 et 2s
      animationDuration: 2 + Math.random() * 3, // Durée entre 2 et 5s
    }));
    setSkillsWithAnimation(animatedSkills);
  }, []);

  return (
    <section className="skills" id="skills">
      <h1 className="skills__title">Technologies</h1>
      <div 
        className={`skills__infinite-container ${isHovered ? 'paused' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="skills__infinite-scroll">
          {/* Première série d'éléments */}
          {skillsWithAnimation.map((skill, index) => (
            <div 
              className="skills__item" 
              key={`${skill.name}-1`}
              style={{
                '--animation-delay': `${skill.animationDelay}s`,
                '--animation-duration': `${skill.animationDuration}s`
              } as React.CSSProperties}
            >
              <img src={skill.icon} alt={skill.name} className="skills__icon" />
              {/* <span>{skill.name}</span> */}
            </div>
          ))}
          {/* Deuxième série pour assurer la continuité */}
          {skillsWithAnimation.map((skill, index) => (
            <div 
              className="skills__item" 
              key={`${skill.name}-2`}
              style={{
                '--animation-delay': `${skill.animationDelay}s`,
                '--animation-duration': `${skill.animationDuration}s`
              } as React.CSSProperties}
            >
              <img src={skill.icon} alt={skill.name} className="skills__icon" />
              {/* <span>{skill.name}</span> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}