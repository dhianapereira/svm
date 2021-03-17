function loadData() {
  $.getJSON("../src/data/breast-cancer.json", function (json) {
    var data = json;

    var columns = [
      "clumpThickness",
      "uniformityOfCellSize",
      "uniformityOfCellShape",
      "marginalAdhesion",
      "singleEpithelialCellSize",
      "bareNuclei",
      "blandChromatin",
      "normalNucleoli",
      "mitoses",
    ];

    var result = data.map(function (obj) {
      return columns.map(function (key) {
        return obj[key];
      });
    });

    $.getJSON("../src/data/labels.json", function (json) {
      var labels = json;

      const training = result.splice(0, 400);
      console.log("Dados para o treinamento: ");
      console.log(training);

      const test = result;
      console.log("Dados para o teste: ");
      console.log(test);

      const trainingLabels = labels.splice(0, 400);

      var svm = new svmjs.SVM();
      var svmC = 1.0;

      svm.train(training, trainingLabels, {
        kernel: svmjs.linearKernel,
        C: svmC,
      });

      testLabels = svm.predict(test);
      margins = svm.margins(test);

      let counter = 0;
      for (let i = 0; i < labels.length; i++) {
        if (labels[i] == testLabels[i]) {
          counter++;
        }
      }

      const percentage = (counter * 100) / testLabels.length;
      console.log("Porcentagem de acerto:" + percentage + "%");

      document.getElementById("percentage").innerHTML = percentage + "%";
    });
  });
}
