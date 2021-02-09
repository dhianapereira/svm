function loadData() {
	var data = [];

	$.getJSON("../src/data/data.json", function (json) {
		data = json;

		$.getJSON("../src/data/labels.json", function (json) {
			var labels = [];
			var labels = json;

		
			var columns = ['age', 'menopause', 'tumorSize', 'degMalig', 'breast', 'breastQuad'];

			var result = data.map(function(obj) {
				return columns.map(function(key) {
					return obj[key];
				});
			});
		  
			const training = result.splice(0, 40);
			const test = result;

			const trainingLabels = labels.splice(0, 40);
			
			var wb; // weights and offset structure
			var svm = new svmjs.SVM();
			var trainstats;
			var dirty = true;
			var kernelid= 1;
			var rbfKernelSigma = 0.5;
			var svmC = 1.0;
			console.log(training);
			trainstats = svm.train(training, trainingLabels, { kernel: svmjs.linearKernel , C: svmC});
			
			console.log(trainstats);

			if(console) {
				// print weights and offset
				wb = svm.getWeights();
				for(var i=0;i<wb.w.length;i++) {
				  console.log("w_%d = %f", i, wb.w[i]);
				}
				console.log("b = %f", wb.b);
				N=training.length;
				// print predicted margins
				var marg= svm.margins(data);
				for(var i=0;i<N;i++) {
				  console.log("%f, %f", labels[i], marg[i]);
				}
			}
			result = svm.predict(test);
			margins = svm.margins(test);
			console.log(result);
			console.log(margins);

			document.querySelector("#testLabels").innerHTML = result;
		});
	});
}