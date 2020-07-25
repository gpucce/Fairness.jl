var documenterSearchIndex = {"docs":
[{"location":"datasets/#Fairness-Datasets","page":"Datasets","title":"Fairness Datasets","text":"","category":"section"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"To make it easy to try algorithms and metrics on various datasets, Fairness.jl provides you with the popular fairness datasets.","category":"page"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"These datasets can be easily accesses using macros.","category":"page"},{"location":"datasets/#COMPAS-Dataset","page":"Datasets","title":"COMPAS Dataset","text":"","category":"section"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"@load_compas","category":"page"},{"location":"datasets/#Fairness.@load_compas","page":"Datasets","title":"Fairness.@load_compas","text":"Macro to load COMPAS dataset It is a reduced version of COMPAS Datset with 8 features and 6907 rows. The protected attributes are sex and race. The available features are used to predict whether a criminal defendant will recidivate(reoffend).\n\nReturns (X, y)\n\n\n\n\n\n","category":"macro"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"using Fairness\nX, y = @load_compas;","category":"page"},{"location":"datasets/#Adult-Dataset","page":"Datasets","title":"Adult Dataset","text":"","category":"section"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"@load_adult","category":"page"},{"location":"datasets/#Fairness.@load_adult","page":"Datasets","title":"Fairness.@load_adult","text":"Macro to Load the Adult dataset It has 14 features and 32561 rows. The protected attributes are race and sex. This dataset is used to predict whether income exceeds 50K dollars per year.\n\nReturns (X, y)\n\n\n\n\n\n","category":"macro"},{"location":"datasets/#German-Credit-Dataset","page":"Datasets","title":"German Credit Dataset","text":"","category":"section"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"@load_german","category":"page"},{"location":"datasets/#Fairness.@load_german","page":"Datasets","title":"Fairness.@load_german","text":"Load the full version of German credit dataset. This dataset has 20 features and 1000 rows. The protected attributes are gender_status and age (>25 is priviledged) Using the 20 features, it classifies the credit decision to a person as good or bad credit risks.\n\nReturns (X, y)\n\n\n\n\n\n","category":"macro"},{"location":"datasets/#Inspecting-Datasets","page":"Datasets","title":"Inspecting Datasets","text":"","category":"section"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"To see the columns in dataset, their types and scientific types, you can use schema from MLJ.","category":"page"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"using Fairness, MLJ\nX, y = @load_adult;\nschema(X)","category":"page"},{"location":"datasets/#Toy-Data","page":"Datasets","title":"Toy Data","text":"","category":"section"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"This is a 10 row dataset that was used by authors of Reweighing Algorithm. This dataset is intended to test ideas and evaluate metrics without calculating predictions. It is different from other macros as it returns (X, y, ŷ) instead of (X, y)","category":"page"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"@load_toydata\n@load_toyfairtensor","category":"page"},{"location":"datasets/#Fairness.@load_toydata","page":"Datasets","title":"Fairness.@load_toydata","text":"Macro to read csv file of job data (data/jobs.csv) and convert columns to categorical. Returns the tuple (X, y, ŷ)\n\n\n\n\n\n","category":"macro"},{"location":"datasets/#Fairness.@load_toyfairtensor","page":"Datasets","title":"Fairness.@load_toyfairtensor","text":"Macro to create fairness Tensor for data/jobs.csv The fairness tensor will be created on the basis of the column Job Type. This column has 3 different values for job types.\n\n\n\n\n\n","category":"macro"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"X, y, ŷ = @load_toydata;\nft = @load_toyfairtensor","category":"page"},{"location":"datasets/#Other-Datasets","page":"Datasets","title":"Other Datasets","text":"","category":"section"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"You can try working with the vast range of datasets available through OpenML. Refer MLJ's OpenML documentation for the OpenML API. The id to be passed to OpenML.load can be found through OpenML site","category":"page"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"using MLJBase, Fairness\nusing DataFrames\ndata = OpenML.load(1480); # load Indian Liver Patient Dataset\ndf = DataFrame(data) ;\ny, X = unpack(df, ==(:Class), name->true); # Unpack the data into features and target\ny = coerce(y, Multiclass); # Specifies that the target y is of type Multiclass. It is othewise a string.\ncoerce!(X, :V2 => Multiclass, Count => Continuous); # Specifying which columns are Multiclass in nature. Converting from Count to Continuous enables use of more models.","category":"page"},{"location":"datasets/#Helper-Functions","page":"Datasets","title":"Helper Functions","text":"","category":"section"},{"location":"datasets/","page":"Datasets","title":"Datasets","text":"Fairness.ensure_download","category":"page"},{"location":"datasets/#Fairness.ensure_download","page":"Datasets","title":"Fairness.ensure_download","text":"Checks whether the dataset is already present in data directory. Downloads it if not present.\n\n\n\n\n\n","category":"function"},{"location":"fairtensor/#Fairness-Tensor","page":"FairTensor","title":"Fairness Tensor","text":"","category":"section"},{"location":"fairtensor/#Introduction","page":"FairTensor","title":"Introduction","text":"","category":"section"},{"location":"fairtensor/","page":"FairTensor","title":"FairTensor","text":"Fairness.jl uses the concept of Fairness Tensor to compute metrics and speed up the computation. In Fairness.jl, FairTensor is a struct with a 3D matrix and an array of strings for the class names in protected attribute. For a FairTensor ft, the 3D matrix can be accessed using ft.mat and the array of strings can be accessed using ft.labels.","category":"page"},{"location":"fairtensor/","page":"FairTensor","title":"FairTensor","text":"ft.mat is a 3-dimensional Array. For a dataset with C number of classes in the sensitive attribute, a fairness tensor with matrix of size size C x 2 x 2 is constructed.","category":"page"},{"location":"fairtensor/","page":"FairTensor","title":"FairTensor","text":"It is a stack of C 2-dimensional arrays of size 2 x 2 arrays. Each 2 x 2 array represents [[TP, FP], [FN, TN]]. Here TP corresponds to True Positives, FP to False Positives, FN to False Negatives and TN to True Negatives for each class in the protected attribute.","category":"page"},{"location":"fairtensor/#Using-Fairness-Tensor","page":"FairTensor","title":"Using Fairness Tensor","text":"","category":"section"},{"location":"fairtensor/","page":"FairTensor","title":"FairTensor","text":"Fairness.FairTensor\nfair_tensor","category":"page"},{"location":"fairtensor/#Fairness.FairTensor","page":"FairTensor","title":"Fairness.FairTensor","text":"FairTensor{C}\n\nFairness Tensor with C classes. It consists of C 2 x 2 matrices stacked up to form a Matrix of size C x 2 x 2. Each 2 x 2 matrix contains values [[TP, FP], [FN, TN]].\n\n\n\n\n\n","category":"type"},{"location":"fairtensor/#Fairness.fair_tensor","page":"FairTensor","title":"Fairness.fair_tensor","text":"fair_tensor(ŷ, y, grp)\n\nComputes the fairness tensor, where ŷ are the predicted classes, y are the ground truth values, grp are the group values. The ordering follows that of levels(y).\n\nNote that ŷ, y and grp are all categorical arrays\n\n\n\n\n\n","category":"function"},{"location":"fairtensor/#Example","page":"FairTensor","title":"Example","text":"","category":"section"},{"location":"fairtensor/","page":"FairTensor","title":"FairTensor","text":"using Fairness\nŷ = categorical([1, 0, 1, 1, 0]);\ny = categorical([0, 0, 1, 1, 1]);\ngrp = categorical([\"Asian\", \"African\", \"Asian\", \"American\", \"African\"]);\nft = fair_tensor(ŷ, y, grp);\nft.mat\nft.labels","category":"page"},{"location":"measures/#Measures","page":"Measures","title":"Measures","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"In Fairness.jl, measures are callable structs. Their instances are also available to be called directly.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"The instances can be called by passing fairness tensor to it. Its general form is metric(ft::FairTensor; grp=nothing). The instances have multiple aliases for convinience.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"The Measures have been divided into calcMetrics and boolmetrics depending on whether the metric returns Numerical value or Boolean value respectively.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"Notes :","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"All these metrics can be used even when more than 2 values are possible for the sensitive attribute.\nTo use the CalcMetrics with the evaluate function from MLJ, you have to use MetricWrapper or MetricWrappers. To use disparity with evaluate function, you have to use the struct Disparity","category":"page"},{"location":"measures/#CalcMetrics","page":"Measures","title":"CalcMetrics","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"These metrics return a Numerical Value.","category":"page"},{"location":"measures/#CalcMetrics-Usage","page":"Measures","title":"CalcMetrics - Usage","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"These measures all have the common calling syntax","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"measure(ft)","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"or","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"measure(ft; grp)","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"where ft is the fairness tensor. Here grp is an optional, named, string parameter used to compute the fairness metric for a specific group. If grp is not specified, the overall value of fairness metric is calculated.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"using Fairness\nŷ = categorical([1, 0, 1, 1, 0]);\ny = categorical([0, 0, 1, 1, 1]);\ngrp = categorical([\"Asian\", \"African\", \"Asian\", \"American\", \"African\"]);\nft = fair_tensor(ŷ, y, grp);\nTruePositiveRate()(ft)\ntrue_positive_rate(ft) # true_positive_rate is instance of TruePositiveRate\ntrue_positive_rate(ft; grp=\"Asian\")","category":"page"},{"location":"measures/#Following-Metrics-(callable-structs)-are-available-through-Fairness.jl-:","page":"Measures","title":"Following Metrics (callable structs) are available through Fairness.jl :","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"TruePositive, TrueNegative, FalsePositive, FalseNegative, TruePositiveRate, TrueNegativeRate, FalsePositiveRate, FalseNegativeRate, FalseDiscoveryRate, Precision, NPV","category":"page"},{"location":"measures/#standard-synonyms-of-above-Metrics","page":"Measures","title":"standard synonyms of above Metrics","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"TPR, TNR, FPR, FNR, FDR, PPV,","category":"page"},{"location":"measures/#instances-of-above-metrics-and-their-synonyms","page":"Measures","title":"instances of above metrics and their synonyms","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"truepositive, truenegative, falsepositive, falsenegative, true_positive, true_negative, false_positive, false_negative, truepositive_rate, truenegative_rate, falsepositive_rate, true_positive_rate, true_negative_rate, false_positive_rate, falsenegative_rate, negativepredictive_value, false_negative_rate, negative_predictive_value, positivepredictive_value, positive_predictive_value, tpr, tnr, fpr, fnr, falsediscovery_rate, false_discovery_rate, fdr, npv, ppv, recall, sensitivity, hit_rate, miss_rate, specificity, selectivity, fallout","category":"page"},{"location":"measures/#MetricWrapper(s)","page":"Measures","title":"MetricWrapper(s)","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"To be able to pass your metric/metrics to MLJ.evaluate for automatic evaluation, you are required to use MetricWrapper/MetricWrappers.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"MetricWrapper\nMetricWrapper(::MLJBase.Measure)","category":"page"},{"location":"measures/#Fairness.MetricWrapper","page":"Measures","title":"Fairness.MetricWrapper","text":"MetricWrapper\n\nMetricWrapper wraps the fairness metrics and has the information about the protected attribute.\n\n\n\n\n\n","category":"type"},{"location":"measures/#Fairness.MetricWrapper-Tuple{MLJBase.Measure}","page":"Measures","title":"Fairness.MetricWrapper","text":"MetricWrapper(measure, grp=:class)\n\nInstantiates the struct MetricWrapper.\n\n\n\n\n\n","category":"method"},{"location":"measures/","page":"Measures","title":"Measures","text":"evaluate(model, X, y, measure=MetricWrapper(tpr, grp=:race))","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"You can also use MetricWrapper to calculate Metric value outside the evaluate function.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"wrappedMetric = MetricWrapper(negative_predictive_value; grp=:sex)\nwrappedMetric(ŷ, X, y)","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"You can easily get multiple wrapped Metrics using MetricWrappers.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"MetricWrappers","category":"page"},{"location":"measures/#Fairness.MetricWrappers","page":"Measures","title":"Fairness.MetricWrappers","text":"MetricWrappers(measures, grp=:class)\n\nCreates MetricWrapper for multiple metrics at same time.\n\n\n\n\n\n","category":"function"},{"location":"measures/","page":"Measures","title":"Measures","text":"evaluate(wrappedModels, X, y,\n\tmeasures=MetricWrappers([tpr, ppv], grp=:sex))\n\nevaluate(wrappedModels, X, y,\n\tmeasures=[accuracy, MetricWrappers([tpr, ppv], grp=:sex)...])","category":"page"},{"location":"measures/#FairMetrics","page":"Measures","title":"FairMetrics","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"These metrics build upon CalcMetrics and provide more insight about data through DataFrame. disparity and Parity corresponding to several CalcMetrics can be handled in a single call to them.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"disparity","category":"page"},{"location":"measures/#Fairness.disparity","page":"Measures","title":"Fairness.disparity","text":"disparity(M, ft; refGrp=nothing, func=/)\n\nComputes disparity for fairness tensor ft with respect to an array of metrics M.\n\nFor any class A and a reference Group B, disparity = func(metric(A), metric(B)). By default func is / .\n\nA dataframe is returned with disparity values for all combinations of metrics and classes. It contains a column named labels for the classes and has a column for disparity of each metric in M. The column names are metric names appended with _disparity.\n\nKeywords\n\nrefGrp=nothing : The reference group\nfunc=/ : The function used to evaluate disparity. This function should take 2 arguments.\n\nThe second argument shall correspond to reference group.\n\nPlease note that division by 0 will result in NaN\n\n\n\n\n\n","category":"function"},{"location":"measures/","page":"Measures","title":"Measures","text":"ft = fair_tensor(ŷ, y, grp);\nM = [true_positive_rate, positive_predictive_value];\ndf = disparity(M, ft; refGrp=\"Asian\");\ndf |> pretty #hide\nf(x, y) = x - y\ndf_1 = disparity(M, ft; refGrp=\"Asian\", func=f);\ndf_1 |> pretty #hide","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"To use disparity with evaluate function, you have to use the struct Disparity","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"Disparity\nDisparity(::MLJBase.Measure)\nDisparities","category":"page"},{"location":"measures/#Fairness.Disparity","page":"Measures","title":"Fairness.Disparity","text":"Disparity\n\nDisparity uses the disparity function and has information about the protected attribute, reference Group and custom function It will help in automatic evaluation using MLJ.evaluate\n\n\n\n\n\n","category":"type"},{"location":"measures/#Fairness.Disparity-Tuple{MLJBase.Measure}","page":"Measures","title":"Fairness.Disparity","text":"Disparity(measure, grp=:class, refGrp=nothing, func=/)\n\nInstantiates the struct Disparity.\n\n\n\n\n\n","category":"method"},{"location":"measures/#Fairness.Disparities","page":"Measures","title":"Fairness.Disparities","text":"Disparities(measures, grp=:class, refGrp=nothing, func=/)\n\nCreates instances of Disparity struct for each measure in measures.\n\n\n\n\n\n","category":"function"},{"location":"measures/","page":"Measures","title":"Measures","text":"evaluate(model, X, y,\n\tmeasure=Disparity(tpr, grp=:sex, refGrp=\"White\", func=-)\n\nevaluate(model, X, y,\n\tmeasures=[\n\tDisparities([tpr, fpr], grp=:sex, refGrp=\"White\", func=-)...,\n\tMetricWrappers([tpr, ppv], grp=:sex)...])","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"parity","category":"page"},{"location":"measures/#Fairness.parity","page":"Measures","title":"Fairness.parity","text":"parity(df, ϵ=nothing; func=nothing)\n\nTakes the dataframe df returned from disparity function and adds columns for parity values corresponding to each disparity column. It then calculates the parity values for measures that were passed for disparity calculation.\n\nParity is a boolean value indicating whether a fairness constraint is satisfied by disparity values.\n\nThe default fairness criteria for a disparity value x and fairness threshold ϵ for a group is:\n\n(1-ϵ) <= x <= 1/(1-ϵ)\n\nHere ϵ is the fairness threshold which is required if default fairness constraint is used.\n\nKeywords\n\nfunc=nothing : single argument function specifying custom Fairness constraint for disparity instead of the default criteria\n\n\n\n\n\n","category":"function"},{"location":"measures/","page":"Measures","title":"Measures","text":"parity(df, 0.2);\ndf |> pretty #hide\nparity(df; func= x-> x > 0.8);\ndf |> pretty #hide","category":"page"},{"location":"measures/#BoolMetrics","page":"Measures","title":"BoolMetrics","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"These metrics return a boolean value. Currently, only Demographic Parity has been implemented under this. DemographicParity is implemented to illustrate the use of FairTensor. The user is instead recommended to use Parity function from FairMetrics . Every boolean metric can be easily obtained from Parity.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"These metrics are callable structs. The struct has field for the A and C. A corresponds to the matrix on LHS of the equality-check equation A*z = 0 in this paper's, Equation No. 3. In this paper it is a 1D array. But to deal with multiple group fairness, a 2D array matrix is used.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"Initially the instatiated metric contains 0 and [] as values for C and A. But after calling it on fairness tensor, the values of C and A change as shown below. This gives the advantage to reuse the same instantiation again. But upon reusing, the matrix A need not be generated again as it will remain the same. This makes it faster!","category":"page"},{"location":"measures/#DemographicParity","page":"Measures","title":"DemographicParity","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"dp = DemographicParity()\ndp.A, dp.C # Initial values in struct DemographicParity\ndp(ft)\ndp.A, dp.C # New values in dp (instance of DemographicParity)","category":"page"},{"location":"measures/#Helper-Functions","page":"Measures","title":"Helper Functions","text":"","category":"section"},{"location":"measures/","page":"Measures","title":"Measures","text":"Fairness._ftIdx is a utility function that has been used to calculate metrics and shall be helpful while using Fairness to inspect Fairness tensor values.","category":"page"},{"location":"measures/","page":"Measures","title":"Measures","text":"Fairness._ftIdx","category":"page"},{"location":"measures/#Fairness._ftIdx","page":"Measures","title":"Fairness._ftIdx","text":"_ftIdx(ft, grp)\n\nFinds the index of grp (string) in ft.labels which corresponds to ft.mat. For Index i for the grp  returned by this function ft[i, :, :] returns the 2D array [[TP, FP], [FN, TN]] for that group.\n\n\n\n\n\n","category":"function"},{"location":"#Fairness","page":"Home","title":"Fairness","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Fairness.jl is a bias audit and mitigation toolkit in julia and is supported by MLJ Ecosystem.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"julia> using Pkg\njulia> Pkg.activate(\"my_environment\", shared=true)\njulia> Pkg.add(\"Fairness\")\njulia> Pkg.add(\"MLJ\")","category":"page"},{"location":"#Components","page":"Home","title":"Components","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"It shall be divided into following components","category":"page"},{"location":"","page":"Home","title":"Home","text":"FairTensor\nMeasures\nCalcMetrics\nFairMetrics\nBoolMetrics\nAlgorithms\nPreprocessing Algorithms\nInProcessing Algorithms [WIP]\nPostProcessing Algorithms\nFairness Datasets (Macros)","category":"page"},{"location":"#Important-Points-to-Note","page":"Home","title":"Important Points to Note","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"After you go through the documentation or have a basic idea of the package, revisit the following points which are essential to make best out this package.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Almost every fairness dataset has a categorical field. To be able to use the various MLJ Models, you should also use a ContinuousEncoder in the following manner.","category":"page"},{"location":"","page":"Home","title":"Home","text":"model = @pipeline ContinuousEncoder @load(SomeClassifier, pkg=PackageOfClassifier)","category":"page"},{"location":"","page":"Home","title":"Home","text":"To get a list of classifiers that can be used with Fairness.jl, execute","category":"page"},{"location":"","page":"Home","title":"Home","text":"using MLJ\nmodels(x->x.target_scitype<:AbstractVector{<:Finite})","category":"page"},{"location":"","page":"Home","title":"Home","text":"After you get the list, pick a classifier of your choice. Lets say you choose the tuple with (name=RandomForestClassifier, package_name=DecisionTree). Then to use the model, you have to execute","category":"page"},{"location":"","page":"Home","title":"Home","text":"model = @pipeline ContinuousEncoder @load(RandomForestClassifier, pkg=DecisionTree)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note that you might be asked to install a specific package for the classifier. Execute the instruction of the type import Pkg; Pkg.add(\"--\"), which you will be asked to do when you try to load the model.","category":"page"},{"location":"algorithms/#Fairness-Algorithms","page":"Fairness Algortihms","title":"Fairness Algorithms","text":"","category":"section"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"Fairness.jl provides with various algorithms that can help in mitigating bias and improving fairness metrics.","category":"page"},{"location":"algorithms/#Introduction","page":"Fairness Algortihms","title":"Introduction","text":"","category":"section"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"These algorithms are wrappers. As demonstrated in last section, these wrappers can be used to compose a complex pipeline with more than 1 fairness algorithm. These wrappers can be used only with binary classifiers.","category":"page"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"The fairness algorithms have been divided into 3 categories based on the parts in the pipeline that the algorithm can control. These 3 categories are Preprocessing, Postprocessing and Inprocessing[WIP].","category":"page"},{"location":"algorithms/#Preprocessing-Algorithms","page":"Fairness Algortihms","title":"Preprocessing Algorithms","text":"","category":"section"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"These are the algorithms that have control over the training data to be fed into machine learning model. This class of algorithms improves the representation of groups in the training data.","category":"page"},{"location":"algorithms/#ReweighingSampling-Algorithm","page":"Fairness Algortihms","title":"ReweighingSampling Algorithm","text":"","category":"section"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"ReweighingSamplingWrapper\nFairness.ReweighingSamplingWrapper()","category":"page"},{"location":"algorithms/#Fairness.ReweighingSamplingWrapper","page":"Fairness Algortihms","title":"Fairness.ReweighingSamplingWrapper","text":"ReweighingSamplingWrapper\n\nReweighingSamplingWrapper is a preprocessing algorithm wrapper in which Weights for each group-label combination is calculated. Using the calculated weights, rows are sampled uniformly. The weight is used to sample uniformly. The number of datapoints used to train after sampling from the reweighed dataset can be controlled by factor.\n\n\n\n\n\n","category":"type"},{"location":"algorithms/#Fairness.ReweighingSamplingWrapper-Tuple{}","page":"Fairness Algortihms","title":"Fairness.ReweighingSamplingWrapper","text":"ReweighingSamplingWrapper(classifier=nothing, grp=:class, factor=1, rng=Random.GLOBAL_RNG)\n\nInstantiates a ReweighingSamplingWrapper which wrapper the classifier with the Reweighing fairness algorithm together with sampling. The sensitive attribute can be specified by the parameter grp. factor*numberofsamplesinoriginal_data datapoints are sampled using calculated weights and then used to train after sampling from the reweighed dataset. A negative or no value value for factor parameter instructs the algorithm to use the same number of datapoints as in original sample.\n\n\n\n\n\n","category":"method"},{"location":"algorithms/#Reweighing-Algorithm","page":"Fairness Algortihms","title":"Reweighing Algorithm","text":"","category":"section"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"This model being wrapped with this wrapper needs to support weights. If the model doesn't support training using weights, then error is thrown. In case weights are not supported by your desired model, them switch to ReweighingSampling Algorithm. To find the models in MLJ that support weights, execute:","category":"page"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"using MLJ\nmodels(x-> x.supports_weights)","category":"page"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"ReweighingWrapper\nFairness.ReweighingWrapper()\nFairness._calculateWeights","category":"page"},{"location":"algorithms/#Fairness.ReweighingWrapper","page":"Fairness Algortihms","title":"Fairness.ReweighingWrapper","text":"ReweighingWrapper\n\nReweighingWrapper is a preprocessing algorithm wrapper in which Weights for each group-label combination is calculated. These calculated weights are then passed to the classifier model which further uses it to make training fair.\n\n\n\n\n\n","category":"type"},{"location":"algorithms/#Fairness.ReweighingWrapper-Tuple{}","page":"Fairness Algortihms","title":"Fairness.ReweighingWrapper","text":"ReweighingWrapper(classifier=nothing, grp=:class)\n\nInstantiates a ReweighingWrapper which wrapper the classifier with the Reweighing fairness algorithm. The sensitive attribute can be specified by the parameter grp. If classifier doesn't support weights while training, an error is thrown.\n\n\n\n\n\n","category":"method"},{"location":"algorithms/#Fairness._calculateWeights","page":"Fairness Algortihms","title":"Fairness._calculateWeights","text":"Helper function for ReweighingWrapper and ReweighingSamplingWrapper. grps is an array of values of protected attribute. y is an array of ground truth values. Array of (Frequency) weights are returned from this function.\n\n\n\n\n\n","category":"function"},{"location":"algorithms/#Postprocessing","page":"Fairness Algortihms","title":"Postprocessing","text":"","category":"section"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"These are the algorithms that have control over the final predictions. They can tweak final predictions to optimise fairness constraints.","category":"page"},{"location":"algorithms/#Equalized-Odds-Algorithm","page":"Fairness Algortihms","title":"Equalized Odds Algorithm","text":"","category":"section"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"EqOddsWrapper\nFairness.EqOddsWrapper()","category":"page"},{"location":"algorithms/#Fairness.EqOddsWrapper","page":"Fairness Algortihms","title":"Fairness.EqOddsWrapper","text":"EqOddsWrapper\n\nIt is a postprocessing algorithm which uses Linear Programming to optimise the constraints for Equalized Odds.\n\n\n\n\n\n","category":"type"},{"location":"algorithms/#Fairness.EqOddsWrapper-Tuple{}","page":"Fairness Algortihms","title":"Fairness.EqOddsWrapper","text":"EqOddsWrapper(classifier=nothing, grp=:class)\n\nInstantiates EqOddsWrapper which wraps the classifier\n\n\n\n\n\n","category":"method"},{"location":"algorithms/#LinProg-Algorithm","page":"Fairness Algortihms","title":"LinProg Algorithm","text":"","category":"section"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"This algorithm supports all the metrics provided by Fairness.","category":"page"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"LinProgWrapper\nFairness.LinProgWrapper()","category":"page"},{"location":"algorithms/#Fairness.LinProgWrapper","page":"Fairness Algortihms","title":"Fairness.LinProgWrapper","text":"LinProgWrapper\n\nIt is a postprocessing algorithm that uses JuMP and Ipopt library to minimise error and satisfy the equality of specified specified measures for all groups at the same time. Automatic differentiation and gradient based optimisation is used to find probabilities with which the predictions are changed for each group.\n\n\n\n\n\n","category":"type"},{"location":"algorithms/#Fairness.LinProgWrapper-Tuple{}","page":"Fairness Algortihms","title":"Fairness.LinProgWrapper","text":"LinProgWrapper(classifier=nothing, grp=:class, measure)\n\nInstantiates LinProgWrapper which wraps the classifier and containts the measure to optimised and the sensitive attribute(grp)\n\n\n\n\n\n","category":"method"},{"location":"algorithms/#Composability","page":"Fairness Algortihms","title":"Composability","text":"","category":"section"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"Fairness.jl provides you the ability to easily use multiple fairness algorithms on top of each other. A fairness algorithm can be added over another fairness algorithm by simply wrapping the previous wrapped model with the new wrapper. Fairness.jl handles everything else for you! The use of wrappers provides you the ability to add as many algorithms as you want!!","category":"page"},{"location":"algorithms/","page":"Fairness Algortihms","title":"Fairness Algortihms","text":"using Fairness, MLJ\nX, y, _ = @load_toydata;\nmodel = ConstantClassifier();\nwrappedModel = ReweighingSamplingWrapper(classifier=model, grp=:Sex);\nwrappedModel2 = EqOddsWrapper(classifier=wrappedModel, grp=:Sex);\nmch = machine(wrappedModel2, X, y);\nfit!(mch)\nŷ = predict(mch, X);","category":"page"}]
}
