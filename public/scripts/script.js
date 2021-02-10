function loadData() {
  var data = [];

  $.getJSON("../src/data/data.json", function (json) {
    data = json;

    $.getJSON("../src/data/labels.json", function (json) {
      var labels = [];
      var labels = json;

      var columns = [
        "age",
        "menopause",
        "tumorSize",
        "degMalig",
        "breast",
        "breastQuad",
      ];

      var result = data.map(function (obj) {
        return columns.map(function (key) {
          return obj[key];
        });
      });

      const training = result.splice(0, 40);
      console.log(training);

      const test = result;

      const trainingLabels = labels.splice(0, 40);

      var wb; // weights and offset structure
      var svm = new svmjs.SVM();
      var svmC = 1.0;

      var trainstats = svm.train(training, trainingLabels, {
        kernel: svmjs.linearKernel,
        C: svmC,
      });

      console.log(trainstats);

      if (console) {
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
      }

      testLabels = svm.predict(test);
      margins = svm.margins(test);

      console.log(testLabels);
      console.log(margins);

      testLabels.forEach(function (label) {
        document.getElementById("testLabels").innerHTML +=
          "<td>" + label + "</td>";
      });
    });
  });
}
