Dataset
-------
AlexNet (input: 128x3x224x224)


Hardware
--------
Core i7-3770 (16Gb DDR3 1600)
GeForce GTX TITAN (not BLACK)

Results
-------

|       Framework      |    Backend    | Forward, msec | Backward, msec | Total, msec |
|:--------------------:|:-------------:|:-------------:|:--------------:|:-----------:|
| Torch7 master@a5a9ba |  cudnn (fp32) |       98      |       245      |   **344**   |
| Torch7 master@a5a9ba |     nn (fp32) |      181      |       327      |     508     |
| Torch7 master@a5a9ba |  cudnn (fp64) |      N/A      |       N/A      |     N/A     |
| Torch7 master@a5a9ba |     nn (fp64) |      N/A      |       N/A      |     N/A     |
| Veles 0.8.11         |   cuda (fp32) |      125      |       223      |   **348**   |
| Veles 0.8.11         |    ocl (fp32) |      628      |      1234      |    1862     |
| Veles 0.8.11         | clBLAS (fp32) |      675      |       705      |    1380     |
| Veles 0.8.11         |   cuda (fp64) |      956      |      1876      |    2832     |
| Veles 0.8.11         |    ocl (fp64) |     1336      |      2551      |    3887     |
| Veles 0.8.11         | clBLAS (fp64) |     1403      |      2118      |    3521     |
