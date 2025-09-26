const skills = [
  { title: "Brand Identity" },
  { title: "End-to-End Product Design" },
  { title: "User Experience Design" },
  { title: "User Conversion Rate Improvement" },
  { title: "User Interface Design" },
  { title: "Webflow Development" },
];

const Skills = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-4xl mx-auto px-6">
        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          My Skills
        </h2>

        {/* Skills List */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {skills.map((skill, idx) => (
            <li
              key={idx}
              className="py-4 text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400  duration-200 cursor-default hover:scale-105 transition-all"
            >
              {skill.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
