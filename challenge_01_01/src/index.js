import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];
function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="logo512.png" alt="logo" />;
}

function Intro() {
  return (
    <div className="data">
      <h1>John Doe</h1>
      <p>
        Developed scalable web applications. Integrated RESTful APIs.
        Implemented state management solutions.
      </p>
    </div>
  );
}

function SkillList() {
  const skill_list = skills;

  return (
    <div className="skill-list">
      {skill_list.map((skill) => (
        <Skill skill={skill.skill} level={skill.level} color={skill.color} />
      ))}
    </div>
  );
}

// function chooseEmoji(level) {
//   if (level === "beginner") return "😺";
//   else if (level === "intermediate") return "👍";
//   else return "💪";
// }

function Skill({ color, skill, level }) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>
        {level === "beginner" && "😺"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪"}
      </span>
    </div>
  );
}
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
