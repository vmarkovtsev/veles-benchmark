Dataset
-------
AlexNet (input: 128x3x224x224)

Software
--------
Ubuntu 14.04 x86-64, CPython 3.4.1

Hardware
--------
Core i7-3770 (16Gb DDR3 1600)
GeForce GTX TITAN (not BLACK)

Results
-------

|       Framework      |    Backend    | Forward, msec | Backward, msec | Total, msec | Slowdown |
|:--------------------:|:-------------:|:-------------:|:--------------:|:-----------:|:--------:|
| Torch7 master@a5a9ba |  cudnn (fp32) |       98      |       245      |   **344**   |   1.00   |
| Torch7 master@a5a9ba |     nn (fp32) |      181      |       327      |     508     |   1.48   |
| Torch7 master@a5a9ba |  cudnn (fp64) |      N/A      |       N/A      |     N/A     |    N/A   |
| Torch7 master@a5a9ba |     nn (fp64) |      N/A      |       N/A      |     N/A     |    N/A   |
| Veles 0.8.11         |   cuda (fp32) |      125      |       223      |   **348**   |   1.01   |
| Veles 0.8.11         |    ocl (fp32) |      628      |      1234      |    1862     |   5.42   |
| Veles 0.8.11         | clBLAS (fp32) |      675      |       705      |    1380     |   4.02   |
| Veles 0.8.11         |   cuda (fp64) |      956      |      1876      |    2832     |   8.24   |
| Veles 0.8.11         |    ocl (fp64) |     1336      |      2551      |    3887     |  11.31   |
| Veles 0.8.11         | clBLAS (fp64) |     1403      |      2118      |    3521     |  10.24   |

Hardware
--------
Core i7-3770 (16Gb DDR3 1600)
AMD FirePro W9100

Results
-------

|   Framework  |    Backend    | Forward, msec | Backward, msec | Total, msec | Slowdown |
|:------------:|:-------------:|:-------------:|:--------------:|:-----------:|:--------:|
| Veles 0.8.11 |    ocl (fp32) |      1604     |      4742      |     6346    |   18.46  |
| Veles 0.8.11 | clBLAS (fp32) |      1673     |      2116      |     3789    |   11.02  |
| Veles 0.8.11 |    ocl (fp64) |      3183     |      9944      |    13127    |   38.19  |
| Veles 0.8.11 | clBLAS (fp64) |      4435     |      4118      |     8553    |   24.89  |
