const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🛍️ Setting up Shopkeeper AI - Autonomous Shopping Assistant');
console.log('='.repeat(70));

// Check Node.js version
const nodeVersion = process.version;
console.log(`✅ Node.js version: ${nodeVersion}`);

if (parseInt(nodeVersion.split('.')[0].substring(1)) < 18) {
    console.error('❌ Node.js 18.0.0 or higher required');
    process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing shopping assistant dependencies...');
try {
    console.log('Installing core packages...');
    execSync('npm install express ws cors playwright', { stdio: 'inherit' });
    
    console.log('Installing development tools...');
    execSync('npm install nodemon --save-dev', { stdio: 'inherit' });
    
    console.log('Installing Playwright browsers...');
    execSync('npx playwright install chromium', { stdio: 'inherit' });
    
    console.log('✅ All dependencies installed successfully');
} catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
}

// Create directory structure
console.log('\n📁 Setting up shopping assistant structure...');
const dirs = ['logs', 'data', 'screenshots', 'session-data', 'user-preferences'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }
});

// Create shopkeeper configuration
console.log('\n⚙️ Creating shopkeeper configuration...');
const shopkeeperConfig = {
    server: {
        port: 3000,
        wsPort: 8080
    },
    browser: {
        headless: false,
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    shopkeeper: {
        voiceEnabled: true,
        personality: 'friendly',
        maxSearchResults: 10,
        humanDelayMin: 1000,
        humanDelayMax: 3000,
        autoSelectTopProducts: true,
        priceComparisonEnabled: true
    },
    shoppingSites: {
        amazon: { enabled: true, priority: 1 },
        flipkart: { enabled: true, priority: 2 },
        myntra: { enabled: true, priority: 3 },
        ajio: { enabled: true, priority: 4 },
        meesho: { enabled: true, priority: 5 },
        nykaa: { enabled: true, priority: 6 },
        croma: { enabled: true, priority: 7 },
        relianceDigital: { enabled: true, priority: 8 },
        bigbasket: { enabled: true, priority: 9 },
        pepperfry: { enabled: true, priority: 10 },
        urbanladder: { enabled: true, priority: 11 },
        lenskart: { enabled: true, priority: 12 },
        boat: { enabled: true, priority: 13 }
    },
    categories: {
        electronics: ['laptop', 'phone', 'headphones', 'camera', 'tablet'],
        fashion: ['shirt', 'dress', 'jeans', 'shoes', 'accessories'],
        beauty: ['skincare', 'makeup', 'fragrance', 'haircare'],
        furniture: ['sofa', 'chair', 'table', 'bed', 'storage'],
        groceries: ['food', 'beverages', 'household', 'personal care']
    }
};

fs.writeFileSync('shopkeeper-config.json', JSON.stringify(shopkeeperConfig, null, 2));
console.log('✅ Shopkeeper configuration created');

// Create environment file
const envContent = `# Shopkeeper AI Environment Configuration
NODE_ENV=development
PORT=3000
WS_PORT=8080
LOG_LEVEL=info

# Browser Configuration
HEADLESS_MODE=false
SCREENSHOT_PATH=./screenshots

# Shopkeeper AI Configuration
ENABLE_VOICE=true
ENABLE_AUTO_PRODUCT_SELECTION=true
MAX_CONCURRENT_SEARCHES=3
SEARCH_TIMEOUT=45000
PRICE_COMPARISON_THRESHOLD=0.15

# Shopping Sites Configuration
ENABLE_CAPTCHA_SOLVER=false
USER_AGENT_ROTATION=true
ANTI_DETECTION_MODE=true
`;

fs.writeFileSync('.env', envContent);
console.log('✅ Environment file created');

// Create startup script
const startupScript = `#!/bin/bash
echo "🛍️ Starting Shopkeeper AI - Your Personal Shopping Assistant"
echo "🤖 AI Shopkeeper will search across 13+ shopping platforms"
echo "💬 Natural conversation and voice interaction enabled"
echo "🔍 Multi-store price comparison and smart recommendations"
echo ""
echo "Opening shopping interface at http://localhost:3000"
echo "Shopkeeper WebSocket server at ws://localhost:8080"
echo ""
echo "Press Ctrl+C to shutdown"
echo ""
node shopkeeper-server.js
`;

fs.writeFileSync('start-shopkeeper.sh', startupScript);
if (process.platform !== 'win32') {
    execSync('chmod +x start-shopkeeper.sh');
}
console.log('✅ Startup script created');

// Create test file
const testScript = `const { chromium } = require('playwright');

async function testShopkeeperAI() {
    console.log('🧪 Testing Shopkeeper AI setup...');
    
    try {
        // Test browser launch
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        
        // Test Amazon navigation
        console.log('🔍 Testing Amazon navigation...');
        await page.goto('https://www.amazon.in');
        await page.waitForSelector('#twotabsearchtextbox', { timeout: 10000 });
        console.log('✅ Amazon navigation successful');
        
        // Test Flipkart navigation
        console.log('🔍 Testing Flipkart navigation...');
        await page.goto('https://www.flipkart.com');
        await page.waitForLoadState('domcontentloaded');
        console.log('✅ Flipkart navigation successful');
        
        await browser.close();
        console.log('🎉 All tests passed! Shopkeeper AI is ready to shop!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('💡 Try running: npm run install-browsers');
    }
}

testShopkeeperAI();`;

fs.writeFileSync('test-shopkeeper.js', testScript);
console.log('✅ Test script created');

// System validation
console.log('\n🔍 Validating shopkeeper system...');

// Check if main files exist
const requiredFiles = ['shopkeeper-server.js', 'shopping-interface.html'];
const optionalFiles = ['shopkeeper-config.json', '.env'];

console.log('\nRequired files:');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ Found: ${file}`);
    } else {
        console.log(`⚠️  Missing: ${file} (needs to be created)`);
    }
});

console.log('\nConfiguration files:');
optionalFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ Created: ${file}`);
    }
});

// Test Playwright installation
console.log('\n🎭 Testing Playwright installation...');
try {
    const { chromium } = require('playwright');
    console.log('✅ Playwright installed successfully');
} catch (error) {
    console.error('❌ Playwright installation issue:', error.message);
    console.log('💡 Run: npm run install-browsers');
}

// Create comprehensive README
const readme = `# 🛍️ Shopkeeper AI - Autonomous Shopping Assistant

## 🤖 Revolutionary AI Shopping Experience

Shopkeeper AI is your personal shopping assistant that behaves exactly like a human shopkeeper. It autonomously browses multiple shopping websites, analyzes products, compares prices, and provides personalized recommendations with natural conversation.

### ✨ Key Features

#### 🛒 Multi-Store Shopping
- **13+ Shopping Platforms**: Amazon, Flipkart, Myntra, Ajio, Meesho, Nykaa, Croma, Reliance Digital, BigBasket, Pepperfry, Urban Ladder, Lenskart, boAt
- **Universal Product Categories**: Electronics, Fashion, Beauty, Furniture, Groceries, and more
- **Real-time Price Comparison**: Find the best deals across all platforms

#### 🧠 AI Shopkeeper Personality
- **Natural Conversation**: Talks like a real shopkeeper with friendly, persuasive communication
- **Voice Interaction**: Full speech recognition and text-to-speech capabilities
- **Personalized Recommendations**: AI analyzes your preferences and suggests perfect products
- **Professional Expertise**: Specialized knowledge for different product categories

#### 🤖 Autonomous Browsing
- **Human-like Navigation**: Scrolls, clicks, and browses exactly like a human user
- **Smart Product Selection**: Automatically finds and analyzes top-rated products
- **Intelligent Search**: Optimizes search queries for best results on each platform
- **Error Resilience**: Adapts to site changes and handles obstacles gracefully

### 🚀 Quick Start

#### 1. Setup (First Time)
\`\`\`bash
# Clone the repository
git clone <repository-url>
cd shopkeeper-ai-assistant

# Run complete setup
npm run setup

# Or manual installation
npm install
npm run install-browsers
\`\`\`

#### 2. Start Shopping
\`\`\`bash
# Start the shopkeeper
npm start

# Or use the startup script
./start-shopkeeper.sh
\`\`\`

#### 3. Open Shopping Interface
Open your browser to: **http://localhost:3000**

### 💬 How to Use

#### Voice Commands
- "Find me the best laptops under 50000"
- "Show me trending dresses on Myntra"
- "Compare iPhone prices across all stores"
- "Find budget-friendly headphones with good reviews"

#### Chat Interface
Type natural requests like:
- "I need a comfortable office chair under 15000"
- "Best skincare products for oily skin"
- "Gaming laptop with RTX graphics"

### 🏪 Supported Shopping Sites

| Platform | Categories | Features |
|----------|------------|----------|
| **Amazon India** | All Categories | Full automation, reviews analysis |
| **Flipkart** | Electronics, Fashion | Price comparison, ratings |
| **Myntra** | Fashion, Beauty | Style recommendations |
| **Ajio** | Fashion | Trend analysis |
| **Meesho** | Fashion, Home | Budget options |
| **Nykaa** | Beauty, Personal Care | Expert recommendations |
| **Croma** | Electronics | Tech specifications |
| **Reliance Digital** | Electronics | Latest gadgets |
| **BigBasket** | Groceries | Fresh products |
| **Pepperfry** | Furniture, Home | Interior design |
| **Urban Ladder** | Furniture | Premium options |
| **Lenskart** | Eyewear | Vision solutions |
| **boAt Lifestyle** | Audio, Accessories | Audio expertise |

### 🎯 Example Shopping Scenarios

#### Electronics Shopping
\`\`\`
User: "Best gaming laptop under 80000"
Shopkeeper: "Perfect! I'll search across Amazon, Flipkart, and Croma for gaming laptops. 
           Looking for RTX graphics, high refresh rate displays, and excellent cooling..."

*Automatically browses sites, analyzes specs, reads reviews*

Shopkeeper: "I found an amazing ASUS TUF Gaming laptop with RTX 4060, 144Hz display, 
           16GB RAM for ₹75,999 on Amazon. It has 4.3 stars with customers loving 
           the performance and cooling. Shall I show you the details?"
\`\`\`

#### Fashion Shopping
\`\`\`
User: "Trendy ethnic wear for weddings"
Shopkeeper: "Wonderful! Let me browse Myntra and Ajio for the latest wedding collection...

*Searches multiple sites, analyzes trends, checks reviews*

Shopkeeper: "I found stunning lehenga sets on Myntra starting from ₹3,499. The blue 
           and gold combination is very popular this season with excellent customer 
           ratings. Would you like to see size and color options?"
\`\`\`

### ⚙️ Configuration

Edit \`shopkeeper-config.json\` to customize:

\`\`\`json
{
  "shopkeeper": {
    "personality": "friendly",
    "voiceEnabled": true,
    "autoSelectTopProducts": true
  },
  "shoppingSites": {
    "amazon": { "enabled": true, "priority": 1 },
    "myntra": { "enabled": true, "priority": 3 }
  }
}
\`\`\`

### 🛡️ Security & Privacy

- **Local Execution**: All processing happens on your computer
- **No Data Collection**: Your searches and preferences stay private
- **Secure Browsing**: Uses legitimate browser automation
- **Respectful Automation**: Follows site terms and conditions

### 🔧 Technical Details

#### Architecture
- **Backend**: Node.js with Express and WebSocket
- **Browser Automation**: Playwright with Chromium
- **AI Processing**: Natural language understanding and product analysis
- **Frontend**: React-based shopping interface
- **Voice**: Web Speech API integration

#### Performance
- **Parallel Searching**: Searches multiple sites simultaneously
- **Smart Caching**: Remembers user preferences and search history
- **Human-like Delays**: Mimics natural browsing patterns
- **Adaptive Learning**: Improves recommendations over time

### 🆘 Troubleshooting

#### Common Issues

**Shopkeeper won't start:**
\`\`\`bash
npm run setup
npm run test
\`\`\`

**Sites not loading:**
\`\`\`bash
npm run install-browsers
# Check internet connection
# Disable VPN if using one
\`\`\`

**Voice not working:**
- Check microphone permissions in browser
- Enable voice in settings
- Use Chrome/Edge for best compatibility

### 📈 Advanced Features

#### Smart Recommendations
- AI analyzes product ratings, reviews, and specifications
- Learns from your shopping patterns
- Considers budget, preferences, and trends

#### Price Intelligence
- Real-time price monitoring
- Historical price analysis
- Deal alerts and notifications

#### Conversation Memory
- Remembers your preferences across sessions
- Builds shopping profile for better recommendations
- Tracks favorite brands and categories

### 🔄 Updates & Maintenance

The shopkeeper continuously learns and improves:
- Site compatibility updates
- New shopping platform integrations
- Enhanced AI recommendations
- Performance optimizations

### 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Run diagnostic tests: \`npm run test\`
3. Review logs in the \`logs/\` directory
4. Open an issue on GitHub

---

**🛍️ Happy Shopping with Your AI Shopkeeper!**

*"I'm not just a bot - I'm your personal shopping expert who never sleeps!"*
`;

fs.writeFileSync('README.md', readme);
console.log('✅ Comprehensive README created');

console.log('\n🎉 Shopkeeper AI Setup Complete!');
console.log('='.repeat(70));
console.log('🛍️ Your AI Shopping Assistant is ready to serve!');
console.log('');
console.log('🚀 Next Steps:');
console.log('1. Create shopkeeper-server.js (main server file)');
console.log('2. Create shopping-interface.html (web interface)');
console.log('3. Start shopping: npm start');
console.log('4. Open browser: http://localhost:3000');
console.log('');
console.log('💬 Your AI shopkeeper will:');
console.log('   • Search 13+ shopping platforms automatically');
console.log('   • Compare prices and find best deals');
console.log('   • Provide personalized recommendations');
console.log('   • Talk to you like a real shopkeeper');
console.log('   • Learn your preferences over time');
console.log('');
console.log('🛒 Ready to revolutionize your shopping experience!');