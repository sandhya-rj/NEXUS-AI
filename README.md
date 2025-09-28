# NEXUS AI – The Intelligent Web Navigator That Thinks Like You  

Unlike traditional chatbots that only provide answers, **NEXUS AI goes a step further**: it **autonomously browses websites, searches for products or news, and analyzes content in real-time**—all while **mimicking human behavior**. Scrolls, clicks, waits, retries, and adapts like a real person navigating the web.  

Ask it to compare laptops, fetch the latest news, or analyze products across multiple platforms, and Nexus AI will open the browser, navigate pages intelligently, and present structured insights. It’s **not just a chatbot; it’s your personal web intelligence assistant**—universal, autonomous, and highly adaptable.  

---

## 🚀 Project Title & Summary

**Project Title:** `NEXUS-AI`  

**Project Summary:**  
NEXUS AI is an autonomous web navigation system designed to intelligently browse any website, analyze products, gather news, and provide human-like interaction. It addresses the challenge of extracting useful information from diverse, dynamic websites without requiring site-specific integrations. Users can input natural-language queries, and NEXUS AI navigates pages autonomously—scrolling, clicking, waiting, and retrying—to retrieve structured insights.

The prototype integrates a Node.js backend with Playwright for browser automation and a lightweight real-time frontend. It supports common tasks such as product comparison, news summarization, and cross-platform analysis. Voice interaction via the Web Speech API enables natural command-and-response operation. Error resilience, adaptive delays, and site adapters for major platforms ensure reliability and scalability.

**Uniqueness & Impact:**  
Unlike conventional scrapers or bots limited to specific sites, NEXUS AI generalizes across multiple websites and tasks. Its modular architecture, autonomous decision-making, and voice interface make it an innovative solution for research, shopping, and news intelligence, all while prioritizing local execution and user privacy.

---

## 📌 Problem Statement

Design and implement an **autonomous web agent** that can understand natural-language queries and navigate arbitrary websites to retrieve, analyze, and summarize information (e.g., products, articles, comparisons) with minimal human supervision.

---

## 🧭 Proposal & Prototype Plan

**Phase 1: Core Setup**  
- Node.js backend (Express + WebSocket) and Playwright with Chromium.  
- Basic frontend with real-time status and logs.

**Phase 2: Autonomous Navigation**  
- Human-like browsing actions: scrolling, clicking, waiting, retries, error recovery.  
- Site adapters for major platforms (Amazon, Flipkart, Google, news sites).

**Phase 3: Analysis & Summarization**  
- Product specification extraction, review parsing, and scoring.  
- Article content extraction and concise summaries.

**Phase 4: Voice Interaction**  
- Integration with Web Speech API for natural voice commands and responses.

**Phase 5: Evaluation & Telemetry**  
- Structured logs, optional screenshots, and performance metrics.  
- Configurable behaviors via `config.json`.

---

## ✨ Key Features

- **Universal Intelligence:** Works with any query, product, news, or website.  
- **Autonomous Navigation:** Human-like browsing, scrolling, clicking, and analysis.  
- **Voice Interaction:** Natural voice commands and responses.  
- **Multi-Site Analysis:** Intelligent comparison across platforms.  
- **Real-Time Analysis:** Instant product and content analysis.  
- **Error Resilience:** Adaptive learning and problem-solving.  

---

## 🧰 Tech Stack Used

- **Backend:** Node.js, Express, WebSocket  
- **Automation:** Playwright + Chromium  
- **Frontend:** HTML5 with real-time updates  
- **Voice:** Web Speech API  
- **Configuration:** JSON (`config.json`)  

---

## 🛠️ Quick Start

1. Install dependencies (first time only):  
   ```bash
   npm run setup
Start the system:

bash
Copy code
npm start
Open browser: http://localhost:3000

🎯 Usage Examples
"Find best laptops under 50000"

"What's the latest news about AI?"

"Compare iPhone vs Samsung phones"

"Charlie Kirk latest news"

"Best headphones on Amazon"

📋 System Requirements
Node.js 18.0.0 or higher

4GB RAM minimum (8GB recommended)

Internet connection

Modern browser support

🔧 Configuration
Edit config.json to customize:

Browser settings

AI parameters

Site preferences

Voice options

🤖 Technical Architecture
Backend: Node.js with Express and WebSocket

Browser Automation: Playwright with Chromium

AI Processing: Natural language understanding

Frontend: Modern HTML5 with real-time updates

Voice: Web Speech API integration

👥 Team Contributions
Name	GitHub	Role	Contributions

Bala Vignesh VT-lead	Team Lead	Roadmap, architecture, coordination, video lead
Sandhya RJ-Automation & Orchestration	Repo setup, Frontend & Voice UX	Real-time UI, Web Speech integration
Prarthana B-Playwright flows, data pipelines
Gopika Sree KC-Site Adapters & QA, Cross-site adapters, testing, evaluation
Tharun Gurusamy-Backend & APIs, Express/WebSocket services, config & persistence

🆘 Troubleshooting
Run setup again: npm run setup

Check Node.js version: node --version

Reinstall browsers: npm run install-browsers

Test system: npm test

🔄 Updates
The system continuously learns and adapts. Regular updates include:

Enhanced site compatibility

Improved AI algorithms

New feature additions

Performance optimizations
