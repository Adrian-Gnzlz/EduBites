document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slider .slides");
    const slides = slidesContainer.children;
    const numOriginal = slides.length;

    slidesContainer.innerHTML += slidesContainer.innerHTML;

    let index = 0;

    const dots = document.querySelectorAll(".slider-dots .dot");

    const updateDots = () => {
        dots.forEach(d => d.classList.remove("active"));
        dots[index % numOriginal].classList.add("active");
    };

    const avanzar = () => {
        index++;
        slidesContainer.style.transition = "transform .8s ease-in-out";
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
        if (index === numOriginal) {
            setTimeout(() => {
                slidesContainer.style.transition = "none";
                slidesContainer.style.transform = "translateX(0)";
                index = 0;
                updateDots();
            }, 800);
        }
    };

    setInterval(avanzar, 8000);

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            index = parseInt(dot.dataset.index, 10);
            slidesContainer.style.transition = "transform .8s ease-in-out";
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            updateDots();
        });
    });

    updateDots();

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll(".fila-uno, .fila-dos").forEach(section => {
        observer.observe(section);
    });
});





document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll("#selectorPeriodos .periodo-btn");
    const infos   = document.querySelectorAll(".info-periodos .info");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");

            const periodo = btn.getAttribute("data-periodo");
            infos.forEach(info => {
                if (info.classList.contains(`info-${periodo}`)) {
                    info.classList.add("activo");
                } else {
                    info.classList.remove("activo");
                }
            });
        });
    });
});





const money = n =>
    new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

function calcularPrecio() {
    const count = parseInt(document.getElementById('userCount').value, 10);
    const periodo = document.querySelector('.periodo-btn.activo').dataset.periodo;
    let precioUnit = 0;
    let nombrePlan = '';

    const tarifas = {
        mensual:      { personal: 14.99, grupal:  9.99, institucional:  6.99 },
        semestral:    { personal: 74.99, grupal: 49.99, institucional: 34.99 },
        anual:        { personal:149.99, grupal: 99.99, institucional: 74.99 },
    };

    if (isNaN(count) || count < 1) {
        document.getElementById('resultadoPrecio').textContent =
        'Ingresa un número de usuarios válido (≥ 1).';
        return;
    }

    if (count <= 9) {
        nombrePlan = 'Personal';
        precioUnit = tarifas[periodo].personal;
    } else if (count <= 150) {
        nombrePlan = 'Grupal';
        precioUnit = tarifas[periodo].grupal;
    } else {
        nombrePlan = 'Institucional';
        precioUnit = tarifas[periodo].institucional;
    }

    const total = precioUnit * count;
    const usuariosTxt = count === 1 ? 'usuario' : 'usuarios';

    document.getElementById('resultadoPrecio').textContent =
        `Plan ${nombrePlan} – ${count} ${usuariosTxt}: ` +
        `MXN $${money(total)} por ${periodo} ` +
        `(MXN $${money(precioUnit)} c/u)`;
}

document.getElementById('calcularBtn').addEventListener('click', calcularPrecio);


