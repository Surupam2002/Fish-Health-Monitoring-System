# Fish Health Monitoring System (Pisciculture ML)

A machine-learning web app that helps fish farmers decide **which fish species suit their pond water**. Enter three water-quality readings (**pH, temperature and turbidity**) and the model predicts the most suitable species.

Built as a B.Tech project to support data-driven pisciculture (fish farming) in India.

## How It Works

1. **Data:** a real fish-farming dataset (`realfishdataset.csv`) of water parameters and the species that thrive in them.
2. **Preprocessing:**
   - Outlier removal using **z-scores** (rows with |z| > 3 are dropped)
   - Feature scaling with **MinMaxScaler**
   - 80/20 train/test split
3. **Models:** trains **Gaussian Naive Bayes** and **Random Forest** classifiers; the **Random Forest** model is used for predictions.
4. **API:** a **Flask** REST endpoint serves predictions to the web frontend.

## Tech Stack

| Layer | Technology |
|---|---|
| ML | Python, scikit-learn (Random Forest, Gaussian NB), pandas, NumPy |
| Backend | Flask, Flask-CORS |
| Frontend | HTML, CSS, JavaScript |

## API

**POST** `/predict`

```json
{ "features": [7.2, 26.5, 4.1] }
```
Features are in the order **[pH, temperature, turbidity]**.

Response:
```json
{ "prediction": "<fish species>" }
```

## Running Locally

> The application code is currently inside the `__pycache__/` folder.

```bash
cd __pycache__
pip install flask flask-cors pandas numpy scikit-learn
python app.py          # starts the API on http://127.0.0.1:5000
```

Then open `index.html` in your browser, enter pH, temperature and turbidity, and click predict.

## Future Improvements

- Save the trained model (joblib) instead of retraining on every start
- Add model evaluation metrics (accuracy, confusion matrix) to the README
- Containerize with Docker and deploy the API to the cloud

## Author

**Surupam Kumar Pandey** · [GitHub](https://github.com/Surupam2002) · [LinkedIn](https://www.linkedin.com/in/surupam-kumar-pandey-44b293218)
