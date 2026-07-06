const fs = require('fs');

const htmlPath = 'index.html';       // 已修复的正确版本
const buildPath = '../build_html.js'; // 父目录的源文件（自动化真正使用的）

let html = fs.readFileSync(htmlPath, 'utf8');
let build = fs.readFileSync(buildPath, 'utf8');

// ── 从 index.html 提取正确的内容 ──

// 1. period-content 块（p9 → p1）
const pcStart = html.indexOf('<div class="period-content active" id="p9">');
const pcEndMarker = '</div><!-- /p1 -->';
const pcEnd = html.indexOf(pcEndMarker) + pcEndMarker.length;
const periodContent = html.substring(pcStart, pcEnd);

// 2. tab 按钮（从 p9 的 tab-btn 到 p1 的 tab-btn）
const tabStartMarker = '<button class="tab-btn active" onclick="switchTab(this,\'p9\')">';
const tabStart = html.indexOf(tabStartMarker);
const tabEnd = html.indexOf('</button>', html.indexOf('2026.3.1–4.14')) + '</button>'.length;
const tabButtons = html.substring(tabStart, tabEnd);

// 3. PERIODS 数组
const perStart = html.indexOf('const PERIODS = [');
const perEnd = html.indexOf('];', perStart) + 2;
const periodsArr = html.substring(perStart, perEnd);

console.log('提取:');
console.log('  period-content 长度:', periodContent.length);
console.log('  tab 按钮长度:', tabButtons.length);
console.log('  PERIODS 数组长度:', periodsArr.length);

// ── 同步到 build_html.js ──

// A. 替换 period-content 块：从第一个 <div class="period-content 到 const PERIODS 之前
const bPcStart = build.indexOf('<div class="period-content');
const bPerStart = build.indexOf('const PERIODS = [');
if (bPcStart < 0 || bPerStart < 0) { console.log('ERROR: build 中未找到标记'); process.exit(1); }
// 找 build 中 period-content 块之前的换行/缩进
const beforePc = build.substring(0, bPcStart);
const afterPer = build.substring(bPerStart);
build = beforePc + periodContent + '\n\n' + afterPer;

// B. 替换 tab 按钮：从 tabsBar 容器内的第一个 tab-btn 到容器结束
const tabsBarStart = build.indexOf('<div class="tabs" id="tabsBar">');
const tabsBarEnd = build.indexOf('</div>', tabsBarStart) + '</div>'.length;
// tabsBar 容器内部：从 <div class="tabs"...> 到 </div>
// 重建 tabs 容器
const tabsOpen = build.substring(tabsBarStart, build.indexOf('>', tabsBarStart) + 1);
build = build.substring(0, tabsBarStart) + tabsOpen + '\n' + tabButtons + '\n  ' + build.substring(tabsBarEnd);

// C. 替换 PERIODS 数组
const bPerStart2 = build.indexOf('const PERIODS = [');
const bPerEnd = build.indexOf('];', bPerStart2) + 2;
build = build.substring(0, bPerStart2) + periodsArr + build.substring(bPerEnd);

// D. 修复 activePeriodId
build = build.replace(/let activePeriodId = '[^']*';/, "let activePeriodId = 'p9';");

// E. 修复 build 内 period-content 的 active（p9 应为 active）
// 先去掉所有 period-content 的 active
build = build.replace(/<div class="period-content active" id="p/g, '<div class="period-content" id="p');
// 给 p9 加 active
build = build.replace('<div class="period-content" id="p9">', '<div class="period-content active" id="p9">');

fs.writeFileSync(buildPath, build);
console.log('\n✅ 已同步 build_html.js');
