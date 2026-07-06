const fs = require('fs');
const filePath = 'C:/Users/v_yiicao/WorkBuddy/20260413140616/wechat-weekly/build_html_new.js';
let content = fs.readFileSync(filePath, 'utf8');

// ══ Fix 1: 更新 Footer 日期 ══
// 查找 <span>🕐 最近更新：XXXX年X月X日</span> 模式
const oldDate1 = /(🕐\s*最近更新：)\d+年\d+月\d+日</.source;
const newDate1 = '🕐 最近更新：2026年6月2日';
const regex1 = new RegExp(oldDate1);
if (!regex1.test(content)) {
  console.log('WARNING: 最近更新 date pattern not found');
} else {
  content = content.replace(regex1, newDate1);
  console.log('✅ Fix 1: 最近更新 → 2026年6月2日');
}

// 查找 <span class="footer-next">📅 下次更新：XXXX年X月X日（周二）</span>
const oldDate2 = /(📅\s*下次更新：)\d+年\d+月\d+日（[^）]+）/;
const newDate2 = '📅 下次更新：2026年6月9日（周二）';
const regex2 = new RegExp(oldDate2);
if (!regex2.test(content)) {
  console.log('WARNING: 下次更新 date pattern not found');
} else {
  content = content.replace(regex2, newDate2);
  console.log('✅ Fix 2: 下次更新 → 2026年6月9日（周二）');
}

// ══ Fix 2: 更新 activePeriodId ══
if (content.includes("let activePeriodId = 'p5'")) {
  content = content.replace("let activePeriodId = 'p5'", "let activePeriodId = 'p7'");
  console.log('✅ Fix 3a: activePeriodId → p7 (was p5)');
} else if (content.includes("let activePeriodId = 'p6'")) {
  content = content.replace("let activePeriodId = 'p6'", "let activePeriodId = 'p7'");
  console.log('✅ Fix 3b: activePeriodId → p7 (was p6)');
} else {
  console.log('WARNING: activePeriodId not found or already p7');
}

// ══ Fix 3: 确保 p6 tab 没有 active class ══
// 替换 p6 tab 行，去掉 active
const p6TabOld = /<button class="tab-btn active" onclick="switchTab\(this,'p6'\)">📅 2026\.5\.19–5\.25<\/button>/;
const p6TabNew = '<button class="tab-btn" onclick="switchTab(this,\\\'p6\\')">📅 2026.5.19–5.25</button>';
if (p6TabOld.test(content)) {
  content = content.replace(p6TabOld, p6TabNew);
  console.log('✅ Fix 4: p6 tab active class 已移除');
} else {
  console.log('INFO: p6 tab active pattern not found (may already be fixed)');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('\n🎉 Footer + activePeriodId 修复完成！');
