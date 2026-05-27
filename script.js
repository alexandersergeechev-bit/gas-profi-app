document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Logic
    const themeBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(themeBtn) themeBtn.innerText = currentTheme === 'light' ? '🌙 Dark' : '☀️ Light';

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeBtn.innerText = newTheme === 'light' ? '🌙 Dark' : '☀️ Light';
        });
    }

    // Back to Top Button
    const backBtn = document.getElementById('backToTop');
    window.onscroll = () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backBtn.style.display = "block";
        } else {
            backBtn.style.display = "none";
        }
    };

    if(backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth Scroll for Nav
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Register Service Worker for Offline Work
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js') // Убран ведущий слеш
            .then(reg => console.log('SW registered', reg))
            .catch(err => console.log('SW error', err));
    });
}

/* --- WARTUNG PAGE LOGIC --- */
// Функция переключения класса выполненной строки
function toggleRowStatus(checkbox) {
    const row = checkbox.closest('.wartung-row');
    if (checkbox.checked) {
        row.classList.add('row-checked');
    } else {
        row.classList.remove('row-checked');
    }
}

// Функция перемещения строки вверх
function moveRowUp(button) {
    const row = button.closest('.wartung-row');
    const previousRow = row.previousElementSibling;
    if (previousRow && previousRow.classList.contains('wartung-row')) {
        row.parentNode.insertBefore(row, previousRow);
    }
}

// Функция перемещения строки вниз
function moveRowDown(button) {
    const row = button.closest('.wartung-row');
    const nextRow = row.nextElementSibling;
    if (nextRow && nextRow.classList.contains('wartung-row')) {
        row.parentNode.insertBefore(nextRow, row);
    }
}

// Функция добавления новой операции в таблицу
function addNewWartungItem(event) {
    event.preventDefault();
    
    const title = document.getElementById('newTitle').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    const value = document.getElementById('newValue').value.trim();
    
    if (!title) return; // Название обязательно
    
    const tbody = document.getElementById('wartungTableBody');
    const newRow = document.createElement('tr');
    newRow.className = 'wartung-row';
    
    newRow.innerHTML = `
        <td class="td-action">
            <div class="checkbox-container">
                <input type="checkbox" class="heavy-checkbox" onchange="toggleRowStatus(this)">
            </div>
            <div class="move-btn-group">
                <button class="btn-move" onclick="moveRowUp(this)">▲</button>
                <button class="btn-move" onclick="moveRowDown(this)">▼</button>
            </div>
        </td>
        <td class="td-title"><strong>${title}</strong></td>
        <td class="td-desc">${desc || '-'}</td>
        <td class="td-value">${value || '-'}</td>
    `;
    
    tbody.appendChild(newRow);
    
    // Сбрасываем форму
    document.getElementById('wartungForm').reset();
}

/* --- MESSUNG PAGE LOGIC --- */
function addNewMessungItem(event) {
    event.preventDefault();
    
    const title = document.getElementById('newMessungTitle').value.trim();
    const desc = document.getElementById('newMessungDesc').value.trim();
    const value = document.getElementById('newMessungValue').value.trim();
    
    if (!title) return;
    
    const tbody = document.getElementById('messungTableBody');
    const newRow = document.createElement('tr');
    newRow.className = 'wartung-row'; // Используем тот же класс для стилей
    
    newRow.innerHTML = `
        <td class="td-action">
            <div class="checkbox-container">
                <input type="checkbox" class="heavy-checkbox" onchange="toggleRowStatus(this)">
            </div>
            <div class="move-btn-group">
                <button class="btn-move" onclick="moveRowUp(this)">▲</button>
                <button class="btn-move" onclick="moveRowDown(this)">▼</button>
            </div>
        </td>
        <td class="td-title"><strong>${title}</strong></td>
        <td class="td-desc">${desc || '-'}</td>
        <td class="td-value">${value || '-'}</td>
    `;
    
    tbody.appendChild(newRow);
    document.getElementById('messungForm').reset();
}