from functools import reduce
from operator import sub
import threading
import time
import subprocess
import numpy as np
from math import ceil, floor
from DMXcontroller.models import Scenes


class ProgramPlayer():
    def __init__(self, scenetime, fadetime=0, fadefactor=0):
        self.play = False
        self.program = []
        self.scenetime = scenetime
        self.fadetime = fadetime
        self.fadefactor = fadefactor
        self.current = ''

    def play_program(self):
        reducer = np.vectorize(lambda v: floor(v - self.fadefactor *(v/255)))
        increaser = np.vectorize(lambda v, d: ceil(v + self.fadefactor * (d / 255)))
        while self.play:
            if not self.fadetime:
                for scene in self.program:
                    sc = Scenes.query.filter_by(s_name=scene).first()
                    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + sc.s_data])
                    time.sleep(self.scenetime)

            elif self.fadetime:
                for scene in self.program:
                    sc = Scenes.query.filter_by(s_name=scene).first()
                    arr = np.array(sc.s_data[:-1].split(',')).astype(int)

                    try:
                        delta = arr - prev_scene
                        while np.max(arr - prev_scene) >= 1:
                            prev_scene = increaser(prev_scene, delta)
                            prev_scene[prev_scene < 0] = 0
                            prev_scene[prev_scene > 255] = 255
                            subprocess.run(['ola_streaming_client', '-u 2', '-d ' + ','.join(prev_scene.astype(str))])

                    except UnboundLocalError:
                        subprocess.run(['ola_streaming_client', '-u 2', '-d ' + sc.s_data])

                    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + ','.join(arr.astype(str))])                        
                    time.sleep(self.scenetime)
                    
                    while arr[arr > 20].size > 0:
                        arr[arr > 20] = reducer(arr[arr > 20])
                        subprocess.run(['ola_streaming_client', '-u 2', '-d ' + ','.join(arr.astype(str))])
                    prev_scene = arr.copy()
                       


    def calc_fadetime(self, x):
        self.fadefactor = x
        try:
            self.fadetime =  8.447*x**(-.935)
        except ZeroDivisionError:
            self.fadetime = 0
        return self.fadetime

    def start_program(self):
        self.play = True

    def stop_program(self):
        self.play = False

    def send_data(universe, data):
        pass
    
    def __iter__(self):
        return self.program

    

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