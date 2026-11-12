import subprocess
import os
import time

SCREENSHOTS_DIR = os.path.abspath('screenshots')
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

targets = [
    {
        'filename': '01_seccion_hero.png',
        'url': 'http://127.0.0.1:3000/?section=hero&delay=1',
        'title': 'Sección 1: Hero Principal (Inicio)'
    },
    {
        'filename': '02_seccion_nosotros.png',
        'url': 'http://127.0.0.1:3000/?section=nosotros&delay=1',
        'title': 'Sección 2: Nosotros (Piedras Angulares Culinarias)'
    },
    {
        'filename': '03_seccion_eventos.png',
        'url': 'http://127.0.0.1:3000/?section=eventos&delay=1',
        'title': 'Sección 3: Eventos Especiales & Banquetes'
    },
    {
        'filename': '04_seccion_menu_preview.png',
        'url': 'http://127.0.0.1:3000/?section=menu-preview&delay=1',
        'title': 'Sección 4: Menú de la Casa (Preview Landing)'
    },
    {
        'filename': '05_seccion_reservas.png',
        'url': 'http://127.0.0.1:3000/?section=reservar&delay=1',
        'title': 'Sección 5: Formulario de Reservas'
    },
    {
        'filename': '06_seccion_contacto_ubicacion.png',
        'url': 'http://127.0.0.1:3000/?section=contacto&delay=1',
        'title': 'Sección 6: Contacto, Ubicación & Horario'
    },
    {
        'filename': '07_pagina_promociones.png',
        'url': 'http://127.0.0.1:3000/promos?delay=1',
        'title': 'Página: Promociones & Bento Box (/promos)'
    },
    {
        'filename': '08_pagina_menu_web_sin_fotos.png',
        'url': 'http://127.0.0.1:3000/menu?delay=1',
        'title': 'Página: Menú Web Tipográfico Sin Fotos (/menu)'
    },
    {
        'filename': '09_pagina_visor_menu_pdf.png',
        'url': 'http://127.0.0.1:3000/menu-pdf?delay=1',
        'title': 'Página: Visor y Descarga del Menú PDF (/menu-pdf)'
    },
    {
        'filename': '10_landing_page_completa.png',
        'url': 'http://127.0.0.1:3000/?delay=1',
        'title': 'Página: Landing Page Completa (Vista General)'
    },
    {
        'filename': '11_panel_cms_admin.png',
        'url': 'http://127.0.0.1:3000/admin?delay=1',
        'title': 'Página: Panel CMS Administrativo (/admin)'
    }
]

print(f"Iniciando captura de {len(targets)} pantallas...")

for item in targets:
    output_path = os.path.join(SCREENSHOTS_DIR, item['filename'])
    cmd = [
        'firefox',
        '--headless',
        '--window-size=1440,900',
        f'--screenshot={output_path}',
        item['url']
    ]
    print(f"Capturando [{item['title']}] -> {item['filename']}...")
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if os.path.exists(output_path):
            size_kb = os.path.getsize(output_path) / 1024
            print(f"  ✓ Generada exitosamente ({size_kb:.1f} KB)")
        else:
            print(f"  ✗ Error: archivo no encontrado")
    except Exception as e:
        print(f"  ✗ Error ejecutando Firefox: {e}")

print("\n¡Todas las capturas se han generado en la carpeta /screenshots!")
