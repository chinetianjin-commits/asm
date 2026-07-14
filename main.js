document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const underline = document.querySelector('.underline');
    const sidebar = document.getElementById('sidebar');
    const progressBar = document.getElementById('progress-bar');

    const colors = ['#00d2ff', '#3a86ff', '#8338ec', '#a121e0', '#c918ab', '#e0115f', '#ff007f'];

    function updateNav(element, index) {
        if (!element || !underline) return;
        underline.style.width = `${element.offsetWidth}px`;
        underline.style.left = `${element.offsetLeft}px`;
        const selectedColor = colors[index] || colors[0];
        document.documentElement.style.setProperty('--current-accent', selectedColor);
    }

    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (!target) return;

            buttons.forEach(b => b.classList.remove('active-link'));
            btn.classList.add('active-link');
            updateNav(btn, index);
            pages.forEach(p => p.classList.remove('active'));
            const activePage = document.getElementById(target);
            if (activePage) activePage.classList.add('active');
        });
    });

    document.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', e.clientX + 'px');
        document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    if (sidebar && progressBar) {
        sidebar.addEventListener('scroll', () => {
            const winScroll = sidebar.scrollTop;
            const height = sidebar.scrollHeight - sidebar.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.height = scrolled + "%";
        });
    }

    const startBtn = document.querySelector('.nav-btn[data-target="home"]') || buttons[0];
    if (startBtn) {
        startBtn.classList.add('active-link');
        updateNav(startBtn, 0);
    }

    window.addEventListener('resize', () => {
        const active = document.querySelector('.nav-btn.active-link');
        if (active) updateNav(active, Array.from(buttons).indexOf(active));
    });
});

function copyText() {
    const textElement = document.querySelector('.ip-address');
    const btn = document.querySelector('.copy-btn');
    
    if (!textElement || !btn) return;

    const text = textElement.innerText;
    const originalContent = btn.innerHTML;

    navigator.clipboard.writeText(text).then(() => {
        btn.innerText = 'Скопировано!';

        setTimeout(() => {
            btn.innerHTML = originalContent;
        }, 2000);
    }).catch(err => {
        console.error(err);
    });
}