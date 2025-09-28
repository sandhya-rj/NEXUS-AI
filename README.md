# NEXUS AI – Universal Web Intelligence Navigator

## 🚀 Revolutionary Autonomous Web Agent

NEXUS AI is a cutting-edge autonomous web navigation system that can intelligently browse any website, analyze products, gather news, and provide human-like interaction with the web.

## Project Title & Summary

- Project Title: `NEXUS-AI` (matches the GitHub repository name)

Project Summary (≤300 words):
NEXUS AI addresses the challenge of extracting useful information from diverse, ever-changing websites without site-specific integrations. It understands natural-language queries and autonomously navigates pages using human-like behaviors—scrolling, clicking, waiting, retrying—and structured extraction. The prototype combines a Node.js backend with Playwright‑driven automation and a lightweight real-time UI to show progress and results. It supports common tasks such as product comparison, news summarization, and cross‑site analysis while remaining configurable via `config.json`.

The proposed solution uses site adapters for major platforms (e.g., Amazon, Flipkart, Google, news portals) and generic fallbacks for arbitrary sites. A summarization and analysis layer transforms raw page data into concise insights. Voice interaction (Web Speech API) enables natural command-and-response operation. Error resilience and adaptive delays improve reliability and mimic real-user behavior.

Uniqueness and impact: Unlike static scrapers or single‑site bots, NEXUS AI is a universal navigator designed to generalize across sites and tasks. Its modular adapters, autonomous decision-making, and voice interface make it accessible and scalable for research, shopping, and news intelligence. By prioritizing local execution and consent, it balances capability with privacy and responsible automation.

## Problem Statement

## 📌 Problem Statement

Design and implement an autonomous web agent that can understand natural‑language queries and navigate arbitrary websites to retrieve, analyze, and summarize information (e.g., products, articles, comparisons) with minimal human supervision.

## 🧭 Proposal & Prototype Plan

- Phase 1: Core Setup
  - Establish Node.js backend (Express + WebSocket) and Playwright with Chromium.
  - Baseline frontend with real‑time status and logs.
- Phase 2: Autonomous Navigation
  - Implement human‑like actions: scrolling, clicking, waiting, retries, error recovery.
  - Site adapters for major platforms (Amazon, Flipkart, Google, News sites).
- Phase 3: Analysis & Summarization
  - Product spec extraction, review parsing, and scoring.
  - Article content extraction and concise summaries.
- Phase 4: Voice Interaction
  - Integrate Web Speech API for voice commands and responses.
- Phase 5: Evaluation & Telemetry
  - Structured logs, optional screenshots, and performance metrics.
  - Configurable behaviors via `config.json`.

## 🧰 Tech Stack Used

- Backend: Node.js, Express, WebSocket
- Automation: Playwright + Chromium
- Frontend: HTML5 with real‑time updates
- Voice: Web Speech API
- Config: JSON‑based (`config.json`)

## 👥 Contribution Details

Replace placeholders below with actual team member details via PRs to the `project-plan` branch.

| Name | GitHub | Role | Contributions |
|------|--------|------|---------------|
| Sandhya RJ | `@sandhya-rj` | Owner/Lead | Repo setup, planning, core automation |
| Member 1 | `@username1` | Backend | Express/WebSocket APIs, config mgmt |
| Member 2 | `@username2` | Automation | Playwright flows, site adapters |
| Member 3 | `@username3` | Frontend/Voice | UI, Web Speech integration |

### ✨ Key Features

- **Universal Intelligence**: Works with any query, product, news, or website
- **Autonomous Navigation**: Human-like browsing, scrolling, clicking, and analysis
- **Voice Interaction**: Natural voice commands and responses
- **Multi-Site Analysis**: Intelligent comparison across platforms
- **Real-time Analysis**: Instant product and content analysis
- **Error Resilience**: Adaptive learning and problem-solving

### 🛠️ Quick Start

1. Run setup (first time only):
   ```bash
   npm run setup
   ```

2. Start the system:
   ```bash
   npm start
   ```

3. Open browser to: http://localhost:3000

### 🎯 Usage Examples

- "Find best laptops under 50000"
- "What's the latest news about AI?"
- "Compare iPhone vs Samsung phones"
- "Charlie Kirk latest news"
- "Best headphones on Amazon"

### 🧠 AI Capabilities

- **Smart Query Processing**: Interprets natural language intelligently
- **Autonomous Site Navigation**: Browses like a human user
- **Product Analysis**: Deep specification and review analysis
- **News Summarization**: Intelligent article content extraction
- **Voice Interaction**: Natural conversation and feedback
- **Multi-Platform Search**: Amazon, Flipkart, Google News, and more

### 📋 System Requirements

- Node.js 18.0.0 or higher
- 4GB RAM minimum (8GB recommended)
- Internet connection
- Modern browser support

### 🔧 Configuration

Edit `config.json` to customize:
- Browser settings
- AI parameters
- Site preferences
- Voice options

### 🤖 Technical Architecture

- **Backend**: Node.js with Express and WebSocket
- **Browser Automation**: Playwright with Chromium
- **AI Processing**: Natural language understanding
- **Frontend**: Modern HTML5 with real-time updates
- **Voice**: Web Speech API integration

### 🛡️ Security & Privacy

- Local execution only
- No data stored remotely
- User consent for site navigation
- Respects robots.txt and site policies

### 📈 Performance

- Human-like delays and behavior
- Efficient resource usage
- Adaptive error handling
- Scalable architecture

### 🆘 Troubleshooting

If you encounter issues:

1. Run setup again: `npm run setup`
2. Check Node.js version: `node --version`
3. Reinstall browsers: `npm run install-browsers`
4. Test system: `npm test`

### 🔄 Updates

The system continuously learns and adapts. Regular updates include:
- Enhanced site compatibility
- Improved AI algorithms  
- New feature additions
- Performance optimizations

---

**Nexus AI - Where Artificial Intelligence Meets Universal Web Navigation**

## Contribution Details (5 Members)

| Name | GitHub | Email | Role | Contributions |
|------|--------|-------|------|---------------|
| Bala Vignesh (Team Leader) | `@username-lead` | rithvikkumae@gmail.com | Product & Architecture Lead | Roadmap, architecture, coordination, video lead |
| Sandhya RJ | `@sandhya-rj` | (not provided) | Automation & Orchestration | Repo setup, Playwright flows, data pipelines |
| Member 3 | `@username3` | tharungurusamy2006@gmail.com | Backend & APIs | Express/WebSocket services, config & persistence |
| Member 4 | `@username4` | prarthanabharathiraja@gmail.com | Frontend & Voice UX | Real-time UI, Web Speech integration |
| Member 5 | `@username5` | kcgopika0423@gmail.com | Site Adapters & QA | Cross‑site adapters, testing, evaluation |

Update GitHub handles and contributions via PRs on the `project-plan` branch.

## Video Pitch Submission (3–4 minutes, English)

- Every team member appears at least once.
- Each member: introduce themselves and explain their contribution.
- Suggested flow: team intro → problem understanding → prototype/solution overview → innovation & uniqueness → next steps/scalability.
- Format options: slideshow, infographic, flowchart, or screen share with voiceover.
- Upload to Google Drive with access set to “Anyone with the link can view”. Inaccessible links will be disqualified.

## Collaborators

- Add teammates as collaborators with write access using GitHub CLI:
  - `gh auth login`
  - `.\scripts\add-collaborators.ps1 -Repo "sandhya-rj/NEXUS-AI" -Users @("username-lead","username3","username4","username5") -Permission "push"`
  - Note: Collaborator invites require GitHub usernames (not emails). Please share the GitHub handles for the above emails.

## Dedicated Project Branch

- A dedicated branch `project-plan` has been created for planning and documentation. Create PRs into `main` after review.

## Submission Components (Round 1)

- Project Title & Summary
  - Title: `NEXUS-AI` (matches repository name).
  - Summary (≤300 words) covers: problem understanding, proposed prototype solution, uniqueness and impact.
- GitHub Repository
  - Dedicated project branch: `project-plan` (created).
  - Add all associate members as collaborators (write): see “Collaborators”.
  - README includes: problem statement chosen, detailed proposal & prototype plan, features to be implemented, tech stack used, and contribution details of each team member.
- Video Pitch Submission
  - Duration: Minimum 3 minutes and Maximum 4 minutes; Language: English only.
  - Rules: every team member must appear at least once; each member introduces themselves and explains their contribution.
  - After introduction, members may present a slideshow, infographic, flowchart, or screen share with voiceover.
  - Content to include: team introduction; problem understanding; prototype/solution overview; innovation & uniqueness; next steps/scalability.
  - Upload to Google Drive; set access to “Anyone with the link can view”. Submissions with inaccessible links will be disqualified.
