const img = document.getElementById('img12');
const button = document.getElementById('submit_button');
const input = document.getElementById('image_url');
const result = document.getElementById('prediction');

let model;

button.onclick = () => {
    const url = input.value;
    img.src = url;
    result.innerText = "Loading...";
}

img.onload = () => {
    doPrediction();
}

function doPrediction() {
    if (model) {
        model.classify(img).then(predictions => {
            showPrediction(predictions);
        });
    } else {
        mobilenet.load().then(_model => {
            model = _model;
            model.classify(img).then(predictions => {
                showPrediction(predictions);
            });
        });
    }
}

function showPrediction(predictions) {
    result.textContent = "This might be a " + predictions[0].className + " with a probability of " + predictions[0].probability, '\n', "or", '\n', predictions[1].className + " with a probability of " + predictions[1].probability;

}