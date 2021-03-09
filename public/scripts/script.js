function loadData() {
  var data = [];

  $.getJSON("../src/data/breast-cancer.json", function (json) {
    data = json;

    $.getJSON("../src/data/labels.json", function (json) {
      var labels = [];
      var labels = json;

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

      const training = result.splice(0, 400);
      console.log("Dados para o treinamento: ");
      console.log(training);

      const test = result;
      console.log("Dados para o teste: ");
      console.log(test);

      const trainingLabels = labels.splice(0, 400);

      //var wb; // weights and offset structure
      var svm = new svmjs.SVM();
      var svmC = 1.0;

      svm.train(training, trainingLabels, {
        kernel: svmjs.linearKernel,
        C: svmC,
      });

      /*if (console) {
        // print weights and offset
        wb = svm.getWeights();
        for (var i = 0; i < wb.w.length; i++) {
          console.log("w_%d = %f", i, wb.w[i]);
        }
        console.log("b = %f", wb.b);
        N = training.length;
        // print predicted margins
        var marg = svm.margins(data);
        for (var i = 0; i < N; i++) {
          console.log("%f, %f", labels[i], marg[i]);
        }
      }*/

      testLabels = svm.predict(test);
      margins = svm.margins(test);

      //console.log(testLabels);
      //console.log(margins);

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
