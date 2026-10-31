import type { ClassMetrics, EvaluationResults, FarmInputData, LabelledSample } from '../types/crop';
import { rankCropRecommendations } from './recommendationEngine';
import { LABELLED_AGRICULTURAL_DATASET } from '../data/evaluationDataset';

export function runDatasetEvaluation(customDataset?: LabelledSample[]): {
  results: EvaluationResults;
  evaluatedSamples: LabelledSample[];
} {
  const dataset = customDataset || LABELLED_AGRICULTURAL_DATASET;
  const evaluatedSamples: LabelledSample[] = [];

  let top1CorrectCount = 0;
  let top3CorrectCount = 0;
  let knnTop1CorrectCount = 0;

  // Track distinct crop labels
  const uniqueLabels = Array.from(new Set(dataset.map((d) => d.trueLabel))).sort();

  // Confusion matrix: rows = true, cols = predicted
  const labelIndexMap = new Map<string, number>();
  uniqueLabels.forEach((label, idx) => labelIndexMap.set(label, idx));

  const matrixSize = uniqueLabels.length;
  const confusionMatrix: number[][] = Array.from({ length: matrixSize }, () =>
    Array(matrixSize).fill(0)
  );

  // Per-class TP, FP, FN counters
  const tpMap = new Map<string, number>();
  const fpMap = new Map<string, number>();
  const fnMap = new Map<string, number>();
  const supportMap = new Map<string, number>();

  uniqueLabels.forEach((l) => {
    tpMap.set(l, 0);
    fpMap.set(l, 0);
    fnMap.set(l, 0);
    supportMap.set(l, 0);
  });

  for (const sample of dataset) {
    const input: FarmInputData = {
      soilType: sample.soilType,
      soilPh: sample.ph,
      hasNpkData: true,
      nitrogen: sample.n,
      phosphorus: sample.p,
      potassium: sample.k,
      rainfall: sample.rainfall,
      temperature: sample.temperature,
      humidity: sample.humidity,
      season: sample.season
    };

    const recs = rankCropRecommendations(input);

    const top1 = recs[0]?.crop.name || 'Unknown';
    const top3 = recs.slice(0, 3).map((r) => r.crop.name);

    // k-NN top 1
    const knnSorted = [...recs].sort((a, b) => (b.knnSimilarity || 0) - (a.knnSimilarity || 0));
    const knnTop1 = knnSorted[0]?.crop.name || 'Unknown';

    const isTop1 = top1.toLowerCase().includes(sample.trueLabel.toLowerCase()) ||
                   sample.trueLabel.toLowerCase().includes(top1.toLowerCase());

    const isTop3 = top3.some(
      (c) => c.toLowerCase().includes(sample.trueLabel.toLowerCase()) ||
             sample.trueLabel.toLowerCase().includes(c.toLowerCase())
    );

    const isKnnTop1 = knnTop1.toLowerCase().includes(sample.trueLabel.toLowerCase()) ||
                      sample.trueLabel.toLowerCase().includes(knnTop1.toLowerCase());

    if (isTop1) top1CorrectCount++;
    if (isTop3) top3CorrectCount++;
    if (isKnnTop1) knnTop1CorrectCount++;

    // Update confusion matrix
    const trueIdx = labelIndexMap.get(sample.trueLabel);
    // Find closest matched label in uniqueLabels for prediction
    let predLabelMatched = uniqueLabels.find((l) =>
      top1.toLowerCase().includes(l.toLowerCase()) || l.toLowerCase().includes(top1.toLowerCase())
    );
    if (!predLabelMatched) predLabelMatched = uniqueLabels[0];

    const predIdx = labelIndexMap.get(predLabelMatched);

    if (trueIdx !== undefined && predIdx !== undefined) {
      confusionMatrix[trueIdx][predIdx] += 1;
    }

    // Support
    supportMap.set(sample.trueLabel, (supportMap.get(sample.trueLabel) || 0) + 1);

    if (isTop1) {
      tpMap.set(sample.trueLabel, (tpMap.get(sample.trueLabel) || 0) + 1);
    } else {
      fnMap.set(sample.trueLabel, (fnMap.get(sample.trueLabel) || 0) + 1);
      fpMap.set(predLabelMatched, (fpMap.get(predLabelMatched) || 0) + 1);
    }

    evaluatedSamples.push({
      ...sample,
      predictedCrop: top1,
      top3Predictions: top3,
      isTop1Correct: isTop1,
      isTop3Correct: isTop3
    });
  }

  // Calculate per-class metrics
  const classMetrics: ClassMetrics[] = uniqueLabels.map((crop) => {
    const tp = tpMap.get(crop) || 0;
    const fp = fpMap.get(crop) || 0;
    const fn = fnMap.get(crop) || 0;
    const support = supportMap.get(crop) || 0;

    const precision = tp + fp > 0 ? tp / (tp + fp) : 1.0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 1.0;
    const f1Score = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    return {
      crop,
      support,
      precision: +(precision * 100).toFixed(1),
      recall: +(recall * 100).toFixed(1),
      f1Score: +(f1Score * 100).toFixed(1)
    };
  });

  const totalSamples = dataset.length;
  const top1Accuracy = +((top1CorrectCount / totalSamples) * 100).toFixed(1);
  const top3Accuracy = +((top3CorrectCount / totalSamples) * 100).toFixed(1);
  const knnTop1Accuracy = +((knnTop1CorrectCount / totalSamples) * 100).toFixed(1);

  const macroPrecision = +(
    classMetrics.reduce((sum, m) => sum + m.precision, 0) / classMetrics.length
  ).toFixed(1);
  const macroRecall = +(
    classMetrics.reduce((sum, m) => sum + m.recall, 0) / classMetrics.length
  ).toFixed(1);
  const macroF1 = +(
    classMetrics.reduce((sum, m) => sum + m.f1Score, 0) / classMetrics.length
  ).toFixed(1);

  const results: EvaluationResults = {
    totalSamples,
    top1Accuracy,
    top3Accuracy,
    macroPrecision,
    macroRecall,
    macroF1,
    knnTop1Accuracy,
    confusionMatrix: {
      labels: uniqueLabels,
      matrix: confusionMatrix
    },
    classMetrics,
    evaluatedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  return {
    results,
    evaluatedSamples
  };
}
