export const local = {
  cat_typing: '/gifs/cat_typing.gif',
  cat_sleep: '/gifs/cat_sleep.gif',
  cat_gamer: '/gifs/cat_gamer.gif',
  cat_course:'/gifs/cat_coding_course.gif',
  cat_mouth_open: '/gifs/cat_mouth_open.gif',
  cat_paw: '/gifs/cat_paw.gif',
  cat_api:'/gifs/cat_api.gif',
  sys_design:'/gifs/sys_design.gif',
  light_dsa: '/gifs/light_dsa.gif',
  deployment:'/gifs/deployment.gif',
  tech_sql: '/gifs/tech_sql.gif',
  server_flow: '/gifs/server_flow.gif',
  jenkins: '/gifs/jenkins.gif',
  docker: '/gifs/docker.gif',
  git: '/gifs/git.gif',
  placeholder: '/gifs/placeholder.png',
  sound: '/sounds/intro_chiptune.wav',
};

export const TAB_ORDER = ['vscode', 'genai', 'python', 'sql', 'dsa', 'deployment'];

export const detailed = {
  vscode: {
    id: 'vscode',
    title: 'VSCode',
    overview: 'Polish your editor: fast shortcuts, extensions, debugger, and workspace settings.',
    skills: ['VSCode basics', 'Debugging workflows','Using terminal and extensions'],
    tools: ['VSCode', 'Pylance', 'Postman', 'Prettier / Black', 'Jupyter extensions','Docker extension'],
    projects: ['Setup workspace with tasks'],
    weeks: [
      { title: 'Install & open project', tasks: ['Install VSCode, Refer to the youtube tutorials I attached'] },
      { title: 'Extensions', tasks: ['Refer to the yt vid. Basic extensions are Python, Pylance, GitLens, Docker, Prettier. To get custom themes in code to feel like a hacker search for themes in the extensions tab'] },
    ,
    ],
    resources: ['https://code.visualstudio.com/docs/python/python-tutorial','https://www.youtube.com/watch?v=ORrELERGIHs','https://www.youtube.com/watch?v=YjhkcvS1xKU'],
    gifs: [local.cat_gamer],
  },
 genai: {
  id: 'genai',
  title: 'GenAI',
  overview:
    "Learn how to actually talk to AI so it listens. This one's all about getting comfy with prompts, understanding how LLMs think, and learning what RAG is without getting lost in buzzwords. You'll figure out how to build a small AI helper that can fetch info, answer questions, and not hallucinate too hard.",
  skills: [
    'Prompt writing (structure, tone, examples)',
    'Understanding how LLMs process text',
    'RAG basics (Retrieval Augmented Generation)',
    'Calling APIs safely and handling responses',
    'Intro to building small chat assistants'
  ],
  tools: [
    'OpenAI Playground or API',
    'LangChain for chaining prompts',
    'tiktoken for token counting',
    'PGVector or Chroma for storing embeddings',
    'Streamlit for building your mini app'
  ],
  projects: [
    'Build a mini chatbot that answers questions from a text file or CSV.',
    'Experiment with prompts to see how small word changes affect results.',
    'Create a RAG demo: upload text, embed it, then ask questions based on it.',
    'Add a Streamlit UI so you can actually show it off.'
  ],
  weeks: [
    {
      title: 'Talk to the bot properly',
      tasks: [
        'Open OpenAI Playground and try short prompts. Notice how tone and phrasing change answers.',
        'Learn about temperature and tokens. High temperature = more creativity, low = more accuracy.',
        'Try few-shot prompting: give examples before asking your question.',
        'just testing these out on chatgpt and claude would also do'
      ]
    },
    {
      title: 'What even is RAG?',
      tasks: [
        'RAG stands for Retrieval Augmented Generation. It just means: let your AI look up facts before answering.',
        'Learn what embeddings are: turning text into math vectors so the AI can "search" through it.',
        'Use PGVector or Chroma to store and retrieve chunks of your data before sending it to the model.'
      ]
    },
    {
      title: 'Use it with code',
      tasks: [
        'Connect to the OpenAI API in Python and send a few test prompts.',
        'Use LangChain to chain prompts together or to plug in your RAG retriever.',
        'Add basic error handling so your app doesn’t break mid-convo.'
      ]
    },
    {
      title: 'Make it pretty and show it off',
      tasks: [
        'Build a small Streamlit app where you can upload text or CSV files and ask questions.',
        'Add your name, colors, maybe a gif so it feels like your vibe.',
        'Test it with your friends and tweak prompts till it sounds smart but not robotic.'
      ]
    }
  ],
  resources: [
    'https://www.youtube.com/watch?v=aOm75o2Z5-o',
    'https://www.youtube.com/watch?v=PLxpvtODiqs',
    'https://www.youtube.com/watch?v=tcqEUSNCn8I',
    'https://platform.openai.com/docs/',
    'https://learn.deeplearning.ai/chatgpt-prompt-eng/',
    'https://python.langchain.com/docs/get_started/',
    'https://www.trychroma.com/'
  ],
  gifs: [local.cat_course]
},

  python: {
  id: 'python',
  title: 'Python',
  overview:
    "This is where you go from writing random print statements to actually building stuff that works. You'll learn how to clean data, automate boring things, and even spin up a small API with Flask or FastAPI. The goal isn’t to become a Python monk, it's to make Python do what you want without crying.",
  skills: [
    'Python basics (loops, functions, imports, error handling)',
    'Working with data using pandas and numpy',
    'Writing small automation scripts',
    'Building simple APIs with Flask or FastAPI',
    'Testing your code with pytest',
    'Deploying with Streamlit or Vercel'
  ],
  tools: [
    'Python 3.10+',
    'VSCode (with Python extension)',
    'pandas, numpy, requests',
    'Flask or FastAPI'
  ],
  projects: [
    'Write a small Python script that cleans a messy CSV and exports the result.',
    'Automate a daily task, like sending yourself a summary of expenses or weather.',
    'Build a mini Flask or FastAPI app that returns data when you hit an endpoint.',
    'Make a Streamlit dashboard to visualize data interactively.'
  ],
  weeks: [
    {
      title: 'Basics that actually matter',
      tasks: [
        'Learn how to set up a virtual environment (venv or poetry).',
        'Understand variables, loops, lists, and functions by building tiny scripts.',
        'Play around in VSCode and learn how to run .py files and debug.'
      ]
    },
    {
      title: 'Data wrangling and quick wins',
      tasks: [
        'Learn pandas basics: reading CSVs, filtering rows, grouping, merging.',
        'Do small projects like cleaning up a dataset and exporting it.',
        'Get comfortable writing scripts that read, process, and save files.'
      ]
    },
    {
      title: 'APIs and automation',
      tasks: [
        'Use requests to call a public API (weather, cat facts, anything fun).',
        'Create a small Flask or FastAPI app with one or two endpoints that return JSON.',
        'Add simple error handling and print logs so you know what’s going on.'
      ]
    },
    {
      title: 'Testing, packaging, and showing off',
      tasks: [
        'Write your first test with pytest (even if it’s just one assert).',
        'Learn how to structure your project with folders and requirements.txt or poetry.',
        'Deploy a Streamlit app or push your Flask/FastAPI code to Vercel or Render.'
      ]
    }
  ],
  resources: [
    'https://www.youtube.com/watch?v=JVQNywo4AbU',
    'https://docs.python.org/3/tutorial/',
    'https://pandas.pydata.org/docs/',
    'https://fastapi.tiangolo.com/',
    'https://flask.palletsprojects.com/',
    'https://streamlit.io/'
  ],
  gifs: [local.cat_paw]
},

  sql: {
  id: 'sql',
  title: 'SQL & ETL',
  overview:
    "This is where you stop being the person who waits for 'cleaned data' and start being the one who makes it. You’ll learn how to pull raw data, transform it, and set up small ETL pipelines that feed clean tables into dashboards or apps. Basically: how to make data go from chaos to ready-to-use.",
  skills: [
    'Core SQL (SELECT, WHERE, GROUP BY, JOINS)',
    'Aggregations and window functions',
    'Designing clean, reusable queries',
    'Building simple ETL (Extract, Transform, Load) flows',
    'Connecting SQL with Python using SQLAlchemy',
    'Working with dbt for transformations'
  ],
  tools: [
    'PostgreSQL or SQLite',
    'Glue/Databricks for job runs',
    'SQLAlchemy (Python ORM)',
    'dbt (data build tool)',
    'VSCode SQL Tools / DBeaver / TablePlus',
    'pandas for quick testing and exports'
  ],
  projects: [
    'Take a messy CSV, load it into Postgres, and write SQL to clean and aggregate it.',
    'Build a small ETL Python script that runs queries, transforms the output, and saves it as a clean table.',
    'Use dbt to define models and document your transformations.',
    'Connect your final table to a Streamlit or Tableau dashboard and make it visual.'
  ],
  weeks: [
    {
      title: 'Learn how data talks',
      tasks: [
        'Understand what databases are and how tables relate.',
        'Play with SELECT, WHERE, and GROUP BY until it feels natural.',
        'Use a sample dataset (like Netflix titles or sales) and run some basic queries.'
      ]
    },
    {
      title: 'Joins and logic',
      tasks: [
        'Learn how to join tables — INNER, LEFT, RIGHT — and when to use each.',
        'Practice combining data from multiple sources cleanly.',
        'Write readable queries with clear aliases and comments.'
      ]
    },
    {
      title: 'Make your data smarter',
      tasks: [
        'Learn window functions like ROW_NUMBER, RANK, and moving averages.',
        'Understand indexing and query plans (just enough to not crash your database).',
        'Experiment with CTEs (WITH queries) to make queries more modular.'
      ]
    },
    {
      title: 'ETL pipelines',
      tasks: [
        'Use Python + SQLAlchemy to connect to a database and fetch data.',
        'Write a small script that extracts raw data, transforms it in pandas, and pushes it back to SQL.',
        'Use dbt to turn transformations into versioned, tested models.',
        'Learn how to create Glue Jobs or Databricks jobs to schedule ETLs.'
      ]
    }
  ],
  resources: [
    'https://www.youtube.com/watch?v=dfouoh9QdUw',
    'https://www.youtube.com/watch?v=76nW5QeXFeU',
    'https://mode.com/sql-tutorial/',
    'https://docs.getdbt.com/',
    'https://www.sqltutorial.org/',
    'https://www.sqlalchemy.org/',
    'https://pandas.pydata.org/docs/'
  ],
  gifs: [local.cat_mouth_open]
},

  dsa: {
    id: 'dsa',
    title: 'Light DSA',
    overview: 'Develop algorithmic patterns over time.',
    skills: ['Basic DSA'],
    tools: ['LeetCode'],
    projects: ['Repo of solved problems.'],
    weeks: [{ title: 'Ongoing', tasks: ['3 problems/week on leetcode should be fine. Start with ez ones like two-sum, etc'] }],
    resources:['https://leetcode.com/','https://usaco.guide/CPH.pdf'],
    gifs: [local.light_dsa],
  },
  deployment: {
  id: 'deployment',
  title: 'Deployment & Environments',
  overview:
    "This part isn’t about you spinning up servers or writing Dockerfiles from scratch. It’s more about understanding how code moves from your laptop to production, how versions are tracked, and how teams keep things stable. Think of it as learning the lingo so you can work smoothly with devs and not panic when someone says 'CI pipeline failed'.",
  skills: [
    'Version control with Git',
    'Understanding branches (main, dev, feature)',
    'Knowing what Docker and Jenkins do',
    'Basic idea of CI/CD pipelines',
    'How environments differ (dev, UAT, production)'
  ],
  tools: [
    'Git and GitHub (commit, push, pull, branches)',
    'Docker (containers, images, just the idea of them)',
    'Jenkins (build automation, know what it’s for)'
  ],
  projects: [
    'Set up a personal GitHub repo for your code.',
    'Learn how to make commits, branches, and pull requests.',
    'Go through fun public repos like https://github.com/mroth/git-muzak',
    'Read through a sample Dockerfile and Jenkins pipeline online, just to know what they look like.',
    'Ask a dev friend or mentor to explain how your project would move from dev → testing → production.'
  ],
  weeks: [
    {
      title: 'Get comfy with Git',
      tasks: [
        'Install Git and connect it to GitHub.',
        'Learn how to commit, push, pull, and branch safely.',
        'Understand why version control saves your sanity.'
      ]
    },
    {
      title: 'Environments 101',
      tasks: [
        'Learn what “dev”, “UAT”, and “prod” mean — basically test → preview → live.',
        'Understand that different environments exist to catch bugs before users see them.',
        'Look at one real-world example of environment setup on GitHub or YouTube.'
      ]
    },
    {
      title: 'Docker & Jenkins (just to know)',
      tasks: [
        'Learn what Docker does: it packages an app so it runs the same everywhere.',
        'Learn what Jenkins does: it automates testing and deployment.',
        'You don’t have to use them yourself just understand their role in the bigger picture.'
      ]
    }
  ],
  resources: [
    'https://www.youtube.com/watch?v=a9u2yZvsqHA',
    'https://git-scm.com/doc',
    'https://docs.github.com/en/get-started',
    'https://www.youtube.com/watch?v=Gjnup-PuquQ ',
    'https://www.docker.com/resources/what-container/',
    'https://www.jenkins.io/doc/'
  ],
  gifs: [local.deployment]
},

};
