import React from "react";
import "@/../public/assets/scss/layouts/_skills.scss";

const skills = [
  {
    category: "Front-end",
    items: [
      { name: "React", icon: "/assets/icons/reactjs.svg" },
      { name: "Next.js", icon: "/assets/icons/nextjs.svg" },
      { name: "Angular", icon: "/assets/icons/angular.svg" },
      { name: "HTML5", icon: "/assets/icons/html.svg" },
      { name: "CSS3", icon: "/assets/icons/css.svg" },
      { name: "TypeScript", icon: "/assets/icons/typescript.svg" },
      { name: "Bootstrap", icon: "/assets/icons/bootstrap.svg" },
      { name: "Redux", icon: "/assets/icons/redux.svg" },
    ],
  },
  {
    category: "Back-end",
    items: [
      { name: "Node.js", icon: "/assets/icons/nodejs.svg" },
      { name: "Express.js", icon: "/assets/icons/express.svg" },
      { name: "NestJS", icon: "/assets/icons/nestjs.svg" },
      { name: "PHP", icon: "/assets/icons/php.svg" },
    ],
  },
  {
    category: "Base de données",
    items: [
      { name: "MongoDB", icon: "/assets/icons/mongodb.svg" },
      { name: "MySQL", icon: "/assets/icons/mysql.svg" },
    ],
  },
];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <h1 className="skills__title">Compétences</h1>
      <div className="skills__categories">
        {skills.map((group) => (
          <div className="skills__category" key={group.category}>
            <h3>{group.category}</h3>
            <div className="skills__list">
              {group.items.map((skill) => (
                <div className="skills__item" key={skill.name}>
                  <img src={skill.icon} alt={skill.name} className="skills__icon" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}