import numpy as np

s = '200,255,0,10,30,200'

arr = np.array(s.split(',')).astype(int)
arr[arr > 0] -= 1
print(','.join(arr.astype(str)))