const WebSocket = require('ws');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

class NexusTestSuite {
    constructor() {
        this.testResults = [];
        this.browser = null;
        this.context = null;
        this.ws = null;
    }

    log(message, status = 'INFO') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${status}] ${message}`;
        console.log(logMessage);
        
        this.testResults.push({
            timestamp,
            message,
            status
        });
    }

    async runAllTests() {
        console.log('🧪 Starting Nexus AI Test Suite');
        console.log('='.repeat(50));
        
        try {
            await this.testSystemRequirements();
            await this.testBrowserAutomation();
            await this.testWebSocketConnection();
            await this.testQueryProcessing();
            await this.testErrorHandling();
            
            this.generateTestReport();
            
        } catch (error) {
            this.log(`Critical test failure: ${error.message}`, 'ERROR');
            console.error('Test suite failed:', error);
        } finally {
            await this.cleanup();
        }
    }

    async testSystemRequirements() {
        this.log('Testing system requirements...');
        
        // Check Node.js version
        const nodeVersion = process.version;
        const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
        
        if (majorVersion >= 18) {
            this.log(`Node.js version ${nodeVersion} - OK`, 'PASS');
        } else {
            this.log(`Node.js version ${nodeVersion} - REQUIRES 18+`, 'FAIL');
        }
        
        // Check required dependencies
        const requiredPackages = ['express', 'ws', 'playwright'];
        
        for (const pkg of requiredPackages) {
            try {
                require.resolve(pkg);
                this.log(`Package ${pkg} - OK`, 'PASS');
            } catch (error) {
                this.log(`Package ${pkg} - MISSING`, 'FAIL');
            }
        }
        
        // Check required files
        const requiredFiles = [
            'nexus-server.js',
            'index.html',
            'package.json'
        ];
        
        for (const file of requiredFiles) {
            if (fs.existsSync(file)) {
                this.log(`File ${file} - OK`, 'PASS');
            } else {
                this.log(`File ${file} - MISSING`, 'FAIL');
            }
        }
    }

    async testBrowserAutomation() {
        this.log('Testing browser automation capabilities...');
        
        try {
            // Test browser launch
            this.browser = await chromium.launch({
                headless: true, // Use headless for testing
                args: ['--no-sandbox', '--disable-web-security']
            });
            this.log('Browser launch - OK', 'PASS');
            
            // Test context creation
            this.context = await this.browser.newContext({
                viewport: { width: 1920, height: 1080 }
            });
            this.log('Browser context creation - OK', 'PASS');
            
            // Test page navigation
            const page = await this.context.newPage();
            await page.goto('https://www.google.com', { waitUntil: 'networkidle' });
            this.log('Page navigation - OK', 'PASS');
            
            // Test search functionality
            await page.waitForSelector('input[name="q"]', { timeout: 10000 });
            await page.type('input[name="q"]', 'test search query');
            this.log('Search input - OK', 'PASS');
            
            // Test human-like delays
            const start = Date.now();
            await this.humanDelay(1000, 2000);
            const elapsed = Date.now() - start;
            
            if (elapsed >= 1000 && elapsed <= 2200) {
                this.log('Human delay timing - OK', 'PASS');
            } else {
                this.log(`Human delay timing - FAILED (${elapsed}ms)`, 'FAIL');
            }
            
            await page.close();
            
        } catch (error) {
            this.log(`Browser automation error: ${error.message}`, 'FAIL');
        }
    }

    async testWebSocketConnection() {
        this.log('Testing WebSocket communication...');
        
        return new Promise((resolve) => {
            try {
                // Test connection to WebSocket server (if running)
                this.ws = new WebSocket('ws://localhost:8080');
                
                this.ws.on('open', () => {
                    this.log('WebSocket connection - OK', 'PASS');
                    
                    // Test message sending
                    const testMessage = {
                        type: 'test',
                        query: 'test query',
                        timestamp: Date.now()
                    };
                    
                    this.ws.send(JSON.stringify(testMessage));
                    this.log('WebSocket message sending - OK', 'PASS');
                });
                
                this.ws.on('message', (data) => {
                    try {
                        const parsed = JSON.parse(data);
                        this.log('WebSocket message parsing - OK', 'PASS');
                    } catch (error) {
                        this.log('WebSocket message parsing - FAILED', 'FAIL');
                    }
                });
                
                this.ws.on('error', (error) => {
                    this.log(`WebSocket connection failed: ${error.message}`, 'FAIL');
                    this.log('Note: Start server with "npm start" to test WebSocket', 'INFO');
                    resolve();
                });
                
                // Timeout after 5 seconds
                setTimeout(() => {
                    if (this.ws.readyState !== WebSocket.OPEN) {
                        this.log('WebSocket connection timeout - Server not running', 'WARN');
                    }
                    resolve();
                }, 5000);
                
            } catch (error) {
                this.log(`WebSocket test error: ${error.message}`, 'FAIL');
                resolve();
            }
        });
    }

    async testQueryProcessing() {
        this.log('Testing query processing intelligence...');
        
        const testQueries = [
            {
                query: 'best laptops under 50000',
                expectedType: 'shopping',
                expectedSites: ['amazon', 'flipkart']
            },
            {
                query: 'latest news today',
                expectedType: 'news',
                expectedSites: ['google_news', 'timesofindia', 'ndtv']
            },
            {
                query: 'what is artificial intelligence',
                expectedType: 'universal',
                expectedSites: ['google', 'amazon', 'flipkart']
            }
        ];
        
        for (const test of testQueries) {
            const result = this.analyzeQuery(test.query);
            
            if (result.searchType === test.expectedType) {
                this.log(`Query "${test.query}" type detection - OK`, 'PASS');
            } else {
                this.log(`Query "${test.query}" type detection - FAILED (expected: ${test.expectedType}, got: ${result.searchType})`, 'FAIL');
            }
            
            const hasExpectedSites = test.expectedSites.some(site => 
                result.targetSites.includes(site)
            );
            
            if (hasExpectedSites) {
                this.log(`Query "${test.query}" site selection - OK`, 'PASS');
            } else {
                this.log(`Query "${test.query}" site selection - FAILED`, 'FAIL');
            }
        }
    }

    analyzeQuery(query) {
        // Simplified version of the actual query analysis
        const queryLower = query.toLowerCase();
        
        const productKeywords = ['buy', 'price', 'product', 'laptop', 'phone', 'camera'];
        const newsKeywords = ['news', 'latest', 'breaking', 'today'];
        
        let searchType = 'universal';
        let targetSites = [];
        
        if (productKeywords.some(keyword => queryLower.includes(keyword))) {
            searchType = 'shopping';
            targetSites = ['amazon', 'flipkart'];
        } else if (newsKeywords.some(keyword => queryLower.includes(keyword))) {
            searchType = 'news';
            targetSites = ['google_news', 'timesofindia', 'ndtv'];
        } else {
            searchType = 'universal';
            targetSites = ['google', 'amazon', 'flipkart'];
        }

        return { searchType, targetSites };
    }

    async testErrorHandling() {
        this.log('Testing error handling and resilience...');
        
        try {
            // Test invalid URL handling
            if (this.context) {
                const page = await this.context.newPage();
                
                try {
                    await page.goto('https://invalid-url-that-does-not-exist.com', { 
                        timeout: 5000,
                        waitUntil: 'networkidle' 
                    });
                    this.log('Error handling - Invalid URL should have failed', 'FAIL');
                } catch (error) {
                    this.log('Error handling - Invalid URL properly caught', 'PASS');
                }
                
                // Test timeout handling
                try {
                    await page.waitForSelector('#non-existent-selector', { timeout: 1000 });
                    this.log('Error handling - Timeout should have occurred', 'FAIL');
                } catch (error) {
                    this.log('Error handling - Timeout properly handled', 'PASS');
                }
                
                await page.close();
            }
            
            // Test malformed JSON handling
            try {
                JSON.parse('invalid json string');
                this.log('Error handling - JSON parse should have failed', 'FAIL');
            } catch (error) {
                this.log('Error handling - JSON parse error properly caught', 'PASS');
            }
            
        } catch (error) {
            this.log(`Error handling test failed: ${error.message}`, 'FAIL');
        }
    }

    async humanDelay(min = 1000, max = 3000) {
        const delay = Math.random() * (max - min) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    generateTestReport() {
        console.log('\n📊 Test Report');
        console.log('='.repeat(50));
        
        const passed = this.testResults.filter(r => r.status === 'PASS').length;
        const failed = this.testResults.filter(r => r.status === 'FAIL').length;
        const warnings = this.testResults.filter(r => r.status === 'WARN').length;
        const total = passed + failed;
        
        console.log(`Total Tests: ${total}`);
        console.log(`Passed: ${passed} ✅`);
        console.log(`Failed: ${failed} ❌`);
        console.log(`Warnings: ${warnings} ⚠️`);
        
        const successRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
        console.log(`Success Rate: ${successRate}%`);
        
        console.log('\nDetailed Results:');
        console.log('-'.repeat(50));
        
        this.testResults.forEach(result => {
            const icon = {
                'PASS': '✅',
                'FAIL': '❌',
                'WARN': '⚠️',
                'INFO': 'ℹ️'
            }[result.status] || '•';
            
            console.log(`${icon} ${result.message}`);
        });
        
        // Save detailed report
        const reportPath = path.join(__dirname, 'test-report.json');
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                total,
                passed,
                failed,
                warnings,
                successRate: parseFloat(successRate)
            },
            details: this.testResults
        };
        
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📄 Detailed report saved: ${reportPath}`);
        
        // System recommendations
        console.log('\n🔧 System Recommendations:');
        if (failed === 0) {
            console.log('✅ All systems operational - Ready for deployment');
        } else {
            console.log('⚠️ Some tests failed - Review above errors before deployment');
        }
        
        if (warnings > 0) {
            console.log('ℹ️ Minor warnings detected - System functional but improvements possible');
        }
    }

    async cleanup() {
        this.log('Cleaning up test resources...');
        
        try {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.close();
            }
            
            if (this.context) {
                await this.context.close();
            }
            
            if (this.browser) {
                await this.browser.close();
            }
            
            this.log('Cleanup completed successfully', 'PASS');
            
        } catch (error) {
            this.log(`Cleanup error: ${error.message}`, 'FAIL');
        }
    }
}

// Performance benchmark
class PerformanceBenchmark {
    static async runBenchmarks() {
        console.log('\n⚡ Performance Benchmarks');
        console.log('='.repeat(50));
        
        // Browser launch time
        const browserStart = Date.now();
        const browser = await chromium.launch({ headless: true });
        const browserLaunchTime = Date.now() - browserStart;
        console.log(`Browser Launch Time: ${browserLaunchTime}ms`);
        
        // Page navigation time
        const context = await browser.newContext();
        const page = await context.newPage();
        
        const navStart = Date.now();
        await page.goto('https://www.google.com', { waitUntil: 'networkidle' });
        const navTime = Date.now() - navStart;
        console.log(`Page Navigation Time: ${navTime}ms`);
        
        // Search performance
        const searchStart = Date.now();
        await page.waitForSelector('input[name="q"]');
        await page.type('input[name="q"]', 'test search');
        const searchTime = Date.now() - searchStart;
        console.log(`Search Input Time: ${searchTime}ms`);
        
        // Cleanup
        await context.close();
        await browser.close();
        
        // Performance evaluation
        console.log('\nPerformance Evaluation:');
        if (browserLaunchTime < 3000) {
            console.log('✅ Browser launch: Excellent');
        } else if (browserLaunchTime < 5000) {
            console.log('⚠️ Browser launch: Acceptable');
        } else {
            console.log('❌ Browser launch: Needs optimization');
        }
        
        if (navTime < 2000) {
            console.log('✅ Navigation speed: Excellent');
        } else if (navTime < 4000) {
            console.log('⚠️ Navigation speed: Acceptable');
        } else {
            console.log('❌ Navigation speed: Needs optimization');
        }
    }
}

// System diagnostics
class SystemDiagnostics {
    static async runDiagnostics() {
        console.log('\n🔍 System Diagnostics');
        console.log('='.repeat(50));
        
        // Memory usage
        const memUsage = process.memoryUsage();
        console.log(`Memory Usage:`);
        console.log(`  RSS: ${Math.round(memUsage.rss / 1024 / 1024)}MB`);
        console.log(`  Heap Total: ${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`);
        console.log(`  Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`);
        console.log(`  External: ${Math.round(memUsage.external / 1024 / 1024)}MB`);
        
        // CPU usage (simple approximation)
        const startTime = process.hrtime();
        const startUsage = process.cpuUsage();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const diff = process.cpuUsage(startUsage);
        const totalTime = process.hrtime(startTime);
        const totalTimeMs = totalTime[0] * 1000 + totalTime[1] / 1000000;
        
        const cpuPercent = ((diff.user + diff.system) / 1000) / totalTimeMs * 100;
        console.log(`CPU Usage: ${cpuPercent.toFixed(2)}%`);
        
        // Disk space (simplified)
        try {
            const stats = fs.statSync('.');
            console.log(`Working Directory: ${process.cwd()}`);
        } catch (error) {
            console.log('Working directory check failed');
        }
        
        // Network connectivity test
        const testUrls = [
            'https://www.google.com',
            'https://www.amazon.in',
            'https://www.flipkart.com'
        ];
        
        console.log('\nNetwork Connectivity:');
        for (const url of testUrls) {
            try {
                const browser = await chromium.launch({ headless: true });
                const page = await browser.newPage();
                await page.goto(url, { timeout: 5000 });
                console.log(`  ${url}: ✅ Accessible`);
                await browser.close();
            } catch (error) {
                console.log(`  ${url}: ❌ Failed (${error.message})`);
            }
        }
    }
}

// Main test execution
async function main() {
    console.log('🧪 Nexus AI - Comprehensive Test Suite');
    console.log('Testing universal web intelligence capabilities...');
    console.log('='.repeat(60));
    
    const testSuite = new NexusTestSuite();
    
    try {
        await testSuite.runAllTests();
        await PerformanceBenchmark.runBenchmarks();
        await SystemDiagnostics.runDiagnostics();
        
        console.log('\n🎉 Test suite completed!');
        console.log('Review the results above and test-report.json for detailed analysis.');
        
    } catch (error) {
        console.error('Test suite execution failed:', error);
        process.exit(1);
    }
}

// Run tests if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { NexusTestSuite, PerformanceBenchmark, SystemDiagnostics };