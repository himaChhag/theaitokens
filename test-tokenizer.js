// Simple test script to verify tokenizer loading works
const { safeAutoTokenizer } = require('./src/lib/tokens/transformers-wrapper.ts');

async function testTokenizer() {
  console.log('Testing tokenizer loading...');
  
  try {
    const AutoTokenizer = await safeAutoTokenizer();
    if (AutoTokenizer) {
      console.log('✅ AutoTokenizer loaded successfully');
    } else {
      console.log('⚠️ AutoTokenizer not available (expected in serverless)');
    }
  } catch (error) {
    console.log('❌ Error loading tokenizer:', error.message);
  }
}

testTokenizer();