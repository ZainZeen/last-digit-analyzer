document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('numbers');
    const analyzeBtn = document.getElementById('analyze');
    const clearBtn = document.getElementById('clear');
    const chartDiv = document.getElementById('chart');
    const statsDiv = document.getElementById('detailed-stats');

    function getLastDigit(num) {
        // 将数字转换为字符串
        const numStr = num.toString();
        
        // 查找小数点的位置
        const decimalIndex = numStr.indexOf('.');
        
        if (decimalIndex !== -1) {
            // 如果有小数点，取小数部分的最后一位
            const decimalPart = numStr.substring(decimalIndex + 1);
            if (decimalPart.length > 0) {
                return parseInt(decimalPart[decimalPart.length - 1]);
            }
        }
        
        // 如果没有小数点或小数部分为空，取整数部分的最后一位
        return Math.abs(num % 10);
    }

    function analyzeNumbers(numbers) {
        // 初始化频率计数器
        const frequency = Array(10).fill(0);
        let totalNumbers = 0;

        // 统计每个末位数字的频率
        numbers.forEach(num => {
            const lastDigit = getLastDigit(num);
            frequency[lastDigit]++;
            totalNumbers++;
        });

        return { frequency, totalNumbers };
    }

    function updateChart(frequency, totalNumbers) {
        chartDiv.innerHTML = '';
        const maxFreq = Math.max(...frequency);

        frequency.forEach((count, digit) => {
            const percentage = (count / totalNumbers * 100).toFixed(1);
            const barHeight = (count / maxFreq * 250) || 0;

            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${barHeight}px`;
            bar.innerHTML = `
                <div class="bar-value">${percentage}%</div>
                <div class="bar-label">${digit}</div>
            `;
            chartDiv.appendChild(bar);
        });
    }

    function updateStats(frequency, totalNumbers) {
        statsDiv.innerHTML = '';
        frequency.forEach((count, digit) => {
            const percentage = (count / totalNumbers * 100).toFixed(1);
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.innerHTML = `
                <strong>${digit}</strong><br>
                次数: ${count}<br>
                占比: ${percentage}%
            `;
            statsDiv.appendChild(statItem);
        });
    }

    analyzeBtn.addEventListener('click', () => {
        const input = textarea.value.trim();
        if (!input) {
            alert('请输入数字！');
            return;
        }

        // 将输入文本分割成数字数组
        const numbers = input.split(/[\s,，;；]+/)
            .map(num => parseFloat(num.trim()))
            .filter(num => !isNaN(num));

        if (numbers.length === 0) {
            alert('没有找到有效的数字！');
            return;
        }

        const { frequency, totalNumbers } = analyzeNumbers(numbers);
        updateChart(frequency, totalNumbers);
        updateStats(frequency, totalNumbers);
    });

    clearBtn.addEventListener('click', () => {
        textarea.value = '';
        chartDiv.innerHTML = '';
        statsDiv.innerHTML = '';
    });
});
