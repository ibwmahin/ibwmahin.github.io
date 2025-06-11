
import { 
  Code, 
  Server, 
  Database, 
  Shield, 
  Smartphone, 
  Globe,
  GitBranch,
  Layers
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      icon: Smartphone,
      color: "from-blue-500 to-purple-600",
      skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Responsive Design"]
    },
    {
      category: "Backend",
      icon: Server,
      color: "from-green-500 to-teal-600",
      skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Authentication", "Middleware"]
    },
    {
      category: "Database",
      icon: Database,
      color: "from-orange-500 to-red-600",
      skills: ["MongoDB", "Mongoose", "Database Design", "Aggregation", "Indexing", "Data Modeling"]
    },
    {
      category: "DevOps & Tools",
      icon: GitBranch,
      color: "from-purple-500 to-pink-600",
      skills: ["Docker", "Linux", "Vercel", "GitHub Actions", "Git", "CI/CD"]
    },
    {
      category: "Security",
      icon: Shield,
      color: "from-red-500 to-orange-600",
      skills: ["JWT Authentication", "HTTPS", "OWASP Top 10", "Data Validation", "CORS", "Security Headers"]
    },
    {
      category: "Additional",
      icon: Layers,
      color: "from-indigo-500 to-blue-600",
      skills: ["Performance Optimization", "SEO", "Testing", "Code Review", "Documentation", "Debugging"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="text-gradient">Services</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Comprehensive technology stack for modern web development
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div 
                key={category.category}
                className="bg-card-gradient p-8 rounded-2xl border border-border hover-lift hover-glow group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon and Title */}
                <div className="flex items-center mb-6">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} p-0.5`}>
                    <div className="flex items-center justify-center w-full h-full bg-card rounded-xl">
                      <category.icon className="w-7 h-7 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold ml-4 text-foreground">
                    {category.category}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skill}
                      className="flex items-center group-hover:translate-x-2 transition-transform duration-300"
                      style={{ transitionDelay: `${skillIndex * 50}ms` }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:bg-accent transition-colors"></div>
                      <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl bg-gradient-to-r ${category.color}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
