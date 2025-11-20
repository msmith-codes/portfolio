interface IAssignment
{
    name : string;
    href : string;
}

interface IClass 
{
    name : string;
    professor : string;
    credits : number;
    assignments : IAssignment[];
    tests : IAssignment[];
    inclass : IAssignment[];
}

export default function Edinboro() 
{
    const fall2025 : IClass[] = [
        {
            name: "Web Programming I",
            professor: "David Tucker",
            credits: 3,
            assignments: [
                { name: "Case Study", href: "/edinboro/web-programming-1/case_study/index.html" },
                { name: "Project 01-03", href: "/edinboro/web-programming-1/assignments/project01-03/index.html" },
                { name: "Project 02-04", href: "/edinboro/web-programming-1/assignments/project02-04/index.html" },
                { name: "Project 03-02", href: "/edinboro/web-programming-1/assignments/project03-02/index.html" },
                { name: "Project 05-01", href: "/edinboro/web-programming-1/assignments/project05-01/index.html" },
                { name: "Project 06-03", href: "/edinboro/web-programming-1/assignments/project06-03/index.html" }
            ],
            tests: [
                { name: "Exam 1", href: "/edinboro/web-programming-1/exams/exam-1/index.html" },
                { name: "Exam 2", href: "/edinboro/web-programming-1/exams/exam-2/index.html" }
            ],
            inclass: [
                {name: "Trivia Game", href: "/edinboro/web-programming-1/in_class/trivia/index.html" },
            ]
        }   
    ]

    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-12">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">Edinboro University</h1>
                    <p className="text-foreground/80 font-mono text-lg">
                        Current Classes & Homework Assignments
                    </p>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto mt-4"></div>
                </div>

                {/* Current Semester */}
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground font-mono">Fall 2025</h2>
                    
                    {/* Dynamic Class Rendering */}
                    {fall2025.map((classItem: IClass, index: number) => (
                        <div key={index} className="border border-foreground/20 rounded-lg p-6 hover:border-foreground/40 transition-colors">
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground font-mono">{classItem.name}</h3>
                                        <p className="text-foreground/80 font-mono">Professor: {classItem.professor}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-foreground/10 text-foreground font-mono text-sm rounded">
                                            {classItem.credits} Credits
                                        </span>
                                    </div>
                                </div>
                                
                                {/* In Class */}
                                <div className="space-y-3">
                                    <h4 className="text-lg font-bold text-foreground font-mono">In Class</h4>
                                    <div className="space-y-2">
                                        {classItem.inclass.length > 0 ? (
                                            classItem.inclass.map((inclass: IAssignment, inclassIndex: number) => (
                                                <div key={inclassIndex} className="flex justify-between items-center p-3 bg-foreground/5 rounded border-l-4 border-red-500/50">
                                                    <div>
                                                        <a 
                                                            href={inclass.href} 
                                                            className="text-foreground font-mono font-semibold hover:text-foreground/80 transition-colors"
                                                        >
                                                            {inclass.name}
                                                        </a>
                                                        <p className="text-foreground/60 font-mono text-sm">Click to view assignment</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3 bg-foreground/5 rounded border-l-4 border-foreground/20">
                                                <p className="text-foreground/60 font-mono text-sm text-center">No assignments available yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>


                                {/* Assignments */}
                                <div className="space-y-3">
                                    <h4 className="text-lg font-bold text-foreground font-mono">Assignments</h4>
                                    <div className="space-y-2">
                                        {classItem.assignments.length > 0 ? (
                                            classItem.assignments.map((assignment: IAssignment, assignmentIndex: number) => (
                                                <div key={assignmentIndex} className="flex justify-between items-center p-3 bg-foreground/5 rounded border-l-4 border-green-500/50">
                                                    <div>
                                                        <a 
                                                            href={assignment.href} 
                                                            className="text-foreground font-mono font-semibold hover:text-foreground/80 transition-colors"
                                                        >
                                                            {assignment.name}
                                                        </a>
                                                        <p className="text-foreground/60 font-mono text-sm">Click to view assignment</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3 bg-foreground/5 rounded border-l-4 border-foreground/20">
                                                <p className="text-foreground/60 font-mono text-sm text-center">No assignments available yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tests */}
                                <div className="space-y-3">
                                    <h4 className="text-lg font-bold text-foreground font-mono">Tests</h4>
                                    <div className="space-y-2">
                                        {classItem.tests.length > 0 ? (
                                            classItem.tests.map((test: IAssignment, testIndex: number) => (
                                                <div key={testIndex} className="flex justify-between items-center p-3 bg-foreground/5 rounded border-l-4 border-blue-500/50">
                                                    <div>
                                                        <a 
                                                            href={test.href} 
                                                            className="text-foreground font-mono font-semibold hover:text-foreground/80 transition-colors"
                                                        >
                                                            {test.name}
                                                        </a>
                                                        <p className="text-foreground/60 font-mono text-sm">Click to view test</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3 bg-foreground/5 rounded border-l-4 border-foreground/20">
                                                <p className="text-foreground/60 font-mono text-sm text-center">No tests available yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Quick Stats */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-foreground font-mono">Semester Overview</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-foreground/20 rounded-lg p-6 text-center">
                            <h3 className="text-2xl font-bold text-foreground font-mono mb-2">
                                {fall2025.reduce((total, classItem) => total + classItem.credits, 0)}
                            </h3>
                            <p className="text-foreground/80 font-mono">Total Credits</p>
                        </div>
                        
                        <div className="border border-foreground/20 rounded-lg p-6 text-center">
                            <h3 className="text-2xl font-bold text-foreground font-mono mb-2">
                                {fall2025.reduce((total, classItem) => total + classItem.assignments.length, 0)}
                            </h3>
                            <p className="text-foreground/80 font-mono">Total Assignments</p>
                        </div>
                        
                        <div className="border border-foreground/20 rounded-lg p-6 text-center">
                            <h3 className="text-2xl font-bold text-foreground font-mono mb-2">{fall2025.length}</h3>
                            <p className="text-foreground/80 font-mono">Classes Enrolled</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
