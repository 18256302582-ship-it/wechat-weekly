const fs = require('fs');
const filePath = 'C:/Users/v_yiicao/WorkBuddy/20260413140616/wechat-weekly/build_html_new.js';
let content = fs.readFileSync(filePath, 'utf8');

// ══ Fix 1: 更新 Footer 日期 ══
// 匹配：🕐 最近更新：数字数字数字日</span>
const rDate1 = new RegExp('(🕐\\s*最近更新：)\\d+年\\d+月\\d+日(</span>)');
if (!rDate1.test(content)) {
  console.log('WARNING: 最近更新 pattern not found');
} else {
  content = content.replace(rDate1, '$1' + '2026年6月2日' + '$2');
  console.log('✅ Fix 1a: 最近更新 → 2026年6月2日');
}

// 匹配：📅 下次更新：数字数字数字数字（周X）</span>
const rDate2 = new RegExp('(📅\\s*下次更新：)\\d+年\\d+月\\d+日（[^）]+）(</span>)');
if (!rDate2.test(content)) {
  console.log('WARNING: 下次更新 pattern not found');
} else {
  content = content.replace(rDate2, '$1' + '2026年6月9日（周二）' + '$2');
  console.log('✅ Fix 1b: 下次更新 → 2026年6月9日（周二）');
}

// ══ Fix 2: 更新 activePeriodId ══
if (content.includes("let activePeriodId = 'p5'")) {
  content = content.replace("let activePeriodId = 'p5'", "let activePeriodId = 'p7'");
  console.log('✅ Fix 2a: activePeriodId → p7 (was p5)');
} else if (content.includes("let activePeriodId = 'p6'")) {
  content = content.replace("let activePeriodId = 'p6'", "let activePeriodId = 'p7'");
  console.log('✅ Fix 2b: activePeriodId → p7 (was p6)');
} else {
  console.log('INFO: activePeriodId may already be p7 or not found');
}

// ══ Fix 3: 确保 p6 tab 没有 active class ══
// 匹配：class="tab-btn active" ... p6 ...
const rP6Tab = new RegExp('(<button class="tab-btn) active(" onclick="switchTab\\(this,\'p6\'\\)">📅 2026\\.5\\.19–5\\.25</button>)');
if (rP6Tab.test(content)) {
  content = content.replace(rP6Tab, '$1"' + '$2');
  console.log('✅ Fix 3: p6 tab active class 已移除');
} else {
  console.log('INFO: p6 tab active pattern not found (may already be fixed)');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('\n🎉 Footer + activePeriodId 修复完成！');
