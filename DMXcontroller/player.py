from functools import reduce
import threading
import time
import subprocess
import numpy as np
from math import floor
from DMXcontroller.models import Scenes


class ProgramPlayer():
    play = False
    program = []
    scenetime = 2
    fadetime = 1
    fadefactor = 10

    def play_program(self):
        reducer = np.vectorize(lambda v: floor(v - self.fadefactor *(v/255)))
        if not self.fadetime:
            while self.play:
                for scene in self.program:
                    sc = Scenes.query.filter_by(s_name=scene).first()
                    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + sc.s_data])
                    time.sleep(self.scenetime)
        elif self.fadetime:
            while self.play:
                for scene in self.program:
                    sc = Scenes.query.filter_by(s_name=scene).first()
                    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + sc.s_data])
                    time.sleep(self.scenetime)
                    arr = np.array(sc.s_data[:-1].split(',')).astype(int)
                    print(arr)
                    while arr[arr > 0].size > 0:
                        arr[arr > 0] = reducer(arr[arr > 0])
                        print(arr)
                        arr[arr < 0] = 0
                        subprocess.run(['ola_streaming_client', '-u 2', '-d ' + ','.join([str(v) for v in arr])])
                       


    def calc_fadetime(self, x):
        self.fadefactor = x
        self.fadetime =  8.447*x**(-.935)
        return self.fadetime
        

    

if __name__ == "__main__":
    player = ProgramPlayer()
    print(player.play)
    player.play = True
    t1 = threading.Thread(target=player.play_program)
    t1.daemon = True
    t1.start()
    time.sleep(0.01)
    player.play = False
    print("penis")
    player.play = True