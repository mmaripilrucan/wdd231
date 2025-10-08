// Simulated API data
const blogData = [
    { id: 1, title: "5 Steps to Retirement Readiness", date: "2025-04-01", excerpt: "Learn how to calculate your retirement number and build a sustainable income stream.", readTime: "5 min" },
    { id: 2, title: "Tax Loss Harvesting Explained", date: "2025-03-28", excerpt: "Reduce your tax bill by strategically selling losing investments.", readTime: "4 min" },
    { id: 3, title: "Why Diversification Matters", date: "2025-03-20", excerpt: "How spreading risk can protect your portfolio during market downturns.", readTime: "6 min" },
    { id: 4, title: "Estate Planning Basics", date: "2025-03-15", excerpt: "Ensure your assets go to the right people with these essential documents.", readTime: "7 min" },
    { id: 5, title: "How Inflation Impacts Your Savings", date: "2025-03-10", excerpt: "Strategies to preserve purchasing power over time.", readTime: "5 min" },
    { id: 6, title: "Roth vs Traditional IRA", date: "2025-03-05", excerpt: "Which retirement account is right for your tax situation?", readTime: "6 min" },
    { id: 7, title: "Building an Emergency Fund", date: "2025-02-28", excerpt: "Why 3-6 months of expenses is non-negotiable.", readTime: "3 min" },
    { id: 8, title: "Understanding Mutual Funds", date: "2025-02-20", excerpt: "A beginner’s guide to pooled investment vehicles.", readTime: "5 min" },
    { id: 9, title: "The Power of Compound Interest", date: "2025-02-15", excerpt: "How small, consistent investments grow into large sums.", readTime: "4 min" },
    { id: 10, title: "Healthcare Costs in Retirement", date: "2025-02-10", excerpt: "Planning for medical expenses after 65.", readTime: "6 min" },
    { id: 11, title: "Social Security Strategies", date: "2025-02-05", excerpt: "When to claim for maximum lifetime benefits.", readTime: "7 min" },
    { id: 12, title: "Budgeting for Financial Freedom", date: "2025-01-30", excerpt: "Track spending, reduce waste, invest the difference.", readTime: "5 min" },
    { id: 13, title: "Debt Snowball vs Avalanche", date: "2025-01-25", excerpt: "Two popular methods to eliminate debt faster.", readTime: "4 min" },
    { id: 14, title: "Teaching Kids About Money", date: "2025-01-20", excerpt: "Age-appropriate lessons to raise financially smart children.", readTime: "5 min" },
    { id: 15, title: "Market Volatility: What to Do", date: "2025-01-15", excerpt: "Stay calm and stick to your plan during market swings.", readTime: "4 min" }
];

const toolData = [
    { id: 1, toolName: "Compound Interest Calculator", description: "See how your money grows over time with reinvested earnings.", category: "Investment", difficultyLevel: "Beginner" },
    { id: 2, toolName: "Retirement Savings Estimator", description: "Calculate how much you need to save monthly to retire comfortably.", category: "Retirement", difficultyLevel: "Intermediate" },
    { id: 3, toolName: "Tax Bracket Analyzer", description: "See which federal tax bracket you’re in and how deductions affect it.", category: "Tax", difficultyLevel: "Intermediate" },
    { id: 4, toolName: "Estate Distribution Planner", description: "Visualize how your assets will be distributed to heirs.", category: "Estate", difficultyLevel: "Advanced" },
    { id: 5, toolName: "Risk Tolerance Quiz", description: "Determine your comfort level with market ups and downs.", category: "Investment", difficultyLevel: "Beginner" },
    { id: 6, toolName: "College Savings Projector", description: "Estimate future tuition costs and how much to save now.", category: "Investment", difficultyLevel: "Intermediate" },
    { id: 7, toolName: "Debt Payoff Calculator", description: "Compare payoff timelines using snowball vs avalanche methods.", category: "Tax", difficultyLevel: "Beginner" },
    { id: 8, toolName: "Social Security Optimizer", description: "Find your ideal claiming age based on life expectancy.", category: "Retirement", difficultyLevel: "Advanced" },
    { id: 9, toolName: "Emergency Fund Builder", description: "Set monthly savings goals to reach 6 months of expenses.", category: "Investment", difficultyLevel: "Beginner" },
    { id: 10, toolName: "Asset Allocation Guide", description: "Recommended stock/bond splits based on age and goals.", category: "Investment", difficultyLevel: "Intermediate" },
    { id: 11, toolName: "RMD Calculator", description: "Calculate Required Minimum Distributions from retirement accounts.", category: "Retirement", difficultyLevel: "Advanced" },
    { id: 12, toolName: "Charitable Giving Planner", description: "Maximize tax deductions while supporting causes you love.", category: "Tax", difficultyLevel: "Intermediate" },
    { id: 13, toolName: "Insurance Needs Analyzer", description: "Determine how much life, disability, and long-term care coverage you need.", category: "Estate", difficultyLevel: "Intermediate" },
    { id: 14, toolName: "Net Worth Tracker", description: "Monitor your assets minus liabilities over time.", category: "Investment", difficultyLevel: "Beginner" },
    { id: 15, toolName: "Inflation Adjuster", description: "See how inflation erodes purchasing power — and how to fight back.", category: "Retirement", difficultyLevel: "Intermediate" }
];

const testimonialData = [
    { id: 1, clientName: "Sarah K.", testimonial: "Alquimia Financiera Consultores helped me restructure my portfolio and save over $10k in taxes last year. Worth every penny!", rating: 5, serviceUsed: "Tax Planning" },
    { id: 2, clientName: "James T.", testimonial: "I was overwhelmed by retirement options. Alquimia Financiera Consultores simplified everything and gave me peace of mind.", rating: 5, serviceUsed: "Retirement Planning" },
    { id: 3, clientName: "Linda M.", testimonial: "After my husband passed, Alquimia Financiera Consultores helped me navigate the estate process with compassion and expertise.", rating: 5, serviceUsed: "Estate Planning" },
    { id: 4, clientName: "David R.", testimonial: "The compound interest calculator opened my eyes. I started investing early thanks to Alquimia Financiera Consultores’s tools.", rating: 4, serviceUsed: "Investment Planning" },
    { id: 5, clientName: "Priya S.", testimonial: "Clear, patient, and no jargon. Alquimia Financiera Consultores explains complex topics in a way anyone can understand.", rating: 5, serviceUsed: "Financial Education" },
    { id: 6, clientName: "Tom & Lisa W.", testimonial: "Our family’s financial future is secure because of Alquimia Financiera Consultores’s comprehensive plan.", rating: 5, serviceUsed: "Family Wealth Planning" },
    { id: 7, clientName: "Carlos D.", testimonial: "I went from living paycheck to paycheck to building real wealth. Thank you, Alquimia Financiera Consultores!", rating: 5, serviceUsed: "Budget Coaching" },
    { id: 8, clientName: "Aisha N.", testimonial: "The risk tolerance quiz helped me avoid panic selling during the last market dip.", rating: 4, serviceUsed: "Investment Planning" },
    { id: 9, clientName: "Robert G.", testimonial: "Alquimia Financiera Consultores found deductions I didn’t know existed. My refund doubled!", rating: 5, serviceUsed: "Tax Planning" },
    { id: 10, clientName: "Emily Z.", testimonial: "As a single mom, I thought I couldn’t afford planning. Alquimia Financiera Consultores  made it accessible and affordable.", rating: 5, serviceUsed: "Personal Finance" },
    { id: 11, clientName: "Kenji T.", testimonial: "The estate planner ensured my children and favorite charity are taken care of.", rating: 5, serviceUsed: "Estate Planning" },
    { id: 12, clientName: "Fatima A.", testimonial: "I sleep better at night knowing my retirement is on track. Alquimia Financiera Consultores  is a miracle company.", rating: 5, serviceUsed: "Retirement Planning" },
    { id: 13, clientName: "Marcus L.", testimonial: "No upselling, no pressure — just honest advice tailored to my goals.", rating: 5, serviceUsed: "Financial Consulting" },
    { id: 14, clientName: "Sophie B.", testimonial: "The tools section is a goldmine. I use the budget tracker weekly!", rating: 4, serviceUsed: "Financial Tools" },
    { id: 15, clientName: "Daniel P.", testimonial: "Professional, responsive, and truly cares about their clients’ success.", rating: 5, serviceUsed: "General Consulting" }
];

export { blogData, toolData, testimonialData };