main();

function main() {
    const el = document.getElementById('chart');
    const baseTime = Date.now() - performance.now()

    const series = Array(256).fill(0).map(_ => {
        return {
            data: [],
            lineWidth: 1,
            lineType: 3,
        }
    })

    const chart = new TimeChart(el, {
        // debugWebGL: true,
        // forceWebGL1: true,
        baseTime,
        series,
        realTime: true,
        xRange: { min: 0, max: 2000 },
        tooltip: {
            enabled: false,
        },
        zoom: {
            x: {
                autoRange: true,
            },
            y: {
                autoRange: true,
            }
        },
        legend: false,
    });
    const pointCountEl = document.getElementById('point-count');

    let x = 0
    function update() {
        series.forEach((s, idx) => {
            const y = idx + 5 * Math.random()
            s.data.push({ x, y, a: Math.random() })
        })
        x++;
        pointCountEl.innerText = x * 256
        chart.update();
    }
    let ev
    ev = setInterval(update, 1);

    document.getElementById('stop-btn').addEventListener('click', function () {
        clearInterval(ev);
    });
    document.getElementById('follow-btn').addEventListener('click', function () {
        chart.options.realTime = true;
    });
    document.getElementById('legend-btn').addEventListener('click', function () {
        chart.options.legend = !chart.options.legend;
        chart.update();
    });
    document.getElementById('tooltip-btn').addEventListener('click', function () {
        chart.options.tooltip.enabled = !chart.options.tooltip.enabled;
    });

    paddingDirs = ['Top', 'Right', 'Bottom', 'Left'];
    for (const d of paddingDirs) {
        const i = document.getElementById('padding-' + d.toLowerCase());
        const propName = 'padding' + d
        i.textContent = chart.options[propName];
    }
    for (const d of paddingDirs) {
        /** @type {HTMLInputElement} */
        const i = document.getElementById('render-padding-' + d.toLowerCase());
        const propName = 'renderPadding' + d
        i.value = chart.options[propName];
        i.addEventListener('change', () => {
            chart.options[propName] = parseFloat(i.value);
            chart.update();
        });
    }
}
