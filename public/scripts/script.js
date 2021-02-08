function loadData() {
  var data = [];

  $.getJSON("../../src/data/data.json", function (json) {
    data = json;

    $.getJSON("../../src/data/labels.json", function (json) {
      var labels = [];
      var labels = json;

      const training = data.splice(0, 40);
      const test = data;

      console.log(training);

      const trainingLabels = labels.splice(0, 40);
      //const testLabels = labels;

      //console.log(testLabels);

      svm = new svmjs.SVM();

      svm.train(training, trainingLabels, {C: 1.0});

      result = svm.predict(test);

      console.log(result);

      document.querySelector("#testLabels").innerHTML = result;
    });
  });
}
