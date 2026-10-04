const vulnerableReg = /^([a-zA-Z0-9_.-]+)+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const safeReg = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const testStr = 'a'.repeat(30) + '!';
const t0 = performance.now();
let ticks = 0;

const getDOMElement = (id) => document.getElementById(id);

setInterval(() => {
  ticks++;
  getDOMElement('ticks').textContent = ticks;
  getDOMElement('clock').textContent = '(' + ((performance.now() - t0) / 1000).toFixed(1) + ' c)';
}, 100);

function log(msg) {
  getDOMElement('log').textContent += ((performance.now() - t0) / 1000).toFixed(2) + ' c | ' + msg + '\n';
}

function run(name, regular) {
  setTimeout(() => {
    const before = ticks;
    log('>>> СТАРТ ' + name + ' (тиков: ' + before + ')');
    const t = performance.now();
    regular.test(testStr);

    const ms = performance.now() - t;
    const fired = ticks - before;
    log('<<< КОНЕЦ ' + name + ': ' + ms.toFixed(1) + ' мс (сработало тиков: '
              + fired + ', ожидалось ~' + Math.max(Math.floor(ms / 100), 1) + ')');
    getDOMElement('result').textContent = name + ': ' + ms.toFixed(1)
              + ' мс. Тиков за время работы: ' + fired
              + ' (ожидалось ~' + Math.max(Math.floor(ms / 100), 1) + ')';
  }, 30)
}

getDOMElement('btnV').onclick = () => run('УЯЗВИМЫЙ', vulnerableReg);
getDOMElement('btnS').onclick = () => run('НАДЁЖНЫЙ', safeReg);
