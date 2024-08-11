---
title: "Calculating Phenotypic Age from biomarkers with Python and numpy"
pubDatetime: 2024-01-24T17:34:12Z
slug: "calculating-phenotypic-age-with-python"
featured: true
draft: false
commentsEnabled: false
categories:
  - Biohacking
  - Python
tags:
  - Phenotypic Age
  - Biological Aging
  - Python in Healthcare
  - Aging Biomarkers
  - Health Technology
  - Preventive Healthcare
  - Programming and Medicine
  - For Medical Researchers
  - For Programmers
  - Health Innovation
  - Cross-Disciplinary Research
ogImage: "./omux-calculating-phenotypic-age.jpg"
description: "Discover the intersection of biology and technology in this exploration of Phenotypic Age. Learn how it transcends chronological age, its impact on healthcare, and how to calculate it using Python."
---

## Introduction

As an enthusiastic data collector, I find great satisfaction in tracking various aspects of my life. This can include my dietary habits, physical activity, sleep patterns, and even the hours I spend coding.

My pursuit of personal data doesn't just satisfy my curiosity — it's a quest to unearth deeper insights into my well-being and lifestyle.

Recently, I underwent a comprehensive blood test via the [MediChecks Ultimate Performance Blood Test](https://www.medichecks.com/products/ultimate-performance-blood-test), an extensive examination that evaluates 56 different biomarkers.

Armed with the results, I embarked on an interesting project: utilising the algorithm developed by Dr. Levine, I crafted a Python script dedicated to calculating my phenotypic age.

This article aims to provide an insight into what biological age is, and how I combined my laboratory results with the research on biological age to create a Python script that calculates my phenotypic age.

### Background and Importance of Phenotypic Age

The concept of ageing, traditionally measured in chronological years, has long been a focal point in both the medical and research communities. However, a more nuanced understanding of ageing has emerged, emphasising 'biological' or 'phenotypic' age.

This notion captures an individual's bodily health, which may not coincide with their chronological age. The significance of phenotypic age lies in its potential to provide more insights into an individual's health and the potential perils of age-related diseases.

## What is the Phenotypic Age?

### Definition and Overview

Phenotypic age is derived from a statistical model that incorporates various biomarkers indicative of an individual's physiological status. These biomarkers, often obtained from routine blood tests, include factors like albumin, creatinine, and glucose, among others.

The phenotypic age model, primarily based on research such as Levine et al. (2018), represents an amalgamation of these biomarkers, weighted and calculated to reflect the biological age of an individual.

This age may differ significantly from their chronological age, offering a more nuanced view of their health and longevity prospects.

### Biological Age vs. Chronological Age: Understanding the Difference

While chronological age is simply the amount of time that has passed since an individual's birth, biological age is an intriguing approximation of how well or poorly their body may be functioning relative to their actual age.

Biological age, which includes an array of biomarkers, is a more dynamic measure, sensitive to lifestyle choices, environmental factors, and disease states.

For instance, a 50-year-old with excellent health metrics may have a biological age that is significantly lower than their chronological age, suggesting a healthier and potentially longer life.

### The Importance of Phenotypic Age: Why It Matters

The significance of phenotypic age lies in its potential for personalised healthcare. By providing a more accurate assessment of an individual's biological ageing, it allows for more targeted interventions and preventive measures.

For instance, someone with a phenotypic age significantly higher than their chronological age might be at increased risk for age-related conditions, prompting earlier and more aggressive management strategies.

On a personal level, knowing one's biological age can motivate lifestyle changes aimed at reducing this age, thereby potentially extending lifespan.

## The Phenotypic Age Algorithm

### Origins and Development of the Algorithm

The Phenotypic Age Algorithm emerged from a collaborative effort between medical researchers and data scientists, seeking a more accurate method to assess biological ageing.

Its development was grounded in a series of influential studies, including those by Levine et al. (2018) and the subsequent corrections and refinements in Liu et al. (2019).

These studies utilised extensive data from the National Health and Nutrition Examination Survey (NHANES) to identify key biomarkers predictive of mortality risk and age-related morbidity.

By analysing patterns within this rich dataset, researchers were able to construct a statistical model that accurately estimates an individual's phenotypic age.

### Requirements for Calculation: Understanding the Biomarkers

The algorithm's accuracy hinges on the careful selection and analysis of specific biomarkers. These include:

- **Albumin**: A protein made by the liver, indicative of nutritional status and liver function.
- **Creatinine**: Reflects kidney function, with higher levels indicating potential renal impairment.
- **Glucose**: Important for assessing diabetes risk and overall metabolic health.
- **C-reactive protein (CRP)**: A marker of inflammation, associated with various age-related diseases.
- Lymphocyte percentage: Reflects immune system health, which can decline with age.
- **Mean cell volume (MCV)**: Measures the size of red blood cells, associated with certain nutritional deficiencies and chronic diseases.
- **Red cell distribution width (RDW)**: Indicates the variability in red blood cell size, linked to cardiovascular and other diseases.
- **White blood cell (WBC) count**: An immune system marker, higher counts can indicate infection or inflammation.

Each biomarker contributes to a comprehensive snapshot of your physiological state, and their combined analysis provides the phenotypic age estimate.

## The Mathematical Formula Explained

The core of the algorithm lies in a mathematical formula, derived from regression models based on the NHANES data. This formula considers the levels of the aforementioned biomarkers, integrating them in a way that captures their combined impact on ageing.

The equation involves weighted coefficients assigned to each biomarker, reflecting their relative importance in determining biological age.

#### Base Formula

$$
\begin{aligned} x b= & -19.9067+(-0.0336 \times\text { albumin } )+(0.0095 \times\text { creatinine}) \\ & +(0.1953 \times\mathrm{glucose} ) +(0.0954 \times \log (\operatorname{crp}))+(-0.0120 \times \operatorname{lymphocyte percent}) \\ & +(0.0268 \times \mathrm{mcv}) +(0.3306 \times \mathrm{rdw}) +(0.00188 \times \text { alkaline phosphatase }) \\ & +(0.0554 \times \text { white blood cell count }) +(0.0804 \times \text { chronological age }) \\ \\ M= & 1-\exp \left(\frac{-1.51714 \times \exp (x b)}{0.0076927}\right) \\ \\ \text { phenotypic age } = & 141.50225+\frac{\log (-0.00553 \times \log (1-M))}{0.09165}\end{aligned}
$$

The formula for calculating phenotypic age is thus:

$Phenotypic Age = 141.50 + 0.09165 * ln(-0.0553 * ln(1 - M))$

Where $M$ is defined as:

$M = 1 - exp(0.0076927 - 1.51714 * exp(xb))$

And $xb$ represents a weighted sum of the biomarkers:

$xb = b0 + b1 * Albumin + b2 * Creatinine + ... + b10 * Chronological Age$

Here, each $b$ value is a coefficient representing the weight of the corresponding biomarker in the formula. This equation encapsulates the intricate interplay between various physiological markers and their collective impact on ageing.

#### Adjusted Coefficients

Depending on the units used for each biomarker, the formula may require some adjustments. For instance, the original formula uses glucose levels in mmol/L, but my blood test results were in mg/dL.

I'll go over the details of the conversions when we start writing the python script. For now, I've included the adjusted formula below, which accounts for the unit conversions.

$$
\begin{aligned} x b= & -19.9067+(-0.0336 \times(\text { albumin } \times 10))+(0.0095 \times(\text { creatinine} \times 88.401)) \\ & +(0.1953 \times(\mathrm{glucose} \times 0.0555)) +(0.0954 \times \log (\operatorname{crp} \times 0.1))+(-0.0120 \times \operatorname{lymphocyte percent}) \\ & +(0.0268 \times \mathrm{mcv}) +(0.3306 \times \mathrm{rdw}) +(0.00188 \times \text { alkaline phosphatase }) \\ & +(0.0554 \times \text { white blood cell count }) +(0.0804 \times \text { chronological age }) \\ \\ M= & 1-\exp \left(\frac{-1.51714 \times \exp (x b)}{0.0076927}\right) \\ \\ \text { phenotypic age } = & 141.50225+\frac{\log (-0.00553 \times \log (1-M))}{0.09165}\end{aligned}
$$

## Writing the Python Script

### Problem Statement and Solution Approach

The challenge lies in accurately translating the algorithm, a complex mathematical model, into a functional script. Thankfully this is quite straightforward, if we use `Python` and `numpy`.

This script should be able to take specific biomarker values as input and output an individual's estimated biological age.

The solution involves defining the necessary constants and variables, handling unit conversions, and implementing the formula as described in the referenced research papers.

### Step-by-Step Guide to Translating the Mathematical Formula into Python

#### Defining the Constants and Input Values

The first step is to define the constants, which are the coefficients assigned to each biomarker in the formula. These coefficients are derived from the regression model and are essential to the calculation.

Next, input values for each biomarker are required. These can be obtained from blood tests and should be entered in the units specified by the formula.

```python
# Constants from the formula
b0 = -19.9067
b_albumin = -0.0336
b_creatinine = 0.0095
b_glucose = 0.1953
b_crp = 0.0954
b_lymphocyte_percent = -0.0120
b_mcv = 0.0268
b_rdw = 0.3306
b_alkaline_phosphatase = 0.00188
b_white_blood_cell_count = 0.0554
b_chronological_age = 0.0804
```

```python
# Input values for each biomarker
albumin = 4.1  # g/L - this may need converted from g/dL
creatinine = 0.73  # mmol/L - this may need converted from mg/dL
glucose = 94  # mmol/L - this may need converted from mg/dL
crp = 0.19  # mg/dl - this may need converted from mg/L
lymphocyte_percent = 27.78 # %
mcv = 88  # fL
rdw = 13.6  # %
alkaline_phosphatase = 48  # IU/L
white_blood_cell_count = 3.9  # x10^3 cells/µL
chronological_age = 64.12  # years
```

I'm using example data here and not my own blood test results. I'll go over how to convert the units in the next section.

#### Handling Unit Conversions

Certain biomarkers may need unit conversions to align with the formula's requirements.

It's important to get this step right, as your lab results may be in different units than those specified in the formula.

This requires summing the products of each biomarker value and its corresponding coefficient, and then applying any additional mathematical operations as specified in the formula.

We'll do this as part of the $xb$ calculation, which is the weighted sum of the biomarkers.

```python
# xb calculation
xb = (b0 +
      (b_albumin * (albumin * 10)) +
      (b_creatinine * (creatinine * 88.401)) +
      (b_glucose * (glucose * 0.0555)) +
      (b_crp * np.log(crp * 0.1)) +
      (b_lymphocyte_percent * lymphocyte_percent) +
      (b_mcv * mcv) +
      (b_rdw * rdw) +
      (b_alkaline_phosphatase * alkaline_phosphatase) +
      (b_white_blood_cell_count * white_blood_cell_count) +
      (b_chronological_age * chronological_age))
```

Here I have adjusted the values for albumin, creatinine, glucose, and crp to match the units specified in the formula.

#### Script Implementation

The final step is to implement the formula as described in the research papers. This involves calculating $M$ and then using it to calculate the phenotypic age.

```python
# M calculation
gamma = -1.51714
lambda_ = 0.0076927
M = 1 - np.exp((gamma * np.exp(xb)) / lambda_)
```

```python
# Phenotypic Age calculation
alpha = 141.50225
beta = -0.00553
phenotypic_age = alpha + (np.log(beta * np.log(1 - M)) / 0.09165)
```

Puting it all together we get our full script and our phenotypic age:

```python
import numpy as np

# Given values from the spreadsheet
albumin = 4.1  # g/L - this may need converted from g/dL
creatinine = 0.73  # mmol/L - this may need converted from mg/dL
glucose = 94  # mmol/L - this may need converted from mg/dL
crp = 0.19  # mg/dl - this may need converted from mg/L
lymphocyte_percent = 27.78 # %
mcv = 88  # fL
rdw = 13.6  # %
alkaline_phosphatase = 48  # IU/L
white_blood_cell_count = 3.9  # x10^3 cells/µL
chronological_age = 64.12  # years

# Constants from the formula
b0 = -19.9067
b_albumin = -0.0336
b_creatinine = 0.0095
b_glucose = 0.1953
b_crp = 0.0954
b_lymphocyte_percent = -0.0120
b_mcv = 0.0268
b_rdw = 0.3306
b_alkaline_phosphatase = 0.00188
b_white_blood_cell_count = 0.0554
b_chronological_age = 0.0804

# xb calculation
xb = (b0 +
      (b_albumin * (albumin * 10)) +
      (b_creatinine * (creatinine * 88.401)) +
      (b_glucose * (glucose * 0.0555)) +
      (b_crp * np.log(crp * 0.1)) +
      (b_lymphocyte_percent * lymphocyte_percent) +
      (b_mcv * mcv) +
      (b_rdw * rdw) +
      (b_alkaline_phosphatase * alkaline_phosphatase) +
      (b_white_blood_cell_count * white_blood_cell_count) +
      (b_chronological_age * chronological_age))

# M calculation
gamma = -1.51714
lambda_ = 0.0076927
M = 1 - np.exp((gamma * np.exp(xb)) / lambda_)

# Phenotypic Age calculation
alpha = 141.50225
beta = -0.00553
phenotypic_age = alpha + (np.log(beta * np.log(1 - M)) / 0.09165)

print(phenotypic_age)
```

Executing this script with the test data yields a phenotypic age of `54.63`, which is significantly lower than the chronological age of `68.69`.

This suggests that the individual is in excellent health and may have a longer lifespan than expected!

## Conclusion and Closing Thoughts

The exploration of biological age presents a fascinating intersection of biology, medicine, and data science. I thoroughly enjoyed learning about this topic, and I hope you found this article informative and insightful.

I plan to continue to track and measure my phenotypic age over time, and I'll be sure to share my results in a future article should I find anything interesting!

If you have any questions or comments, please feel free to reach out to me.

## References

- Liu Z, Kuo P-L, Horvath S, Crimmins E, Ferrucci L, Levine M (2019) **Correction: A new ageing measure captures morbidity and
  mortality risk across diverse subpopulations from NHANES IV: A cohort study. PLoS Med 16(2): e1002760.**
  [https://doi.org/10.1371/iournal.pmed.1002760](https://doi.org/10.1371/iournal.pmed.1002760)
- Liu Z, Kuo PL, Horvath S, Crimmins E, Ferrucci L, et al. (2018) A new **ageing measure captures morbidity and mortality risk across
  diverse subpopulations from NHANES IV: A cohort study. PLOS Medicine 15(12): e1002718.**
  [https://doi.org/10.1371/iournal.pmed.1002718](https://doi.org/10.1371/iournal.pmed.1002718)
- Levine ME, Lu AT, Quach A, Chen BH, Assimes TL, Bandinelli S, Hou L, **Baccarelli AA, Stewart JD, Li Y, Whitsel EA, Wilson JG, Reiner
  AP, et al. An epigenetic biomarker of ageing for lifespan and healthspan. Ageing (Albany NY). 2018 Apr 1810:573-591.**
  [https://doi.org/10.18632/aging.101414](https://doi.org/10.18632/aging.101414)
- [Online LATEX Equation Editor](https://latexeditor.lagrida.com)
- [Morgan Levine: ‘Only 10-30% of our lifespan is estimated to be due to genetics’ - The Guardian](https://www.theguardian.com/science/2022/may/07/morgan-levine-only-10-30-of-our-lifespan-is-estimated-to-be-due-to-genetics)
- [GitHub repository for the Phenotypic Age Calculator](https://github.com/KyteProject/phenotypic-age-calc)
