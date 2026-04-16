# MNIST Ziffernerkennung mit FastAPI und Canvas-Frontend

Dieses Projekt demonstriert, wie ein einfaches neuronales Netz mit Keras/TensorFlow auf dem MNIST-Datensatz trainiert und anschließend als Webservice mit FastAPI bereitgestellt wird. Ein modernes Frontend ermöglicht das Zeichnen von Ziffern im Browser und die direkte Vorhersage durch das Modell.

## Features
- Training eines Keras-Modells auf MNIST (klassisches Dense-Netz)
- Speicherung und Laden des Modells (`model.h5`)
- FastAPI-Backend für Vorhersagen
- Frontend mit Canvas-Zeichenfläche (HTML/JS/CSS)
- Ziffernerkennung direkt im Browser

## Projektstruktur
```
Digit-Classifier/
├── data/                   # Trainingsdaten (train.csv)
├── Notebooks/              # Jupyter Notebook für Training und Analyse
│   └── digitClassifier.ipynb
├── src/
│   ├── digitClassifier.py  # FastAPI-Backend
│   └── web/
│       ├── index.html      # Frontend
│       ├── style.css
│       └── script.js
├── requirements.txt        # Python-Abhängigkeiten
└── README.md               # Diese Datei
```

## Installation & Nutzung
1. **Python-Umgebung einrichten**
   ```bash
   python3.11 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Modell trainieren**
   - Öffne das Notebook `Notebooks/digitClassifier.ipynb` und führe alle Zellen aus.
   - Das Modell wird als `model.h5` gespeichert.

3. **Backend starten**
   ```bash
   cd src
   uvicorn digitClassifier:app --reload
   ```

4. **Frontend öffnen**
   - Öffne `src/web/index.html` im Browser (z.B. mit Live Server oder Python HTTP-Server).
   - Zeichne eine Ziffer und klicke auf „Vorhersage“.

## Hinweise
- Das Modell erkennt nur einzelne Ziffern (0–9) pro Bild.
- Für bessere Ergebnisse auf handgemalten Ziffern empfiehlt sich ein CNN und/oder Data Augmentation.
- Die Vorverarbeitung im Backend muss exakt der im Training entsprechen (Skalierung, Invertierung).

## Requirements
Alle benötigten Pakete sind in `requirements.txt` gelistet.

---

**Autor:** Kimi Lehmann
**Lizenz:** MIT
