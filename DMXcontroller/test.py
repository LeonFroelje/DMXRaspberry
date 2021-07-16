import serial
from serial.serialutil import EIGHTBITS, PARITY_NONE, STOPBITS_TWO
import time
import timeit
import subprocess


interface = serial.Serial(port='/dev/ttyAMA0', baudrate=250000, bytesize=EIGHTBITS, parity=PARITY_NONE, stopbits=STOPBITS_TWO)
print(interface.is_open)
signal = [0, 0, 255, 0, 255, 0, 0, 0, 255, 0, 255, 0, 255, 0, 0, 0, 255, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0,]

i = 0
while i < 100:
    tic = timeit.default_timer()
    interface.send_break(100e-6)
    time.sleep(10e-6)
    interface.write(bytearray(signal))
    toc = timeit.default_timer()
    print(toc - tic)
    i += 1

interface.close()
kek = ','.join([str(i) for i in signal])
i = 0
while i < 100: 
    tic = timeit.default_timer()
    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + kek])
    toc = timeit.default_timer()
    print(toc - tic)
    i += 1 
